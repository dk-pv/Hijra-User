import type { ImageKey } from './images';

// Domestic and international tours. ALL RECORDS ARE SAMPLES for the preview: the itineraries show how HIJRA's tours
// are presented, with no fares, availability or confirmed departures. HIJRA's own tour data replaces them before
// launch. Destination facts are general guidance; visa rules and seasonal closures must be checked when quoting.

export type IdealFor = 'families' | 'groups' | 'couples' | 'seniors';

export type Tour = {
  slug: string;
  title: string;
  region: 'domestic' | 'international';
  destination: string;
  country: string;
  /** Domestic tours: the state or area shown on tiles (Kerala first). */
  state?: string;
  days: number;
  nights: number;
  summary: string;
  /** Longer introduction for the tour page. */
  overview?: string[];
  /** Meta description, 140 to 160 characters. */
  description?: string;
  highlights: string[];
  itinerary: { day: string; title: string; detail: string }[];
  inclusions: string[];
  exclusions: string[];
  /** "Topic: text" — prayer, food, weather and documents first. */
  notes: string[];
  image: ImageKey;
  gallery: ImageKey[];
  bestTime: string;
  idealFor: IdealFor[];
  fare: null;
  sample: true;
  featured?: boolean;
};

const keralaPickup = 'Pick-up and drop at the airport or your home in Kerala';
const indiaExcludes = ['Lunches and dinners, unless listed', 'Entry tickets and activity fees, unless listed', 'Personal expenses', 'Travel insurance, unless added on request'];
const idNote = 'Documents: Carry a government photo ID for every adult; hotels ask for it at check-in.';

