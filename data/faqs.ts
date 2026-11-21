// Frequently asked questions, grouped by topic. Draft answers written for the preview: HIJRA must review them,
// and anything about rules, documents or health requirements must be checked against current official guidance
// before launch. Religious rulings are deliberately left to scholars; answers describe practice, not rulings.

export type Faq = { q: string; a: string[] };
export type FaqGroup = 'umrah' | 'hajj' | 'documents' | 'booking' | 'tours' | 'flights' | 'visa' | 'branches';

export const faqs: Record<FaqGroup, Faq[]> = {
  umrah: [
    {
      q: 'How early should we enquire about Umrah?',
      a: [
        'For most months, four to eight weeks ahead leaves time for the visa and good flight options. For Ramadan and the school holidays, enquire earlier: rooms near the Haram and seats on direct flights go first.',
        'Your advisor confirms the current timelines when you enquire.',
      ],
    },
    {
      q: 'Can elderly parents travel with the group?',
      a: [
        'Yes. Tell us about any mobility needs when you enquire, and we can suggest an unhurried itinerary and request wheelchair assistance at airports and in the holy mosques where it is available.',
        'We recommend a check-up with their doctor before travel.',
      ],
    },
    {
      q: 'What does an Umrah package usually include?',
      a: [
        'Usually flights, the Umrah visa, hotels in Makkah and Madinah, transfers and guidance. Each package lists what is included and what is not, and your advisor confirms everything with you before anything is booked.',
      ],
    },
    {
      q: 'Is Umrah possible during Ramadan?',
      a: [
        'Yes, and many families choose the last ten nights. Demand is highest then, so availability and fares differ from other months. Enquire as early as you can.',
      ],
    },
  ],
  hajj: [
    {
      q: 'How do pilgrims from India register for Hajj?',
      a: [
        'Indian pilgrims travel either through the Haj Committee of India or through a registered Haj Group Organiser (HGO). Seats are limited by the quota allotted to India each year.',
        'HIJRA explains the routes open to you and the current timelines when you enquire.',
      ],
    },
    {
      q: 'When should we start preparing for Hajj?',
      a: [
        'Applications open months before the season, so start early: check that your passport is valid well beyond the travel dates, arrange a health check-up, and follow the application window announced for the year.',
      ],
    },
    {
      q: 'What happens on the days of Hajj?',
      a: [
        'The rites take place between the 8th and the 13th of Dhul Hijjah: the days in Mina, the standing at Arafat, the night at Muzdalifah, the stoning at the Jamarat, the sacrifice and Tawaf. Our classes before departure walk through each day.',
        'For religious rulings, follow the scholars you trust.',
      ],
    },
  ],
  documents: [
    {
      q: 'Which documents does an Umrah visa need?',
      a: [
        'Usually a passport valid for at least six months, recent photographs and vaccination records, plus details HIJRA collects for the application. Requirements change, so your advisor confirms the current list before you apply.',
      ],
    },
    {
      q: 'Which vaccinations are needed?',
      a: [
        'Saudi health authorities have long required the meningococcal (ACYW) vaccination for Hajj and Umrah pilgrims, and may add others. Check the current requirements with your doctor and your advisor before travel.',
      ],
    },
  ],
  booking: [
    {
      q: 'Can we book or pay online?',
      a: [
        'No. This website is for enquiries only. An advisor confirms availability, the itinerary and the price with you first, and payment is arranged directly with HIJRA.',
      ],
    },
    {
      q: 'How will HIJRA reply to an enquiry?',
      a: ['By the method you choose: WhatsApp, a phone call or email. You can also visit a branch and speak to an advisor in person.'],
    },
    {
      q: 'What if we need to cancel or change our plans?',
      a: [
        'Cancellation and change terms depend on the package, the airline and the visa rules. HIJRA explains them in writing before you confirm anything.',
      ],
    },
  ],
  tours: [
    {
      q: 'Do you plan tours for families and groups?',
      a: ['Yes. Tell us who is travelling, how long you have and what you enjoy, and we will suggest an itinerary within India or abroad.'],
    },
    {
      q: 'Can a tour be customised?',
      a: ['Every itinerary on this site is a starting point. Dates, hotels, pace and stops can all change to suit you.'],
    },
    {
      q: 'Do you plan around prayer times and food?',
      a: ['Yes. Where the destination allows, we plan with prayer times, halal food and rest in mind, and tell you honestly where options are limited.'],
    },
  ],
  flights: [
    {
      q: 'Do you book flights for any trip, not only pilgrimages?',
      a: ['Yes: domestic and international tickets for work, family visits and holidays, including group bookings.'],
    },
    {
      q: 'Can you help with date changes and baggage?',
      a: ['Yes. We explain the fare rules before you book and help with changes, extra baggage and special assistance afterwards, subject to the airline’s rules and charges.'],
    },
  ],
  visa: [
    {
      q: 'Which visas can you help with?',
      a: ['Umrah visas, visit and tourist visas for the Gulf and popular holiday destinations, and business visas on request.'],
    },
    {
      q: 'Do you guarantee that a visa will be approved?',
      a: [
        'No one can: visas are decided by the issuing country. HIJRA helps you prepare a complete and correct application, which avoids most delays.',
      ],
    },
  ],
  branches: [
    {
      q: 'Can we visit a branch?',
      a: ['Yes. Many families prefer to sit down with an advisor before they travel. The Branches page lists each branch with its address, hours and contact numbers.'],
    },
  ],
};
