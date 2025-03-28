// Color palette
export const COLORS = {
  saffron: {
    light: '#F2B866',
    DEFAULT: '#E67E22',
    dark: '#C26B1D'
  },
  deepRed: {
    light: '#B8414C',
    DEFAULT: '#9D2933',
    dark: '#7D1F29'
  },
  gold: {
    light: '#E4C86B',
    DEFAULT: '#D4AF37',
    dark: '#B29025'
  },
  sandstone: {
    light: '#FDF8F1',
    DEFAULT: '#F5F0E3',
    dark: '#EAE0C9'
  },
  brown: {
    light: '#5D4230',
    DEFAULT: '#3A2718',
    dark: '#271A10'
  }
};

// Navigation links
export const NAV_LINKS = [
  { title: "About", path: "/about" },
  { title: "Our Work", path: "/our-work" },
  { title: "Sacred Map", path: "/sacred-map" },
  { title: "Get Involved", path: "/get-involved" },
  { title: "Contact", path: "/contact" }
];

// Impact statistics
export const IMPACT_STATS = [
  { number: "2500+", label: "Monks Supported" },
  { number: "4", label: "Sacred Sites Served" }
];

// Our work categories
export const WORK_CATEGORIES = [
  {
    title: "Food & Medical Aid",
    description: "Providing daily meals, medicines, and healthcare support to Buddhist monks at sacred pilgrimage sites.",
    image: "/src/assets/images/food-distribution.jpg"
  },
  {
    title: "Water & Refreshments",
    description: "Distributing water bottles and fresh juice to monks and pilgrims at Mahabodhi Temple and other sacred sites.",
    image: "/src/assets/images/water-distribution.jpg"
  },
  {
    title: "Ancient Stupa Restoration",
    description: "Preserving and revitalizing historic stupas and monasteries to maintain Buddhist heritage for future generations.",
    image: "/src/assets/images/buddha-carving.jpg"
  },
  {
    title: "Regular Tripitaka Chanting",
    description: "Organizing monks in large-scale recitations of sacred Buddhist texts to preserve spiritual traditions.",
    image: "/src/assets/images/monks-tripitaka.jpg"
  },
  {
    title: "Sacred Tree & Site Beautification",
    description: "Planting and caring for Bodhi trees while enhancing the beauty of monasteries and Buddhist pilgrimage sites.",
    image: "/src/assets/images/buddha-garden.jpg"
  },
  {
    title: "Pilgrim & Monastic Welfare",
    description: "Supporting both resident and traveling monks with accommodation, robes, and other essential needs.",
    image: "/src/assets/images/monk-gathering.jpg"
  },
  {
    title: "Meditation App",
    description: "Buddha Dhaam helps you track your daily Vipassana practice, keeps you motivated to meditate every day, and is absolutely free to download and use. 🙏",
    image: "/src/assets/images/buddha-statue.jpg"
  }
];

// Donation options
export const DONATION_OPTIONS = [
  {
    title: "Temple Restoration",
    description: "Help preserve ancient Buddhist temples and sacred sites for future generations.",
    color: "gold" as const,
    checklistItems: [
      "Restore monastery buildings",
      "Preserve ancient Buddha statues",
      "Support sacred art conservation"
    ],
    buttonText: "Support Restoration"
  }
];

// Upcoming events
export const UPCOMING_EVENTS = [
  {
    date: { month: "JUL", day: "15" },
    title: "Annual Tripitaka Chanting Ceremony",
    location: "Bodhgaya, Bihar",
    time: "9:00 AM - 4:00 PM",
    description: "Join hundreds of monks in this sacred recitation of Buddhist scriptures."
  },
  {
    date: { month: "AUG", day: "03" },
    title: "Sacred Tree Planting Ceremony",
    location: "Lumbini, Nepal",
    time: "10:00 AM",
    description: "Help us plant 108 Peepal trees to honor the Buddha's birthplace."
  },
  {
    date: { month: "SEP", day: "21" },
    title: "Monastery Restoration Inauguration",
    location: "Varanasi, Uttar Pradesh",
    time: "11:00 AM",
    description: "Celebration of the newly restored Vajrasana Monastery with a blessing ceremony."
  }
];

// Latest news
export const LATEST_NEWS = [
  {
    date: "JULY 2, 2023",
    title: "Medical Camp Serves 200 Monks in Bodhgaya",
    description: "Our recent medical camp provided essential healthcare services to monks from across the region...",
    image: "/src/assets/images/monk-donation.jpg"
  },
  {
    date: "JUNE 15, 2023",
    title: "Ancient Stupa Restoration Complete After Three Years",
    description: "The painstaking restoration of the 9th century Dharmachakra Stupa has been completed...",
    image: "/src/assets/images/mahabodhi-temple.jpg"
  },
  {
    date: "MAY 28, 2023",
    title: "New Scholarship Program Launched for Young Monks",
    description: "Buddha Dhaam has established a scholarship fund to support the education of novice monks...",
    image: "/src/assets/images/buddha-carving.jpg"
  }
];

// Testimonials
export const TESTIMONIALS = [
  {
    quote: "The work of Buddha Dhaam has transformed our monastery. With their support, we now have proper facilities for our monks to study and meditate. Their dedication to preserving our traditions is truly inspiring.",
    name: "Venerable Dhammapala",
    title: "Head Monk, Bodhi Monastery",
    image: "/src/assets/images/buddha-shrine.jpg"
  },
  {
    quote: "As a long-time supporter of Buddha Dhaam, I've witnessed firsthand the impact of their work. The restoration of ancient sites and the support they provide to monks ensures that Buddhist wisdom continues to flourish in its birthplace.",
    name: "Dr. Maya Sharma",
    title: "Monthly Supporter & Professor of Buddhist Studies",
    image: "/src/assets/images/monk-gathering.jpg"
  }
];

// Footer locations
export const LOCATIONS = [
  "Bodhgaya, Bihar",
  "Varanasi, Uttar Pradesh",
  "Lumbini, Nepal",
  "Kushinagar, Uttar Pradesh"
];

// Other ways to support
export const OTHER_SUPPORT_OPTIONS = [
  {
    icon: "bxs-donate-heart",
    title: "Corporate Sponsorship",
    description: "Partner with us to support specific initiatives while gaining recognition."
  },
  {
    icon: "bxs-hand-up",
    title: "Volunteer Your Time",
    description: "Join our community of volunteers helping at sacred sites and events."
  },
  {
    icon: "bxs-gift",
    title: "In-Kind Donations",
    description: "Provide supplies, services, or expertise to support our work."
  }
];
