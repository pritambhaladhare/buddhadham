import { useEffect, useRef, useState, useCallback } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FadeInSection } from '@/components/animation/AnimatedSection';
import BuddhistMarker from './BuddhistMarker';
import { createRoot } from 'react-dom/client';
import { motion } from 'framer-motion';

// Define location type 
interface SacredLocation {
  id: number;
  name: string;
  description: string;
  coordinates: [number, number]; // Explicitly define as lat/lng tuple
  initiatives: string[];
  color: string;
  imageUrl?: string;
}

// Define image URLs
const lumbiniImg = "https://static.buddhadhaam.org/Lumbini1.jpg";
const sarnathImg = "https://static.buddhadhaam.org/Saranath.jpg";
const bodhgayaImg = "https://static.buddhadhaam.org/tong-kbp-wcpnpwvdWzI-unsplash.jpg";
const kushinagarImg = "https://static.buddhadhaam.org/Kushinagar.jpg";

// Define the sacred sites
const SACRED_LOCATIONS: SacredLocation[] = [
  {
    id: 1,
    name: 'Lumbini',
    description: 'Birthplace of Lord Buddha',
    coordinates: [27.4833, 83.2767],
    initiatives: ['Tree Planting', 'Monastery Support'],
    color: '#D2691E',
    imageUrl: lumbiniImg
  },
  {
    id: 2,
    name: 'Sarnath',
    description: 'Where Buddha delivered his first sermon',
    coordinates: [25.3800, 83.0200],
    initiatives: ['Food & Medical Aid', 'Water Distribution'],
    color: '#9D2933',
    imageUrl: sarnathImg
  },
  {
    id: 3,
    name: 'Bodhgaya',
    description: 'Where Buddha attained enlightenment',
    coordinates: [24.6961, 84.9911],
    initiatives: ['Stupa Restoration', 'Tripitaka Chanting'],
    color: '#D4AF37',
    imageUrl: bodhgayaImg
  },
  {
    id: 4,
    name: 'Kushinagar',
    description: 'Where Buddha attained Mahaparinirvana',
    coordinates: [26.7400, 83.8900],
    initiatives: ['Monk Support', 'Sacred Ceremonies'],
    color: '#8B4513',
    imageUrl: kushinagarImg
  }
];

// Life path of Buddha
const JOURNEY_PATH = [1, 3, 2, 4]; // Lumbini → Bodhgaya → Sarnath → Kushinagar

interface InteractiveMapProps {
  className?: string;
}

