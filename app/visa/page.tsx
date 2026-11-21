import Link from 'next/link';
import type { Metadata } from 'next';
import { enquiryPath, routes } from '@/data/navigation';
import { faqs } from '@/data/faqs';
import type { ImageKey } from '@/data/images';
import { visaCountries } from '@/data/visas';
import { dictionary } from '@/lib/dictionary';
import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ContactAction } from '@/components/ui/contact-action';
import { CtaBand } from '@/components/ui/cta-band';
import { FaqGroups } from '@/components/ui/faq';
import { Icon } from '@/components/ui/icons';
import { Note, SampleTag } from '@/components/ui/pending';
import { Photo } from '@/components/ui/photo';
import { SectionIntro } from '@/components/ui/section';
import { EnquirySection } from '@/components/travel/enquiry-section';
import { Steps } from '@/components/travel/steps';

// Visa assistance (report 8.2 "Flight, Visa"; audit 2.6): every country row has an action, nothing promises rates,
// processing times or approval, and the limits are stated plainly before the form.

const PHOTO: ImageKey = 'jeddah-al-rahmah-mosque';

export function generateMetadata(): Metadata {
  return pageMetadata({
    path: routes.visa,
    title: 'Visa assistance for Umrah, the Gulf and holidays',
    description:
      'Visa help from HIJRA Travels for Saudi Arabia, the UAE, Qatar, Oman, Malaysia and Türkiye: documents checked before you apply, requirements always verified.',
    image: PHOTO,
  });
}

const documentSteps = [
  { title: 'Check your passport', text: 'Valid for at least six months beyond your return, with blank pages and in good condition. Renew early if it is close to expiry.' },
  { title: 'Prepare your photographs', text: 'Recent colour photographs on a plain background. Each country sets its own size and rules, and we tell you the exact specification.' },
  { title: 'Gather the supporting papers', text: 'Depending on the visa: bank statements, salary slips or tax returns, a leave letter or business registration, and your host’s documents for a family visit.' },
  { title: 'Keep your travel plans to hand', text: 'Flight reservations and hotel bookings, or your host’s address, as the country asks.' },
  { title: 'Match every name exactly', text: 'Your name must read the same on the passport, the tickets and every form. Small differences in spelling are a common cause of delay.' },
];

const limits = [
  {
    title: 'Requirements change.',
    text: 'Visa rules, documents and fees are set by each country and can change without notice. Everything on this page is a sample guide: HIJRA checks the current requirements with official sources when you apply.',
  },
  {
    title: 'No visa is guaranteed.',
    text: 'Every visa is decided by the issuing authority. HIJRA prepares a complete and accurate application, but no agent can promise an approval or a decision date.',
  },
  {
    title: 'What we do promise.',
    text: 'We check your documents before anything is submitted, explain every fee in writing before you pay, and tell you honestly if something could cause a problem.',
  },
];

