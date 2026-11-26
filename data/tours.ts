import type { ImageKey } from './images';
import type { PackageStatus } from './packages';

// International and domestic tours. ALL RECORDS ARE SAMPLES for the preview: the itineraries show how HIJRA's tours
// are presented, with no fares, availability or confirmed departures. HIJRA's own tour data replaces them before
// launch. Destination facts are general guidance; visa rules and seasonal closures must be checked when quoting.
// HIJRA's holidays are mainly international; India is a smaller range, and Kerala local tours are not offered here.

export type IdealFor = 'families' | 'groups' | 'couples' | 'seniors';

export type Tour = {
  slug: string;
  title: string;
  region: 'domestic' | 'international';
  destination: string;
  country: string;
  /** Domestic tours: the state or area shown on tiles. */
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
  /** Availability as HIJRA sets it; null (the default for itineraries planned on request) shows nothing. */
  status: PackageStatus | null;
  sample: true;
  /** Shown on the homepage (international tours only, three or four). */
  featured?: boolean;
};

export const tours: Tour[] = [
  // International: HIJRA's main holiday offering, listed first wherever tours appear in data order
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
    status: null,
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
    status: null,
    sample: true,
    featured: true,
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
    status: null,
    sample: true,
    featured: true,
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
    status: null,
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
    status: null,
    sample: true,
    featured: true,
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
    status: null,
    sample: true,
  },

  // Within India: a smaller, secondary range
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
    status: null,
    sample: true,
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
    status: null,
    sample: true,
  },
];

export function getTour(slug: string): Tour | undefined {
  return tours.find((t) => t.slug === slug);
}
