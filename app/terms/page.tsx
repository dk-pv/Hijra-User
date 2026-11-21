import { demo } from '@/data/demo';
import Link from 'next/link';
import type { Metadata } from 'next';
import { routes } from '@/data/navigation';
import { site } from '@/data/site';
import { pageMetadata } from '@/lib/seo';
import { dictionary } from '@/lib/dictionary';
import { Pending } from '@/components/ui/pending';
import { LegalPage, type LegalSection } from '@/components/booking/legal-page';

// DRAFT terms of use for an enquiry-only travel website operated in India. Every fact HIJRA has not supplied is a
// <Pending> placeholder. HIJRA's legal adviser must review this text before it is adopted.

export function generateMetadata(): Metadata {
  return pageMetadata({
    path: routes.terms,
    title: 'Terms of use (draft)',
    description:
      'Draft terms of use for the HIJRA Travels website: an enquiry-only site with no online booking or payment, sample content in this preview, and supplier terms.',
    noindex: true,
  });
}

const sections: LegalSection[] = [
  {
    id: 'about',
    title: 'About these terms',
    body: (
      <>
        <p>
          These terms apply to your use of this website, which is operated by {site.demo ? demo.legal.entity : <Pending>Legal entity name</Pending>}, trading as{' '}
          {site.fullName} (“HIJRA”, “we”, “us”), whose registered office is at {site.demo ? demo.legal.office : <Pending>Registered office address</Pending>}. By using
          the website you accept these terms. If you do not agree with them, please do not use it.
        </p>
        <p>
          These terms cover the website only. If you book with HIJRA, the booking is governed by HIJRA’s booking conditions, including
          its cancellation and refund policy, which your advisor gives you in writing before you confirm anything.
        </p>
      </>
    ),
  },
  {
    id: 'enquiry-only',
    title: 'An enquiry-only website',
    body: (
      <>
        <p>
          <strong>This website is for enquiries only.</strong> You cannot book, reserve or pay for anything on it.
        </p>
        <ul>
          <li>Sending an enquiry does not create a booking, hold a seat or a room, or form a contract. It asks an advisor to contact you.</li>
          <li>
            A booking exists only when you have agreed the details with HIJRA directly and HIJRA has confirmed it to you in writing.
            Payment is arranged directly with HIJRA, never through this website.
          </li>
          <li>This website never asks for card details, UPI PINs or one-time passwords.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'sample-content',
    title: 'Sample content in this preview',
    body: (
      <>
        <p>
          This version of the website is a design preview. Packages, departure months, branch records, testimonials, stories and
          contact details are samples that show the layout. They are marked as samples, they are not offers, and they will be replaced
          with HIJRA’s verified information before launch.
        </p>
        <p>
          The photographs are licensed stand-ins listed on the <Link href={routes.imageCredits}>Image credits</Link> page.
          They do not show HIJRA’s customers. The forms in this preview send nothing; see the{' '}
          <Link href={routes.privacy}>Privacy policy</Link>.
        </p>
      </>
    ),
  },
  {
    id: 'prices',
    title: 'Prices, availability and itineraries',
    body: (
      <>
        <p>
          The website does not show fares or live availability. Prices are given on enquiry, and a price is valid only as stated in a
          written quotation from HIJRA.
        </p>
        <p>
          Flights, rooms and services are confirmed only when they are booked. Itineraries, timings, hotels and transport can change
          because of airline schedules, supplier changes, decisions of the authorities, weather or other events outside HIJRA’s
          control. Your advisor will tell you about significant changes.
        </p>
      </>
    ),
  },
  {
    id: 'suppliers',
    title: 'Airlines, hotels and other suppliers',
    body: (
      <>
        <p>
          HIJRA arranges services that other companies provide, such as airlines, hotels, transport operators and insurers. Each
          supplier provides its service under its own conditions, for example an airline’s conditions of carriage, which may limit its
          responsibility. Your advisor will tell you which conditions apply to your arrangements.
        </p>
        <p>Who is responsible for each part of a trip is set out in the booking conditions you receive before you confirm.</p>
      </>
    ),
  },
  {
    id: 'visas',
    title: 'Visas, Hajj and Umrah',
    body: (
      <>
        <p>
          Visas and pilgrimage permits are granted or refused by the issuing authorities, not by HIJRA. HIJRA can help you prepare a
          complete application, but cannot guarantee approval, processing times or entry to a country.
        </p>
        <p>
          Requirements for passports, photographs, vaccinations and other documents change. Check them with HIJRA and the official
          sources at the time you apply. You are responsible for holding a valid passport and the documents your journey requires.
        </p>
        <p>
          Indian pilgrims travel for Hajj either through the Haj Committee of India or through a registered Haj Group Organiser (HGO).
          Seats depend on the quota allotted to India each year and on the rules announced for that season.
        </p>
        <p>
          Religious information on this website describes practice. It is not a religious ruling: for rulings, follow the scholars you
          trust.
        </p>
      </>
    ),
  },
  {
    id: 'accuracy',
    title: 'Accuracy of information',
    body: (
      <p>
        We work to keep this website accurate, but travel rules, schedules, prices and requirements change, sometimes at short notice.
        Information on the website is general guidance, not advice for your situation, and your advisor confirms the details before
        you book. If you notice something wrong, please tell us.
      </p>
    ),
  },
  {
    id: 'using-the-website',
    title: 'Using this website',
    body: (
      <>
        <p>Please use the website lawfully. Do not:</p>
        <ul>
          <li>send false enquiries, or enquire in someone else’s name without their permission;</li>
          <li>try to disrupt the website or gain access to parts of it that are not public;</li>
          <li>copy content from it in bulk, or collect data from it by automated means.</li>
        </ul>
        <p>If you include details of other people in an enquiry, such as family members travelling with you, make sure they agree.</p>
      </>
    ),
  },
  {
    id: 'content',
    title: 'Content and trademarks',
    body: (
      <p>
        The HIJRA name and logo, and the text and design of this website, belong to HIJRA or are used with permission. Photographs,
        fonts and map data are used under the licences listed on the <Link href={routes.imageCredits}>Image credits</Link>{' '}
        page. You may view and print pages for your own use; any other use needs our written permission.
      </p>
    ),
  },
  {
    id: 'links',
    title: 'Links to other websites',
    body: (
      <p>
        Links to other websites, such as official visa or Hajj portals, are given for convenience. HIJRA does not control those
        websites and is not responsible for their content or availability.
      </p>
    ),
  },
  {
    id: 'liability',
    title: 'Liability',
    body: (
      <>
        <p>
          The website is provided for information and enquiries. As far as the law allows, HIJRA is not liable for loss that arises
          from using the website, from relying on sample content in this preview, from the website being unavailable, or from decisions
          of authorities and suppliers outside HIJRA’s control.
        </p>
        <p>
          Nothing in these terms excludes or limits any liability that cannot be excluded or limited under Indian law, or affects your
          rights as a consumer under the Consumer Protection Act, 2019.
        </p>
      </>
    ),
  },
  {
    id: 'privacy',
    title: 'Privacy',
    body: (
      <p>
        How HIJRA collects and uses personal data is explained in the <Link href={routes.privacy}>Privacy policy</Link>.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to these terms',
    body: <p>We may update these terms. The version on this page applies from the date shown at the top.</p>,
  },
  {
    id: 'governing-law',
    title: 'Governing law',
    body: (
      <p>
        These terms are governed by the laws of India. Disputes are subject to the jurisdiction of the courts at{' '}
        {site.demo ? demo.legal.jurisdiction : <Pending>City for jurisdiction</Pending>}, without affecting any right you have to approach a consumer commission or another
        forum under Indian law.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact',
    body: (
      <p>
        For questions about these terms, write to {site.demo ? site.contact.email : <Pending>Contact for legal questions</Pending>}, or use the{' '}
        <Link href={routes.contact}>Contact page</Link>.
      </p>
    ),
  },
];

export default function TermsPage() {
  const t = dictionary;
  return (
    <LegalPage
      crumb={t.footer.terms}
      title="Terms of use"
      lead="The terms that apply when you use the HIJRA Travels website. It is a website for enquiries: nothing is booked or paid online."
      sections={sections}
    />
  );
}
