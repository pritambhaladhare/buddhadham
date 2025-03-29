import { useEffect, useRef, useState, useCallback } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FadeInSection, StaggerContainer, StaggerItem } from '@/components/animation/AnimatedSection';
import BuddhistMarker from './BuddhistMarker';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';

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
  mantras?: string[];
  imageUrl?: string;
}

// Define the sacred sites/work locations with more immersive content
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
    ],
    mantras: ['Buddham Saranam Gacchami', 'Dhammam Saranam Gacchami', 'Sangham Saranam Gacchami'],
    imageUrl: '/attached_assets/Lumbini1.jpg'
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
    ],
    mantras: ['Namo Tassa Bhagavato Arahato Samma Sambuddhassa'],
    imageUrl: '/attached_assets/Saranath.jpg'
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
    ],
    mantras: ['Om Mani Padme Hum', 'Gate Gate Paragate Parasamgate Bodhi Svaha'],
    imageUrl: '/attached_assets/tong-kbp-wcpnpwvdWzI-unsplash.jpg'
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
    ],
    mantras: ['Buddho Susuddho Karuna Mahannavo'],
    imageUrl: '/attached_assets/Kushinagar.jpg'
  }
];

// Order matters - this is the correct path of Buddha's life journey
const JOURNEY_ORDER = [1, 3, 2, 4]; // Lumbini → Bodhgaya → Sarnath → Kushinagar

interface InteractiveMapProps {
  className?: string;
}

