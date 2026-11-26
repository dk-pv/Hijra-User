import type { ImageKey } from './images';

// Blog articles. Written for the preview: HIJRA reviews every article before launch, and articles marked `religious`
// are reviewed by HIJRA's religious adviser. Dates and the byline are SAMPLES and are labelled as such wherever they show.
// In any text, a [bracketed phrase] renders as a placeholder for a fact HIJRA must supply.
// An article with `status: 'draft'` stays here as a record but is not published: no page, link, listing or sitemap
// entry (everything reads `blogs`, the published list).

export type BlogCategory = 'umrah' | 'hajj' | 'preparation' | 'documents' | 'travel';

export type BlogBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; id: string; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul' | 'ol'; items: string[] }
  | { type: 'quote'; text: string; cite?: string }
  | { type: 'note'; text: string }
  | { type: 'image'; image: ImageKey; caption: string };

export type BlogPost = {
  slug: string;
  title: string;
  /** 140–160 characters: used as the meta description too. */
  excerpt: string;
  category: BlogCategory;
  /** SAMPLE publication date (ISO). */
  date: string;
  readingMinutes: number;
  author: string;
  image: ImageKey;
  body: BlogBlock[];
  related: string[];
  featured?: boolean;
  /** Describes religious practice: shown with a note to follow one's scholars, pending HIJRA's adviser review. */
  religious?: boolean;
  status: 'published' | 'draft';
  sample: true;
};

export const categories: Record<BlogCategory, string> = {
  umrah: 'Umrah',
  hajj: 'Hajj',
  preparation: 'Preparation',
  documents: 'Documents',
  travel: 'Travel',
};

/** An article as written; reading time, byline and status (published unless set to 'draft') are added below. */
type Source = Omit<BlogPost, 'readingMinutes' | 'author' | 'sample' | 'status'> & { status?: 'draft' };