const InteractiveMap = ({ className = '' }: InteractiveMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const pathRef = useRef<L.Polyline | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const infoCardRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [activeLocation, setActiveLocation] = useState<SacredLocation | null>(null);
  const [showPath, setShowPath] = useState(false);
  const [isJourneyMode, setIsJourneyMode] = useState(false);
  const [journeyStep, setJourneyStep] = useState(0);

  // Sort locations by Buddha's life path
  const orderedLocations = [...SACRED_LOCATIONS].sort((a, b) => 
    JOURNEY_PATH.indexOf(a.id) - JOURNEY_PATH.indexOf(b.id)
  );

  // Create journey path
  const createJourneyPath = useCallback(() => {
    if (!mapRef.current) return;
    
    // Remove any existing path
    if (pathRef.current) {
      pathRef.current.remove();
      pathRef.current = null;
    }
    
    // Create ordered path
    const pathCoordinates = orderedLocations.map(loc => loc.coordinates);
    
    const path = L.polyline(pathCoordinates, {
      color: '#D4AF37',
      weight: 3,
      opacity: 0.8,
      lineCap: 'round',
      dashArray: '10, 10',
      className: 'journey-path'
    }).addTo(mapRef.current);
    
    pathRef.current = path;
  }, [orderedLocations]);

  // Custom marker creator
  const createCustomMarker = useCallback((location: SacredLocation, isActive: boolean = false) => {
    // Helper to render React component as HTML string
    function renderToString(reactElement: React.ReactElement) {
      const div = document.createElement('div');
      const root = createRoot(div);
      root.render(reactElement);
      return div.innerHTML;
    }
    
    const icon = L.divIcon({
      className: `custom-buddhist-marker site-${location.id} ${isActive ? 'active-marker' : ''}`,
      html: renderToString(
        <BuddhistMarker 
          color={location.color} 
          size={isActive ? 38 : 30} 
          isActive={isActive}
        />
      ),
      iconSize: [isActive ? 38 : 30, (isActive ? 38 : 30) * 1.5],
      iconAnchor: [isActive ? 19 : 15, (isActive ? 38 : 30) * 1.5],
      popupAnchor: [0, -(isActive ? 38 : 30) * 1.5]
    });
    
    return icon;
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    try {
      // Create map instance
      const map = L.map(mapContainerRef.current, {
        center: [26.0, 84.0], // Center on North India
        zoom: 6,
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: false
      });

      // Use subtle CartoDB tiles
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd',
      }).addTo(map);
      
      // Add attribution
      L.control.attribution({
        position: 'bottomright',
        prefix: ''
      }).addAttribution('Buddha Dhaam | © OpenStreetMap contributors').addTo(map);

      // Create markers for each location
      SACRED_LOCATIONS.forEach(location => {
        const marker = L.marker(
          location.coordinates, 
          { icon: createCustomMarker(location) }
        ).addTo(map);
        
        markersRef.current.push(marker);
        
        // Add marker click handler
        marker.on('click', () => {
          // Update active location state
          setActiveLocation(location);
          
          // Update all markers to reflect active state
          markersRef.current.forEach(m => {
            const markerLocation = SACRED_LOCATIONS.find(
              loc => loc.coordinates[0] === m.getLatLng().lat && 
                     loc.coordinates[1] === m.getLatLng().lng
            );
            
            if (markerLocation) {
              const isActive = markerLocation.id === location.id;
              m.setIcon(createCustomMarker(markerLocation, isActive));
            }
          });
          
          // If in journey mode, don't zoom/pan the map
          if (!isJourneyMode) {
            map.flyTo(location.coordinates, 8, {
              duration: 1
            });
          }
        });
      });

      mapRef.current = map;
      setMapLoaded(true);

      // Fix Leaflet icon issues
      setTimeout(() => {
        map.invalidateSize();
      }, 100);

      return () => {
        if (mapRef.current) {
          mapRef.current.remove();
          mapRef.current = null;
        }
      };
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }, [createCustomMarker]);

  // Handle journey mode
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;
    
    if (isJourneyMode) {
      // Show path
      setShowPath(true);
      
      if (!pathRef.current) {
        createJourneyPath();
      }
      
      // Handle journey steps
      if (journeyStep >= 0 && journeyStep < orderedLocations.length) {
        const currentLocation = orderedLocations[journeyStep];
        
        // Update active location
        setActiveLocation(currentLocation);
        
        // Update markers
        markersRef.current.forEach(m => {
          const markerLocation = SACRED_LOCATIONS.find(
            loc => loc.coordinates[0] === m.getLatLng().lat && 
                   loc.coordinates[1] === m.getLatLng().lng
          );
          
          if (markerLocation) {
            const isActive = markerLocation.id === currentLocation.id;
            m.setIcon(createCustomMarker(markerLocation, isActive));
          }
        });
        
        // Fly to current location
        mapRef.current.flyTo(currentLocation.coordinates, 8, {
          duration: 1.5
        });
      } else if (journeyStep >= orderedLocations.length) {
        // Journey complete
        setIsJourneyMode(false);
        setJourneyStep(0);
        mapRef.current.flyTo([26.0, 84.0], 6, {
          duration: 1.5
        });
      }
    }
  }, [isJourneyMode, journeyStep, mapLoaded, orderedLocations, createCustomMarker, createJourneyPath]);

  // Toggle journey path
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;
    
    if (showPath) {
      if (!pathRef.current) {
        createJourneyPath();
      }
    } else {
      if (pathRef.current) {
        pathRef.current.remove();
        pathRef.current = null;
      }
    }
  }, [showPath, mapLoaded, createJourneyPath]);

  // Start journey
  const startJourney = () => {
    setIsJourneyMode(true);
    setJourneyStep(0);
    
    // Small delay before starting first step
    setTimeout(() => {
      setJourneyStep(0);
    }, 500);
  };

  // Next journey step
  const nextJourneyStep = () => {
    setJourneyStep(prev => prev + 1);
  };

  // Reset map view
  const resetMapView = () => {
    if (!mapRef.current) return;
    
    // Reset all markers
    markersRef.current.forEach(m => {
      const markerLocation = SACRED_LOCATIONS.find(
        loc => loc.coordinates[0] === m.getLatLng().lat && 
               loc.coordinates[1] === m.getLatLng().lng
      );
      
      if (markerLocation) {
        m.setIcon(createCustomMarker(markerLocation, false));
      }
    });
    
    // Reset view
    mapRef.current.flyTo([26.0, 84.0], 6, {
      duration: 1
    });
    
    setActiveLocation(null);
    setIsJourneyMode(false);
    setJourneyStep(0);
  };

  return (
    <FadeInSection className={`pilgrimage-guide-container ${className} relative`}>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#D2691E]/20">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#8B4513] via-[#D2691E] to-[#E6BF83] text-white relative">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold">Sacred Path</h2>
              <p className="text-white/90 text-sm sm:text-base">The journey of Lord Buddha's life</p>
            </div>
            
            <div className="flex gap-2">
              <motion.button
                className="px-3 py-1.5 bg-white text-[#D2691E] rounded-full flex items-center gap-1.5 text-sm shadow hover:bg-orange-50 transition-colors"
                onClick={startJourney}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                disabled={isJourneyMode}
              >
                <i className="bx bx-walk text-lg"></i>
                <span>Follow Journey</span>
              </motion.button>
              
              <motion.button
                className="px-3 py-1.5 bg-white/20 text-white rounded-full flex items-center gap-1.5 text-sm border border-white/30 hover:bg-white/30 transition-colors"
                onClick={() => setShowPath(!showPath)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <i className={`bx ${showPath ? 'bx-hide' : 'bx-show'} text-lg`}></i>
                <span>{showPath ? 'Hide' : 'Show'} Path</span>
              </motion.button>
            </div>
          </div>
        </div>
        
        {/* Site Selector */}
        <div className="p-2 flex items-center justify-center gap-2 bg-[#FFF8EA] border-y border-[#D2691E]/10 flex-wrap">
          {SACRED_LOCATIONS.map(location => (
            <motion.button
              key={location.id}
              className="px-2 py-1 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1 hover:bg-[#D2691E]/10 transition-colors"
              style={{ 
                color: location.color,
                backgroundColor: activeLocation?.id === location.id ? `${location.color}15` : 'transparent',
                borderColor: activeLocation?.id === location.id ? location.color : 'transparent',
                borderWidth: '1px'
              }}
              onClick={() => {
                if (!mapRef.current) return;
                
                // Find the marker for this location
                const marker = markersRef.current.find(m => {
                  return m.getLatLng().lat === location.coordinates[0] && 
                         m.getLatLng().lng === location.coordinates[1];
                });
                
                if (marker) {
                  // Simulate a click on the marker
                  marker.fire('click');
                }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: location.color }}></span>
              {location.name}
              {JOURNEY_PATH.indexOf(location.id) > -1 && (
                <span className="opacity-60 text-[10px]">{JOURNEY_PATH.indexOf(location.id) + 1}</span>
              )}
            </motion.button>
          ))}
        </div>
        
        {/* Map Container */}
        <div className="relative">
          <div 
            ref={mapContainerRef} 
            className="h-[400px] w-full"
            style={{ position: 'relative' }}
          />
          
          {/* Loading Indicator */}
          {!mapLoaded && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 border-4 border-[#D2691E]/30 border-t-[#D2691E] rounded-full animate-spin mb-2"></div>
                <span className="text-[#8B4513]">Loading map...</span>
              </div>
            </div>
          )}
          
          {/* Location Info Card - Appears on marker click */}
          {activeLocation && (
            <div 
              ref={infoCardRef}
              className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 max-w-[280px] z-[400] border border-[#D2691E]/20 animate-fadeIn"
            >
              <button 
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                onClick={() => {
                  setActiveLocation(null);
                  
                  // Reset markers if not in journey mode
                  if (!isJourneyMode) {
                    markersRef.current.forEach(m => {
                      const markerLocation = SACRED_LOCATIONS.find(
                        loc => loc.coordinates[0] === m.getLatLng().lat && 
                               loc.coordinates[1] === m.getLatLng().lng
                      );
                      
                      if (markerLocation) {
                        m.setIcon(createCustomMarker(markerLocation, false));
                      }
                    });
                  }
                }}
              >
                <i className="bx bx-x text-xl"></i>
              </button>
              
              <div className="flex mb-2 items-center">
                <div 
                  className="w-10 h-10 rounded-full mr-3 bg-cover bg-center"
                  style={{ backgroundImage: `url(${activeLocation.imageUrl})` }}
                ></div>
                <div>
                  <h3 className="font-medium text-lg" style={{ color: activeLocation.color }}>
                    {activeLocation.name}
                  </h3>
                  <p className="text-xs text-gray-600">{activeLocation.description}</p>
                </div>
              </div>
              
              <div className="mb-2">
                <p className="text-xs text-gray-700 font-medium">Our Initiatives:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {activeLocation.initiatives.map((initiative, idx) => (
                    <span 
                      key={idx} 
                      className="px-1.5 py-0.5 bg-[#FFF8EA] text-[10px] rounded-full border border-[#D2691E]/10"
                      style={{ color: activeLocation.color }}
                    >
                      {initiative}
                    </span>
                  ))}
                </div>
              </div>
              
              {isJourneyMode && journeyStep < orderedLocations.length - 1 && (
                <button
                  className="w-full mt-2 py-1.5 text-white text-sm rounded-md flex items-center justify-center gap-1.5"
                  style={{ backgroundColor: activeLocation.color }}
                  onClick={nextJourneyStep}
                >
                  <span>Continue Journey</span>
                  <i className="bx bx-right-arrow-alt"></i>
                </button>
              )}
            </div>
          )}
          
          {/* Journey Controls */}
          {isJourneyMode && (
            <div className="absolute left-4 bottom-4 bg-white rounded-lg shadow-lg p-2 z-[400] border border-[#D2691E]/20">
              <div className="flex items-center gap-3">
                <div className="text-gray-800 text-xs font-medium">
                  {journeyStep + 1}/{orderedLocations.length}
                </div>
                
                <div className="flex gap-1">
                  <button
                    className="p-1 rounded-full bg-[#D2691E] text-white"
                    onClick={nextJourneyStep}
                    disabled={journeyStep >= orderedLocations.length - 1}
                  >
                    <i className="bx bx-right-arrow-alt text-lg"></i>
                  </button>
                  
                  <button
                    className="p-1 rounded-full border border-[#D2691E] text-[#D2691E]"
                    onClick={() => {
                      setIsJourneyMode(false);
                      resetMapView();
                    }}
                  >
                    <i className="bx bx-x text-lg"></i>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Map Footer */}
        <div className="p-3 border-t border-[#D2691E]/10 bg-[#FFF8EA] flex items-center justify-between flex-wrap gap-2">
          <div className="text-xs text-[#8B4513]">
            <i className="bx bx-info-circle mr-1"></i>
            <span className="hidden sm:inline">Click on markers to explore Buddha's sacred sites. </span>
            <span>Lumbini → Bodhgaya → Sarnath → Kushinagar</span>
          </div>
          
          <button
            className="px-2 py-1 text-xs bg-[#D2691E]/10 text-[#D2691E] rounded hover:bg-[#D2691E]/20"
            onClick={resetMapView}
          >
            <i className="bx bx-reset mr-1"></i>
            <span>Reset</span>
          </button>
        </div>
      </div>
      
      {/* Animation styles added to index.css */}
    </FadeInSection>
  );
};

export default InteractiveMap;