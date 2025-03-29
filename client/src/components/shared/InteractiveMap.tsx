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
    <FadeInSection className={`pilgrimage-guide-container ${className}`}>
      <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-[#D2691E]/20 transform transition-transform hover:scale-[1.02] duration-500">
        <div className="p-6 bg-gradient-to-r from-[#8B4513] via-[#D2691E] to-[#E6BF83] text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 5C50.5 20 65 35 80 35C65 35.5 50 50 50 65C49.5 50 35 35 20 35C35 34.5 49.5 20 50 5Z" fill="white"/>
            </svg>
          </div>
          <h2 className="text-3xl font-heading font-bold mb-2 flex items-center">
            <span className="mr-3">Sacred Pilgrimage Path</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.5 9C19.9853 9 22 6.98528 22 4.5C22 2.01472 19.9853 0 17.5 0C15.0147 0 13 2.01472 13 4.5C13 6.98528 15.0147 9 17.5 9Z" fill="white" fillOpacity="0.7"/>
              <path d="M6.5 16C8.98528 16 11 13.9853 11 11.5C11 9.01472 8.98528 7 6.5 7C4.01472 7 2 9.01472 2 11.5C2 13.9853 4.01472 16 6.5 16Z" fill="white" fillOpacity="0.7"/>
              <path d="M13.8 21.4C15.5673 21.4 17 19.9673 17 18.2C17 16.4327 15.5673 15 13.8 15C12.0327 15 10.6 16.4327 10.6 18.2C10.6 19.9673 12.0327 21.4 13.8 21.4Z" fill="white" fillOpacity="0.7"/>
              <path d="M13 5L7 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2"/>
              <path d="M12 15L10 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2"/>
            </svg>
          </h2>
          <p className="text-white/90 text-lg">Follow the footsteps of Lord Buddha's life journey</p>
        </div>
        
        <div className="p-3 bg-gradient-to-r from-[#FFF8EA] to-white border-y border-[#D2691E]/10">
          <div className="flex flex-wrap gap-2 justify-center">
            {SACRED_LOCATIONS.map(location => (
              <div 
                key={location.id}
                className="px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 hover:bg-[#D2691E]/10 cursor-pointer transition-colors"
                style={{ color: location.color, borderColor: `${location.color}30` }}
                onClick={() => {
                  if (mapRef.current) {
                    mapRef.current.setView(location.coordinates, 10);
                    setTimeout(() => {
                      mapRef.current?.invalidateSize();
                    }, 100);
                  }
                }}
              >
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: location.color }}></div>
                {location.name}
              </div>
            ))}
          </div>
        </div>
        
        <div 
          ref={mapContainerRef} 
          className="h-[350px] w-full relative"
          style={{ position: 'relative' }}
        />
        
        <div className="p-4 bg-[#FFF8EA] border-t border-[#D2691E]/20">
          <div className="flex items-start gap-2">
            <div className="text-[#D2691E] mt-1">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="16" r="1" fill="currentColor"/>
              </svg>
            </div>
            <div>
              <p className="text-sm text-[#8B4513] leading-relaxed">
                <span className="font-medium">Interactive Guide:</span> Click on markers to learn about each sacred location. The four main sites in Buddha's life are connected by a dotted path. Click site names above to focus the map.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {!mapLoaded && (
        <div className="flex items-center justify-center p-6 bg-white/90 absolute top-0 left-0 w-full h-full backdrop-blur-sm">
          <div className="text-center">
            <div className="relative h-16 w-16 mx-auto mb-3">
              <div className="absolute inset-0 rounded-full border-4 border-[#D2691E]/30 border-t-[#D2691E] animate-spin"></div>
              <div className="absolute inset-3 rounded-full border-2 border-[#E6BF83]/30 border-t-[#E6BF83] animate-spin"></div>
            </div>
            <p className="text-[#8B4513] font-medium">Visualizing the sacred journey...</p>
          </div>
        </div>
      )}
    </FadeInSection>
  );
};

export default InteractiveMap;