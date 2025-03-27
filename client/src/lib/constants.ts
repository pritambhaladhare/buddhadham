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
  { title: "Home", path: "/" },
  { title: "About Us", path: "/about" },
  { title: "Our Work", path: "/our-work" },
  { title: "Support Us", path: "/support" },
  { title: "Get Involved", path: "/get-involved" },
  { title: "Blog", path: "/blog" },
  { title: "Contact", path: "/contact" }
];

// Impact statistics
export const IMPACT_STATS = [
  { number: "1000+", label: "Monks Supported Monthly" },
  { number: "25", label: "Sacred Sites Protected" },
  { number: "500+", label: "Peepal Trees Planted" },
  { number: "12", label: "Monasteries Restored" }
];

// Our work categories
export const WORK_CATEGORIES = [
  {
    title: "Food & Medical Aid",
    description: "Delivering essential nourishment and healthcare to monks in need throughout sacred sites.",
    image: "https://images.unsplash.com/photo-1577285930803-df9418bede68?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Monastery & Stupa Restoration",
    description: "Preserving and revitalizing historic Buddhist sites to maintain sacred heritage.",
    image: "https://images.unsplash.com/photo-1543158266-0066955047b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Tripitaka Chanting & Spiritual Events",
    description: "Organizing large-scale recitations and ceremonies to sustain Buddhist traditions.",
    image: "https://images.unsplash.com/photo-1584283367830-9e92d08a3488?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Environmental Sustainability",
    description: "Planting sacred Peepal trees and promoting eco-conscious initiatives across Buddhist sites.",
    image: "https://images.unsplash.com/photo-1569144157591-c60f3f82f137?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Pilgrim & Monastic Welfare",
    description: "Providing water, lodging, and essential support services for monks and pilgrims.",
    image: "https://images.unsplash.com/photo-1564529895062-72ee0563d880?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Sacred Scripture Preservation",
    description: "Protecting and digitizing ancient Buddhist texts to preserve wisdom for future generations.",
    image: "https://images.unsplash.com/photo-1519682577862-22b62b24e493?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  }
];

// Donation options
export const DONATION_OPTIONS = [
  {
    title: "One-Time Gift",
    description: "Support our immediate needs with a one-time contribution of any amount.",
    color: "saffron",
    options: ["$25", "$50", "$100"],
    buttonText: "Donate Now"
  },
  {
    title: "Monthly Supporter",
    description: "Join our sustaining circle with a monthly contribution to fund ongoing initiatives.",
    color: "deepRed",
    options: ["$10", "$25", "$50"],
    buttonText: "Become a Monthly Supporter"
  },
  {
    title: "Legacy Giving",
    description: "Make a lasting impact by sponsoring a specific project or creating an endowment.",
    color: "gold",
    checklistItems: [
      "Monastery Restoration",
      "Monastic Education Fund",
      "Sacred Tree Planting"
    ],
    buttonText: "Discuss Legacy Options"
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
    image: "https://images.unsplash.com/photo-1609227892222-39fa732a6296?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    date: "JUNE 15, 2023",
    title: "Ancient Stupa Restoration Complete After Three Years",
    description: "The painstaking restoration of the 9th century Dharmachakra Stupa has been completed...",
    image: "https://images.unsplash.com/photo-1580697029043-9d58406d0063?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    date: "MAY 28, 2023",
    title: "New Scholarship Program Launched for Young Monks",
    description: "Buddha Dhaam has established a scholarship fund to support the education of novice monks...",
    image: "https://images.unsplash.com/photo-1626906722153-73f12c76b5de?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  }
];

// Testimonials
export const TESTIMONIALS = [
  {
    quote: "The work of Buddha Dhaam has transformed our monastery. With their support, we now have proper facilities for our monks to study and meditate. Their dedication to preserving our traditions is truly inspiring.",
    name: "Venerable Dhammapala",
    title: "Head Monk, Bodhi Monastery",
    image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
  },
  {
    quote: "As a long-time supporter of Buddha Dhaam, I've witnessed firsthand the impact of their work. The restoration of ancient sites and the support they provide to monks ensures that Buddhist wisdom continues to flourish in its birthplace.",
    name: "Dr. Maya Sharma",
    title: "Monthly Supporter & Professor of Buddhist Studies",
    image: "https://images.unsplash.com/photo-1604772659841-a1612f9ed995?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
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