const InteractiveMap = ({ className = '' }: InteractiveMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const pathRef = useRef<L.Polyline | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [activeLocation, setActiveLocation] = useState<SacredLocation | null>(null);
  const [showJourneyModal, setShowJourneyModal] = useState(false);
  const [journeyMode, setJourneyMode] = useState(false);
  const [journeyStep, setJourneyStep] = useState(0);
  const [animatePathDone, setAnimatePathDone] = useState(false);

  // Sort sacred locations by journey order
  const orderedLocations = [...SACRED_LOCATIONS].sort((a, b) => 
    JOURNEY_ORDER.indexOf(a.id) - JOURNEY_ORDER.indexOf(b.id)
  );

  // Function to create animated path
  const animatePath = useCallback(() => {
    if (!mapRef.current || pathRef.current) return;
    
    const map = mapRef.current;
    
    // Get the ordered coordinates for Buddha's journey
    const orderedCoordinates = orderedLocations.map(loc => loc.coordinates);
    
    // Create path with animation
    const path = L.polyline([], {
      color: '#D4AF37',
      weight: 4,
      opacity: 0.8,
      lineCap: 'round',
      className: 'animate-pulse'
    }).addTo(map);
    
    pathRef.current = path;
    
    // Animate the path growth
    let step = 0;
    const totalSteps = orderedCoordinates.length;
    
    const animationInterval = setInterval(() => {
      if (step < totalSteps - 1) {
        const currentPoints = path.getLatLngs() as L.LatLng[];
        const startPoint = orderedCoordinates[step];
        const endPoint = orderedCoordinates[step + 1];
        
        // Interpolate points between the two locations
        const numPoints = 20;
        const latStep = (endPoint[0] - startPoint[0]) / numPoints;
        const lngStep = (endPoint[1] - startPoint[1]) / numPoints;
        
        for (let i = 0; i <= numPoints; i++) {
          const lat = startPoint[0] + latStep * i;
          const lng = startPoint[1] + lngStep * i;
          
          // Add point to the path
          currentPoints.push(L.latLng(lat, lng));
          path.setLatLngs(currentPoints);
        }
        
        step++;
      } else {
        clearInterval(animationInterval);
        setAnimatePathDone(true);
        
        // Add subtle animation class
        if (pathRef.current) {
          const pathElement = pathRef.current.getElement();
          if (pathElement) {
            pathElement.classList.add('journey-path-glow');
          }
        }
      }
    }, 1000);
    
    return () => clearInterval(animationInterval);
  }, [orderedLocations]);

  // Function to create custom Buddhist marker div icon with dynamic props
  const createCustomMarkerIcon = useCallback((location: SacredLocation, isActive: boolean = false) => {
    // Helper function to render React component as string
    function renderToString(reactElement: React.ReactElement) {
      const div = document.createElement('div');
      const root = createRoot(div);
      root.render(reactElement);
      return div.innerHTML;
    }
    
    const customMarkerIcon = L.divIcon({
      className: `custom-buddhist-marker site-${location.id} ${isActive ? 'active-marker' : ''}`,
      html: renderToString(
        <BuddhistMarker 
          color={location.color} 
          size={isActive ? 42 : 32} 
          isActive={isActive}
        />
      ),
      iconSize: [isActive ? 42 : 32, (isActive ? 42 : 32) * 1.5],
      iconAnchor: [isActive ? 21 : 16, (isActive ? 42 : 32) * 1.5],
      popupAnchor: [0, -(isActive ? 42 : 32) * 1.5]
    });
    
    return customMarkerIcon;
  }, []);

  // Create popup content
  const createPopupContent = useCallback((location: SacredLocation) => {
    return `
      <div class="map-popup p-4 max-w-[330px] rounded-lg">
        <h3 class="text-xl font-bold text-[${location.color}] flex items-center">
          <span>${location.name}</span>
          <span class="ml-2 px-2 py-0.5 text-xs bg-[${location.color}20] text-[${location.color}] rounded-full">
            ${JOURNEY_ORDER.indexOf(location.id) + 1}/4
          </span>
        </h3>
        
        <p class="text-gray-700 mb-3">${location.description}</p>
        
        <div class="relative mb-4 h-32 overflow-hidden rounded-md bg-gradient-to-r from-[#FFF8EA] to-white">
          <div class="absolute inset-0 bg-cover bg-center opacity-90 hover:opacity-100 transition-opacity duration-500"
               style="background-image: url('${location.imageUrl}');">
          </div>
          <div class="absolute bottom-0 w-full bg-gradient-to-t from-black/50 to-transparent p-2">
            <p class="text-white text-xs italic">${location.mantras?.[0] || ''}</p>
          </div>
        </div>
        
        <p class="text-sm text-gray-600 mb-3 line-clamp-3">${location.significance}</p>
        
        <div class="grid grid-cols-2 gap-3">
          <div>
            <p class="font-medium text-[${location.color}] text-sm">Best Time to Visit:</p>
            <p class="text-sm text-gray-600">${location.bestTimeToVisit.split('.')[0]}</p>
          </div>
          
          <div>
            <p class="font-medium text-[${location.color}] text-sm">Our Initiatives:</p>
            <ul class="list-disc ml-4 text-sm text-gray-700">
              ${location.initiatives.slice(0, 2).map(init => `<li>${init}</li>`).join('')}
            </ul>
          </div>
        </div>
        
        <div class="mt-3 flex justify-between items-center">
          <button onclick="document.dispatchEvent(new CustomEvent('viewLocationDetail', {detail: ${location.id}}))" 
                  class="text-sm px-3 py-1.5 bg-[${location.color}] text-white rounded-md hover:bg-[${location.color}CC] transition-colors">
            Explore Site
          </button>
          
          <a href="#${location.name.toLowerCase()}" 
             class="text-sm font-medium text-[${location.color}] hover:underline">
            Travel Guide
          </a>
        </div>
      </div>
    `;
  }, []);

  // Setup document event listeners for custom events
  useEffect(() => {
    const handleViewDetail = (e: CustomEvent) => {
      const locationId = e.detail;
      const location = SACRED_LOCATIONS.find(loc => loc.id === locationId);
      if (location) {
        setActiveLocation(location);
      }
    };

    document.addEventListener('viewLocationDetail', handleViewDetail as EventListener);
    
    return () => {
      document.removeEventListener('viewLocationDetail', handleViewDetail as EventListener);
    };
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    
    // Check if map is already initialized
    if (mapRef.current) return;

    try {
      // Create a Leaflet map instance
      const map = L.map(mapContainerRef.current, {
        center: [26.0, 84.0], // Center on North India (Buddha's sacred sites)
        zoom: 6,
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: false
      });

      // Using a more subtle CartoDB map tile
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
        subdomains: 'abcd',
      }).addTo(map);
      
      // Add attribution in a cleaner way
      L.control.attribution({
        position: 'bottomright',
        prefix: ''
      }).addAttribution('Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | Buddha Dhaam').addTo(map);

      // Add markers for each location
      SACRED_LOCATIONS.forEach(location => {
        const marker = L.marker(
          location.coordinates, 
          { icon: createCustomMarkerIcon(location) }
        ).addTo(map);
        
        markersRef.current.push(marker);

        // Bind popup with enhanced content
        marker.bindPopup(createPopupContent(location), {
          maxWidth: 350,
          className: 'sacred-site-popup',
          closeButton: true,
        });
        
        // Add event listeners for marker interaction
        marker.on('click', () => {
          // Update active location
          setActiveLocation(location);
          
          // Update marker icon to active state (larger, animated)
          markersRef.current.forEach(m => {
            const markerLocation = SACRED_LOCATIONS.find(
              loc => loc.coordinates[0] === m.getLatLng().lat && 
                     loc.coordinates[1] === m.getLatLng().lng
            );
            
            if (markerLocation) {
              const isActive = markerLocation.id === location.id;
              m.setIcon(createCustomMarkerIcon(markerLocation, isActive));
            }
          });
        });
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
  }, [createCustomMarkerIcon, createPopupContent]);

  // Handle journey mode
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;
    
    if (journeyMode) {
      // Start journey animation
      if (journeyStep === 0) {
        // Animate path creation
        animatePath();
        
        // Fly to first location
        const firstLocation = orderedLocations[0];
        mapRef.current.flyTo(firstLocation.coordinates, 8, {
          duration: 1.5
        });
        
        // Update active location
        setActiveLocation(firstLocation);
        
        // Update marker icon to active state
        markersRef.current.forEach(m => {
          const markerLocation = SACRED_LOCATIONS.find(
            loc => loc.coordinates[0] === m.getLatLng().lat && 
                   loc.coordinates[1] === m.getLatLng().lng
          );
          
          if (markerLocation) {
            const isActive = markerLocation.id === firstLocation.id;
            m.setIcon(createCustomMarkerIcon(markerLocation, isActive));
          }
        });
      } else if (journeyStep > 0 && journeyStep <= orderedLocations.length) {
        // Proceed to next location
        const currentLocation = orderedLocations[journeyStep - 1];
        
        // Fly to location
        mapRef.current.flyTo(currentLocation.coordinates, 8, {
          duration: 1.5
        });
        
        // Update active location
        setActiveLocation(currentLocation);
        
        // Update marker icon to active state
        markersRef.current.forEach(m => {
          const markerLocation = SACRED_LOCATIONS.find(
            loc => loc.coordinates[0] === m.getLatLng().lat && 
                   loc.coordinates[1] === m.getLatLng().lng
          );
          
          if (markerLocation) {
            const isActive = markerLocation.id === currentLocation.id;
            m.setIcon(createCustomMarkerIcon(markerLocation, isActive));
          }
        });
      } else if (journeyStep > orderedLocations.length) {
        // Journey completed
        mapRef.current.flyTo([26.0, 84.0], 6, {
          duration: 2
        });
        
        setJourneyMode(false);
        setJourneyStep(0);
        setActiveLocation(null);
        
        // Reset markers to normal state
        markersRef.current.forEach(m => {
          const markerLocation = SACRED_LOCATIONS.find(
            loc => loc.coordinates[0] === m.getLatLng().lat && 
                   loc.coordinates[1] === m.getLatLng().lng
          );
          
          if (markerLocation) {
            m.setIcon(createCustomMarkerIcon(markerLocation, false));
          }
        });
      }
    }
  }, [journeyMode, journeyStep, mapLoaded, orderedLocations, createCustomMarkerIcon, animatePath]);

  // Render footprints along the path during journey
  useEffect(() => {
    if (!mapRef.current || !pathRef.current || !journeyMode || !animatePathDone) return;
    
    // Get path points
    const pathPoints = pathRef.current.getLatLngs() as L.LatLng[];
    if (pathPoints.length < 10) return;
    
    // Create footprint markers at intervals
    const footprintInterval = Math.floor(pathPoints.length / 12);
    const footprints: L.Marker[] = [];
    
    for (let i = 0; i < pathPoints.length; i += footprintInterval) {
      if (i >= pathPoints.length) break;
      
      const point = pathPoints[i];
      const footprintIcon = L.divIcon({
        className: 'footprint-marker',
        html: `<div class="footprint footprint-${i % 2 === 0 ? 'right' : 'left'}"></div>`,
        iconSize: [12, 20]
      });
      
      const marker = L.marker([point.lat, point.lng], { 
        icon: footprintIcon,
        zIndexOffset: -1000
      }).addTo(mapRef.current);
      
      footprints.push(marker);
    }
    
    // Cleanup footprints when journey ends
    return () => {
      if (!journeyMode && mapRef.current) {
        footprints.forEach(marker => marker.remove());
      }
    };
  }, [journeyMode, animatePathDone]);

  // Handle journey advancement
  const advanceJourney = () => {
    setJourneyStep(prev => prev + 1);
  };

  // Function to start the guided journey
  const startJourney = () => {
    // Reset any existing path
    if (pathRef.current && mapRef.current) {
      pathRef.current.remove();
      pathRef.current = null;
    }
    
    setShowJourneyModal(false);
    setJourneyMode(true);
    setJourneyStep(0);
    setAnimatePathDone(false);
    
    // Start journey with a small delay
    setTimeout(() => {
      setJourneyStep(1);
    }, 500);
  };

  return (
    <>
      <FadeInSection className={`pilgrimage-guide-container ${className} relative`}>
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-[#D2691E]/20 transform transition-transform hover:scale-[1.01] duration-500">
          <div className="p-6 bg-gradient-to-r from-[#8B4513] via-[#D2691E] to-[#E6BF83] text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 5C50.5 20 65 35 80 35C65 35.5 50 50 50 65C49.5 50 35 35 20 35C35 34.5 49.5 20 50 5Z" fill="white"/>
              </svg>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
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
              
              <motion.button
                className="mt-4 md:mt-0 px-4 py-2 bg-white text-[#D2691E] rounded-full flex items-center gap-2 shadow-lg hover:bg-orange-50 transition-colors font-medium"
                onClick={() => setShowJourneyModal(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <i className="bx bx-play-circle text-xl"></i>
                <span>Begin Virtual Pilgrimage</span>
              </motion.button>
            </div>
          </div>
          
          <div className="p-3 bg-gradient-to-r from-[#FFF8EA] to-white border-y border-[#D2691E]/10">
            <div className="flex flex-wrap gap-2 justify-center">
              {SACRED_LOCATIONS.map(location => (
                <motion.div 
                  key={location.id}
                  className="px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 hover:bg-[#D2691E]/10 cursor-pointer transition-colors border"
                  style={{ 
                    color: location.color, 
                    borderColor: `${location.color}30`,
                    backgroundColor: activeLocation?.id === location.id ? `${location.color}20` : 'transparent'
                  }}
                  onClick={() => {
                    if (mapRef.current) {
                      mapRef.current.flyTo(location.coordinates, 10, {
                        duration: 1.5
                      });
                      
                      // Update active location
                      setActiveLocation(location);
                      
                      // Update marker icons
                      markersRef.current.forEach(m => {
                        const markerLocation = SACRED_LOCATIONS.find(
                          loc => loc.coordinates[0] === m.getLatLng().lat && 
                                loc.coordinates[1] === m.getLatLng().lng
                        );
                        
                        if (markerLocation) {
                          const isActive = markerLocation.id === location.id;
                          m.setIcon(createCustomMarkerIcon(markerLocation, isActive));
                        }
                      });
                    }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ 
                    scale: activeLocation?.id === location.id ? [1, 1.1, 1] : 1,
                    transition: { 
                      repeat: activeLocation?.id === location.id ? Infinity : 0, 
                      duration: 2,
                      repeatType: 'reverse'
                    }
                  }}
                >
                  <motion.div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: location.color }}
                    animate={{ 
                      scale: activeLocation?.id === location.id ? [1, 1.3, 1] : 1
                    }}
                    transition={{ 
                      repeat: activeLocation?.id === location.id ? Infinity : 0, 
                      duration: 1.5,
                      repeatType: 'reverse'
                    }}
                  />
                  {location.name}
                  
                  {JOURNEY_ORDER.indexOf(location.id) > -1 && (
                    <span className="ml-1 text-xs opacity-70">
                      {JOURNEY_ORDER.indexOf(location.id) + 1}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
          
          <div 
            ref={mapContainerRef} 
            className="h-[400px] w-full relative"
            style={{ position: 'relative' }}
          />
          
          {/* Journey Controls - Show only in journey mode */}
          {journeyMode && (
            <div className="absolute bottom-16 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-[#D2691E]/20 z-[999]">
              <div className="flex flex-col items-center">
                <span className="text-xs text-[#8B4513] font-medium mb-2">
                  {journeyStep}/{orderedLocations.length} - {journeyStep > 0 ? orderedLocations[journeyStep - 1]?.name : 'Start'}
                </span>
                
                <div className="flex gap-2">
                  <motion.button
                    className="p-2 rounded-full bg-[#D2691E] text-white hover:bg-[#B25522] transition-colors"
                    onClick={advanceJourney}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={journeyStep >= orderedLocations.length}
                  >
                    <i className="bx bx-chevron-right text-xl"></i>
                  </motion.button>
                  
                  <motion.button
                    className="p-2 rounded-full bg-white text-[#D2691E] border border-[#D2691E] hover:bg-orange-50 transition-colors"
                    onClick={() => {
                      setJourneyMode(false);
                      setJourneyStep(0);
                      setActiveLocation(null);
                      
                      // Reset view
                      if (mapRef.current) {
                        mapRef.current.flyTo([26.0, 84.0], 6, {
                          duration: 1.5
                        });
                      }
                      
                      // Reset markers
                      markersRef.current.forEach(m => {
                        const markerLocation = SACRED_LOCATIONS.find(
                          loc => loc.coordinates[0] === m.getLatLng().lat && 
                                loc.coordinates[1] === m.getLatLng().lng
                        );
                        
                        if (markerLocation) {
                          m.setIcon(createCustomMarkerIcon(markerLocation, false));
                        }
                      });
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <i className="bx bx-x text-xl"></i>
                  </motion.button>
                </div>
              </div>
            </div>
          )}
          
          <div className="p-4 bg-[#FFF8EA] border-t border-[#D2691E]/20">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
              <div className="flex items-start gap-2">
                <div className="text-[#D2691E] mt-1 text-lg">
                  <i className="bx bx-info-circle"></i>
                </div>
                <div>
                  <p className="text-sm text-[#8B4513] leading-relaxed">
                    <span className="font-medium">Interactive Guide:</span> Click markers to explore each sacred location. The four main sites in Buddha's life journey are connected in sequence: Lumbini → Bodhgaya → Sarnath → Kushinagar.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  className="px-3 py-1.5 text-sm bg-[#D2691E]/10 text-[#D2691E] rounded-md hover:bg-[#D2691E]/20 transition-colors flex items-center gap-1"
                  onClick={() => {
                    // Toggle footprints
                    const footprints = document.querySelectorAll('.footprint-marker');
                    footprints.forEach(fp => {
                      fp.classList.toggle('hidden');
                    });
                  }}
                >
                  <i className="bx bx-walk text-lg"></i>
                  <span>Footprints</span>
                </button>
                
                <button
                  className="px-3 py-1.5 text-sm bg-[#D2691E]/10 text-[#D2691E] rounded-md hover:bg-[#D2691E]/20 transition-colors flex items-center gap-1"
                  onClick={() => {
                    // Reset view
                    if (mapRef.current) {
                      mapRef.current.flyTo([26.0, 84.0], 6, {
                        duration: 1.5
                      });
                    }
                  }}
                >
                  <i className="bx bx-reset text-lg"></i>
                  <span>Reset View</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {!mapLoaded && (
          <div className="flex items-center justify-center p-6 bg-white/90 absolute top-0 left-0 w-full h-full backdrop-blur-sm z-50">
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
      
      {/* Journey Introduction Modal */}
      <AnimatePresence>
        {showJourneyModal && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowJourneyModal(false)}
          >
            <motion.div 
              className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative overflow-hidden"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
                onClick={() => setShowJourneyModal(false)}
              >
                <i className="bx bx-x text-2xl"></i>
              </button>
              
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-3 relative">
                  <div className="absolute inset-0 rounded-full bg-orange-100 flex items-center justify-center">
                    <i className="bx bxs-map text-3xl text-[#D2691E]"></i>
                  </div>
                </div>
                
                <h3 className="text-2xl font-heading font-bold text-[#8B4513]">Begin Your Spiritual Journey</h3>
                <p className="text-gray-600 mt-2">Follow the path of Lord Buddha from birth to enlightenment and beyond</p>
              </div>
              
              <StaggerContainer className="mb-6">
                {orderedLocations.map((location, idx) => (
                  <StaggerItem key={location.id} delay={idx * 0.1} className="flex items-center gap-3 mb-3">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white"
                      style={{ backgroundColor: location.color }}
                    >
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">{location.name}</h4>
                      <p className="text-sm text-gray-600">{location.description}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
              
              <div className="flex items-center justify-center gap-4">
                <motion.button
                  className="px-4 py-2 border border-[#D2691E] text-[#D2691E] rounded-md hover:bg-orange-50 transition-colors"
                  onClick={() => setShowJourneyModal(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Maybe Later
                </motion.button>
                
                <motion.button
                  className="px-4 py-2 bg-[#D2691E] text-white rounded-md hover:bg-[#B25522] transition-colors flex items-center gap-2"
                  onClick={startJourney}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="bx bx-play-circle"></i>
                  <span>Start Journey</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Location Detail Modal */}
      <AnimatePresence>
        {activeLocation && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLocation(null)}
          >
            <motion.div 
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-40 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${activeLocation.imageUrl}')` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                
                <button 
                  className="absolute top-3 right-3 text-white hover:text-gray-200 transition-colors z-10"
                  onClick={() => setActiveLocation(null)}
                >
                  <i className="bx bx-x text-2xl"></i>
                </button>
                
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <div className="flex items-center">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white mr-2 text-sm"
                      style={{ backgroundColor: activeLocation.color }}
                    >
                      {JOURNEY_ORDER.indexOf(activeLocation.id) + 1}
                    </div>
                    <h2 className="text-2xl font-heading font-bold">{activeLocation.name}</h2>
                  </div>
                  <p className="text-white/90">{activeLocation.description}</p>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-[#8B4513] mb-2">Spiritual Significance</h3>
                  <p className="text-gray-700 leading-relaxed">{activeLocation.significance}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-medium text-[#8B4513] mb-2">Our Initiatives</h3>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      {activeLocation.initiatives.map((initiative, idx) => (
                        <li key={idx}>{initiative}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-[#8B4513] mb-2">Visitor Information</h3>
                    <div className="text-gray-700">
                      <p className="mb-2"><span className="font-medium">Best time to visit:</span> {activeLocation.bestTimeToVisit}</p>
                      <p><span className="font-medium">Accommodation:</span> {activeLocation.nearbyAccommodation.split('.')[0]}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-[#8B4513] mb-2">Pilgrim Travel Tips</h3>
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                    <ul className="space-y-2">
                      {activeLocation.travelTips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <i className="bx bxs-leaf text-[#D2691E] mt-1"></i>
                          <span className="text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {activeLocation.mantras && activeLocation.mantras.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium text-[#8B4513] mb-2">Sacred Mantras</h3>
                    <div className="p-4 bg-gradient-to-r from-[#FFF8EA] to-white border border-[#D2691E]/20 rounded-lg">
                      {activeLocation.mantras.map((mantra, idx) => (
                        <div key={idx} className="text-center py-2">
                          <p className="font-spectral italic text-[#8B4513]">{mantra}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-4 border-t border-gray-100 flex justify-end">
                <button
                  className="px-4 py-2 bg-[#D2691E] text-white rounded-md hover:bg-[#B25522] transition-colors flex items-center gap-2"
                  onClick={() => setActiveLocation(null)}
                >
                  <i className="bx bx-map-alt"></i>
                  <span>Return to Map</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Map styles are moved to index.css */}
    </>
  );
};

export default InteractiveMap;