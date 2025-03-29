import { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FadeInSection } from '@/components/animation/AnimatedSection';
import BuddhistMarker from './BuddhistMarker';
import { createRoot } from 'react-dom/client';

// Define location type 
interface SacredLocation {
  id: number;
  name: string;
  description: string;
  coordinates: [number, number]; // Explicitly define as lat/lng tuple
  initiatives: string[];
  color: string;
  significance: string;
  bestTimeToVisit: string;
  nearbyAccommodation: string;
  travelTips: string[];
}

// Define the sacred sites/work locations
const SACRED_LOCATIONS: SacredLocation[] = [
  {
    id: 1,
    name: 'Lumbini',
    description: 'Birthplace of Lord Buddha',
    coordinates: [27.4833, 83.2767],
    initiatives: ['Tree Planting', 'Monastery Support'],
    color: '#D2691E',
    significance: 'This is where Prince Siddhartha was born to Queen Maya Devi in 563 BCE. The sacred garden and Maya Devi Temple mark the exact birthplace. A visit here connects you directly with the beginning of Buddha\'s journey.',
    bestTimeToVisit: 'October to May, avoiding the monsoon season. Buddha Jayanti (May) is a special time to visit.',
    nearbyAccommodation: 'Several monasteries offer basic accommodation for pilgrims. Hotels like Buddha Maya Garden and Lumbini Hotel Kasai provide comfortable stays.',
    travelTips: [
      'Visit the Ashoka Pillar which confirmed this as Buddha\'s birthplace',
      'Allow time to visit the World Peace Pagoda',
      'Bring modest clothing suitable for temple visits',
      'Many monasteries built by different Buddhist nations can be toured in a single day'
    ]
  },
  {
    id: 2,
    name: 'Sarnath',
    description: 'Where Buddha delivered his first sermon',
    coordinates: [25.3800, 83.0200],
    initiatives: ['Food & Medical Aid', 'Water Distribution'],
    color: '#9D2933',
    significance: 'After attaining enlightenment, Buddha came to Sarnath to deliver his first teaching on the Four Noble Truths. This event is known as "turning the wheel of Dharma" and marks the foundation of Buddhist teachings.',
    bestTimeToVisit: 'October to March for pleasant weather. The Dhammachakra Day celebrations (July/August) commemorate Buddha\'s first sermon.',
    nearbyAccommodation: 'The Thai Monastery and Tibetan Monastery offer pilgrim accommodation. Budget hotels are available in Varanasi city.',
    travelTips: [
      'Visit the Dhamek Stupa, marking where Buddha taught the Four Noble Truths',
      'The Archaeological Museum houses the famous lion capital of the Ashoka Pillar',
      'Arrange a local guide to understand the historical significance of the ruins',
      'Varanasi is only 10km away - many pilgrims combine these two sacred destinations'
    ]
  },
  {
    id: 3,
    name: 'Bodhgaya',
    description: 'Where Buddha attained enlightenment',
    coordinates: [24.6961, 84.9911],
    initiatives: ['Stupa Restoration', 'Tripitaka Chanting'],
    color: '#D4AF37',
    significance: 'The most sacred site for Buddhists worldwide, where Prince Siddhartha meditated under the Bodhi Tree for 49 days and attained enlightenment, becoming Buddha. The Mahabodhi Temple Complex is a UNESCO World Heritage site.',
    bestTimeToVisit: 'November to February offers pleasant weather. The Kagyu Monlam prayer festival (December/January) is a powerful time to visit.',
    nearbyAccommodation: 'Many international Buddhist monasteries offer accommodation for pilgrims. Hotels like Hotel Bodhgaya Regency and Oaks Bodhgaya provide comfortable stays nearby.',
    travelTips: [
      'Meditate under the Bodhi Tree, a descendant of the original tree',
      'Circumambulate the Mahabodhi Temple, especially at sunrise or sunset',
      'Visit the Giant Buddha statue and surrounding gardens',
      'Explore the international monasteries built in various national architectural styles'
    ]
  },
  {
    id: 4,
    name: 'Kushinagar',
    description: 'Where Buddha attained Mahaparinirvana',
    coordinates: [26.7400, 83.8900],
    initiatives: ['Monk Support', 'Sacred Ceremonies'],
    color: '#8B4513',
    significance: 'The place where Buddha attained Mahaparinirvana (left his physical body) at the age of 80. The Mahaparinirvana Temple houses a 6-meter long reclining Buddha statue depicting his final moments.',
    bestTimeToVisit: 'October to March for comfortable weather. Buddha Purnima (May) sees special ceremonies at the Mahaparinirvana Temple.',
    nearbyAccommodation: 'The Japanese Temple and other monasteries offer pilgrim accommodation. Lotus Nikko Hotel and Hotel Skyland provide comfortable stays.',
    travelTips: [
      'Visit the Ramabhar Stupa marking the cremation site of Lord Buddha',
      'Spend time in quiet contemplation at the Mahaparinirvana Temple',
      'Explore the meditation parks surrounding the main temple',
      'Visit the Mathakuar shrine where Buddha delivered his final sermon'
    ]
  }
];

