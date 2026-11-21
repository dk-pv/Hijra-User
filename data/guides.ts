import type { Faq } from './faqs';

// Pilgrim guidance shared by the Hajj & Umrah hub, the Umrah and Hajj pages and the Pilgrim Guide.
// DRAFT COPY for the preview. It describes practice (what happens, when and where), never rulings, and HIJRA's
// religious adviser reviews it before launch (I15). Anything about documents, visas or health must be checked
// against the official requirements in force at the time of travel.

export type Rite = { id: string; name: string; where: string; text: string };

/** The rites of Umrah, in order. */
export const umrahRites: Rite[] = [
  {
    id: 'ihram',
    name: 'Ihram and intention',
    where: 'Before the miqat',
    text: 'Before crossing the miqat, the boundary for pilgrims, you make the intention for Umrah and enter ihram. Men wear two plain white cloths; women wear modest, everyday clothes. From then on pilgrims recite the Talbiyah.',
  },
  {
    id: 'tawaf',
    name: 'Tawaf',
    where: 'Masjid al-Haram, Makkah',
    text: 'Seven circuits around the Kaaba, anticlockwise, beginning and ending in line with the corner of the Black Stone. Then two units of prayer, behind Maqam Ibrahim where there is space, and a drink of Zamzam water.',
  },
  {
    id: 'sai',
    name: 'Sa’i',
    where: 'Safa and Marwah',
    text: 'Seven journeys between the hills of Safa and Marwah, today inside the mosque, beginning at Safa and ending at Marwah.',
  },
  {
    id: 'halq',
    name: 'Halq or taqsir',
    where: 'After Sa’i',
    text: 'Men shave the head or shorten the hair; women cut a fingertip’s length from theirs. With this the Umrah is complete and the restrictions of ihram end.',
  },
];

export type HajjDay = { id: string; date: string; day: string; name: string; meaning: string; place: string; text: string; expect: string };

/** The days of Hajj, 8 to 13 Dhul Hijjah, and the farewell Tawaf. */
export const hajjDays: HajjDay[] = [
  {
    id: 'day-8',
    date: '8',
    day: '8 Dhul Hijjah',
    name: 'Yawm al-Tarwiyah',
    meaning: 'The day of preparation',
    place: 'Mina',
    text: 'Pilgrims put on ihram for Hajj, if they are not already in it, and travel to the tents of Mina. The day and the night are spent there in prayer, each prayer offered in its time.',
    expect: 'A day of settling in: find your tent, your group and the nearest facilities.',
  },
  {
    id: 'day-9',
    date: '9',
    day: '9 Dhul Hijjah',
    name: 'Yawm Arafah',
    meaning: 'The day of Arafah',
    place: 'Arafat',
    text: 'After sunrise pilgrims travel to the plain of Arafat. The standing at Arafat, from after midday until sunset, is the heart of Hajj: hours of prayer, supplication and remembrance. Dhuhr and Asr are prayed together, and at sunset the pilgrims leave for Muzdalifah.',
    expect: 'A long day outdoors in the heat. Water, shade and rest keep your strength for the afternoon.',
  },
  {
    id: 'night-9',
    date: '9–10',
    day: 'The night of the 9th',
    name: 'The night at Muzdalifah',
    meaning: 'Under the open sky',
    place: 'Muzdalifah',
    text: 'Maghrib and Isha are prayed together at Muzdalifah, and the night is spent under the open sky. Many pilgrims collect their pebbles for the stoning here.',
    expect: 'A mat on open ground. A light sheet and a small bag make the night easier.',
  },
  {
    id: 'day-10',
    date: '10',
    day: '10 Dhul Hijjah',
    name: 'Yawm al-Nahr',
    meaning: 'The day of sacrifice, Eid al-Adha',
    place: 'Mina and Makkah',
    text: 'Pilgrims return to Mina and stone Jamarat al-Aqabah, the largest of the three pillars, with seven pebbles. Then come the sacrifice, the shaving or shortening of the hair, and Tawaf al-Ifadah with Sa’i in Makkah, which may follow in the days after.',
    expect: 'The busiest day of Hajj. Groups stone at the times they are given, which keeps the crowds moving.',
  },
  {
    id: 'days-11-13',
    date: '11–13',
    day: '11 to 13 Dhul Hijjah',
    name: 'Ayyam al-Tashreeq',
    meaning: 'The days of Tashreeq',
    place: 'Mina',
    text: 'The nights are spent in Mina, and each day, after midday, pilgrims stone all three Jamarat, beginning with the smallest. Some leave on the 12th before sunset; others stay for the 13th.',
    expect: 'Long walks between the tents and the Jamarat: comfortable footwear and an unhurried pace help.',
  },
  {
    id: 'farewell',
    date: '',
    day: 'Before leaving Makkah',
    name: 'Tawaf al-Wada',
    meaning: 'The farewell Tawaf',
    place: 'Masjid al-Haram',
    text: 'The last rite before pilgrims leave Makkah: a final Tawaf of the Kaaba, after which many groups travel on to Madinah or home.',
    expect: 'Plan your packing so the farewell Tawaf is the last thing you do in Makkah.',
  },
];

export type Stage = { when: string; items: string[] };

