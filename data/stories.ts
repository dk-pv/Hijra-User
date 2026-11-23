import type { ImageKey } from './images';

// SAMPLE PILGRIM STORIES for the preview. They show the storytelling layout only: no real pilgrim, name, town or
// journey is described, and each photograph shows a place, never people presented as the pilgrims. At launch the
// page shows only stories pilgrims have agreed in writing to share: at least eight, three of them on video (P19, I8).

export type Story = {
  slug: string;
  title: string;
  journey: 'umrah' | 'hajj';
  /** Who travelled, without identifying anyone, e.g. 'A retired teacher travelling with her son, North Kerala'. */
  who: string;
  season: string;
  excerpt: string;
  quote: string;
  body: string[];
  image: ImageKey;
  hasVideo: boolean;
  featured?: boolean;
  sample: true;
};

export const stories: Story[] = [
  {
    slug: 'at-her-own-pace',
    title: 'At her own pace',
    journey: 'umrah',
    who: 'A retired teacher travelling with her son, North Kerala',
    season: 'Umrah in January',
    excerpt: 'For years she put off Umrah, worried about the crowds and her knees. An unhurried itinerary that began in Madinah changed her mind.',
    quote: 'Nobody hurried me, not once. I prayed in Madinah for five days before I ever saw the Kaaba.',
    body: [
      'She had wanted to make Umrah since she retired, but every year there was a reason to wait: her knees, the heat, the stories she had heard about the crowds. In the end her son sat down with an advisor at a branch near home and asked one question: could it be done slowly?',
      'The answer was an itinerary that began in Madinah, with five quiet days to settle before Makkah, a room near the lift, and wheelchair assistance requested for the airports and for Tawaf. The advisor went through each day with her, twice, until she was sure of it.',
      'In Makkah they made their Umrah late at night, when the mosque was calmer. Her son pushed the wheelchair for Tawaf; she walked parts of the Sa’i herself, resting between the hills.',
      'She says the journey she had feared for so long turned out to be the calmest month of her year. She is already asking when her sister can go.',
    ],
    image: 'madinah-piazza-umbrellas',
    hasVideo: true,
    featured: true,
    sample: true,
  },
  {
    slug: 'the-last-ten-nights',
    title: 'The last ten nights',
    journey: 'umrah',
    who: 'Two brothers who run a small shop together, Malabar coast',
    season: 'Ramadan Umrah',
    excerpt: 'They had always spent the end of Ramadan at home. This year they spent it in Makkah, with the days planned around the nights.',
    quote: 'We slept in the afternoons and lived for the nights. Someone had thought about how tired we would be.',
    body: [
      'Ramadan is the busiest month in their shop, so the brothers enquired late and expected the worst. Their advisor was honest that the last ten nights fill first, and offered the dates still open instead of a promise.',
      'The itinerary kept the days light. Iftar, Taraweeh and the long night prayers took their strength; the afternoons were left free for rest.',
      'They prayed Eid in Makkah, then spent five quieter days in Madinah before flying home.',
      'The younger brother says the hardest part was going back to the shop. The elder has started saving so that their wives can travel next time.',
    ],
    image: 'makkah-clock-tower-night',
    hasVideo: false,
    sample: true,
  },
  {
    slug: 'the-questions-we-were-shy-to-ask',
    title: 'The questions we were shy to ask',
    journey: 'umrah',
    who: 'A young couple on their first Umrah, Central Kerala',
    season: 'Umrah in October',
    excerpt: 'First-time pilgrims, they came to a branch with a notebook full of questions and left with every one of them answered.',
    quote: 'We thought some of our questions were too basic. Nobody made us feel that way.',
    body: [
      'They had married the year before and wanted Umrah to be their first journey abroad together. Neither had travelled outside India, and the list of unknowns was long: ihram, the visa, what to pack, even how to find each other in a crowd.',
      'Their advisor walked them through the rites in order, explained what would happen at each airport, and suggested they agree on a meeting point at the Haram on the very first day.',
      'They made their Umrah on their first night in Makkah. In Madinah, the ziyarat visits brought to life the history they had only read about.',
      'Their advice to other couples: write your questions down, and ask every one of them.',
    ],
    image: 'makkah-haram-king-fahd-gate',
    hasVideo: false,
    sample: true,
  },
  {
    slug: 'three-generations',
    title: 'Three generations, one Umrah',
    journey: 'umrah',
    who: 'A family of six, from grandparents to a seven-year-old, South Kerala',
    season: 'Umrah in the April school holidays',
    excerpt: 'Planning for a grandmother and a seven-year-old at the same time meant two paces in one itinerary.',
    quote: 'The children asked the most questions at the briefing, and the answers were meant for them, not over their heads.',
    body: [
      'The family waited for the school holidays so that everyone could travel together: the grandparents, their son and his wife, and two children aged seven and twelve.',
      'Family rooms, free afternoons and Madinah first made the plan work. At the briefing before departure, the children’s questions were answered as seriously as the adults’.',
      'The older child walked every circuit of Tawaf. The younger held his grandmother’s hand through the Sa’i.',
      'At home, the grandmother tells everyone that it was the children who looked after her.',
    ],
    image: 'madinah-quba-mosque',
    hasVideo: false,
    sample: true,
  },
  {
    slug: 'the-day-at-arafat',
    title: 'The day at Arafat',
    journey: 'hajj',
    who: 'A farmer and his wife on their first Hajj, Central Kerala',
    season: 'Hajj season',
    excerpt: 'They saved for many years. When the day came, the classes before departure meant they knew what the day at Arafat would ask of them.',
    quote: 'At Arafat I stopped worrying about where to go next. Someone else was carrying that, so I could pray.',
    body: [
      'They had set money aside from every harvest for longer than their children can remember. When the time came, their first question at the branch was about registration: which routes were open to pilgrims from India, and what each one would ask of them.',
      'The classes before departure walked through each day of Hajj: Mina, Arafat, Muzdalifah, the Jamarat. His wife kept notes in a small book she carried throughout.',
      'On the day of Arafat the group leader kept the practical side moving: water, shade, the time to leave. The two of them spent the afternoon in prayer.',
      'He says the journey was harder on the body than he had expected, and easier on the heart.',
    ],
    image: 'hajj-arafat-plain',
    hasVideo: true,
    sample: true,
  },
  {
    slug: 'beside-my-mother',
    title: 'Beside my mother in Mina',
    journey: 'hajj',
    who: 'A nurse who accompanied her mother on Hajj, North Kerala',
    season: 'Hajj season',
    excerpt: 'As a nurse she planned for every risk to her mother’s health. What she had not planned for was how much she would be looked after too.',
    quote: 'I packed for every emergency. The one thing I did not expect was to be looked after myself.',
    body: [
      'Her mother had long wanted to make Hajj, and she would not let her go alone. She came to the first meeting with her mother’s medical history in a folder and a long list of questions.',
      'Together with the advisor they went through the medicines, the vaccinations, the long walks in Mina and the heat at Arafat, and asked for assistance wherever it was available.',
      'In the tents at Mina the group shared what it had: a spare blanket, a fan, a turn on the one folding chair. The days of Tashreeq were the slowest and, she says, the closest.',
      'Her mother came home tired and well. She came home with a notebook of advice for the next nurse who asks her.',
    ],
    image: 'hajj-mina-tent-city',
    hasVideo: false,
    sample: true,
  },
  {
    slug: 'nine-days-unhurried',
    title: 'Nine days, unhurried',
    journey: 'umrah',
    who: 'A government employee with limited leave, Central Kerala',
    season: 'Umrah in November',
    excerpt: 'With nine days of leave he expected a rushed trip. The Umrah itself, he found, was never the part that was rushed.',
    quote: 'It was a short trip, but nothing about the Umrah itself felt rushed.',
    body: [
      'His leave allowed nine days, door to door. He had almost decided to wait for a longer holiday when an advisor suggested a shorter package built around a weekend departure.',
      'Four nights in Makkah, four in Madinah. The ziyarat programme was compact, but the Umrah had a whole night of its own, with time to rest beforehand.',
      'He was back at his desk on Monday morning, he says, lighter than when he left.',
    ],
    image: 'makkah-jabal-al-nour',
    hasVideo: true,
    sample: true,
  },
  {
    slug: 'what-the-classes-changed',
    title: 'What the classes changed',
    journey: 'hajj',
    who: 'A retired bank clerk who made Hajj with his brother, Malabar coast',
    season: 'Hajj season',
    excerpt: 'He thought he knew the rites from books. The classes before departure showed him how the days would really unfold.',
    quote: 'I had read about Hajj all my life. The classes showed me what the days would actually feel like.',
    body: [
      'He had read about the rites for years and was sure he was ready. His brother, younger and less certain, insisted that they both attend every class before departure.',
      'The classes covered what the books had not: how long the walks are, what a night at Muzdalifah is like, how a group moves through the Jamarat at its appointed time.',
      'On the 10th of Dhul Hijjah, when the crowds were at their heaviest, the two of them always knew where to be next.',
      'Now he tells everyone the same thing: read the books, and go to the classes.',
    ],
    image: 'hajj-jamarat-bridge-aerial',
    hasVideo: false,
    sample: true,
  },
];

export const featuredStory = stories.find((s) => s.featured) ?? stories[0];

/** The id of a story's reading dialog on /pilgrim-stories; its card there uses the bare slug as its anchor. */