// Newest first; exactly one featured among the published.
const sources: Source[] = [
  {
    slug: 'umrah-step-by-step',
    title: 'Umrah, step by step: a guide for first-time pilgrims',
    excerpt:
      'From the miqat to the final trim of the hair: the four rites of Umrah explained simply, for families from Kerala who are travelling for the very first time.',
    category: 'umrah',
    date: '2026-11-12',
    image: 'makkah-haram-clock-tower-night',
    featured: true,
    religious: true,
    related: ['ihram-what-to-wear-and-avoid', 'umrah-with-elderly-parents', 'visiting-madinah'],
    body: [
      {
        type: 'p',
        text: 'Umrah is often called the lesser pilgrimage. Unlike Hajj, it can be performed at almost any time of the year, and the rites themselves take only a few hours. For a first-time pilgrim, though, those hours carry a lifetime of meaning, and knowing what comes next makes it easier to stay present in each moment.',
      },
      {
        type: 'p',
        text: 'This guide follows the four rites in the order pilgrims perform them: ihram, tawaf, sa’i and the cutting of the hair. It describes common practice in general terms. For the rulings that apply to you, including details that schools of thought treat differently, follow the scholars you trust.',
      },
      { type: 'h2', id: 'ihram', text: 'Ihram and the miqat' },
      {
        type: 'p',
        text: 'Umrah begins before you reach Makkah. Every pilgrim enters the state of ihram at, or before, a boundary called the miqat. Flights from Kerala to Jeddah cross the miqat in the air, so most men change into the two white ihram sheets at home or at the airport, and make the intention when the crew announces that the aircraft is approaching it.',
      },
      {
        type: 'p',
        text: 'If your group flies to Madinah first, you will spend your first days there in ordinary clothes and enter ihram on the road to Makkah, at the miqat just outside Madinah. Your group leader will tell you when to get ready.',
      },
      {
        type: 'p',
        text: 'From the moment of intention, pilgrims repeat the talbiyah, the call that begins “Labbayk Allahumma labbayk”: here I am, O Allah, here I am. Men say it aloud and women softly, until the tawaf begins.',
      },
      { type: 'h2', id: 'tawaf', text: 'Tawaf: seven circuits of the Kaaba' },
      {
        type: 'p',
        text: 'Many groups first check in at the hotel, rest a little and renew their wudu before walking to Masjid al-Haram. Then comes the first sight of the Kaaba, a moment pilgrims say they never forget. Take your time with it.',
      },
      {
        type: 'p',
        text: 'Tawaf is seven circuits around the Kaaba, walked anticlockwise, beginning and ending in line with the Black Stone, al-Hajar al-Aswad. A green light on the wall of the mosque marks the line. At the start of each circuit, pilgrims raise the right hand towards the Black Stone; the rest of the circuit is for remembrance and supplication, in any language.',
      },
      {
        type: 'ul',
        items: [
          'Men usually uncover the right shoulder for this tawaf, passing the upper sheet under the right arm.',
          'In the first three circuits, men who are able walk briskly; the last four are at a normal pace.',
          'Women walk at a normal pace throughout and remain fully covered.',
          'The ground floor around the Kaaba is the most crowded. The upper levels take longer to walk but are calmer, and are where wheelchairs and electric carts go.',
        ],
      },
      {
        type: 'p',
        text: 'After the seventh circuit, pilgrims pray two short units of prayer behind the Station of Ibrahim, Maqam Ibrahim, or anywhere in the mosque if that area is crowded, and then drink Zamzam water.',
      },
      { type: 'h2', id: 'sai', text: 'Sa’i: between Safa and Marwah' },
      {
        type: 'p',
        text: 'Sa’i recalls Hajar, the mother of Ismail (peace be upon them), who hurried between two hills searching for water for her son. Both hills now stand inside the mosque, joined by a long, cool marble gallery.',
      },
      {
        type: 'p',
        text: 'Pilgrims walk seven lengths, starting at Safa and finishing at Marwah: Safa to Marwah is the first, Marwah back to Safa the second. Between two sets of green lights, men who are able quicken their pace. There is no fixed prayer for sa’i; many pilgrims recite the Quran, pray for their families or simply walk in quiet reflection.',
      },
      {
        type: 'image',
        image: 'makkah-masa-safa-marwa',
        caption: 'The Mas’a, the long gallery inside Masjid al-Haram where sa’i is walked between Safa and Marwah.',
      },
      {
        type: 'note',
        text: 'Plan for the distance. The seven lengths of sa’i add up to around three kilometres, and tawaf on the upper levels is longer than on the ground floor. Wheelchairs are available at the mosque for anyone who needs one.',
      },
      { type: 'h2', id: 'hair', text: 'Halq or taqsir: completing the Umrah' },
      {
        type: 'p',
        text: 'The last rite is cutting the hair. Men either shave the head, halq, or trim the hair evenly all over, taqsir; many scholars regard shaving as the better choice for men. Women trim a small length from the ends of their hair, about the length of a fingertip, in private.',
      },
      {
        type: 'p',
        text: 'With this, the Umrah is complete and the restrictions of ihram are lifted. Barbers are close to Marwah and in the streets around the mosque.',
      },
      { type: 'h2', id: 'practical', text: 'Practical notes for the day' },
      {
        type: 'ul',
        items: [
          'Agree on a meeting point before you go in. The gates of Masjid al-Haram are numbered, so a gate number is the easiest place to find each other.',
          'Carry a card with your hotel’s name and address and your group leader’s phone number.',
          'Keep your sandals in a small cloth bag rather than leaving them at the door.',
          'Drink water regularly. Zamzam is available throughout the mosque.',
          'Go at your own pace. Resting between the rites is normal, especially in the heat.',
        ],
      },
      {
        type: 'p',
        text: 'Some pilgrims perform their Umrah within hours of arriving; others rest first. Your group leader will suggest a time that suits the group, the crowds and the weather.',
      },
    ],
  },
  {
    slug: 'umrah-visa-documents-india',
    title: 'Documents for an Umrah visa from India',
    excerpt:
      'Passport validity, photographs, PAN card and the other papers families usually gather for an Umrah visa application from India, and what to verify first.',
    category: 'documents',
    date: '2026-11-04',
    image: 'travel-passports',
    related: ['packing-for-makkah-and-madinah', 'umrah-step-by-step', 'hajj-registration-india'],
    body: [
      {
        type: 'note',
        text: 'Visa requirements change, sometimes at short notice. Use this as a general checklist, and confirm the current requirements with HIJRA or the official Saudi visa service before you apply. No agency can guarantee that a visa will be approved.',
      },
      {
        type: 'p',
        text: 'Most families from Kerala travel for Umrah on an Umrah visa arranged by an authorised agency as part of a package. The application is made online and is usually straightforward once the documents are in order. When there are delays, the cause is almost always something small: a passport close to expiry, a photograph with the wrong background, or a name spelt differently on two documents.',
      },
      { type: 'h2', id: 'passport', text: 'Passport' },
      {
        type: 'ul',
        items: [
          'Valid for at least six months from your date of travel. If it expires sooner, renew it before anything else.',
          'At least two blank pages.',
          'Clear scans of the first and last pages, which on an Indian passport carry your photograph, address and family details.',
          'Names on tickets and on the visa must match the passport exactly, including the order of names and any initials.',
        ],
      },
      { type: 'p', text: 'Every traveller needs their own passport, including infants and children.' },
      { type: 'h2', id: 'photographs', text: 'Photographs' },
      {
        type: 'p',
        text: 'A recent colour photograph, usually passport size, with a plain white background, the face fully visible and no glasses. Head coverings worn for religious reasons are generally accepted when the face is clear. Online applications need a digital copy, so keep a sharp scan or the photographer’s file.',
      },
      { type: 'h2', id: 'other-documents', text: 'Other documents you may be asked for' },
      {
        type: 'ul',
        items: [
          'Your PAN card. Overseas tour packages bought in India attract tax collected at source, for which agencies need it.',
          'Proof of relationship for family groups, such as a marriage certificate or birth certificates, when requested.',
          'For a child travelling with one parent, or with relatives, a consent letter from the parent who is not travelling.',
          'Vaccination certificates, if the health rules for your travel dates require them.',
        ],
      },
      {
        type: 'p',
        text: 'Return flights and hotel bookings form part of the application. In a package, the agency arranges them for you.',
      },
      { type: 'h2', id: 'health', text: 'Health requirements' },
      {
        type: 'p',
        text: 'Saudi Arabia publishes health requirements for pilgrims, and they can differ between Umrah and Hajj and from one season to the next. They have included specific vaccinations in the past. Check the current requirements a few weeks before you travel, so there is time for any vaccination to take effect, and keep the certificates with your passport.',
      },
      { type: 'h2', id: 'when-to-apply', text: 'When to apply' },
      {
        type: 'p',
        text: 'Gather the documents as soon as your dates are fixed. Visas are processed closer to departure, but a missing paper discovered early is easy to put right; one discovered a week before can mean changing flights.',
      },
      {
        type: 'p',
        text: 'Umrah visas are usually not issued for a period around the Hajj season each year, so check the dates if you hope to travel close to it.',
      },
      { type: 'h2', id: 'common-delays', text: 'Small things that cause delays' },
      { type: 'p', text: 'Most hold-ups can be avoided with a careful look before anything is submitted:' },
      {
        type: 'ul',
        items: [
          'A name spelt one way on the passport and another on the PAN card or tickets, or initials expanded on one and not the other',
          'A photograph taken at home against a cream or patterned wall, or with shadows across the face',
          'Scans that are blurred, cropped at the edges or taken at an angle',
          'A passport renewed after booking, with the old passport number still on the application',
          'Documents for one family member arriving long after everyone else’s',
        ],
      },
      { type: 'h2', id: 'how-hijra-helps', text: 'How HIJRA helps' },
      {
        type: 'p',
        text: 'Advisors check every document before an application goes in, explain anything that is unclear, and keep you informed until a decision is made. If the rules change, they tell you what it means for your journey.',
      },
    ],
  },
  {
    slug: 'ihram-what-to-wear-and-avoid',
    title: 'Ihram: what to wear, and what to avoid',
    excerpt:
      'Ihram clothing for men and women, when to put it on when flying from Kerala, and the restrictions most pilgrims observe until their rites are complete.',
    category: 'preparation',
    date: '2026-10-27',
    image: 'hajj-pilgrims-jamarat',
    religious: true,
    related: ['umrah-step-by-step', 'packing-for-makkah-and-madinah', 'the-days-of-hajj'],
    body: [
      {
        type: 'p',
        text: 'Ihram is both a garment and a state. Before crossing the miqat, the boundary for pilgrims, you make the intention for Umrah or Hajj and take on a set of restrictions that last until the rites are complete. The clothing is simple by design: wealth and status fall away, and every pilgrim stands equal.',
      },
      {
        type: 'p',
        text: 'This article describes common practice. Schools of thought differ on some details, so for the rulings that apply to you, follow the scholars you trust.',
      },
      { type: 'h2', id: 'men', text: 'For men: two white sheets' },
      {
        type: 'p',
        text: 'Men wear two seamless pieces of white cloth. The lower sheet, the izar, wraps around the waist and falls below the knees. The upper sheet, the rida, is draped over the shoulders. Stitched or fitted clothing such as shirts, trousers and underwear is not worn, and the head stays uncovered.',
      },
      {
        type: 'ul',
        items: [
          'Choose sheets in towelling or thick cotton that are not see-through, large enough to wrap comfortably.',
          'A wide belt holds the izar in place and keeps money, a phone and documents safe.',
          'Footwear should leave the ankle and the top of the foot uncovered. Simple sandals are the usual choice.',
          'Pack a second set. Sheets get soiled, and a spare makes long days easier.',
        ],
      },
      { type: 'h2', id: 'women', text: 'For women: modest, everyday clothing' },
      {
        type: 'p',
        text: 'Women do not wear a special garment. Ihram for women is loose, everyday clothing that covers the body and the hair, usually in plain colours. Most scholars hold that the face and hands are left uncovered in ihram, so the face veil and gloves are not worn; many women lower a light cloth in front of the face when men are near. Shoes and socks are worn as usual.',
      },
      {
        type: 'p',
        text: 'Ask your scholar about anything you are unsure of, especially if you usually cover your face.',
      },
      { type: 'h2', id: 'flying-from-kerala', text: 'When to put it on, flying from Kerala' },
      {
        type: 'p',
        text: 'Flights from Kerala to Jeddah cross the miqat in the air, often well before landing. Changing in an aircraft washroom is difficult, so most men put on the ihram at home or at the airport before departure, and make the intention when the crew announces the miqat. If your group goes to Madinah first, you will enter ihram later, on the way to Makkah.',
      },
      {
        type: 'ul',
        items: [
          'Before changing, many pilgrims bathe, trim their nails and remove unwanted hair, since these are avoided once the intention is made.',
          'If you plan to change during a stopover, keep the ihram in your hand luggage.',
          'Once the intention is made, begin the talbiyah.',
        ],
      },
      {
        type: 'quote',
        text: 'Labbayk Allahumma labbayk, labbayk la sharika laka labbayk. Innal-hamda wan-ni’mata laka wal-mulk, la sharika lak.',
        cite: 'The talbiyah',
      },
      {
        type: 'p',
        text: 'Here I am, O Allah, here I am. Here I am, You have no partner, here I am. All praise, all blessings and all sovereignty are Yours. You have no partner.',
      },
      { type: 'h2', id: 'what-is-avoided', text: 'What is avoided in ihram' },
      {
        type: 'p',
        text: 'The restrictions share one spirit: a time to set aside comfort and adornment and to turn wholly to worship. Pilgrims in ihram commonly avoid:',
      },
      {
        type: 'ul',
        items: [
          'Perfume and scented products, including scented soap, shampoo, cream and wet wipes',
          'Cutting or removing hair, and clipping nails',
          'Covering the head, for men, and covering the face with a veil, for women',
          'Stitched or fitted clothing, for men',
          'Hunting, and cutting plants or trees within the sacred precincts',
          'Marriage contracts and marital relations',
          'Arguments, harsh words and anything that disturbs others',
        ],
      },
      {
        type: 'note',
        text: 'If something is done by mistake or out of need, such as a bandage on an injury or a medicine that contains fragrance, there may be a remedy. Ask your group leader or scholar rather than worrying alone.',
      },
      { type: 'h2', id: 'packing-list', text: 'A short packing list for ihram' },
      {
        type: 'ul',
        items: [
          'Two sets of ihram sheets for men; two or three changes of modest clothing for women',
          'A plain ihram belt or money pouch',
          'Unscented soap, shampoo, deodorant and lip balm',
          'Sandals that are already worn in, and a cloth bag to carry them in the mosque',
          'A small towel, and plasters for blisters',
        ],
      },
    ],
  },
  {
    // UNPUBLISHED (26 November 2026): HIJRA does not offer Kerala local tours, so this guide is kept only as a
    // record. Its category was 'kerala', now retired. Before any republishing, the last section's offer to plan a
    // Kerala route must go.
    status: 'draft',
    slug: 'munnar-with-family',
    title: 'Munnar with family: a short guide to the tea hills',
    excerpt:
      'When to go, how to get there and what to see in Munnar, with practical notes on food, prayer and pace for Kerala families with children or elderly parents.',
    category: 'travel',
    date: '2026-10-16',
    image: 'kerala-munnar-tea-hills',
    related: ['istanbul-for-muslim-travellers', 'umrah-with-elderly-parents', 'umrah-step-by-step'],
    body: [
      {
        type: 'p',
        text: 'Few places in Kerala change the air as quickly as Munnar. A few hours from the coast, the road climbs through spice gardens and past waterfalls into the Western Ghats, and the hills open into tea estates that roll away in every direction. For families from the plains, it is the classic break: cool, green and unhurried.',
      },
      { type: 'h2', id: 'when-to-go', text: 'When to go' },
      {
        type: 'p',
        text: 'The most comfortable months are September to March, after the monsoon, when the hills are green and the days are clear. December and January bring cool nights, sometimes cold enough for a jacket. During the monsoon, from June to September, rain is heavy and roads can be affected, so check the weather and local advisories before you set out.',
      },
      { type: 'p', text: 'School holidays and long weekends are busy, so book rooms early if you plan to travel then.' },
      { type: 'h2', id: 'getting-there', text: 'Getting there' },
      {
        type: 'p',
        text: 'Munnar is in Idukki district, roughly 130 kilometres by road from Kochi, a drive of around four to five hours. From Malabar, families usually travel by way of Thrissur or Kochi. The last stretch winds up through the hills, so anyone prone to travel sickness should sit in front, and plan short breaks. A driver who knows the ghat roads makes the journey far more relaxed than driving yourself.',
      },
      { type: 'h2', id: 'where-to-stay', text: 'Where to stay' },
      {
        type: 'p',
        text: 'Munnar town is convenient for shops, restaurants and mosques, but it is busy, especially at weekends. Resorts out among the estates, on the roads towards Pallivasal, Chithirapuram or Chinnakanal, are quieter and have the tea views, but every outing means more driving.',
      },
      {
        type: 'p',
        text: 'For older parents, ask how many steps there are between the rooms and the restaurant, and whether there is a lift. For children, ask about space to play and whether the grounds are fenced near steep drops.',
      },
      { type: 'h2', id: 'what-to-see', text: 'What to see' },
      {
        type: 'ul',
        items: [
          'The tea estates themselves, best seen on a slow morning walk or from a viewpoint above the town',
          'A tea museum, where you can see how leaf becomes tea, with a tasting at the end',
          'Eravikulam National Park, home of the Nilgiri tahr, a mountain goat found only in the southern Western Ghats. The park closes for part of each year, so check before you go.',
          'Anamudi, the highest peak in South India, which rises within the park',
          'Mattupetty Dam and Echo Point, for boating and picnics with children',
          'Top Station, near the Tamil Nadu border, for wide views across the valleys on a clear day',
        ],
      },
      { type: 'h2', id: 'children-and-parents', text: 'With children and elderly parents' },
      {
        type: 'ul',
        items: [
          'Plan one or two sights a day, with rest in between. Drives between viewpoints take longer than the map suggests.',
          'Choose a hotel with easy access. Some resorts are spread across steep slopes, with many steps.',
          'Pack warm layers, a rain jacket and comfortable shoes.',
          'Carry water, snacks and travel-sickness tablets for the hill roads.',
        ],
      },
      { type: 'h2', id: 'food-and-prayer', text: 'Food and prayer' },
      {
        type: 'p',
        text: 'Halal food is widely available in Kerala, Munnar included; if it matters to you, ask when you book a hotel or order a meal. Munnar town has mosques for the daily and Friday prayers. If your hotel is out among the estates, plan the drive for Friday, and ask the hotel for the direction of the qibla and a quiet place to pray.',
      },
      { type: 'h2', id: 'combining', text: 'Combining Munnar with other places' },
      {
        type: 'p',
        text: 'Munnar pairs well with Thekkady, for the forests of Periyar and its spice gardens, or with a night on a houseboat in the backwaters of Alappuzha. A week is enough for all three at a gentle pace, and an advisor can shape the route around your family.',
      },
      {
        type: 'image',
        image: 'kerala-alappuzha-houseboat',
        caption: 'A houseboat moored in the backwaters of Alappuzha, an easy pairing with a few days in Munnar.',
      },
    ],
  },
  {
    slug: 'umrah-with-elderly-parents',
    title: 'Umrah with elderly parents: planning an unhurried journey',
    excerpt:
      'Hotels within an easy walk, wheelchairs at the Haram, medicines in hand luggage and days of rest: how families plan a calm Umrah for parents and grandparents.',
    category: 'umrah',
    date: '2026-10-08',
    image: 'makkah-haram-king-fahd-gate',
    related: ['umrah-step-by-step', 'packing-for-makkah-and-madinah', 'visiting-madinah'],
    body: [
      {
        type: 'p',
        text: 'For many families in Kerala, taking their parents for Umrah is a long-held wish. It is also a journey that asks more of older bodies: long walks on marble floors, crowds, heat and early mornings. With good planning, parents in their seventies and eighties perform Umrah every season with dignity and calm.',
      },
      { type: 'p', text: 'These are the questions HIJRA’s advisors talk through with families before a journey like this.' },
      { type: 'h2', id: 'doctor', text: 'Start with their doctor' },
      {
        type: 'p',
        text: 'Before choosing dates, ask your parents’ doctor whether the journey suits them, and what to watch for with any condition they live with: blood pressure, diabetes, heart or breathing problems, or recent surgery. Ask for a short letter that lists their conditions and medicines. It helps at airports and with any doctor abroad.',
      },
      {
        type: 'ul',
        items: [
          'Carry medicines in their original packaging, in hand luggage, with enough for the whole trip and a few days more.',
          'Split the supply between two bags in case one goes missing.',
          'Keep copies of prescriptions, with a note of blood group and allergies.',
          'Ask about travel insurance that covers existing conditions.',
        ],
      },
      { type: 'h2', id: 'pace', text: 'Choose the pace before the package' },
      { type: 'p', text: 'For older pilgrims, the shape of the itinerary matters more than a hotel’s star rating. Look for:' },
      {
        type: 'ul',
        items: [
          'A hotel close to the Haram, so the walk to prayers is short. Ask for the actual walking distance, not just the name of the area.',
          'Fewer hotel changes, and lifts that are easy to reach.',
          'Rest built into each day: a free afternoon after arrival, and no early start after a late night.',
          'Madinah first, where possible. Its calmer pace is a gentle start before Makkah.',
        ],
      },
      {
        type: 'image',
        image: 'madinah-nabawi-golden-hour',
        caption: 'The Prophet’s Mosque in Madinah in the evening light. Many families begin their journey here, where the pace is calmer.',
      },
      {
        type: 'p',
        text: 'Many families also choose quieter months, avoiding Ramadan and the school holidays, when the crowds are at their peak.',
      },
      { type: 'h2', id: 'wheelchairs', text: 'Wheelchairs, carts and help at the Haram' },
      {
        type: 'p',
        text: 'No one needs to walk beyond their strength. Wheelchairs are widely used in both holy mosques, and in Masjid al-Haram the upper levels are used for tawaf and sa’i by wheelchair and electric cart. Families often bring a light folding wheelchair, or hire one at the mosque, and a younger family member pushes it.',
      },
      {
        type: 'note',
        text: 'Request wheelchair assistance from the airline when the tickets are booked, not at the airport. It covers check-in, the walk to the gate and the arrival, and makes a large airport such as Jeddah far easier.',
      },
      { type: 'h2', id: 'small-things', text: 'Small things that make a big difference' },
      {
        type: 'ul',
        items: [
          'Sandals or shoes that are already worn in, and socks for the cool mosque floors.',
          'A light shawl or jacket for the air-conditioning and for winter evenings in Madinah.',
          'Water, dates or a small snack, and gentle reminders to drink in the heat.',
          'A card in their pocket with the hotel’s name and address and a family member’s number, in English and Arabic if possible.',
          'A phone with large text, and emergency contacts saved under clear names.',
        ],
      },
      { type: 'h2', id: 'companion', text: 'One companion for every parent' },
      {
        type: 'p',
        text: 'The best help is a companion who stays close. If both parents are travelling, plan for two companions, or travel in a group where someone is always free. Agree on where to meet if you are separated, and decide in advance who accompanies them to the washroom, at meals and during tawaf.',
      },
      {
        type: 'p',
        text: 'Above all, give them time. Parents often want to spend long hours in the mosque, and much of the joy of the journey lies there. A slower Umrah, with rest between the rites, is still a complete Umrah.',
      },
    ],
  },
  {
    slug: 'packing-for-makkah-and-madinah',
    title: 'What to pack for Makkah and Madinah',
    excerpt:
      'A packing list for Umrah from Kerala: documents, clothes for the mosques and the weather, medicines, and the small things pilgrims often wish they had taken.',
    category: 'preparation',
    date: '2026-09-24',
    image: 'travel-calicut-airport',
    related: ['ihram-what-to-wear-and-avoid', 'umrah-visa-documents-india', 'umrah-with-elderly-parents'],
    body: [
      {
        type: 'p',
        text: 'Packing for Umrah is not like packing for a holiday. You will spend long hours in the mosques, walk far more than usual, and go back and forth between the hotel and the mosque several times a day. The advice returning pilgrims give most often is simple: pack light, and pack for comfort.',
      },
      { type: 'h2', id: 'documents-and-money', text: 'Documents and money' },
      {
        type: 'ul',
        items: [
          'Passport, visa, tickets and hotel details, together in a waterproof pouch',
          'Photocopies and phone photos of every document, kept separately from the originals',
          'Two spare passport-size photographs',
          'A card with your hotel’s name and address and your group leader’s number',
          'Some Saudi riyals in cash for small purchases; cards are widely accepted in shops and hotels',
          'A word with your bank before you leave, so that your card works abroad',
        ],
      },
      { type: 'h2', id: 'clothes', text: 'Clothes for the mosques and the weather' },
      {
        type: 'p',
        text: 'Makkah is hot for most of the year, and summer days are often well above 40°C. Madinah can be cool on winter nights, and both holy mosques are strongly air-conditioned.',
      },
      {
        type: 'ul',
        items: [
          'Men: two sets of ihram and a belt, plus loose cotton clothes, such as kurtas or thobes, for the days after Umrah',
          'Women: loose, breathable clothing, several scarves and a light abaya or long coat',
          'A light jacket or shawl for the air-conditioning and winter evenings',
          'Sandals that are already worn in, and socks for the mosque floors',
          'Sleepwear and a small, quick-drying towel',
        ],
      },
      { type: 'h2', id: 'medicines', text: 'Medicines and health' },
      {
        type: 'ul',
        items: [
          'Your regular medicines for the whole trip and a few extra days, in hand luggage, with prescriptions',
          'A small kit with plasters for blisters, pain relief, oral rehydration salts, an antacid and throat lozenges; coughs are common in crowds',
          'Unscented soap, shampoo, deodorant and wet wipes for the time in ihram',
          'Fragrance-free sunscreen, lip balm and sunglasses',
          'A few face masks for crowded places',
        ],
      },
      { type: 'h2', id: 'mosque-bag', text: 'A small bag for the mosque' },
      {
        type: 'p',
        text: 'Most of each day is spent walking to and from the mosque, so a light shoulder bag or small backpack is the most useful thing you can carry. In it:',
      },
      {
        type: 'ul',
        items: [
          'A cloth bag for your sandals',
          'A refillable bottle for Zamzam water',
          'A pocket Quran or book of supplications, if you use one',
          'Your phone, a power bank and a short cable',
          'A small prayer mat if you prefer your own, and a light shawl',
        ],
      },
      { type: 'h2', id: 'luggage', text: 'Luggage and the flight' },
      {
        type: 'p',
        text: 'Check your airline’s baggage allowance, for checked bags and for hand luggage, before you start packing. Then keep the essentials with you on board:',
      },
      {
        type: 'ul',
        items: [
          'Documents, medicines and a change of clothes',
          'For men who will change on the way, the ihram and its belt',
          'A light shawl for the cold cabin, and a refillable bottle to fill after security',
          'A name tag on every bag, with your phone number and group name. Group luggage tends to look alike on the carousel, and a bright strap helps you spot yours.',
        ],
      },
      {
        type: 'p',
        text: 'Travelling with children? Add a card or wristband with your phone number, a few small books or toys for the flight, snacks they like and a spare set of clothes in the cabin bag.',
      },
      { type: 'h2', id: 'phones', text: 'Phones, chargers and staying in touch' },
      {
        type: 'ul',
        items: [
          'A universal plug adapter. Sockets in Saudi Arabia are commonly the three-pin UK type.',
          'An international roaming pack, or a local SIM card bought on arrival with your passport.',
          'A WhatsApp group set up before you leave, so the family and your group can share locations.',
        ],
      },
      { type: 'h2', id: 'leave-at-home', text: 'What to leave at home' },
      {
        type: 'p',
        text: 'Heavy suitcases, valuable jewellery, too many clothes and large bottles of anything. And leave some space: most pilgrims come home with dates, gifts and Zamzam water. Airlines set their own rules for carrying Zamzam, so check your airline’s current policy before you fly home.',
      },
    ],
  },
  {
    slug: 'hajj-registration-india',
    title: 'How Indian pilgrims register for Hajj',
    excerpt:
      'The two routes to Hajj from India, through the Haj Committee of India or a registered Haj Group Organiser, and what families can prepare while they wait.',
    category: 'hajj',
    date: '2026-09-11',
    image: 'makkah-haram-aerial',
    related: ['the-days-of-hajj', 'ihram-what-to-wear-and-avoid', 'umrah-visa-documents-india'],
    body: [
      {
        type: 'p',
        text: 'For pilgrims from India, the journey of a lifetime begins with paperwork, often many months before the season. Every pilgrim travels within a national quota agreed each year between India and Saudi Arabia, and there are two routes to a place in it.',
      },
      {
        type: 'note',
        text: 'This is a general overview. The application window, eligibility, costs and procedures are announced afresh for each season, so always follow the official notices for the year in which you are applying.',
      },
      { type: 'h2', id: 'two-routes', text: 'Two routes to Hajj' },
      {
        type: 'p',
        text: 'Indian pilgrims travel either through the Haj Committee of India or through a registered Haj Group Organiser (HGO).',
      },
      { type: 'h3', text: 'The Haj Committee of India' },
      {
        type: 'p',
        text: 'Most pilgrims from India travel through the Haj Committee of India, which works with the state Haj committees, Kerala’s among them. Applications are made online during a window announced each year. When there are more applicants than places, selection follows the process set out in that year’s Haj policy, and selected pilgrims are told the next steps, the payments due and the departure arrangements.',
      },
      { type: 'h3', text: 'Registered Haj Group Organisers' },
      {
        type: 'p',
        text: 'A share of the national quota is allotted to private operators registered as Haj Group Organisers. Pilgrims book directly with an HGO, which arranges flights, accommodation, transport and guidance within the rules for that season. Packages differ in price, accommodation and services, so compare them carefully, and confirm the operator’s registration for the year you are travelling.',
      },
      {
        type: 'p',
        text: 'Each year’s policy also sets out any provisions for older pilgrims, for women and for families applying together, so read it in full before you apply, whichever route you choose.',
      },
      { type: 'note', text: 'Which route applies to you depends on your application: an advisor at any HIJRA branch can explain both, step by step.' },
      { type: 'h2', id: 'choosing', text: 'Choosing a route' },
      {
        type: 'p',
        text: 'The Haj Committee route is the one most Indian pilgrims take, with arrangements and costs set for everyone selected in that season. An HGO offers more choice of hotels and services, at a range of prices, and you deal with one operator from booking to your return. Whichever you consider, read the rules for that season first; an advisor can talk you through the differences.',
      },
      {
        type: 'p',
        text: 'When applications exceed the places available, not everyone is selected in a given year. If that happens, keep your passport current and your health checks up to date, so that you are ready when your turn comes.',
      },
      { type: 'h2', id: 'prepare', text: 'What to prepare while you wait' },
      {
        type: 'ul',
        items: [
          'A passport valid well beyond the season. Check the validity the current Haj policy asks for, and renew early if needed.',
          'Copies of your identity and address documents, and recent photographs that meet the published specification.',
          'A medical check-up. Pilgrims are asked to show that they are fit to travel, and the vaccinations Saudi Arabia requires are given before departure.',
          'Savings set aside for the full cost, which is announced for each season.',
          'If you are applying as a family, a decision on who will travel together, so that names and documents match.',
        ],
      },
      { type: 'h2', id: 'learn-the-rites', text: 'Learn the rites before the season' },
      {
        type: 'p',
        text: 'Whichever route you take, the months before Hajj are a time to learn. Classes on the rites, on the days in Mina, Arafat and Muzdalifah, and on the practicalities of living among millions of pilgrims make the journey calmer. Pilgrims attend classes run by their local mosque, the Haj committees or their group organiser.',
      },
      {
        type: 'p',
        text: 'Prepare your body as well. Hajj involves long walks in the heat, so begin walking every day, months before you leave.',
      },
      { type: 'h2', id: 'questions', text: 'Questions to ask any Hajj operator' },
      {
        type: 'ul',
        items: [
          'Are you registered as a Haj Group Organiser for this season, and may I see the registration?',
          'Where are the hotels in Makkah and Madinah, and how far are they from the Haram?',
          'What are the arrangements in Mina and Arafat?',
          'Who leads the group, and which languages do they speak?',
          'What exactly is included in the price, and what is not?',
          'What happens if the flight dates change?',
        ],
      },
    ],
  },
  {
    slug: 'istanbul-for-muslim-travellers',
    title: 'Istanbul for Muslim travellers: mosques, food and a gentle pace',
    excerpt:
      'Historic mosques, the resting place of Abu Ayyub al-Ansari, halal food on every street and a city on two continents: planning Istanbul for families from Kerala.',
    category: 'travel',
    date: '2026-08-28',
    image: 'intl-istanbul-golden-horn',
    related: ['umrah-with-elderly-parents', 'umrah-visa-documents-india', 'visiting-madinah'],
    body: [
      {
        type: 'p',
        text: 'For many Muslim families from Kerala, Istanbul is the first holiday abroad after Umrah: a city where the call to prayer carries across the water, halal food is the norm and history is everywhere. It is also big, busy and hilly, so a little planning goes a long way.',
      },
      { type: 'h2', id: 'mosques', text: 'The great mosques' },
      {
        type: 'p',
        text: 'Istanbul’s skyline is a skyline of domes and minarets. Most of the historic mosques are working mosques that welcome visitors outside prayer times, so plan your visits between prayers and dress modestly: women cover their hair, and everyone removes their shoes at the door.',
      },
      {
        type: 'ul',
        items: [
          'The Sultan Ahmed Mosque, known as the Blue Mosque for the tiles inside, faces Hagia Sophia across a garden square.',
          'Hagia Sophia, built as a church in the sixth century, served as a mosque from 1453, became a museum in the last century and has been a working mosque again since 2020. Visiting arrangements change, so check before you go.',
          'The Süleymaniye Mosque, on a hill above the Golden Horn, is a masterpiece of the architect Sinan, with calm courtyards and some of the finest views in the city.',
        ],
      },
      { type: 'h2', id: 'eyup-sultan', text: 'Eyüp Sultan' },
      {
        type: 'p',
        text: 'Up the Golden Horn stands the Eyüp Sultan Mosque, beside the resting place of Abu Ayyub al-Ansari (may Allah be pleased with him), the companion in whose house the Prophet (peace be upon him) stayed when he first arrived in Madinah. Abu Ayyub died during an early siege of Constantinople, and his tomb is one of the most visited places in the city. The hill above, reached on foot or by cable car, has long views over the water.',
      },
      { type: 'h2', id: 'topkapi', text: 'Topkapi Palace and the sacred relics' },
      {
        type: 'p',
        text: 'Topkapi Palace, the home of the Ottoman sultans for centuries, keeps a collection of sacred relics, including items associated with the Prophet (peace be upon him), in a quiet chamber where the Quran is recited. Allow at least half a day for the palace and its courtyards.',
      },
      { type: 'h2', id: 'food', text: 'Food' },
      {
        type: 'p',
        text: 'Türkiye is a Muslim-majority country, and most food in Istanbul is halal, from simit and grilled corn on the street to kebab houses and fish sandwiches by the water. Families from Kerala usually find the food mild, so ask for chilli flakes if you miss the spice. Some restaurants serve alcohol; family restaurants, known as lokanta, are a relaxed choice.',
      },
      { type: 'h2', id: 'getting-around', text: 'Getting around' },
      {
        type: 'p',
        text: 'Istanbul sits on two continents, divided by the Bosphorus. The public ferries between Europe and Asia are one of the city’s great pleasures, and inexpensive. Walking is the best way to see the old city, but the hills are steep, so plan shorter days for elderly parents and take taxis for the longer climbs.',
      },
      { type: 'h2', id: 'when-to-go', text: 'When to go, and visas' },
      {
        type: 'p',
        text: 'Spring, from April to early June, and autumn, from September to October, bring mild weather and thinner crowds. Summers are warm and busy; winters are cold and often wet. In Ramadan, the evenings come alive with iftar in the squares around the great mosques.',
      },
      {
        type: 'note',
        text: 'Indian passport holders need a visa for Türkiye. The type of visa and how to apply depend on your circumstances, and the rules change from time to time, so ask HIJRA’s visa desk to check the current requirements before you book.',
      },
    ],
  },
  {
    slug: 'visiting-madinah',
    title: 'Visiting Madinah: the Prophet’s Mosque and places of ziyarat',
    excerpt:
      'Masjid an-Nabawi, the Rawdah, Quba, Uhud and Masjid al-Qiblatayn: a respectful guide to the places pilgrims visit in Madinah, and how to plan the days there.',
    category: 'umrah',
    date: '2026-08-14',
    image: 'madinah-piazza-umbrellas',
    religious: true,
    related: ['umrah-step-by-step', 'umrah-with-elderly-parents', 'packing-for-makkah-and-madinah'],
    body: [
      {
        type: 'p',
        text: 'A visit to Madinah is not one of the rites of Umrah, yet few pilgrims would think of leaving it out. It is the city that welcomed the Prophet Muhammad (peace be upon him) after the hijrah, his migration from Makkah, and the city where he is buried. Pilgrims often say its pace is gentler than Makkah’s: wide courtyards, cool evenings and a stillness that stays with them long after they return.',
      },
      {
        type: 'p',
        text: 'This article describes places and common practice. For questions of religious practice, follow the scholars you trust.',
      },
      { type: 'h2', id: 'masjid-an-nabawi', text: 'Masjid an-Nabawi' },
      {
        type: 'p',
        text: 'The Prophet’s Mosque is the heart of the city. Its courtyards are shaded by giant umbrellas that open with the morning sun, and its many gates make it easy to arrive from any side. Most pilgrims try to pray as many of the daily prayers there as they can during their stay.',
      },
      {
        type: 'p',
        text: 'Beneath the Green Dome is the grave of the Prophet (peace be upon him), with those of Abu Bakr and Umar (may Allah be pleased with them) beside it. Pilgrims pass by in a slow line to send their greetings of peace. It is a moment for quiet and calm, and visitors are asked to keep moving.',
      },
      { type: 'h2', id: 'rawdah', text: 'The Rawdah' },
      {
        type: 'p',
        text: 'Between the Prophet’s house and his pulpit lies the Rawdah, a small area with green carpets that he described as one of the gardens of Paradise. Many pilgrims hope to pray there. Visits currently need a permit booked in advance through the official app, with separate times for men and women. The procedure has changed in recent years, so your group leader will explain how it works during your stay.',
      },
      { type: 'h2', id: 'quba', text: 'Masjid Quba' },
      {
        type: 'p',
        text: 'About three kilometres south of the Prophet’s Mosque stands Masjid Quba, the first mosque built in Islam, founded when the Prophet (peace be upon him) arrived at Madinah. He visited it often, and pilgrims today go there to pray two units of prayer, ideally having made wudu before leaving their hotel.',
      },
      {
        type: 'image',
        image: 'madinah-quba-mosque',
        caption: 'Masjid Quba, the first mosque built in Islam, to the south of the Prophet’s Mosque.',
      },
      { type: 'h2', id: 'uhud', text: 'Mount Uhud and its martyrs' },
      {
        type: 'p',
        text: 'To the north rises Mount Uhud, where the Battle of Uhud was fought in the third year after the hijrah. At the foot of the mountain lies the cemetery of the martyrs of Uhud, among them Hamzah ibn Abd al-Muttalib, the Prophet’s uncle. Pilgrims visit to remember them and to pray for them.',
      },
      { type: 'h2', id: 'other-visits', text: 'Masjid al-Qiblatayn and other visits' },
      {
        type: 'p',
        text: 'Masjid al-Qiblatayn, the Mosque of the Two Qiblas, is remembered as the place where the direction of prayer was turned from Jerusalem to the Kaaba in Makkah. Group tours of Madinah usually include it, along with the site of the Battle of the Trench and the date farms around the city.',
      },
      {
        type: 'p',
        text: 'Jannat al-Baqi, the cemetery beside the Prophet’s Mosque where many of his family and companions are buried, opens to visitors at set times.',
      },
      { type: 'h2', id: 'planning', text: 'Planning your days in Madinah' },
      {
        type: 'ul',
        items: [
          'Many Umrah packages include several nights in Madinah. If you can, choose more rather than fewer.',
          'A hotel near the mosque makes it easy to return between prayers and to rest.',
          'Ziyarat tours usually run by coach in the morning, before the heat of the day.',
          'Dress modestly and comfortably, with a warm layer for winter evenings.',
          'Carry a cloth bag for your sandals, and agree on a gate number as your meeting point.',
        ],
      },
    ],
  },
  {
    slug: 'the-days-of-hajj',
    title: 'The days of Hajj, explained',
    excerpt:
      'From Mina on the eighth of Dhul Hijjah to the last days of Tashreeq: what happens on each day of Hajj, described simply for families preparing to go.',
    category: 'hajj',
    date: '2026-07-30',
    image: 'hajj-arafat-plain',
    religious: true,
    related: ['hajj-registration-india', 'ihram-what-to-wear-and-avoid', 'umrah-step-by-step'],
    body: [
      {
        type: 'p',
        text: 'Hajj takes place over five or six days in Dhul Hijjah, the last month of the Islamic calendar. The days are full: pilgrims move between Makkah, Mina, Arafat and Muzdalifah, often on foot and always among millions. Knowing the shape of each day before you go is one of the best preparations a pilgrim can make.',
      },
      {
        type: 'p',
        text: 'This overview describes the days as most pilgrims experience them. The rites vary with the type of Hajj, and some details differ between schools of thought, so follow your scholars and your group leader on the rulings that apply to you.',
      },
      { type: 'h2', id: 'before', text: 'Before the days begin' },
      {
        type: 'p',
        text: 'Most pilgrims from India arrive some days or weeks before Hajj, in Makkah or in Madinah. Many perform Umrah on arrival, then wait in Makkah, praying in Masjid al-Haram and resting for what lies ahead. On the eighth of Dhul Hijjah, or before, pilgrims enter ihram for Hajj.',
      },
      { type: 'h2', id: 'mina', text: 'The 8th: Mina' },
      {
        type: 'p',
        text: 'On the eighth, the Day of Tarwiyah, pilgrims go to Mina, a valley a few kilometres from Masjid al-Haram that becomes a city of white tents. The day and the night are spent in prayer and rest, preparing for Arafat.',
      },
      {
        type: 'image',
        image: 'hajj-mina-tent-city',
        caption: 'The tents of Mina, where pilgrims spend the eighth of Dhul Hijjah and the days of Tashreeq.',
      },
      { type: 'h2', id: 'arafat', text: 'The 9th: the standing at Arafat' },
      {
        type: 'p',
        text: 'The ninth is the heart of Hajj. Pilgrims travel to the plain of Arafat and remain there from midday until sunset, in prayer, remembrance and supplication. Many describe it as the most important day of their lives. Some climb Jabal al-Rahmah, the Mount of Mercy, but the standing can be made anywhere within the boundaries of Arafat, and most pilgrims stay in their group’s camp.',
      },
      { type: 'quote', text: 'Hajj is Arafat.', cite: 'The Prophet Muhammad (peace be upon him), in a hadith recorded by at-Tirmidhi' },
      { type: 'p', text: 'After sunset, pilgrims leave Arafat for Muzdalifah.' },
      { type: 'h2', id: 'muzdalifah', text: 'The night at Muzdalifah' },
      {
        type: 'p',
        text: 'Muzdalifah lies between Arafat and Mina. Pilgrims arrive after dark, pray the sunset and night prayers together, and spend the night under the open sky. Many collect here the small pebbles they will need for the stoning in the days ahead. Older and weaker pilgrims, and those caring for them, may be allowed to move on after midnight; your group leader will explain what your group will do.',
      },
      { type: 'h2', id: 'eid', text: 'The 10th: the day of Eid' },
      { type: 'p', text: 'The tenth of Dhul Hijjah is Eid al-Adha, and the busiest day of Hajj. Back in Mina, pilgrims:' },
      {
        type: 'ol',
        items: [
          'Stone the largest pillar, Jamrat al-Aqabah, with seven pebbles.',
          'Offer the sacrifice, if their type of Hajj requires it. Most pilgrims today arrange it through an official scheme rather than in person.',
          'Shave or trim the hair, after which most of the restrictions of ihram are lifted.',
          'Go to Makkah for Tawaf al-Ifadah, followed by sa’i where it is due. These may also be done in the days that follow.',
        ],
      },
      {
        type: 'p',
        text: 'The order of these rites, and what happens when they are done in a different order, is one of the details on which scholars differ. Your group leader will explain the plan for your group.',
      },
      {
        type: 'image',
        image: 'hajj-jamarat-bridge-aerial',
        caption: 'The Jamarat Bridge in Mina, built on several levels so that pilgrims can reach the pillars safely.',
      },
      { type: 'h2', id: 'tashreeq', text: 'The days of Tashreeq' },
      {
        type: 'p',
        text: 'The 11th, the 12th and, for some, the 13th are the days of Tashreeq. Pilgrims stay in Mina and, each day after midday, stone all three pillars in turn, the small, the middle and the large, with seven pebbles each. Those who wish may leave Mina on the 12th before sunset; others stay for the 13th.',
      },
      {
        type: 'p',
        text: 'Before leaving Makkah for home, pilgrims perform the farewell tawaf, Tawaf al-Wada. With it, the Hajj is complete.',
      },
      { type: 'h2', id: 'getting-ready', text: 'Getting ready for the days' },
      {
        type: 'ul',
        items: [
          'Walk every day in the months before Hajj. The days involve long distances in the heat.',
          'Keep a small bag ready for Mina and Arafat: ihram, medicines, a water bottle, a small towel, a phone charger and a power bank.',
          'Learn your group’s camp number and its location in Mina.',
          'Rest whenever you can. The days are long, and steady strength lasts longer than early effort.',
        ],
      },
    ],
  },
];