/** Preparing for Hajj, from the first decision to the week of the flight. */
export const hajjPreparation: Stage[] = [
  {
    when: 'As early as you can',
    items: [
      'Check that your passport stays valid well beyond the travel dates, with blank pages to spare.',
      'See your doctor for a check-up, and start walking every day to build stamina.',
      'Begin learning the rites, in Malayalam or English, with the family members who will travel.',
    ],
  },
  {
    when: 'When applications open',
    items: [
      'Apply through the Haj Committee of India or a registered Haj Group Organiser, in the window announced for the season.',
      'Keep copies of every form, photograph and receipt in one folder.',
      'Follow your route’s instructions for documents and payments to the letter.',
    ],
  },
  {
    when: 'Once your seat is confirmed',
    items: [
      'Arrange the vaccinations required for the season, and keep the certificates with your passport.',
      'Attend the classes before departure, ideally together with your travel companion.',
      'Plan your medicines for the whole journey, with prescriptions.',
    ],
  },
  {
    when: 'The last month',
    items: [
      'Pack within the airline’s allowance and weigh the bags at home.',
      'Wear in the sandals you will walk in.',
      'Arrange money and a phone plan, and share your itinerary with family at home.',
    ],
  },
  {
    when: 'The week you fly',
    items: [
      'Keep your passport, visa, tickets and certificates together in one pouch.',
      'Confirm the reporting time at the airport.',
      'Rest, eat well and travel light.',
    ],
  },
];

export type ChecklistGroup = { id: string; title: string; items: { id: string; text: string; note?: string }[] };

/** The travel checklist: printable, ticked on screen only, never stored. */
export const checklist: ChecklistGroup[] = [
  {
    id: 'documents',
    title: 'Documents',
    items: [
      { id: 'passport', text: 'Passport, valid for at least six months', note: 'HIJRA checks it before any application' },
      { id: 'photos', text: 'Recent photographs, to the size the visa asks for' },
      { id: 'visa', text: 'Visa: Umrah through HIJRA, Hajj through your registration route' },
      { id: 'vaccination', text: 'Vaccination certificates', note: 'Meningococcal (ACYW) has long been required; check the current list' },
      { id: 'tickets', text: 'Tickets and hotel details, printed and on your phone' },
      { id: 'copies', text: 'Copies of passport and visa, kept apart from the originals' },
      { id: 'contacts', text: 'Emergency contacts and HIJRA’s numbers, written down' },
    ],
  },
  {
    id: 'health',
    title: 'Health',
    items: [
      { id: 'checkup', text: 'A check-up with your doctor before travel' },
      { id: 'medicines', text: 'Regular medicines in their original packs, with prescriptions and a few days extra' },
      { id: 'first-aid', text: 'A small first-aid kit: plasters for the feet, pain relief, rehydration salts' },
      { id: 'unscented', text: 'Unscented soap, lotion and sun cream for the days in ihram' },
    ],
  },
  {
    id: 'clothing',
    title: 'Clothing',
    items: [
      { id: 'ihram', text: 'Men: two sets of ihram cloths and an ihram belt' },
      { id: 'modest', text: 'Women: loose, breathable clothes and several scarves' },
      { id: 'sandals', text: 'Comfortable sandals, already worn in' },
      { id: 'layer', text: 'A light layer for air-conditioned halls and cooler nights' },
    ],
  },
  {
    id: 'haram',
    title: 'For the Haram',
    items: [
      { id: 'bag', text: 'A small shoulder bag with a pouch for your shoes' },
      { id: 'mat', text: 'A light prayer mat' },
      { id: 'quran', text: 'A pocket Qur’an and a book of supplications' },
      { id: 'bottle', text: 'A refillable water bottle and an umbrella for shade' },
    ],
  },
  {
    id: 'money',
    title: 'Money and phone',
    items: [
      { id: 'riyals', text: 'Some Saudi riyals in cash, and a card that works abroad' },
      { id: 'phone', text: 'A roaming pack or a local SIM plan' },
      { id: 'power', text: 'Charger, power bank and a travel adapter' },
    ],
  },
];

export type Step = { title: string; text: string; confirm?: boolean };

/** How HIJRA guides a pilgrim from the first enquiry to the journey home (hub, mock-up 5). Steps 4 and 5 await HIJRA's confirmation. */
export const guidanceSteps: Step[] = [
  { title: 'Your enquiry', text: 'The journey, the month and who is travelling, by form, WhatsApp or at a branch.' },
  { title: 'A consultation', text: 'Packages, dates and costs explained, in Malayalam or English.' },
  { title: 'Documents and visa', text: 'What to prepare, checked by us before anything is submitted.' },
  { title: 'Briefing', text: 'A session before departure on the rites, the journey and what to pack.', confirm: true },
  { title: 'Group leader', text: 'Someone from HIJRA with the group through the rites.', confirm: true },
  { title: 'Home again', text: 'We stay in touch after you return.' },
];

/** Questions that apply to both journeys and are not in data/faqs.ts. */
export const hubFaqs: Record<'first' | 'visaTime', Faq> = {
  first: {
    q: 'Should we plan Umrah or Hajj first?',
    a: [
      'It depends on your health, your family and, for Hajj, on registration and India’s quota. Many families make Umrah first, which also prepares them for the climate and the crowds.',
      'An advisor can explain the practical side. For the religious side of the question, follow the scholars you trust.',
    ],
  },
  visaTime: {
    q: 'How long does a visa take?',
    a: [
      'It depends on the season and on the rules in force when you apply. Your advisor gives you the current timelines when you enquire, and checks your documents before anything is submitted.',
    ],
  },
};