interface InteractiveMapProps {
  className?: string;
}

const InteractiveMap = ({ className = '' }: InteractiveMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    
    // Check if map is already initialized
    if (mapRef.current) return;

    // Function to create custom Buddhist marker div icon
    const createCustomMarkerIcon = (color: string) => {
      const customMarkerIcon = L.divIcon({
        className: 'custom-buddhist-marker',
        html: renderToString(<BuddhistMarker color={color} size={32} />),
        iconSize: [32, 48],
        iconAnchor: [16, 48],
        popupAnchor: [0, -48]
      });
      return customMarkerIcon;
    };

    // Helper function to render React component as string
    function renderToString(reactElement: React.ReactElement) {
      const div = document.createElement('div');
      const root = createRoot(div);
      root.render(reactElement);
      return div.innerHTML;
    }

    try {
      // Create a Leaflet map instance
      const map = L.map(mapContainerRef.current, {
        center: [26.0, 84.0], // Center on North India (Buddha's sacred sites)
        zoom: 6,
        scrollWheelZoom: false,
        zoomControl: true
      });

      // Using OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(map);

      // Create a polyline connecting all the sacred sites
      const pathCoordinates = SACRED_LOCATIONS.map(loc => loc.coordinates);
      L.polyline(pathCoordinates, {
        color: '#D2691E',
        weight: 3,
        opacity: 0.7,
        dashArray: '10, 10',
        lineCap: 'round'
      }).addTo(map);

      // Add markers for each location
      SACRED_LOCATIONS.forEach(location => {
        const marker = L.marker(
          location.coordinates, 
          { icon: createCustomMarkerIcon(location.color) }
        ).addTo(map);

        // Create popup content with HTML
        const popupContent = `
          <div class="map-popup p-3 max-w-[300px]">
            <h3 class="text-xl font-bold text-[${location.color}]">${location.name}</h3>
            <p class="text-gray-700 mb-2">${location.description}</p>
            <p class="text-sm text-gray-600 mb-3">${location.significance.substring(0, 100)}...</p>
            <div class="mb-2">
              <p class="font-medium text-[#8B4513] text-sm">Best Time to Visit:</p>
              <p class="text-sm text-gray-600">${location.bestTimeToVisit.split('.')[0]}</p>
            </div>
            <div>
              <p class="font-medium text-[#8B4513] text-sm">Our Initiatives:</p>
              <ul class="list-disc ml-5 text-sm text-gray-700">
                ${location.initiatives.map(init => `<li>${init}</li>`).join('')}
              </ul>
            </div>
            <div class="mt-2 text-center">
              <a href="#${location.name.toLowerCase()}" class="text-sm font-medium text-blue-600 hover:underline">View Travel Guide</a>
            </div>
          </div>
        `;

        marker.bindPopup(popupContent);
      });

      // Save map instance to ref
      mapRef.current = map;
      setMapLoaded(true);

      // Fix Leaflet icon default issues
      setTimeout(() => {
        map.invalidateSize();
      }, 100);

      // Cleanup function
      return () => {
        if (mapRef.current) {
          mapRef.current.remove();
          mapRef.current = null;
        }
      };
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }, []);

  return (
    <FadeInSection className={`sacred-map-container ${className}`}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-[#FF8C00]/90 to-[#FFA500]/80 text-white">
          <h2 className="text-2xl font-heading font-bold">Sacred Sites & Our Work</h2>
          <p className="opacity-90">Explore the sacred locations where Buddha Dhaam is actively working</p>
        </div>
        <div 
          ref={mapContainerRef} 
          className="h-[350px] w-full relative"
          style={{ position: 'relative' }}
        />
        <div className="p-4 bg-[#FFF8EA] border-t border-[#D2691E]/20">
          <p className="text-sm text-[#8B4513]">
            <span className="font-medium">Note:</span> Click on markers to learn about our initiatives in each sacred location. These four sites represent the main places in Lord Buddha's life journey.
          </p>
        </div>
      </div>
      
      {!mapLoaded && (
        <div className="flex items-center justify-center p-6 bg-white/80 absolute top-0 left-0 w-full h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D2691E] mx-auto mb-3"></div>
            <p className="text-[#8B4513]">Loading sacred map...</p>
          </div>
        </div>
      )}
    </FadeInSection>
  );
};

export default InteractiveMap;