export const tours: Tour[] = [
  // Kerala first
  {
    slug: 'munnar-tea-hills',
    title: 'Munnar and the tea hills',
    region: 'domestic',
    destination: 'Munnar',
    country: 'India',
    state: 'Kerala',
    days: 4,
    nights: 3,
    summary: 'Cool mornings among the tea estates, waterfalls on the drive up and a day at Eravikulam: an easy first holiday for the whole family.',
    overview: [
      'Munnar sits high in the Western Ghats, where tea estates cover the hills for miles. This sample itinerary keeps the drives short and the days unhurried, so it suits grandparents and young children alike.',
      'Your driver collects you from the airport or your home, and the plan can stretch to Thekkady or the backwaters if you have a few more days.',
    ],
    description:
      'A sample four-day Munnar tour from HIJRA Travels: tea estates, waterfalls and Eravikulam National Park, at an easy pace for families. Fares on enquiry.',
    highlights: [
      'The Cheeyappara and Valara waterfalls on the way up',
      'Eravikulam National Park, home of the Nilgiri tahr',
      'Mattupetty Dam, Echo Point and Kundala Lake',
      'The tea museum and a walk through the estates',
    ],
    itinerary: [
      { day: 'Day 1', title: 'Up into the hills', detail: 'Pick-up from Kochi airport or your home. The road climbs past the Cheeyappara and Valara waterfalls, with stops for photographs and tea. Check in and rest.' },
      { day: 'Day 2', title: 'Eravikulam and the tea museum', detail: 'A morning at Eravikulam National Park, where Nilgiri tahr graze on the slopes. In the afternoon, the tea museum and a short walk through the estates.' },
      { day: 'Day 3', title: 'Lakes and viewpoints', detail: 'A gentle day on the Top Station road: Mattupetty Dam, Echo Point and Kundala Lake, stopping wherever the children want. Evening in Munnar town.' },
      { day: 'Day 4', title: 'Down to the plains', detail: 'A slow breakfast, a stop for spices and tea on the way down, and drop at Kochi airport or your home.' },
    ],
    inclusions: ['Three nights in a hotel or resort in Munnar, with breakfast', 'A private vehicle with driver for the whole tour', keralaPickup, 'Sightseeing as listed in the itinerary'],
    exclusions: indiaExcludes,
    notes: [
      'Prayer: Munnar town has mosques, and the days can be planned around Friday prayers.',
      'Food: Halal food is easy to find in town, and most hotels cook Kerala dishes on request.',
      'Weather: Mornings and nights are cool all year, so pack a light jacket. Expect heavy rain from June to August.',
      'Seasons: Eravikulam National Park usually closes for a few weeks early in the year, during the tahr calving season.',
      idNote,
    ],
    image: 'kerala-munnar-tea-hills',
    gallery: [],
    bestTime: 'September to May',
    idealFor: ['families', 'seniors', 'couples', 'groups'],
    fare: null,
    sample: true,
    featured: true,
  },
  {
    slug: 'alappuzha-backwaters',
    title: 'Alappuzha backwaters by houseboat',
    region: 'domestic',
    destination: 'Alappuzha',
    country: 'India',
    state: 'Kerala',
    days: 3,
    nights: 2,
    summary: 'A night on a private houseboat through the canals and paddy fields of Kuttanad, then a quiet day by the sea at Marari.',
    overview: [
      'The backwaters south of Alappuzha are best seen slowly, from the deck of a kettuvallam, the old rice barge rebuilt as a houseboat. Your own crew steers and cooks while villages, mosques and paddy fields drift past.',
      'After a night on the water, the second night is at a beach resort in Marari, a short drive away.',
    ],
    description:
      'A sample three-day Kerala backwaters tour: a private houseboat through Kuttanad, sunset on Vembanad Lake and a beach day at Marari. Planned by HIJRA Travels.',
    highlights: [
      'A private houseboat with its own crew and cook',
      'Kuttanad, where paddy fields lie below sea level',
      'Sunset over Vembanad Lake',
      'A slow beach day at Marari',
    ],
    itinerary: [
      { day: 'Day 1', title: 'On board', detail: 'Arrive in Alappuzha around midday and board your houseboat. Lunch is served on deck as you cruise into the Kuttanad canals. Boats moor for the night by early evening, leaving time for a walk along the bank.' },
      { day: 'Day 2', title: 'To the coast', detail: 'Breakfast on board, then a short drive to Marari. The afternoon is free for the beach, a walk through the fishing village or simply rest.' },
      { day: 'Day 3', title: 'Home', detail: 'A slow morning by the sea, then drop at Kochi airport or your home.' },
    ],
    inclusions: [
      'One night on a private houseboat, with lunch, dinner and breakfast on board',
      'One night at a beach resort in Marari, with breakfast',
      'A private vehicle with driver for transfers',
      keralaPickup,
    ],
    exclusions: ['Meals not listed', 'Personal expenses', 'Travel insurance, unless added on request'],
    notes: [
      'Prayer: Houseboats have room on deck to pray; the crew can show you the qibla direction.',
      'Food: Meals are cooked on board: fish, chicken and Kerala vegetarian dishes. Tell us if you need halal-certified meat.',
      'Weather: Warm and humid all year; the monsoon brings heavy rain from June to August.',
      'Documents: The houseboat operator records a government photo ID for every adult guest.',
    ],
    image: 'kerala-alappuzha-houseboat',
    gallery: [],
    bestTime: 'August to March',
    idealFor: ['families', 'couples', 'seniors'],
    fare: null,
    sample: true,
  },
  {
    slug: 'wayanad-hills',
    title: 'Wayanad: forests, lakes and caves',
    region: 'domestic',
    destination: 'Wayanad',
    country: 'India',
    state: 'Kerala',
    days: 3,
    nights: 2,
    summary: 'Up the hairpin bends from Kozhikode into cool forest country: Pookode Lake, the carvings of Edakkal and the heart-shaped lake on Chembra Peak.',
    overview: [
      'Wayanad is the green plateau above Kozhikode, a short drive from the Malabar coast and a world away from its heat. Forests, spice gardens and reservoirs fill the days, and the nights are quiet.',
      'The plan avoids long walks for those who prefer it: Edakkal and Chembra are steep climbs, so older travellers can swap them for a garden, a viewpoint or a boat on the reservoir.',
    ],
    description:
      'A sample three-day Wayanad tour from HIJRA Travels: the ghat road from Kozhikode, Pookode Lake, Edakkal Caves and Chembra Peak. Fares on enquiry.',
    highlights: [
      'The Thamarassery ghat road and the Lakkidi viewpoint',
      'Pookode, a freshwater lake ringed by forest',
      'Edakkal Caves and its ancient rock carvings',
      'Chembra Peak’s heart-shaped lake, for walkers',
    ],
    itinerary: [
      { day: 'Day 1', title: 'The ghat road', detail: 'Pick-up from Kozhikode airport or your home. The road climbs the Thamarassery ghat to the Lakkidi viewpoint and on to Pookode Lake for an evening by the water.' },
      { day: 'Day 2', title: 'Edakkal and the spice gardens', detail: 'Edakkal Caves in the morning, where ancient carvings cover the rock walls. Lunch in Sulthan Bathery, then a spice garden and a quiet evening at your stay.' },
      { day: 'Day 3', title: 'Chembra or Banasura Sagar', detail: 'For walkers, an early start up Chembra Peak to its heart-shaped lake, when the trail is open; for everyone else, a morning on the Banasura Sagar reservoir. Then the drive back down to Kozhikode.' },
    ],
    inclusions: ['Two nights in a resort or plantation stay, with breakfast', 'A private vehicle with driver', keralaPickup, 'Sightseeing as listed in the itinerary'],
    exclusions: indiaExcludes,
    notes: [
      'Prayer: There are mosques in Kalpetta, Sulthan Bathery and along the main roads.',
      'Food: Halal food is widely available, and plantation stays cook Malabar dishes on request.',
      'Weather: Cool and misty for much of the year. Some sites close after heavy monsoon rain.',
      'Pace: Edakkal and Chembra are steep climbs on steps, rock and grass; tell us if anyone needs an easier day.',
      idNote,
    ],
    image: 'kerala-wayanad-chembra-heart-lake',
    gallery: [],
    bestTime: 'October to May',
    idealFor: ['families', 'groups', 'couples'],
    fare: null,
    sample: true,
  },
  {
    slug: 'kochi-athirappilly',
    title: 'Kochi and Athirappilly',
    region: 'domestic',
    destination: 'Kochi',
    country: 'India',
    state: 'Kerala',
    days: 3,
    nights: 2,
    summary: 'The old port of Fort Kochi and Mattancherry, with its Chinese fishing nets and historic mosques, and a day at the Athirappilly waterfalls.',
    overview: [
      'Kochi has traded with Arabia, China and Europe for centuries, and its old quarters still show it: fishing nets on the shore, warehouses full of spices, and old mosques in the lanes of Kochangadi and Mattancherry.',
      'A day trip inland brings you to Athirappilly, the largest waterfall in Kerala, at its fullest just after the monsoon.',
    ],
    description:
      'A sample three-day Kochi tour from HIJRA Travels: Fort Kochi, the old mosques and spice warehouses of Mattancherry, and the Athirappilly waterfalls.',
    highlights: [
      'The Chinese fishing nets at Fort Kochi',
      'The old mosques of Kochangadi and Mattancherry',
      'Mattancherry Palace and the spice warehouses',
      'A day at the Athirappilly and Vazhachal waterfalls',
    ],
    itinerary: [
      { day: 'Day 1', title: 'Fort Kochi', detail: 'Arrive in Kochi and check in. In the late afternoon, walk along the shore by the fishing nets and through the lanes of Fort Kochi as the sun sets.' },
      { day: 'Day 2', title: 'Mattancherry and the old port', detail: 'Mattancherry Palace, the spice warehouses and the old mosques of Kochangadi. Evening on Marine Drive, with time for shopping.' },
      { day: 'Day 3', title: 'Athirappilly', detail: 'A morning drive to the Athirappilly and Vazhachal waterfalls and a walk to the viewpoints, then drop at Kochi airport or your home.' },
    ],
    inclusions: ['Two nights in a hotel in Kochi, with breakfast', 'A private vehicle with driver', keralaPickup, 'Sightseeing as listed in the itinerary'],
    exclusions: indiaExcludes,
    notes: [
      'Prayer: Mosques are close by throughout Kochi, including the historic mosques of Kochangadi and Mattancherry.',
      'Food: Kochi is known for its biryani and seafood, and halal food is easy to find.',
      'Weather: Warm and humid all year. Athirappilly is fullest from August to October, and the paths can be slippery.',
      'Opening days: Mattancherry Palace is usually closed on Fridays, so the days are ordered around it.',
      idNote,
    ],
    image: 'kerala-kochi-fishing-nets',
    gallery: ['kerala-athirappilly-falls'],
    bestTime: 'October to March',
    idealFor: ['families', 'seniors', 'groups'],
    fare: null,
    sample: true,
  },
  {
    slug: 'malabar-coast-kozhikode-bekal',
    title: 'The Malabar coast: Kozhikode to Bekal',
    region: 'domestic',
    destination: 'Kozhikode',
    country: 'India',
    state: 'Kerala',
    days: 4,
    nights: 3,
    summary: 'Malabar’s Mappila heritage along the coast: the old mosques of Kozhikode, the dhow builders of Beypore, the Arakkal palace in Kannur and the sea fort at Bekal.',
    overview: [
      'North Kerala’s coast traded with Arabia for centuries, and its Muslim heritage runs deep: mosques of carved wood in Kozhikode, the yards where Beypore’s wooden dhows are still built by hand, and the palace of the Arakkal family, Kerala’s only Muslim royal house, in Kannur.',
      'The tour ends at Bekal, where a laterite fort stands on a headland above long, quiet beaches.',
    ],
    description:
      'A sample four-day Malabar heritage tour by HIJRA Travels: the Mishkal Mosque in Kozhikode, Beypore’s dhow yards, Kannur’s Arakkal palace and Bekal Fort.',
    highlights: [
      'The Mishkal Mosque and the old quarter of Kuttichira',
      'The uru yards of Beypore, where wooden dhows are built by hand',
      'The Arakkal Museum in Kannur',
      'Bekal Fort and the beaches below it',
      'The historic Malik Dinar mosque in Kasaragod',
    ],
    itinerary: [
      { day: 'Day 1', title: 'Kozhikode', detail: 'Pick-up from Kozhikode airport or your home. The Mishkal Mosque and the lanes of Kuttichira, then sunset on Kozhikode beach and halwa on SM Street.' },
      { day: 'Day 2', title: 'Beypore to Kannur', detail: 'The uru yards of Beypore in the morning, then north along the coast to Kannur for the Arakkal Museum and an evening by the sea.' },
      { day: 'Day 3', title: 'Bekal', detail: 'On to Bekal for an afternoon on the walls of the fort, and the beach below it at sunset.' },
      { day: 'Day 4', title: 'Kasaragod', detail: 'The Malik Dinar mosque in Kasaragod, then drop at Kannur or Mangaluru airport, or your home.' },
    ],
    inclusions: ['Three nights in hotels and a beach resort, with breakfast', 'A private vehicle with driver', keralaPickup, 'Sightseeing as listed in the itinerary'],
    exclusions: indiaExcludes,
    notes: [
      'Prayer: Every town on the coast has mosques, and Friday prayers fit easily into the plan.',
      'Food: Halal food is the norm in Malabar; try the biryani, the seafood and the Mappila snacks.',
      'Weather: Hot from March to May, with heavy rain from June to August.',
      'Visits: Entry to working mosques follows each mosque’s own practice; your driver or guide checks before each visit.',
      idNote,
    ],
    image: 'kerala-bekal-beach',
    gallery: ['kerala-kozhikode-mishkal-mosque'],
    bestTime: 'October to March',
    idealFor: ['families', 'groups', 'seniors'],
    fare: null,
    sample: true,
  },

  // The rest of India
  {
    slug: 'kashmir-srinagar-gulmarg',
    title: 'Kashmir: Srinagar, Gulmarg and Sonamarg',
    region: 'domestic',
    destination: 'Srinagar',
    country: 'India',
    state: 'Kashmir',
    days: 6,
    nights: 5,
    summary: 'A houseboat on Dal Lake, the Mughal gardens, the Hazratbal shrine and the meadows of Gulmarg and Sonamarg, at an unhurried pace.',
    overview: [
      'Kashmir rewards a slow pace: a night on a houseboat, mornings in the Mughal gardens, and long days in the high meadows. The valley’s mosques and shrines are part of the plan, and halal food is everywhere.',
      'The itinerary leaves a free day in Srinagar, which you can keep for the markets or use for a longer drive.',
    ],
    description:
      'A sample six-day Kashmir tour from HIJRA Travels: a Dal Lake houseboat, the Mughal gardens, Hazratbal, Gulmarg and Sonamarg, planned for families.',
    highlights: [
      'A night on a houseboat, and a shikara ride on Dal Lake',
      'Nishat and Shalimar, the Mughal gardens',
      'The Hazratbal shrine and the Jamia Masjid',
      'The Gulmarg gondola, weather permitting',
      'The Sonamarg valley and the Thajiwas glacier',
    ],
    itinerary: [
      { day: 'Day 1', title: 'Srinagar and Dal Lake', detail: 'Arrive in Srinagar and check in to your houseboat. A shikara ride across Dal Lake at sunset.' },
      { day: 'Day 2', title: 'Gardens and mosques', detail: 'The Mughal gardens of Nishat and Shalimar, the Hazratbal shrine on the lake shore and the Jamia Masjid in the old city. Move to a hotel in the evening.' },
      { day: 'Day 3', title: 'Gulmarg', detail: 'A day in the meadows of Gulmarg, with a ride on the gondola when the weather allows. Back to Srinagar for the night.' },
      { day: 'Day 4', title: 'Sonamarg', detail: 'Along the Sindh valley to Sonamarg for the meadows and, for those who wish, a pony ride towards the Thajiwas glacier.' },
      { day: 'Day 5', title: 'Srinagar at leisure', detail: 'A free day for the markets of walnut wood, pashmina and dry fruits, or simply time by the lake.' },
      { day: 'Day 6', title: 'Home', detail: 'Drop at Srinagar airport for your flight home.' },
    ],
    inclusions: [
      'One night on a houseboat and four nights in a Srinagar hotel, with breakfast and dinner',
      'Airport transfers and a private vehicle with driver',
      'A shikara ride on Dal Lake',
      'Sightseeing as listed in the itinerary',
    ],
    exclusions: ['Flights to and from Srinagar, unless added', 'Gondola tickets, pony rides and local taxis in Gulmarg and Sonamarg', 'Lunches', 'Personal expenses', 'Travel insurance, unless added on request'],
    notes: [
      'Prayer: Kashmir is predominantly Muslim; mosques are never far away, and the call to prayer carries across Dal Lake.',
      'Food: Halal food is the norm. Try a traditional wazwan meal at least once.',
      'Weather: Summer days are mild and evenings cool. Winter brings snow, and high roads can close.',
      'Documents: Carry a government photo ID, as some roads have checkpoints. Some prepaid mobile connections from other states do not work in the valley, so check with your operator.',
    ],
    image: 'india-kashmir-dal-lake',
    gallery: [],
    bestTime: 'April to October',
    idealFor: ['families', 'couples', 'groups'],
    fare: null,
    sample: true,
    featured: true,
  },
  {
    slug: 'delhi-agra-jaipur',
    title: 'Delhi, Agra and Jaipur',
    region: 'domestic',
    destination: 'Agra',
    country: 'India',
    state: 'North India',
    days: 6,
    nights: 5,
    summary: 'The Mughal north in six days: Old Delhi’s Jama Masjid, the Taj Mahal at sunrise, Fatehpur Sikri and the forts and palaces of Jaipur.',
    overview: [
      'Three cities and two empires: the Mughal capitals of Delhi, Agra and Fatehpur Sikri, and the Rajput city of Jaipur. The drives between them are on good highways, and each day ends at a comfortable hotel.',
      'The plan keeps the Taj Mahal off Fridays, when it is closed to visitors, and leaves time for Friday prayers at one of the great mosques.',
    ],
    description:
      'A sample six-day tour of Delhi, Agra and Jaipur by HIJRA Travels: the Jama Masjid, the Taj Mahal at sunrise, Fatehpur Sikri and Amber Fort. Fare on enquiry.',
    highlights: [
      'The Jama Masjid of Old Delhi and Chandni Chowk',
      'Humayun’s Tomb and the Qutub Minar',
      'The Taj Mahal at sunrise, and Agra Fort',
      'Fatehpur Sikri and its great mosque',
      'Amber Fort and the palaces of Jaipur',
    ],
    itinerary: [
      { day: 'Day 1', title: 'Old Delhi', detail: 'Arrive in Delhi. In the afternoon, the Jama Masjid and the lanes of Chandni Chowk, with dinner in the old city.' },
      { day: 'Day 2', title: 'New Delhi to Agra', detail: 'Humayun’s Tomb and the Qutub Minar in the morning, then the drive to Agra along the expressway.' },
      { day: 'Day 3', title: 'The Taj Mahal', detail: 'The Taj Mahal at sunrise, Agra Fort after breakfast, and a quiet afternoon at the hotel.' },
      { day: 'Day 4', title: 'Fatehpur Sikri to Jaipur', detail: 'Fatehpur Sikri, Akbar’s abandoned capital, with its great mosque and gateway, then on to Jaipur.' },
      { day: 'Day 5', title: 'Jaipur', detail: 'Amber Fort in the morning, the City Palace and Hawa Mahal in the afternoon, and time in the bazaars.' },
      { day: 'Day 6', title: 'Home', detail: 'Drop at Jaipur airport for your flight home, or the drive back to Delhi.' },
    ],
    inclusions: ['Five nights in hotels, with breakfast', 'A private air-conditioned vehicle with driver', 'Local guides at the main monuments', 'Airport transfers'],
    exclusions: ['Flights to Delhi and from Jaipur, unless added', 'Monument entry tickets', 'Lunches and dinners', 'Personal expenses'],
    notes: [
      'Prayer: Friday prayers at the Jama Masjid in Delhi or at Fatehpur Sikri can be built into the plan.',
      'Food: Halal Mughlai food is easy to find in Delhi and Agra; in Jaipur we suggest trusted restaurants.',
      'Weather: Very hot from April to June. Winter mornings can be foggy, which sometimes delays flights.',
      'Documents: Carry a government photo ID; monuments and hotels check it.',
    ],
    image: 'india-agra-taj-mahal',
    gallery: [],
    bestTime: 'October to March',
    idealFor: ['families', 'groups', 'seniors'],
    fare: null,
    sample: true,
  },

  // International
  {
    slug: 'istanbul-bursa',
    title: 'Istanbul and Bursa',
    region: 'international',
    destination: 'Istanbul',
    country: 'Türkiye',
    days: 7,
    nights: 6,
    summary: 'Six centuries of Ottoman heritage: the great mosques of Istanbul, a cruise on the Bosphorus, and Bursa, the first Ottoman capital.',
    overview: [
      'Istanbul is a city of mosques, bazaars and water, and it suits families who want history with their holiday. This sample itinerary gives the old city two full days, adds the Bosphorus and the Golden Horn, and crosses the Sea of Marmara to Bursa.',
      'Istanbul can also be combined with Umrah on the same journey; ask your advisor how the two fit together.',
    ],
    description:
      'A sample seven-day Istanbul and Bursa tour from HIJRA Travels: Hagia Sophia, the Blue Mosque, the Süleymaniye, a Bosphorus cruise and Ottoman Bursa.',
    highlights: [
      'Hagia Sophia, the Blue Mosque and the Süleymaniye',
      'Topkapı Palace and the Grand Bazaar',
      'A cruise on the Bosphorus between Europe and Asia',
      'Eyüp Sultan Mosque on the Golden Horn',
      'Bursa’s Grand Mosque and its silk bazaar',
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrive in Istanbul', detail: 'Arrive and transfer to your hotel in the old city. An evening walk around Sultanahmet Square.' },
      { day: 'Day 2', title: 'The old city', detail: 'Hagia Sophia and the Blue Mosque, timed around the prayers, then Topkapı Palace and an afternoon in the Grand Bazaar.' },
      { day: 'Day 3', title: 'The Süleymaniye and the Bosphorus', detail: 'The Süleymaniye Mosque and the Spice Bazaar in the morning, and a cruise along the Bosphorus in the afternoon.' },
      { day: 'Day 4', title: 'Eyüp and the Golden Horn', detail: 'Eyüp Sultan Mosque on the Golden Horn and the hill above it for the view. The afternoon is yours.' },
      { day: 'Day 5', title: 'Bursa', detail: 'A day across the Sea of Marmara in Bursa: the Grand Mosque, the Green Mosque and the silk bazaar, with İskender kebab for lunch.' },
      { day: 'Day 6', title: 'At your own pace', detail: 'A free day for shopping, or a ferry to the Princes’ Islands.' },
      { day: 'Day 7', title: 'Home', detail: 'Transfer to the airport for your flight home.' },
    ],
    inclusions: ['Six nights in a hotel in the old city, with breakfast', 'Airport transfers', 'Guided sightseeing on days 2 to 5, with entry tickets as listed', 'A Bosphorus cruise', 'Visa assistance'],
    exclusions: ['Flights, unless added', 'The visa fee', 'Lunches and dinners', 'Personal expenses', 'Travel insurance, unless added on request'],
    notes: [
      'Prayer: Istanbul’s mosques are open for prayer; sightseeing inside pauses at prayer times, and the days are planned around them.',
      'Food: Most meat in Türkiye is halal. On request we suggest restaurants that do not serve alcohol.',
      'Weather: Spring and autumn are mild; summers are warm, and winters cold and wet.',
      'Documents: Indian passport holders need a visa for Türkiye. HIJRA confirms the current process and checks your passport validity.',
    ],
    image: 'intl-istanbul-golden-horn',
    gallery: [],
    bestTime: 'Spring and autumn',
    idealFor: ['families', 'couples', 'groups', 'seniors'],
    fare: null,
    sample: true,
    featured: true,
  },
  {
    slug: 'dubai-abu-dhabi',
    title: 'Dubai and Abu Dhabi',
    region: 'international',
    destination: 'Dubai',
    country: 'UAE',
    days: 5,
    nights: 4,
    summary: 'The Sheikh Zayed Grand Mosque, the souks and creek of old Dubai, a desert evening and the new skyline, a short flight from Kerala.',
    overview: [
      'The Emirates are close to home, and a holiday there is easy: short flights from Kerala, halal food everywhere and prayer rooms in every mall. This sample tour balances old Dubai, the modern city and a day in Abu Dhabi.',
      'If you have family living in the UAE, the days can be planned around visits to them.',
    ],
    description:
      'A sample five-day Dubai and Abu Dhabi tour by HIJRA Travels: the Sheikh Zayed Grand Mosque, the creek and souks, a desert evening. Planned for families.',
    highlights: [
      'The Sheikh Zayed Grand Mosque in Abu Dhabi',
      'An abra across Dubai Creek to the gold and spice souks',
      'An evening in the desert, with dinner at a camp',
      'The view from the Burj Khalifa, for those who wish',
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrive in Dubai', detail: 'Arrive and transfer to your hotel. In the evening, a dinner cruise on Dubai Creek.' },
      { day: 'Day 2', title: 'Old and new Dubai', detail: 'The Al Fahidi historic district, an abra across the creek to the gold and spice souks, and the modern city in the afternoon, with the Burj Khalifa for those who wish.' },
      { day: 'Day 3', title: 'Abu Dhabi', detail: 'A day in the capital: the Sheikh Zayed Grand Mosque, Qasr Al Watan and the Corniche.' },
      { day: 'Day 4', title: 'The desert', detail: 'A free morning, then a drive into the desert for the dunes, the sunset and dinner at a desert camp.' },
      { day: 'Day 5', title: 'Home', detail: 'Transfer to the airport for your flight home.' },
    ],
    inclusions: ['Four nights in a Dubai hotel, with breakfast', 'Airport transfers', 'A Dubai city tour and an Abu Dhabi day trip', 'A dhow dinner cruise and a desert evening', 'Visa assistance'],
    exclusions: ['Flights, unless added', 'Burj Khalifa and entry tickets not listed', 'Lunches', 'The tourism fee hotels collect at check-out', 'Personal expenses'],
    notes: [
      'Prayer: Mosques and prayer rooms are everywhere, including malls and petrol stations.',
      'Food: Halal food is the norm across the UAE.',
      'Weather: November to March is pleasant; summer temperatures often pass 40 °C.',
      'Dress: The Sheikh Zayed Grand Mosque asks visitors to dress modestly, and women to cover their hair.',
      'Documents: Indian passport holders usually need a UAE visa arranged before travel. HIJRA confirms what applies to you.',
    ],
    image: 'intl-dubai-creek-abra',
    gallery: [],
    bestTime: 'November to March',
    idealFor: ['families', 'groups', 'couples', 'seniors'],
    fare: null,
    sample: true,
  },
  {
    slug: 'malaysia-singapore',
    title: 'Kuala Lumpur and Singapore',
    region: 'international',
    destination: 'Kuala Lumpur',
    country: 'Malaysia and Singapore',
    days: 7,
    nights: 6,
    summary: 'The towers and mosques of Kuala Lumpur, Putrajaya’s lakeside mosque and the cool air of Genting, then three days in Singapore.',
    overview: [
      'Malaysia is a Muslim-majority country made for family holidays: halal food is everywhere, malls have prayer rooms, and the cities are clean and easy to get around. Singapore adds gardens, the waterfront and Sentosa island.',
      'The plan gives Kuala Lumpur and its surroundings three days, then drives south to Singapore for the rest of the week.',
    ],
    description:
      'A sample seven-day Malaysia and Singapore tour by HIJRA Travels: Kuala Lumpur, the Putra Mosque, Genting Highlands, Marina Bay and Sentosa. Fare on enquiry.',
    highlights: [
      'The Petronas Twin Towers and the National Mosque',
      'Putrajaya and the Putra Mosque by the lake',
      'The cable car up to Genting Highlands',
      'Singapore’s Marina Bay and Gardens by the Bay',
      'The Sultan Mosque in Kampong Glam',
    ],
    itinerary: [
      { day: 'Day 1', title: 'Kuala Lumpur', detail: 'Arrive and transfer to your hotel. An evening at the Petronas Twin Towers and the park below them.' },
      { day: 'Day 2', title: 'The city and Putrajaya', detail: 'The National Mosque, Merdeka Square and the Islamic Arts Museum in the morning; Putrajaya and the Putra Mosque in the afternoon.' },
      { day: 'Day 3', title: 'Genting Highlands', detail: 'A cable car ride up to Genting Highlands for the cool air and the views, then back to the city.' },
      { day: 'Day 4', title: 'South to Singapore', detail: 'A morning drive south to Singapore, with stops on the way, and an evening on the Marina Bay waterfront.' },
      { day: 'Day 5', title: 'Singapore', detail: 'The Sultan Mosque and the lanes of Kampong Glam in the morning, and Gardens by the Bay in the afternoon.' },
      { day: 'Day 6', title: 'Sentosa', detail: 'A day on Sentosa island: beaches, the cable car and the attractions, at your own pace.' },
      { day: 'Day 7', title: 'Home', detail: 'Transfer to Changi airport for your flight home.' },
    ],
    inclusions: ['Six nights in hotels, with breakfast', 'Airport transfers and the drive from Kuala Lumpur to Singapore', 'Sightseeing in Kuala Lumpur, Putrajaya and Singapore', 'The Genting trip', 'Visa assistance'],
    exclusions: ['International flights, unless added', 'Cable car and attraction tickets not listed', 'Lunches and dinners', 'Personal expenses'],
    notes: [
      'Prayer: Malaysian malls, attractions and highway stops have prayer rooms (surau); in Singapore, the Sultan Mosque and others are close to the centre.',
      'Food: Halal-certified food is easy to find in Malaysia, and in Singapore many restaurants display a halal certificate.',
      'Weather: Hot and humid all year, with short afternoon showers.',
      'Documents: Entry rules for Indian passport holders differ between Malaysia and Singapore and change from time to time. HIJRA confirms both before you travel.',
    ],
    image: 'intl-putrajaya-putra-mosque',
    gallery: ['intl-singapore-marina-bay'],
    bestTime: 'All year',
    idealFor: ['families', 'couples', 'groups'],
    fare: null,
    sample: true,
  },
  {
    slug: 'egypt-cairo-nile',
    title: 'Egypt: Cairo and the Nile',
    region: 'international',
    destination: 'Cairo',
    country: 'Egypt',
    days: 8,
    nights: 7,
    summary: 'The Pyramids of Giza, the great mosques of Islamic Cairo, and three nights on the Nile between Luxor and Aswan.',
    overview: [
      'Egypt combines some of the oldest monuments in the world with great mosques of the Islamic world. Cairo gets three days: Giza, the museums and the old Islamic city around Al-Azhar.',
      'Then a short flight south to Luxor and a cruise up the Nile to Aswan, with temples along the banks.',
    ],
    description:
      'A sample eight-day Egypt tour by HIJRA Travels: the Pyramids of Giza, Al-Azhar and Islamic Cairo, and a Nile cruise from Luxor to Aswan. Fares on enquiry.',
    highlights: [
      'The Pyramids of Giza and the Sphinx',
      'Al-Azhar, Sultan Hassan and the Muhammad Ali Mosque',
      'The Khan el-Khalili bazaar',
      'Three nights on the Nile, Luxor to Aswan',
      'A felucca sail at Aswan',
    ],
    itinerary: [
      { day: 'Day 1', title: 'Cairo', detail: 'Arrive in Cairo and transfer to your hotel.' },
      { day: 'Day 2', title: 'Giza', detail: 'The Pyramids of Giza and the Sphinx in the morning, and the Grand Egyptian Museum in the afternoon.' },
      { day: 'Day 3', title: 'Islamic Cairo', detail: 'Al-Azhar Mosque, the Sultan Hassan Mosque and the Citadel with the Muhammad Ali Mosque, then the Khan el-Khalili bazaar.' },
      { day: 'Day 4', title: 'To Luxor', detail: 'Fly to Luxor and board your Nile cruise. Karnak and Luxor temples in the afternoon.' },
      { day: 'Day 5', title: 'The Valley of the Kings', detail: 'The west bank of Luxor in the morning, then sail south towards Edfu.' },
      { day: 'Day 6', title: 'Edfu and Kom Ombo', detail: 'The temples of Edfu and Kom Ombo as the boat sails on to Aswan.' },
      { day: 'Day 7', title: 'Aswan', detail: 'A felucca sail around the islands of Aswan, then fly back to Cairo.' },
      { day: 'Day 8', title: 'Home', detail: 'Transfer to Cairo airport for your flight home.' },
    ],
    inclusions: [
      'Four nights in a Cairo hotel with breakfast, and three nights on a Nile cruise with meals',
      'Flights from Cairo to Luxor and from Aswan to Cairo',
      'Guided sightseeing, with entry tickets as listed',
      'Airport transfers',
      'Visa assistance',
    ],
    exclusions: ['International flights, unless added', 'Lunches and dinners in Cairo', 'Tips for guides and crew', 'Personal expenses', 'Travel insurance, unless added on request'],
    notes: [
      'Prayer: Egypt is a Muslim-majority country, and the call to prayer is part of every day; cruise days include breaks for prayer.',
      'Food: Halal food is the norm, and Nile cruises serve buffet meals.',
      'Weather: October to April is best. Luxor and Aswan are very hot in summer, and desert nights can be cold in winter.',
      'Documents: Indian passport holders need a visa for Egypt. HIJRA confirms the current process when you enquire.',
    ],
    image: 'intl-cairo-giza-pyramids',
    gallery: [],
    bestTime: 'October to April',
    idealFor: ['families', 'groups', 'couples'],
    fare: null,
    sample: true,
  },
  {
    slug: 'uzbekistan-samarkand-bukhara',
    title: 'Uzbekistan: Samarkand and Bukhara',
    region: 'international',
    destination: 'Samarkand',
    country: 'Uzbekistan',
    days: 8,
    nights: 7,
    summary: 'Turquoise domes on the old Silk Road: Tashkent, the old city of Bukhara, the Registan of Samarkand and the memorial of Imam al-Bukhari.',
    overview: [
      'Uzbekistan’s Silk Road cities hold some of the finest Islamic architecture anywhere: the tiled madrasas of the Registan, the blue domes of Samarkand and the trading domes of Bukhara. It is also the land of Imam al-Bukhari, whose memorial complex stands outside Samarkand.',
      'A short flight and two long, comfortable drives link the cities, with time in each to walk the old quarters.',
    ],
    description:
      'A sample eight-day Uzbekistan tour by HIJRA Travels: Tashkent, old Bukhara, the Registan of Samarkand and the memorial complex of Imam al-Bukhari.',
    highlights: [
      'The Registan and its three madrasas in Samarkand',
      'The memorial complex of Imam al-Bukhari',
      'Old Bukhara and the Kalyan minaret',
      'The Hazrati Imam complex in Tashkent',
    ],
    itinerary: [
      { day: 'Day 1', title: 'Tashkent', detail: 'Arrive in Tashkent and transfer to your hotel. An evening walk in the city centre.' },
      { day: 'Day 2', title: 'Old Tashkent', detail: 'The Hazrati Imam complex, whose library keeps a celebrated early manuscript of the Quran, and the Chorsu bazaar. Evening flight to Bukhara.' },
      { day: 'Day 3', title: 'Bukhara', detail: 'The old city on foot: Lyabi-Hauz, the trading domes, and the Kalyan minaret and mosque.' },
      { day: 'Day 4', title: 'Bukhara at leisure', detail: 'The Ark fortress and the Samanid mausoleum in the morning, and a free afternoon in the bazaars.' },
      { day: 'Day 5', title: 'To Samarkand', detail: 'A long, comfortable drive east to Samarkand, with stops on the way.' },
      { day: 'Day 6', title: 'Samarkand', detail: 'The Registan, the Bibi-Khanym Mosque and the Siab bazaar, and the Registan again after dark.' },
      { day: 'Day 7', title: 'Imam al-Bukhari', detail: 'The memorial complex of Imam al-Bukhari outside Samarkand, then back to Tashkent for the night.' },
      { day: 'Day 8', title: 'Home', detail: 'Transfer to Tashkent airport for your flight home.' },
    ],
    inclusions: ['Seven nights in hotels, with breakfast', 'The flight from Tashkent to Bukhara', 'A private vehicle with driver between the cities', 'Guided sightseeing, with entry tickets as listed', 'Visa assistance'],
    exclusions: ['International flights, unless added', 'Lunches and dinners', 'Camera fees at some monuments', 'Personal expenses', 'Travel insurance, unless added on request'],
    notes: [
      'Prayer: Uzbekistan is a Muslim-majority country. Many historic mosques are now monuments, but working mosques are close by at each prayer time.',
      'Food: Plov, samsa and grilled meats; halal food is widely available, though many restaurants also serve alcohol.',
      'Weather: Hot, dry summers and cold winters. Spring and autumn are the best seasons.',
      'Pace: The old cities are best seen on foot, so expect long walks on uneven paving.',
      'Documents: Visa rules for Indian passport holders are set by Uzbekistan and can change; HIJRA confirms the current process.',
    ],
    image: 'intl-samarkand-registan',
    gallery: [],
    bestTime: 'Spring and autumn',
    idealFor: ['groups', 'couples', 'families'],
    fare: null,
    sample: true,
  },
  {
    slug: 'baku-azerbaijan',
    title: 'Baku and the Caucasus foothills',
    region: 'international',
    destination: 'Baku',
    country: 'Azerbaijan',
    days: 5,
    nights: 4,
    summary: 'A walled old city on the Caspian Sea, flame-shaped towers, the Juma Mosque of Shamakhi and a day in the mountains at Gabala.',
    overview: [
      'Baku pairs a medieval walled city with a skyline of glass and flame-shaped towers, all on the shore of the Caspian Sea. It is a short, easy holiday with a different feel from the Gulf.',
      'A day inland climbs to the forests and mountains of Gabala, by way of Shamakhi and its historic Juma Mosque.',
    ],
    description:
      'A sample five-day Azerbaijan tour from HIJRA Travels: Baku’s walled old city and Caspian boulevard, Gobustan, Shamakhi’s Juma Mosque and Gabala.',
    highlights: [
      'Icherisheher, the walled old city of Baku',
      'The Maiden Tower and the Palace of the Shirvanshahs',
      'The Caspian boulevard at night',
      'The Juma Mosque of Shamakhi and the mountains of Gabala',
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrive in Baku', detail: 'Arrive and transfer to your hotel. An evening walk on the Caspian boulevard.' },
      { day: 'Day 2', title: 'The old city', detail: 'Icherisheher on foot: the Maiden Tower, the Palace of the Shirvanshahs and the old caravanserais, then the Heydar Aliyev Center.' },
      { day: 'Day 3', title: 'Gobustan and Yanar Dag', detail: 'The rock carvings of Gobustan and its mud volcanoes, and Yanar Dag, a hillside where natural gas has burned for decades.' },
      { day: 'Day 4', title: 'Shamakhi and Gabala', detail: 'A day in the mountains: the Juma Mosque of Shamakhi on the way, then the lake and cable car at Gabala.' },
      { day: 'Day 5', title: 'Home', detail: 'Transfer to the airport for your flight home.' },
    ],
    inclusions: ['Four nights in a Baku hotel, with breakfast', 'Airport transfers', 'Guided sightseeing on days 2 to 4', 'Visa assistance'],
    exclusions: ['Flights, unless added', 'Cable car and entry tickets not listed', 'Lunches and dinners', 'Personal expenses'],
    notes: [
      'Prayer: Azerbaijan is Muslim-majority but secular in everyday life; your itinerary notes the mosques near each day’s stops.',
      'Food: Most meat is halal, but alcohol is widely served; ask us for suitable restaurants.',
      'Weather: Baku is known for strong winds. May, June, September and October are the most comfortable months.',
      'Documents: Azerbaijan issues electronic visas; HIJRA confirms the current process for Indian passport holders.',
    ],
    image: 'intl-baku-old-city',
    gallery: [],
    bestTime: 'May to October',
    idealFor: ['couples', 'families'],
    fare: null,
    sample: true,
  },
];

export function getTour(slug: string): Tour | undefined {
  return tours.find((t) => t.slug === slug);
}
