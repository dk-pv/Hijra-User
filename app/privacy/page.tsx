import { demo } from '@/data/demo';
import Link from 'next/link';
import type { Metadata } from 'next';
import { routes } from '@/data/navigation';
import { site } from '@/data/site';
import { pageMetadata } from '@/lib/seo';
import { dictionary } from '@/lib/dictionary';
import { Pending } from '@/components/ui/pending';
import { LegalPage, type LegalSection } from '@/components/booking/legal-page';

// DRAFT privacy notice for an enquiry-only travel website operated in India, written with the Digital Personal Data
// Protection Act, 2023 (DPDP Act) in mind. Every fact HIJRA has not supplied is a <Pending> placeholder. It must be
// reviewed by HIJRA's legal adviser, and checked against the DPDP Rules in force, before it is adopted.

export function generateMetadata(): Metadata {
  return pageMetadata({
    path: routes.privacy,
    title: 'Privacy policy (draft)',
    description:
      'Draft privacy notice for the HIJRA Travels website: what the enquiry forms collect, why, how long it is kept, who sees it, and your rights under the DPDP Act.',
    noindex: true,
  });
}

const entity = (
  <>
    {site.demo ? demo.legal.entity : <Pending>Legal entity name</Pending>}, trading as {site.fullName}
  </>
);

