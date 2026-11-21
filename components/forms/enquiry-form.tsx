'use client';

import { useId, useMemo, useRef, useState, useSyncExternalStore, type FormEvent, type ReactNode } from 'react';
import Link from 'next/link';
import type { FormDictionary } from '@/lib/dictionary';
import { submitEnquiry, toPayload, type EnquiryError, type EnquiryResult } from '@/lib/enquiry';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/ui/icons';
import {
  emptyEnquiry,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryService,
  type EnquiryValues,
} from './validate';

// One accessible enquiry form for every page (15.8): labels above fields, an error summary after a failed submit,
// field errors linked with aria-describedby, input kept on errors, no double submission, and honest demo feedback.

export type EnquiryFormProps = {
  t: FormDictionary;
  /** full: Book A Trip; compact: homepage and service pages; contact: the Contact page. */
  variant?: 'full' | 'compact' | 'contact';
  /** Services offered in the selector (default: all five). */
  services?: Exclude<EnquiryService, 'general'>[];
  defaultService?: EnquiryService;
  /** Hide the selector and keep `defaultService` (e.g. the Visa page). */
  lockService?: boolean;
  /** Read ?service= and ?interest= from the URL (Book A Trip). */
  readQuery?: boolean;
  packages?: { slug: string; name: string; service: 'umrah' | 'hajj' }[];
  tours?: { slug: string; name: string }[];
  branches?: { slug: string; name: string }[];
  /** Identifies the page in the lead (e.g. 'home', 'umrah'). */
  source: string;
  /** Extra content inside the success card (e.g. next steps and a WhatsApp action on Book A Trip). */
  after?: ReactNode;
  /** Prefilled values, e.g. { destination: 'Munnar and the tea hills', interest: 'munnar-tea-hills' } on a tour page. */
  initial?: Partial<Pick<EnquiryValues, 'destination' | 'interest' | 'tourType' | 'visaCountry' | 'branch'>>;
  className?: string;
};

const CODES = [
  ['+91', 'India +91'],
  ['+971', 'UAE +971'],
  ['+966', 'Saudi Arabia +966'],
  ['+974', 'Qatar +974'],
  ['+968', 'Oman +968'],
  ['+965', 'Kuwait +965'],
  ['+973', 'Bahrain +973'],
] as const;

const ALL: Exclude<EnquiryService, 'general'>[] = ['umrah', 'hajj', 'tour', 'flight', 'visa'];
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

// The visitor's clock and the page URL are external to React. The server renders with neither ('' snapshots), so the
// static HTML never depends on the time or the query; the browser fills them in right after hydration.
const noSubscribe = () => () => {};
const onUrlChange = (cb: () => void) => {
  window.addEventListener('popstate', cb);
  return () => window.removeEventListener('popstate', cb);
};
const readToday = () => iso(new Date());
const readSearch = () => window.location.search;
const serverEmpty = () => '';