export default function VisaPage() {
  const t = dictionary;
  const caption = 'text-caption font-semibold uppercase tracking-[0.12em] text-muted';

  return (
    <>
      {/* 01 Intro */}
      <section className="pt-nav">
        <div className="wrap pt-6 lg:pt-10">
          <Breadcrumbs items={[{ label: 'Visa assistance' }]} />
          <div className="site-grid mt-8 items-center gap-y-12 lg:mt-12">
            <div className="col-span-full lg:col-span-6">
              <p className="eyebrow rise">Visa assistance</p>
              <h1 className="rise rise-2 mt-5 text-display">Visas, one document at a time.</h1>
              <p className="rise rise-3 mt-6 max-w-[36rem] text-lead">
                Umrah visas, family visit and tourist visas for the Gulf, and visas for holidays abroad. HIJRA checks your documents, prepares the application and tells you honestly what to expect.
              </p>
              <div className="rise rise-4 mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href="#enquiry" className="btn btn-primary">
                  Ask about a visa
                </a>
                <ContactAction kind="whatsapp" className="btn btn-outline" message="Hello HIJRA, I need help with a visa.">
                  <Icon name="whatsapp" className="wa-mark" />
                  {t.common.whatsappUs}
                </ContactAction>
              </div>
              <p className="mt-5 max-w-[34rem] text-small text-muted">Requirements change, so they are confirmed with official sources at the time you apply.</p>
            </div>
            <figure className="relative col-span-full lg:col-span-5 lg:col-start-8 lg:mb-8">
              <Photo
                image={PHOTO}
                priority
                sizes="(min-width: 1200px) 38vw, 94vw"
                className="aspect-[4/3] rounded-[18px] md:aspect-[16/10] md:rounded-lg lg:aspect-[4/5]"
              />
              <figcaption className="mt-4 max-w-[24rem] lg:absolute lg:-bottom-8 lg:-left-10 lg:mt-0 lg:rounded-md lg:bg-white lg:px-6 lg:py-5">
                <span className="eyebrow block">Saudi Arabia first</span>
                <span className="mt-2 block font-semibold text-navy">Umrah and family visit visas, then the Gulf, Malaysia, Türkiye and other countries on request.</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 02 Countries: a ledger, every row with an action */}
      <section className="py-section" aria-labelledby="countries-h">
        <div className="wrap">
          <SectionIntro
            eyebrow="Destinations"
            title={<span id="countries-h">Visa help by country</span>}
            lead="What each application usually involves. Your advisor confirms the current visa types and documents when you apply."
            className="mb-10 md:mb-12"
          >
            <SampleTag className="mt-5">Sample information · verify when you apply</SampleTag>
          </SectionIntro>
          <div aria-hidden="true" className={`hidden grid-cols-12 gap-gutter pb-3 lg:grid ${caption}`}>
            <span className="col-span-3">Country</span>
            <span className="col-span-2">Visa types</span>
            <span className="col-span-5">Typical documents</span>
          </div>
          <ul role="list" className="border-b border-warm-border">
            {visaCountries.map((v) => (
              <li key={v.key} className="grid gap-x-(--g) gap-y-5 border-t border-warm-border py-7 min-[600px]:grid-cols-8 lg:grid-cols-12 lg:py-8">
                <div className="min-[600px]:col-span-8 lg:col-span-3">
                  <h3 className="text-h3">{v.country}</h3>
                  <p className="mt-1.5 max-w-[24rem] text-small text-muted">{v.context}</p>
                </div>
                <div className="min-[600px]:col-span-3 lg:col-span-2">
                  <p className={`${caption} lg:sr-only`}>Visa types</p>
                  <ul className="mt-2 flex flex-wrap gap-1.5 lg:mt-0">
                    {v.types.map((x) => (
                      <li key={x} className="rounded-full border border-warm-border bg-white px-3 py-1 text-small font-semibold text-navy">
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="min-[600px]:col-span-5 lg:col-span-5">
                  <p className={`${caption} lg:sr-only`}>Typical documents</p>
                  <ul className="mt-2 space-y-1.5 text-small lg:mt-0">
                    {v.documents.map((d) => (
                      <li key={d} className="flex gap-2.5">
                        <span aria-hidden="true" className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-red" />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 flex gap-2 text-small text-muted">
                    <Icon name="clock" size={18} className="mt-0.5 shrink-0" />
                    Processing time varies; HIJRA confirms it when you apply.
                  </p>
                </div>
                <div className="min-[600px]:col-span-8 lg:col-span-2 lg:flex lg:justify-end">
                  <Link href={enquiryPath('visa', v.key)} className="link-arrow">
                    Enquire<span className="sr-only"> about a visa for {v.country}</span>
                  </Link>
                </div>
              </li>
            ))}
            <li className="grid gap-x-(--g) gap-y-3 border-t border-warm-border py-7 min-[600px]:grid-cols-8 lg:grid-cols-12 lg:items-center lg:py-8">
              <h3 className="text-h3 min-[600px]:col-span-8 lg:col-span-3">Another country?</h3>
              <p className="max-w-[38rem] min-[600px]:col-span-8 lg:col-span-7">
                Tell us where you are going and why. An advisor explains what the application involves before you prepare anything.
              </p>
              <div className="min-[600px]:col-span-8 lg:col-span-2 lg:flex lg:justify-end">
                <Link href={enquiryPath('visa', 'other')} className="link-arrow">
                  Enquire<span className="sr-only"> about a visa for another country</span>
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* 03 Preparing documents */}
      <section className="bg-warm-grey py-section" aria-labelledby="documents-h">
        <div className="wrap site-grid gap-y-12">
          <div className="col-span-full lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <p className="eyebrow">Before you apply</p>
              <h2 id="documents-h" className="mt-3 text-h2">
                Get your documents ready.
              </h2>
              <p className="mt-4 max-w-[34rem] text-lead">Most delays come from small things. A little preparation avoids them.</p>
            </div>
          </div>
          <div className="col-span-full lg:col-span-7 lg:col-start-6">
            <Steps items={documentSteps} label="Preparing your visa documents" />
            <Note className="mt-10 max-w-[40rem]">
              Children travelling with one parent may need the other parent’s consent, and some visas ask for vaccination records, such as the meningococcal vaccine for Umrah. Your advisor tells you what applies.
            </Note>
          </div>
        </div>
      </section>

      {/* 04 The limits, stated plainly */}
      <section className="on-dark bg-deep py-section" aria-labelledby="promise-h">
        <div className="wrap">
          <div className="max-w-[46rem]">
            <span className="rule-double mb-5" aria-hidden="true" />
            <p className="eyebrow">Please read before you apply</p>
            <h2 id="promise-h" className="mt-3 text-h2">
              What we can, and cannot, promise.
            </h2>
          </div>
          <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-gutter lg:mt-16 lg:grid-cols-3">
            {limits.map((l) => (
              <div key={l.title} className="border-t border-white/20 pt-6">
                <h3 className="text-h3">{l.title}</h3>
                <p className="mt-3 max-w-[34rem]">{l.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05 Questions */}
      <section className="py-section" aria-labelledby="faq-h">
        <div className="wrap site-grid gap-y-10">
          <div className="col-span-full lg:col-span-4">
            <p className="eyebrow">Questions</p>
            <h2 id="faq-h" className="mt-3 text-h2">
              Visa questions, answered.
            </h2>
            <ContactAction kind="whatsapp" className="btn btn-outline mt-7" message="Hello HIJRA, I have a question about a visa.">
              <Icon name="whatsapp" className="wa-mark" />
              Ask on WhatsApp
            </ContactAction>
          </div>
          <FaqGroups
            className="col-span-full lg:col-span-7 lg:col-start-6"
            groups={[
              { label: 'Visas', items: faqs.visa },
              { label: 'Documents', items: faqs.documents },
            ]}
          />
        </div>
      </section>

      {/* 06 Enquiry */}
      <EnquirySection
        className="bg-warm-grey"
        eyebrow="Ask about a visa"
        title="Tell us where you are going."
        lead="Choose the country, the visa type and how many are applying. An advisor replies with the current requirements and the next steps."
        service="visa"
        source="visa"
        message="Hello HIJRA, I need help with a visa."
      />

      {/* 07 Closing band */}
      <CtaBand
        eyebrow="Plan the whole trip"
        title="Visa sorted? Let us plan the journey."
        body="Flights, hotels and tours can be arranged by the same advisor who handles your visa."
        cta="Plan the whole trip"
      />
    </>
  );
}