const sections: LegalSection[] = [
  {
    id: 'who-we-are',
    title: 'Who we are',
    body: (
      <>
        <p>
          This website is operated by {entity} (“HIJRA”, “we”, “us”), whose registered office is at {site.demo ? demo.legal.office : <Pending>Registered office address</Pending>}.
        </p>
        <p>
          Under India’s Digital Personal Data Protection Act, 2023 (the “DPDP Act”), HIJRA is the <strong>Data Fiduciary</strong> for the
          personal data described here: we decide why and how it is used. You, the person the data is about, are the{' '}
          <strong>Data Principal</strong>.
        </p>
        <p>
          This policy is also the privacy notice that our enquiry forms refer to. It covers the personal data you give us through this
          website, and our replies to you by WhatsApp, phone call or email about that enquiry.
        </p>
      </>
    ),
  },
  {
    id: 'this-preview',
    title: 'About this preview',
    body: (
      <>
        <p>
          This website is currently a design preview. <strong>Its forms do not send, store or share anything.</strong> When you press
          Send, the details are checked in your browser and then discarded when you leave or reload the page. No information reaches
          HIJRA, and the reference number shown after a demo enquiry is for display only.
        </p>
        <p>The rest of this policy describes how HIJRA will handle personal data once the forms are connected.</p>
      </>
    ),
  },
  {
    id: 'what-we-collect',
    title: 'The personal data we collect',
    body: (
      <>
        <p>Every enquiry form asks for:</p>
        <ul>
          <li>your name;</li>
          <li>your mobile number and its country code;</li>
          <li>your email address (optional, unless you ask us to reply by email);</li>
          <li>how you would like us to reply: WhatsApp, a phone call or email;</li>
          <li>your agreement to this notice, which we record with the time you gave it.</li>
        </ul>
        <p>Depending on what you are planning, a form may also ask for:</p>
        <ul>
          <li>
            <strong>Umrah:</strong> your preferred month, the number of adults, children and infants travelling, your departure
            airport and a package you are interested in;
          </li>
          <li>
            <strong>Hajj:</strong> the Hajj season, the number of travellers, whether you have applied through the Haj Committee of
            India, and a package you are interested in;
          </li>
          <li>
            <strong>Tours:</strong> whether the tour is abroad or within India, the destination, your preferred month and the number
            of travellers;
          </li>
          <li>
            <strong>Flight tickets:</strong> the route, travel dates, number of travellers and cabin;
          </li>
          <li>
            <strong>Visas:</strong> the country, the type of visa, the number of applicants and your preferred month;
          </li>
          <li>the branch nearest to you, the topic of a general message, and anything you choose to write in the message box.</li>
        </ul>
        <p>
          Please do not write passport numbers, health information or other sensitive details in the message box. If HIJRA needs such
          details later, your advisor will ask for them and explain why.
        </p>
        <p>
          When you browse, the servers that host this website record technical information such as your IP address, your browser
          type and the pages you request, to keep the website secure and working ({site.demo ? demo.legal.hosting : <Pending>Hosting provider</Pending>}).
        </p>
        <p>This website never asks for payment details. Nothing is booked or paid online.</p>
      </>
    ),
  },
  {
    id: 'why-we-use-it',
    title: 'Why we use it',
    body: (
      <>
        <p>We use your personal data only to:</p>
        <ul>
          <li>reply to your enquiry by the method you chose, and follow it up;</li>
          <li>prepare options, itineraries and prices for you;</li>
          <li>pass your enquiry to the branch you chose, or to the one best placed to help;</li>
          <li>keep a record of our conversation with you and of your consent;</li>
          <li>keep this website secure and meet our legal obligations.</li>
        </ul>
        <p>
          We rely on the consent you give when you tick the box on a form. You give it for these purposes only, and we collect only
          the data they need. The DPDP Act also allows some uses without consent, such as complying with the law.
        </p>
        <p>
          We will not use your enquiry to send you marketing messages unless you separately agree to receive them. We do not sell
          personal data.
        </p>
      </>
    ),
  },
  {
    id: 'how-long',
    title: 'How long we keep it',
    body: (
      <>
        <p>We keep personal data only as long as the purpose needs it, or as long as the law requires.</p>
        <ul>
          <li>
            <strong>Enquiries that do not lead to a booking:</strong> kept for {site.demo ? demo.legal.retainEnquiries : <Pending>Retention period for enquiries</Pending>} after
            our last contact with you, then deleted.
          </li>
          <li>
            <strong>If you book with HIJRA:</strong> kept while we provide the services and afterwards for the periods the law
            requires, for example for tax and accounting records ({site.demo ? demo.legal.retainLegal : <Pending>Retention periods confirmed by HIJRA’s legal adviser</Pending>}).
          </li>
          <li>
            <strong>Technical logs:</strong> kept for {site.demo ? demo.legal.retainLogs : <Pending>Log retention period</Pending>}.
          </li>
        </ul>
        <p>
          If you withdraw your consent, or the purpose has been served, we erase your data and ask our service providers to do the
          same, unless the law requires us to keep it.
        </p>
      </>
    ),
  },
  {
    id: 'sharing',
    title: 'Who we share it with',
    body: (
      <>
        <ul>
          <li>
            <strong>Within HIJRA:</strong> the advisor and the branch handling your enquiry, and staff who need it to help you.
          </li>
          <li>
            <strong>Service providers</strong> that process data on our behalf under a contract (Data Processors), for example to host
            this website, send email and run our phone and WhatsApp systems: {site.demo ? demo.legal.providers : <Pending>Names of service providers</Pending>}.
          </li>
          <li>
            <strong>Only if you decide to go ahead,</strong> and only what each one needs: airlines, hotels, transport and
            ground-handling companies, visa and immigration authorities and the official systems they use, and insurers if you ask
            for travel insurance.
          </li>
          <li>
            <strong>When the law requires it,</strong> for example to a government authority or a court.
          </li>
        </ul>
        <p>We do not sell or rent personal data, and we do not share it for other companies’ marketing.</p>
      </>
    ),
  },
  {
    id: 'transfers',
    title: 'Transfers outside India',
    body: (
      <>
        <p>
          Travel to Saudi Arabia and other countries means that, once you go ahead, some details must go to hotels, transport
          companies and authorities abroad. We transfer only what your arrangements need, and never to a country to which the
          Government of India has restricted transfers under the DPDP Act.
        </p>
        <p>
          Some of our service providers may store data outside India: {site.demo ? demo.legal.storage : <Pending>Where service providers store data</Pending>}.
        </p>
      </>
    ),
  },
  {
    id: 'security',
    title: 'How we protect it',
    body: (
      <>
        <p>
          We take reasonable security safeguards to prevent personal data breaches, including limiting access to the people who need
          it: {site.demo ? demo.legal.security : <Pending>Summary of HIJRA’s security measures</Pending>}.
        </p>
        <p>If a personal data breach happens, we will inform you and the Data Protection Board of India as the law requires.</p>
      </>
    ),
  },
  {
    id: 'your-rights',
    title: 'Your rights',
    body: (
      <>
        <p>Under the DPDP Act you have the right to:</p>
        <ul>
          <li>
            ask for a summary of the personal data we hold about you and how we use it, and for the identities of those we have shared
            it with;
          </li>
          <li>ask us to correct, complete or update your data, or to erase data we no longer need;</li>
          <li>have a grievance about our handling of your data answered by us;</li>
          <li>nominate another person to exercise these rights for you if you die or become unable to do so.</li>
        </ul>
        <p>
          To use any of these rights, contact us as described in <a href="#grievances">section 11</a>. We may ask you to confirm your identity first. The DPDP
          Act also asks you to give accurate information and not to make false or frivolous complaints.
        </p>
        <p>
          You may ask for this notice in English or in any language listed in the Eighth Schedule to the Constitution, including
          Malayalam ({site.demo ? demo.legal.malayalam : <Pending>Malayalam version of this notice</Pending>}).
        </p>
      </>
    ),
  },
  {
    id: 'withdraw-consent',
    title: 'Withdrawing consent',
    body: (
      <>
        <p>
          You can withdraw your consent at any time, as easily as you gave it: tell your advisor, reply to our message, or contact us
          as described in <a href="#grievances">section 11</a>.
        </p>
        <p>
          Once you withdraw, we stop using your data and erase it, unless the law requires us to keep it. Withdrawal does not affect
          anything we did with your consent before. If arrangements are in progress, we may not be able to complete them without
          your data; your advisor will explain what that means for you.
        </p>
      </>
    ),
  },
  {
    id: 'grievances',
    title: 'Grievances and contact',
    body: (
      <>
        <p>For any question, request or complaint about your personal data, contact our Grievance Officer:</p>
        <dl className="grid gap-x-6 gap-y-2 rounded-md border border-warm-border bg-white p-5 text-small sm:grid-cols-[auto_1fr] md:p-6">
          <dt className="text-muted">Grievance Officer</dt>
          <dd className="font-semibold text-navy">
            {site.demo ? demo.legal.officer : <Pending>Name and designation</Pending>}
          </dd>
          <dt className="text-muted">Email</dt>
          <dd className="font-semibold text-navy">
            <Pending>Grievance email address</Pending>
          </dd>
          <dt className="text-muted">Phone</dt>
          <dd className="font-semibold text-navy">
            <Pending>Grievance phone number</Pending>
          </dd>
          <dt className="text-muted">Post</dt>
          <dd className="font-semibold text-navy">
            {site.demo ? demo.legal.office : <Pending>Postal address</Pending>}
          </dd>
        </dl>
        <p>
          You can also write to us through the <Link href={routes.contact}>Contact page</Link> or ask at any branch. We will
          acknowledge your request and respond within {site.demo ? demo.legal.response : <Pending>Response period, within the limit set by the DPDP Rules</Pending>}.
        </p>
        <p>
          If you are not satisfied with our response, you may complain to the Data Protection Board of India. The DPDP Act asks you to
          use our grievance process first.
        </p>
      </>
    ),
  },
  {
    id: 'children',
    title: 'Children',
    body: (
      <>
        <p>Our forms are meant for adults. If you are under 18, please ask a parent or guardian to enquire for you.</p>
        <p>
          When a family enquires, the forms ask only how many children and infants are travelling, not their names or other details.
          If you go ahead, a parent or lawful guardian provides children’s details and gives consent for them, as the DPDP Act
          requires. We do not track children’s behaviour or use their data for advertising.
        </p>
      </>
    ),
  },
  {
    id: 'cookies',
    title: 'Cookies and browser storage',
    body: (
      <>
        <p>
          This website does not use advertising or tracking cookies, does not store anything in your browser, and this preview runs
          no analytics.
        </p>
        <p>
          If analytics are added before launch, this section will name the provider, say what it collects and explain how to opt
          out ({site.demo ? demo.legal.analytics : <Pending>Analytics decision</Pending>}).
        </p>
      </>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    body: (
      <p>
        We will update this policy when our practices or the law change, and show the new date at the top of the page. If a change
        affects data you have already given us, we will tell you before it applies.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  const t = dictionary;
  return (
    <LegalPage
      crumb={t.footer.privacy}
      title="Privacy policy"
      lead="How HIJRA Travels collects, uses and protects the personal data you share through this website, written with India’s Digital Personal Data Protection Act, 2023 in mind."
      note={
        <>
          <strong className="text-navy">This preview sends nothing.</strong> The forms on this website are not connected yet: nothing
          you type reaches HIJRA (see <a href="#this-preview" className="link-inline">section 2</a>).
        </>
      }
      sections={sections}
    />
  );
}