/** Months to choose from and the next two Hajj seasons, from 'today' ('YYYY-MM-DD'). */
function buildCalendar(today: string) {
  if (!today) return { months: [] as { value: string; label: string }[], hajj: [] as string[] };
  const [y, m] = today.split('-').map(Number);
  const fmt = new Intl.DateTimeFormat('en-IN', { month: 'long', year: 'numeric' });
  const months = Array.from({ length: 15 }, (_, i) => {
    const d = new Date(y, m - 1 + i, 1);
    return { value: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`, label: fmt.format(d) };
  });
  const first = y + (m - 1 >= 5 ? 1 : 0);
  return { months, hajj: [String(first), String(first + 1)] };
}

export function EnquiryForm({
  t,
  variant = 'full',
  services = ALL,
  defaultService,
  lockService,
  readQuery,
  packages = [],
  tours = [],
  branches = [],
  source,
  after,
  initial,
  className,
}: EnquiryFormProps) {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const initialService = variant === 'contact' ? 'general' : (defaultService ?? (services.length === 1 ? services[0] : ''));
  const start = (): EnquiryValues => ({ ...emptyEnquiry(initialService), ...initial });
  const [v, setV] = useState<EnquiryValues>(start);
  const [touched, setTouched] = useState<Partial<Record<keyof EnquiryValues, true>>>({});
  const [tried, setTried] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<{ reference: string; values: EnquiryValues } | null>(null);
  const [failed, setFailed] = useState<EnquiryError | null>(null);
  const today = useSyncExternalStore(noSubscribe, readToday, serverEmpty);
  const calendar = useMemo(() => ({ today, ...buildCalendar(today) }), [today]);
  const search = useSyncExternalStore(onUrlChange, readQuery ? readSearch : serverEmpty, serverEmpty);
  const [appliedSearch, setAppliedSearch] = useState('');
  const summaryRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);
  const failedRef = useRef<HTMLDivElement>(null);
  const busyRef = useRef(false);

  // Book A Trip reads ?service=, ?interest= (a package, tour or visa country) and ?branch= from links elsewhere on the
  // site. When the query changes, the form adopts it during render (React's pattern for adjusting state to new input).
  if (search !== appliedSearch) {
    setAppliedSearch(search);
    const q = new URLSearchParams(search);
    const s = q.get('service') as EnquiryService | null;
    const interest = q.get('interest') ?? '';
    const branch = q.get('branch') ?? '';
    setV((p) => {
      const next = { ...p };
      if (s && (services as string[]).includes(s)) {
        next.service = s;
        next.interest = interest;
        const tour = s === 'tour' ? tours.find((x) => x.slug === interest) : undefined;
        if (tour) next.destination = tour.name;
        if (s === 'visa' && interest in t.visaCountries) next.visaCountry = interest;
      }
      if (branch && branches.some((b) => b.slug === branch)) next.branch = branch;
      return next;
    });
  }

  // Errors are derived from the values: shown for a field once it has been left, and for every field after a submit.
  // Until 'today' is known (right after hydration) the past-date check simply waits.
  const errors: EnquiryErrors = useMemo(() => validateEnquiry(v, today), [v, today]);
  const set = <K extends keyof EnquiryValues>(key: K, value: EnquiryValues[K]) => setV((prev) => ({ ...prev, [key]: value }));
  const touch = (key: keyof EnquiryValues) => setTouched((t0) => (t0[key] ? t0 : { ...t0, [key]: true }));
  const shown = (key: keyof EnquiryValues) => (tried || touched[key] ? errors[key] : undefined);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (busyRef.current) return; // no double submission
    setTried(true);
    if (Object.keys(errors).length) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    busyRef.current = true;
    setBusy(true);
    setFailed(null);
    let result: EnquiryResult;
    try {
      result = await submitEnquiry(toPayload(v, source));
    } catch (error) {
      // submitEnquiry should never throw. If it does, the visitor still gets a retryable message and keeps their details.
      console.error(error);
      result = { ok: false, error: 'network' };
    } finally {
      busyRef.current = false;
      setBusy(false);
    }
    if (result.ok) {
      setDone({ reference: result.reference, values: v });
      requestAnimationFrame(() => doneRef.current?.focus());
    } else {
      setFailed(result.error);
      requestAnimationFrame(() => failedRef.current?.focus());
    }
  };

  const reset = () => {
    setV(start());
    setTouched({});
    setTried(false);
    setDone(null);
    setFailed(null);
  };

  const errorText = (key: keyof EnquiryValues) => {
    const e = shown(key);
    return e ? t.err[e] : undefined;
  };
  const invalid = (key: keyof EnquiryValues) => (shown(key) ? true : undefined);
  const describe = (key: keyof EnquiryValues, help?: boolean) =>
    [shown(key) ? id(`${key}-error`) : '', help ? id(`${key}-help`) : ''].filter(Boolean).join(' ') || undefined;
  const messageLabel = variant === 'contact' ? t.messageContact : t.message;
  const fieldLabel: Partial<Record<keyof EnquiryValues, string>> = {
    service: t.service,
    name: t.name,
    phone: t.phone,
    email: t.email,
    adults: t.adults,
    destination: t.destination,
    from: t.from,
    to: t.to,
    depart: t.depart,
    returnDate: t.returnDate,
    visaCountry: t.visaCountry,
    message: messageLabel,
    consent: t.consentLabel,
  };

  if (done) {
    const s = done.values.service;
    return (
      <div className={cn('card p-6 md:p-8', className)} data-wa-zone="" role="status">
        <div className="flex items-center gap-3 text-success">
          <span className="grid size-10 place-items-center rounded-full bg-success text-white">
            <Icon name="check" />
          </span>
          <span className="font-semibold">{t.demoRef}: {done.reference}</span>
        </div>
        <h3 ref={doneRef} tabIndex={-1} className="mt-5 text-h3 outline-none">
          {t.demoTitle}
        </h3>
        <p className="mt-3">{t.demoBody}</p>
        <h4 className="mt-6 font-sans text-small font-semibold uppercase tracking-[0.12em] text-muted">{t.summary}</h4>
        <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-small">
          {s ? (
            <>
              <dt className="text-muted">{t.service}</dt>
              <dd className="font-semibold text-navy">{t.services[s]}</dd>
            </>
          ) : null}
          <dt className="text-muted">{t.name}</dt>
          <dd className="font-semibold text-navy">{done.values.name}</dd>
          <dt className="text-muted">{t.contactMethod}</dt>
          <dd className="font-semibold text-navy">{t.methods[done.values.method]}</dd>
        </dl>
        {after ? <div className="mt-7 border-t border-warm-border pt-6">{after}</div> : null}
        <button type="button" className="btn btn-outline btn-sm mt-7" onClick={reset}>
          {t.again}
        </button>
      </div>
    );
  }

  const errorList = tried ? (Object.keys(errors) as (keyof EnquiryValues)[]).filter((k) => errors[k]) : [];
  const showService = variant !== 'contact' && !lockService && services.length > 1;
  const sv = v.service;
  const pk = packages.filter((p) => p.service === sv);

  return (
    <form noValidate onSubmit={onSubmit} className={cn('card p-5 sm:p-6 md:p-8', className)} data-wa-zone="" aria-busy={busy || undefined}>
      {tried && errorList.length ? (
        <div ref={summaryRef} tabIndex={-1} className="mb-6 rounded-md border-[1.5px] border-red bg-white p-4 outline-none" aria-labelledby={id('summary')}>
          <p id={id('summary')} className="flex items-center gap-2 font-semibold text-red">
            <Icon name="alert" />
            {t.errorsTitle}
          </p>
          <ul className="mt-2 list-disc pl-6 text-small">
            {errorList.map((k) => (
              <li key={k}>
                <a href={`#${id(k)}`} className="link-inline">
                  {fieldLabel[k] ? `${fieldLabel[k]}: ` : ''}
                  {t.err[errors[k]!]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="flex flex-col gap-5">
        {showService ? (
          <Choice
            id={id('service')}
            legend={t.service}
            name={id('service-r')}
            value={sv}
            options={services.map((s) => [s, t.services[s]] as const)}
            onChange={(x) => set('service', x as EnquiryService)}
            error={errorText('service')}
            errorId={id('service-error')}
          />
        ) : null}

        {variant === 'contact' ? (
          <Field id={id('topic')} label={t.topic}>
            <select id={id('topic')} className="field-input" value={v.topic} onChange={(e) => set('topic', e.target.value)}>
              {Object.entries(t.topics).map(([k, label]) => (
                <option key={k} value={k}>
                  {label}
                </option>
              ))}
            </select>
          </Field>
        ) : null}

        <Field id={id('name')} label={t.name} error={errorText('name')}>
          <input
            id={id('name')}
            className="field-input"
            autoComplete="name"
            placeholder={t.namePh}
            value={v.name}
            onChange={(e) => set('name', e.target.value)}
            aria-invalid={invalid('name')} onBlur={() => touch('name')}
            aria-describedby={describe('name')}
          />
        </Field>

        <div className="field">
          <label className="field-label" htmlFor={id('phone')}>
            {t.phone}
          </label>
          <div className="grid grid-cols-1 gap-2 xs:grid-cols-[minmax(0,8.5rem)_minmax(0,1fr)]">
            <select aria-label={t.code} className="field-input" value={v.code} onChange={(e) => set('code', e.target.value)} autoComplete="tel-country-code">
              {CODES.map(([code, label]) => (
                <option key={code} value={code}>
                  {label}
                </option>
              ))}
            </select>
            <input
              id={id('phone')}
              className="field-input"
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              value={v.phone}
              onChange={(e) => set('phone', e.target.value)}
              aria-invalid={invalid('phone')} onBlur={() => touch('phone')}
              aria-describedby={describe('phone', true)}
            />
          </div>
          <p id={id('phone-help')} className="field-help">
            {t.phoneHelp}
          </p>
          <FieldError id={id('phone-error')} text={errorText('phone')} />
        </div>

        {variant !== 'compact' || v.method === 'email' ? (
          <Field id={id('email')} label={t.email} optional={v.method !== 'email' ? t.optional : undefined} error={errorText('email')}>
            <input
              id={id('email')}
              className="field-input"
              type="email"
              autoComplete="email"
              value={v.email}
              onChange={(e) => set('email', e.target.value)}
              aria-invalid={invalid('email')} onBlur={() => touch('email')}
              aria-describedby={describe('email')}
            />
          </Field>
        ) : null}

        {sv === 'umrah' || sv === 'hajj' || sv === 'tour' ? (
          <div className="grid gap-5 md:grid-cols-2">
            {sv === 'hajj' ? (
              <Field id={id('hajjYear')} label={t.hajjYear}>
                <select id={id('hajjYear')} className="field-input" value={v.hajjYear} onChange={(e) => set('hajjYear', e.target.value)}>
                  <option value="">{t.monthAny}</option>
                  {calendar.hajj.map((y) => (
                    <option key={y} value={y}>
                      Hajj {y}
                    </option>
                  ))}
                </select>
              </Field>
            ) : (
              <Field id={id('month')} label={t.month}>
                <select id={id('month')} className="field-input" value={v.month} onChange={(e) => set('month', e.target.value)}>
                  <option value="">{t.monthAny}</option>
                  {calendar.months.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </Field>
            )}
            <Stepper id={id('adults')} label={sv === 'hajj' ? t.travellers : t.adults} value={v.adults} min={0} max={30} t={t} onChange={(n) => set('adults', n)} error={errorText('adults')} />
          </div>
        ) : null}

        {sv === 'tour' ? (
          <div className="grid gap-5 md:grid-cols-2">
            <Choice id={id('tourType')} legend={t.tourType} name={id('tourType-r')} value={v.tourType} options={Object.entries(t.tourTypes)} onChange={(x) => set('tourType', x)} />
            <Field id={id('destination')} label={t.destination} error={errorText('destination')}>
              <input
                id={id('destination')}
                className="field-input"
                list={tours.length ? id('tour-list') : undefined}
                placeholder={t.destinationPh}
                value={v.destination}
                onChange={(e) => set('destination', e.target.value)}
                aria-invalid={invalid('destination')} onBlur={() => touch('destination')}
                aria-describedby={describe('destination')}
              />
              {tours.length ? (
                <datalist id={id('tour-list')}>
                  {tours.map((x) => (
                    <option key={x.slug} value={x.name} />
                  ))}
                </datalist>
              ) : null}
            </Field>
          </div>
        ) : null}

        {(sv === 'umrah' || sv === 'hajj') && variant !== 'compact' ? (
          <div className="grid gap-5 md:grid-cols-2">
            {sv === 'umrah' ? (
              <Field id={id('airport')} label={t.airport} optional={t.optional}>
                <select id={id('airport')} className="field-input" value={v.airport} onChange={(e) => set('airport', e.target.value)}>
                  <option value="">{t.monthAny}</option>
                  {Object.entries(t.airports).map(([k, label]) => (
                    <option key={k} value={k}>
                      {label}
                    </option>
                  ))}
                </select>
              </Field>
            ) : (
              <Choice
                id={id('hajjApplied')}
                legend={t.hajjApplied}
                name={id('hajjApplied-r')}
                value={v.hajjApplied}
                options={Object.entries(t.yesNo)}
                onChange={(x) => set('hajjApplied', x)}
              />
            )}
            {pk.length ? (
              <Field id={id('interest')} label={t.package} optional={t.optional}>
                <select id={id('interest')} className="field-input" value={v.interest} onChange={(e) => set('interest', e.target.value)}>
                  <option value="">{t.packageAny}</option>
                  {pk.map((p) => (
                    <option key={p.slug} value={p.slug}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </Field>
            ) : null}
          </div>
        ) : null}

        {sv === 'flight' ? (
          <>
            <Choice id={id('tripType')} legend={t.tripType} name={id('tripType-r')} value={v.tripType} options={Object.entries(t.tripTypes)} onChange={(x) => set('tripType', x as EnquiryValues['tripType'])} />
            <div className="grid gap-5 md:grid-cols-2">
              <Field id={id('from')} label={t.from} error={errorText('from')}>
                <input id={id('from')} className="field-input" placeholder={t.fromPh} value={v.from} onChange={(e) => set('from', e.target.value)} aria-invalid={invalid('from')} onBlur={() => touch('from')} aria-describedby={describe('from')} />
              </Field>
              <Field id={id('to')} label={t.to} error={errorText('to')}>
                <input id={id('to')} className="field-input" placeholder={t.toPh} value={v.to} onChange={(e) => set('to', e.target.value)} aria-invalid={invalid('to')} onBlur={() => touch('to')} aria-describedby={describe('to')} />
              </Field>
              <Field id={id('depart')} label={t.depart} error={errorText('depart')}>
                <input id={id('depart')} className="field-input" type="date" min={calendar.today || undefined} value={v.depart} onChange={(e) => set('depart', e.target.value)} aria-invalid={invalid('depart')} onBlur={() => touch('depart')} aria-describedby={describe('depart')} />
              </Field>
              {v.tripType === 'return' ? (
                <Field id={id('returnDate')} label={t.returnDate} error={errorText('returnDate')}>
                  <input id={id('returnDate')} className="field-input" type="date" min={v.depart || calendar.today || undefined} value={v.returnDate} onChange={(e) => set('returnDate', e.target.value)} aria-invalid={invalid('returnDate')} onBlur={() => touch('returnDate')} aria-describedby={describe('returnDate')} />
                </Field>
              ) : null}
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              <Stepper id={id('adults')} label={t.adults} value={v.adults} min={0} max={9} t={t} onChange={(n) => set('adults', n)} error={errorText('adults')} />
              <Stepper id={id('children')} label={t.children} value={v.children} min={0} max={9} t={t} onChange={(n) => set('children', n)} />
              <Stepper id={id('infants')} label={t.infants} value={v.infants} min={0} max={4} t={t} onChange={(n) => set('infants', n)} />
            </div>
            <Field id={id('cabin')} label={t.cabin}>
              <select id={id('cabin')} className="field-input" value={v.cabin} onChange={(e) => set('cabin', e.target.value)}>
                {Object.entries(t.cabins).map(([k, label]) => (
                  <option key={k} value={k}>
                    {label}
                  </option>
                ))}
              </select>
            </Field>
          </>
        ) : null}

        {sv === 'visa' ? (
          <div className="grid gap-5 md:grid-cols-2">
            <Field id={id('visaCountry')} label={t.visaCountry} error={errorText('visaCountry')}>
              <select id={id('visaCountry')} className="field-input" value={v.visaCountry} onChange={(e) => set('visaCountry', e.target.value)} aria-invalid={invalid('visaCountry')} onBlur={() => touch('visaCountry')} aria-describedby={describe('visaCountry')}>
                <option value="">—</option>
                {Object.entries(t.visaCountries).map(([k, label]) => (
                  <option key={k} value={k}>
                    {label}
                  </option>
                ))}
              </select>
            </Field>
            <Field id={id('visaType')} label={t.visaType}>
              <select id={id('visaType')} className="field-input" value={v.visaType} onChange={(e) => set('visaType', e.target.value)}>
                {Object.entries(t.visaTypes).map(([k, label]) => (
                  <option key={k} value={k}>
                    {label}
                  </option>
                ))}
              </select>
            </Field>
            <Stepper id={id('applicants')} label={t.applicants} value={v.applicants} min={1} max={20} t={t} onChange={(n) => set('applicants', n)} />
            <Field id={id('month')} label={t.month}>
              <select id={id('month')} className="field-input" value={v.month} onChange={(e) => set('month', e.target.value)}>
                <option value="">{t.monthAny}</option>
                {calendar.months.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        ) : null}

        <Choice
          id={id('method')}
          legend={t.contactMethod}
          name={id('method-r')}
          value={v.method}
          options={Object.entries(t.methods)}
          onChange={(x) => set('method', x as EnquiryValues['method'])}
        />

        {variant !== 'compact' && branches.length ? (
          <Field id={id('branch')} label={t.branch} optional={t.optional}>
            <select id={id('branch')} className="field-input" value={v.branch} onChange={(e) => set('branch', e.target.value)}>
              <option value="">{t.branchAny}</option>
              {branches.map((b) => (
                <option key={b.slug} value={b.slug}>
                  {b.name}
                </option>
              ))}
            </select>
          </Field>
        ) : null}

        {variant !== 'compact' ? (
          <Field id={id('message')} label={messageLabel} optional={variant === 'contact' ? undefined : t.optional} error={errorText('message')}>
            <textarea
              id={id('message')}
              className="field-input"
              placeholder={variant === 'contact' ? t.messageContactPh : t.messagePh}
              value={v.message}
              maxLength={1500}
              onChange={(e) => set('message', e.target.value)}
              aria-invalid={invalid('message')} onBlur={() => touch('message')}
              aria-describedby={describe('message')}
            />
          </Field>
        ) : null}

        <div>
          <label className="check" htmlFor={id('consent')}>
            <input
              id={id('consent')}
              type="checkbox"
              checked={v.consent}
              onChange={(e) => set('consent', e.target.checked)}
              aria-invalid={invalid('consent')}
              aria-describedby={describe('consent')}
            />
            <span>
              {t.consentStart}{' '}
              <Link href="/privacy" className="link-inline font-semibold">
                {t.privacy}
              </Link>
              .
            </span>
          </label>
          <FieldError id={id('consent-error')} text={errorText('consent')} className="mt-2" />
        </div>

        {failed ? (
          <div ref={failedRef} tabIndex={-1} className="rounded-md border-[1.5px] border-red bg-white p-4 outline-none" aria-labelledby={id('failed')}>
            <p id={id('failed')} className="flex items-center gap-2 font-semibold text-red">
              <Icon name="alert" />
              {t.failTitle}
            </p>
            <p className="mt-2 text-small">
              {t.fail[failed]} {t.failKept}
            </p>
          </div>
        ) : null}

        <button type="submit" className="btn btn-primary w-full" aria-busy={busy || undefined}>
          {busy ? (
            <>
              <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
              {t.sending}
            </>
          ) : (
            t.submit
          )}
        </button>
        <p className="text-center text-small text-muted">{t.notice}</p>
      </div>
    </form>
  );
}

function FieldError({ id, text, className }: { id: string; text?: string; className?: string }) {
  if (!text) return null;
  return (
    <p id={id} className={cn('field-error', className)}>
      <Icon name="alert" />
      {text}
    </p>
  );
}

function Field({ id, label, optional, error, children }: { id: string; label: string; optional?: string; error?: string; children: ReactNode }) {
  return (
    <div className="field">
      <label className="field-label" htmlFor={id}>
        {label} {optional ? <span className="opt">{optional}</span> : null}
      </label>
      {children}
      <FieldError id={`${id}-error`} text={error} />
    </div>
  );
}

function Choice({
  id,
  legend,
  name,
  value,
  options,
  onChange,
  error,
  errorId,
}: {
  id: string;
  legend: string;
  name: string;
  value: string;
  options: readonly (readonly [string, string])[];
  onChange: (value: string) => void;
  error?: string;
  errorId?: string;
}) {
  return (
    <fieldset className="field" aria-describedby={error ? errorId : undefined}>
      <legend className="field-label mb-1.5">{legend}</legend>
      <div className="seg">
        {options.map(([k, label], i) => (
          <label key={k}>
            <input id={i === 0 ? id : undefined} type="radio" name={name} value={k} checked={value === k} onChange={() => onChange(k)} />
            <span>{label}</span>
          </label>
        ))}
      </div>
      {error && errorId ? <FieldError id={errorId} text={error} /> : null}
    </fieldset>
  );
}

function Stepper({
  id,
  label,
  value,
  min,
  max,
  onChange,
  error,
  t,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
  error?: string;
  t: FormDictionary;
}) {
  const clamp = (n: number) => Math.min(max, Math.max(min, Number.isFinite(n) ? n : min));
  return (
    <div className="field">
      <label className="field-label" htmlFor={id}>
        {label}
      </label>
      <div className="flex h-[52px] items-center justify-between rounded-sm border border-field bg-white px-1">
        <button type="button" className="grid size-11 cursor-pointer place-items-center rounded-full text-navy hover:bg-warm-grey" aria-label={`${t.less}: ${label}`} onClick={() => onChange(clamp(value - 1))}>
          <Icon name="minus" />
        </button>
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(clamp(parseInt(e.target.value, 10)))}
          className="w-14 bg-transparent text-center text-[1.0625rem] font-semibold text-navy [appearance:textfield] focus-visible:outline-2 [&::-webkit-inner-spin-button]:appearance-none"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <button type="button" className="grid size-11 cursor-pointer place-items-center rounded-full text-navy hover:bg-warm-grey" aria-label={`${t.more}: ${label}`} onClick={() => onChange(clamp(value + 1))}>
          <Icon name="plus" />
        </button>
      </div>
      <FieldError id={`${id}-error`} text={error} />
    </div>
  );
}
