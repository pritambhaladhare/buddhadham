// Import images for consistent usage across the site
import foodDistImg from '@assets/food_aid.jpg';
import waterDistImg from '@assets/water_aid.jpg';
import buddhaCarving from '@assets/ancient_stupa.jpg';
import monksTripitaka from '@assets/tripitaka_chanting.jpg';
import buddhaGarden from '@assets/peepal_tree.jpg';
import monkGathering from '@assets/monastic_welfare.jpg';
import buddhaStatue from '@assets/meditation_app.jpg';
import monkDonation from '@assets/IMG-20250327-WA0017.jpg';
import mahabodhiTemple from '@assets/IMG-20250327-WA0018.jpg';
import buddhaShrine from '@assets/shrine_conservation.jpg';
import waterRefreshments from '@assets/water_refreshments.jpg';

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
  { 
    title: "Our Work", 
    path: "/our-work",
    hasDropdown: true,
    dropdownItems: [
      { title: "About", path: "/about" },
      { title: "Our Projects", path: "/our-work" },
      { title: "Leadership Team", path: "/about#leadership" },
      { title: "Vision & Mission", path: "/about#vision" }
    ]
  },
  { title: "Pilgrimage Guide", path: "/pilgrimage-guide" },
  { 
    title: "Get Involved", 
    path: "/get-involved",
    hasDropdown: true,
    dropdownItems: [
      { title: "Ways to Help", path: "/get-involved" },
      { title: "Volunteer", path: "/get-involved#volunteer" },
      { title: "Become a Member", path: "/get-involved#membership" },
      { title: "Contact Us", path: "/contact" }
    ]
  }
];

// Impact statistics
export const IMPACT_STATS = [
  { number: "4076+", label: "Monks Supported" },
  { number: "1422+", label: "Food Served" },
  { number: "100+", label: "Monk Medical Aid" },
  { number: "100+", label: "Pilgrim Medical Aid" }
];

// Our work categories
export const WORK_CATEGORIES = [
  {
    title: "Food & Medical Aid",
    description: "Providing meals, medicines, and healthcare support to Buddhist monks at sacred pilgrimage sites.",
    image: foodDistImg,
    highlights: [
      "Provides nutritious meals to over 1422+ monks till now",
      "Healthcare support including medical camps and emergency services",
      "Special nutritional support for elderly monks with health concerns"
    ]
  },
  {
    title: "Water & Refreshments",
    description: "Distributing water bottles and fresh juice to monks and pilgrims at Mahabodhi Temple and other sacred sites.",
    image: waterDistImg,
    highlights: [
      "Distributes over 2598+ water bottles daily to pilgrims and monks", 
      "Cooling refreshments during hot summer months at pilgrimage sites",
      "Sustainable practices including reusable bottles and water stations"
    ]
  },
  {
    title: "Ancient Stupa Preservation",
    description: "Preserving and revitalizing historic stupas and monasteries to maintain Buddhist heritage for future generations.",
    image: buddhaCarving,
    highlights: [
      "Careful restoration of ancient structures using traditional techniques",
      "Documentation and preservation of ancient art and carvings related to teaching of lord buddha",
      "Training local craftsmen in traditional restoration techniques"
    ]
  },
  {
    title: "Regular Tripitaka Chanting",
    description: "Organizing monks in large-scale recitations of sacred Buddhist texts to preserve spiritual traditions.",
    image: monksTripitaka,
    highlights: [
      "Gatherings of hundreds of monks for traditional chanting ceremonies",
      "Preservation of lord buddha's teachings through oral tradition",
      "Recording and archiving chanting ceremonies for future generations"
    ]
  },
  {
    title: "Sacred Tree & Site Beautification",
    description: "Planting and caring for Bodhi trees while enhancing the beauty of monasteries and Buddhist pilgrimage sites.",
    image: buddhaGarden,
    highlights: [
      "Planting and maintaining Bodhi trees at sacred sites",
      "Educational programs about the significance of sacred trees in teaching of lord buddha",
      "Creating green spaces for meditation and reflection"
    ]
  },
  {
    title: "Pilgrim & Monastic Welfare",
    description: "Supporting both resident and traveling monks with accommodation, robes, and other essential needs.",
    image: monkGathering,
    highlights: [
      "Providing robes, accommodations, and essentials to traveling monks",
      "Support for educational needs and study materials",
      "Community building activities to strengthen monastic bonds"
    ]
  },
];

// Donation options
export const DONATION_OPTIONS = [
  {
    title: "Temple Preservation",
    description: "Help preserve ancient Buddhist temples and sacred sites for future generations.",
    color: "gold" as const,
    checklistItems: [
      "Preserve monastery buildings",
      "Preserve ancient Buddha statues",
      "Support sacred art conservation"
    ],
    buttonText: "Support Preservation"
  }
];

// Upcoming events
export const UPCOMING_EVENTS = [
  {
    date: { month: "DEC", day: "15" },
    title: "Annual Tripitaka Chanting Ceremony",
    location: "Saranath, Varanasi",
    time: "9:00 AM - 4:00 PM",
    description: "Join hundreds of monks in this sacred recitation of Buddhist scriptures."
  },
  {
    date: { month: "SEP", day: "03" },
    title: "Sacred Tree Planting Ceremony",
    location: "Bodhgaya, Bihar",
    time: "10:00 AM",
    description: "Help us plant 108 Peepal trees to honor the Buddha's place of enlightenment."
  },
  {
    date: { month: "NOV", day: "21" },
    title: "Serving Monks During Winter",
    location: "Bodhgaya, Bihar",
    time: "11:00 AM",
    description: "Join our initiative to provide warm clothes and necessities to monks during the winter months."
  }
];

// Latest news
export const LATEST_NEWS = [
  {
    date: "MAY, 2024",
    title: "Medical Camp Serves 100+ Monks in Bodhgaya",
    description: "Our recent medical camp provided essential healthcare services to monks from across the region...",
    image: monkDonation
  },
  {
    date: "Every fortnight",
    title: "Every purnima and amavasya serving monks in bodhgaya temple",
    description: "Our ongoing commitment to serve monks on sacred days of purnima and amavasya at the Bodhgaya temple...",
    image: mahabodhiTemple
  },
  {
    date: "MAY 23, 2024",
    title: "Water and Fruit juice served to 690+ monk in buddha purnima",
    description: "Buddha Dhaam volunteers distributed water and fresh fruit juice to hundreds of monks during Buddha Purnima celebrations...",
    image: buddhaCarving
  }
];

// Testimonials
export const TESTIMONIALS = [
  {
    quote: "The work of Buddha Dhaam has transformed our monastery. With their support, we now have proper facilities for our monks to study and meditate. Their dedication to preserving our traditions is truly inspiring.",
    name: "Venerable Dhammapala",
    title: "Head Monk, Bodhi Monastery",
    image: buddhaShrine
  },
  {
    quote: "As a long-time supporter of Buddha Dhaam, I've witnessed firsthand the impact of their work. The preservation of ancient sites and the support they provide to monks ensures that Buddhist wisdom continues to flourish in its birthplace.",
    name: "Dr. Maya Sharma",
    title: "Monthly Supporter & Professor of Buddhist Studies",
    image: monkGathering
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