const AUTHOR = 'HIJRA editorial team';

const wordsIn = (b: BlogBlock) =>
  ('items' in b ? b.items.join(' ') : 'text' in b ? b.text : '').split(/\s+/).filter(Boolean).length;

/** Every article, drafts included: the content record. Pages never read this directly. */
export const allBlogs: BlogPost[] = sources.map((d) => ({
  ...d,
  author: AUTHOR,
  // ~200 words a minute, rounded up.
  readingMinutes: Math.max(1, Math.ceil(d.body.reduce((n, b) => n + wordsIn(b), 0) / 200)),
  status: d.status ?? 'published',
  sample: true,
}));

/** The published articles: the only ones with a page, a listing, related links, a 404-free URL or a sitemap entry. */
export const blogs = allBlogs.filter((b) => b.status === 'published');

export function getBlog(slug: string): BlogPost | undefined {
  return blogs.find((b) => b.slug === slug);
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/** '2026-11-12' -> '12 November 2026' (or '12 Nov 2026' when short). Pure string work: no Date, no time zone. */
export function formatDate(iso: string, short?: boolean) {
  const [y, m, d] = iso.split('-').map(Number);
  const month = MONTHS[m - 1];
  return `${d} ${short ? month.slice(0, 3) : month} ${y}`;
}
