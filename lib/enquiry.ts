import { normalisePhone, type EnquiryValues } from '@/components/forms/validate';

// THE INTEGRATION BOUNDARY FOR ENQUIRIES (see docs/milestone-2-handover.md).
// Milestone 1 (this preview) runs in DEMO MODE: nothing leaves the browser, nothing is stored, and the visitor is
// told plainly that HIJRA has not received anything. Milestone 2 replaces only `submitEnquiry` with a call to the
// enquiry API (for example a Route Handler at app/api/enquiries/route.ts or a Server Action) that validates again on
// the server, stores the lead, routes it to the chosen branch and notifies an advisor.
// EnquiryPayload and EnquiryResult below are the contract between the two.

/** Version of the privacy notice the visitor agreed to; bump it when the notice changes. */
export const PRIVACY_NOTICE_VERSION = 'draft-2026-11';

export type EnquiryPayload = {
  service: Exclude<EnquiryValues['service'], ''>;
  name: string;
  phone: string; // E.164: +91 followed by the 10-digit number
  email: string | null;
  preferredContact: EnquiryValues['method'];
  details: Record<string, string | number>;
  branch: string | null;
  message: string | null;
  /** DPDP Act 2023: HIJRA must be able to show when and to which notice consent was given (the server records its own time too). */
  consent: { given: true; at: string; notice: string };
  source: string; // the page the enquiry came from
};

/** Why a submission failed. The form shows a matching message, keeps every value and lets the visitor try again.
 * invalid: the server rejected the details; rate_limited: too many enquiries from this connection; unavailable: the
 * service is down or failed; network: the request never completed (offline, timeout). */
export type EnquiryError = 'invalid' | 'rate_limited' | 'unavailable' | 'network';
export const enquiryErrors: readonly EnquiryError[] = ['invalid', 'rate_limited', 'unavailable', 'network'];

/** submitEnquiry never throws: every outcome is one of these. `reference` is shown to the visitor. */
export type EnquiryResult = { ok: true; mode: 'demo' | 'live'; reference: string } | { ok: false; error: EnquiryError };

const pick = (v: EnquiryValues): Record<string, string | number> => {
  switch (v.service) {
    case 'umrah':
      return { month: v.month, adults: v.adults, children: v.children, infants: v.infants, airport: v.airport, interest: v.interest };
    case 'hajj':
      return { season: v.hajjYear, appliedViaHajCommittee: v.hajjApplied, adults: v.adults, interest: v.interest };
    case 'tour':
      return { tourType: v.tourType, destination: v.destination.trim(), month: v.month, adults: v.adults, children: v.children, interest: v.interest };
    case 'flight':
      return {
        tripType: v.tripType,
        from: v.from.trim(),
        to: v.to.trim(),
        depart: v.depart,
        ...(v.tripType === 'return' ? { return: v.returnDate } : {}),
        adults: v.adults,
        children: v.children,
        infants: v.infants,
        cabin: v.cabin,
      };
    case 'visa':
      return { country: v.visaCountry, visaType: v.visaType, applicants: v.applicants, month: v.month };
    case 'general':
      return { topic: v.topic };
    default:
      return {};
  }
};

/** Build the payload from validated form values (drops empty details). */
export function toPayload(v: EnquiryValues, source: string): EnquiryPayload {
  const details = Object.fromEntries(Object.entries(pick(v)).filter(([, x]) => x !== '' && x !== undefined));
  return {
    service: v.service as EnquiryPayload['service'],
    name: v.name.trim().replace(/\s+/g, ' '),
    phone: `${v.code}${normalisePhone(v.code, v.phone)}`,
    email: v.email.trim() || null,
    preferredContact: v.method,
    details,
    branch: v.branch || null,
    message: v.message.trim() || null,
    consent: { given: true, at: new Date().toISOString(), notice: PRIVACY_NOTICE_VERSION },
    source,
  };
}

/**
 * Milestone 1: demo submission. It does not send, log or store the payload anywhere.
 * For review and QA, ?demo-enquiry=network (or invalid, unavailable, rate_limited) in the page address previews how
 * the form handles a failed submission. This goes when Milestone 2 replaces the function.
 */
export async function submitEnquiry(payload: EnquiryPayload): Promise<EnquiryResult> {
  void payload;
  await new Promise((resolve) => setTimeout(resolve, 650));
  const preview = new URLSearchParams(window.location.search).get('demo-enquiry');
  const failure = enquiryErrors.find((e) => e === preview);
  if (failure) return { ok: false, error: failure };
  return { ok: true, mode: 'demo', reference: `DEMO-${Date.now().toString(36).slice(-5).toUpperCase()}` };
}
