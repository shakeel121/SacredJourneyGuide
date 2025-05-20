import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/hooks/use-language';
import { ZoomIn, ZoomOut, Info, X, MapPin, Navigation, Route } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Location {
  id: number;
  name: string;
  name_ar: string;
  description: string;
  description_ar: string;
  position: { x: number; y: number };
  image?: string;
  order?: number;
}

interface Route {
  id: number;
  name: string;
  name_ar: string;
  description: string;
  description_ar: string;
  path: { x: number; y: number }[];
  color: string;
}

interface InteractiveMapProps {
  mapImage: string;
  locations: Location[];
  routes?: Route[];
  initialZoom?: number;
  maxZoom?: number;
  minZoom?: number;
  className?: string;
}

export function InteractiveMap({
  mapImage,
  locations,
  routes = [],
  initialZoom = 1,
  maxZoom = 3,
  minZoom = 0.5,
  className
}: InteractiveMapProps) {
  const { t, language } = useLanguage();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapImageRef = useRef<HTMLImageElement>(null);
  const [zoom, setZoom] = useState(initialZoom);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startDragPosition, setStartDragPosition] = useState({ x: 0, y: 0 });
  const [startDragOffset, setStartDragOffset] = useState({ x: 0, y: 0 });
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [showAllLocations, setShowAllLocations] = useState(false);
  const [mapSize, setMapSize] = useState({ width: 0, height: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);

  // Handle map zoom
  const handleZoom = (newZoom: number) => {
    const clampedZoom = Math.max(minZoom, Math.min(maxZoom, newZoom));
    setZoom(clampedZoom);
  };

  // Handle zoom in/out buttons
  const zoomIn = () => handleZoom(zoom + 0.2);
  const zoomOut = () => handleZoom(zoom - 0.2);

  // Handle map drag
  const startDrag = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    
    if ('clientX' in e) {
      // Mouse event
      setStartDragPosition({ x: e.clientX, y: e.clientY });
    } else {
      // Touch event
      const touch = e.touches[0];
      setStartDragPosition({ x: touch.clientX, y: touch.clientY });
    }
    
    setStartDragOffset({ x: position.x, y: position.y });
  };

  const onDrag = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    
    let currentX: number, currentY: number;
    
    if ('clientX' in e) {
      // Mouse event
      currentX = e.clientX;
      currentY = e.clientY;
    } else {
      // Touch event
      const touch = e.touches[0];
      currentX = touch.clientX;
      currentY = touch.clientY;
    }
    
    const dx = currentX - startDragPosition.x;
    const dy = currentY - startDragPosition.y;
    
    setPosition({
      x: startDragOffset.x + dx,
      y: startDragOffset.y + dy,
    });
  };

  const endDrag = () => {
    setIsDragging(false);
  };

  // Handle location pin click
  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location);
  };
  
  // Close location info
  const closeLocationInfo = () => {
    setSelectedLocation(null);
  };
  
  // Toggle all locations list
  const toggleAllLocations = () => {
    setShowAllLocations(!showAllLocations);
  };
  
  // Navigate to a specific location
  const navigateToLocation = (location: Location) => {
    if (!mapContainerRef.current || !mapImageRef.current) return;
    
    const containerWidth = mapContainerRef.current.clientWidth;
    const containerHeight = mapContainerRef.current.clientHeight;
    
    // Calculate the center position
    const x = -(location.position.x * zoom) + containerWidth / 2;
    const y = -(location.position.y * zoom) + containerHeight / 2;
    
    setPosition({ x, y });
    setSelectedLocation(location);
    setShowAllLocations(false);
  };
  
  // Update map size when image loads
  const handleImageLoad = () => {
    if (mapImageRef.current) {
      setMapSize({
        width: mapImageRef.current.naturalWidth,
        height: mapImageRef.current.naturalHeight,
      });
      setImageLoaded(true);
    }
  };
  
  // Center the map initially
  useEffect(() => {
    if (mapContainerRef.current && imageLoaded) {
      const containerWidth = mapContainerRef.current.clientWidth;
      const containerHeight = mapContainerRef.current.clientHeight;
      
      // Center the map
      setPosition({
        x: (containerWidth - mapSize.width * zoom) / 2,
        y: (containerHeight - mapSize.height * zoom) / 2,
      });
    }
  }, [zoom, mapSize, imageLoaded]);
  
  // Sort locations by order if available
  const sortedLocations = [...locations].sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }
    return a.id - b.id;
  });

  return (
    <div className={cn("relative w-full h-[500px] bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden", className)}>
      {/* Map container */}
      <div 
        ref={mapContainerRef}
        className={cn(
          "absolute inset-0 overflow-hidden cursor-grab",
          isDragging && "cursor-grabbing"
        )}
        onMouseDown={startDrag}
        onMouseMove={onDrag}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onTouchStart={startDrag}
        onTouchMove={onDrag}
        onTouchEnd={endDrag}
      >
        {/* Map image */}
        <div 
          className="absolute" 
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
            transformOrigin: '0 0',
            transition: isDragging ? 'none' : 'transform 0.2s ease-out',
            willChange: 'transform',
          }}
        >
          <img 
            ref={mapImageRef}
            src={mapImage} 
            alt="Interactive Map" 
            className="max-w-none w-auto h-auto"
            onLoad={handleImageLoad}
          />
          
          {/* Routes */}
          {routes.map((route) => (
            <svg 
              key={route.id}
              className="absolute top-0 left-0"
              style={{
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
              }}
            >
              <polyline
                points={route.path.map(p => `${p.x},${p.y}`).join(' ')}
                style={{
                  fill: 'none',
                  stroke: route.color,
                  strokeWidth: 3 / zoom,
                  strokeDasharray: '5,5',
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                }}
              />
            </svg>
          ))}
          
          {/* Location pins */}
          {sortedLocations.map((location) => (
            <div
              key={location.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-110"
              style={{
                left: `${location.position.x}px`,
                top: `${location.position.y}px`,
                zIndex: selectedLocation?.id === location.id ? 10 : 5,
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleLocationClick(location);
              }}
            >
              <div className={cn(
                "flex flex-col items-center",
                selectedLocation?.id === location.id && "scale-110"
              )}>
                <MapPin 
                  className={cn(
                    "h-8 w-8 text-primary drop-shadow-lg",
                    selectedLocation?.id === location.id && "text-red-500 animate-bounce",
                  )} 
                  fill={selectedLocation?.id === location.id ? "rgba(239, 68, 68, 0.2)" : "rgba(var(--primary), 0.2)"}
                  strokeWidth={2}
                />
                <div 
                  className={cn(
                    "px-2 py-1 rounded-md bg-white dark:bg-slate-800 text-xs font-medium shadow-md whitespace-nowrap",
                    selectedLocation?.id === location.id ? "block" : "hidden md:block opacity-80"
                  )}
                >
                  {language === 'en' ? location.name : location.name_ar}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Zoom controls */}
      <div className="absolute top-4 right-4 flex flex-col bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden">
        <Button variant="ghost" size="icon" onClick={zoomIn} disabled={zoom >= maxZoom}>
          <ZoomIn className="h-4 w-4" />
        </Button>
        <div className="h-px w-full bg-gray-200 dark:bg-gray-700" />
        <Button variant="ghost" size="icon" onClick={zoomOut} disabled={zoom <= minZoom}>
          <ZoomOut className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Locations list button */}
      <Button 
        variant="secondary"
        size="sm"
        className="absolute top-4 left-4 shadow-md"
        onClick={toggleAllLocations}
      >
        <Info className="h-4 w-4 mr-2" />
        {t("Locations", "المواقع")}
      </Button>
      
      {/* Locations list panel */}
      {showAllLocations && (
        <Card className="absolute left-4 top-16 w-72 shadow-lg max-h-[calc(100%-5rem)] overflow-y-auto">
          <div className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">{t("All Locations", "جميع المواقع")}</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowAllLocations(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {sortedLocations.map((location) => (
                <div 
                  key={location.id}
                  className={cn(
                    "p-2 rounded-md cursor-pointer flex items-center",
                    selectedLocation?.id === location.id ? 
                      "bg-primary/10 border border-primary/50" : 
                      "hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                  onClick={() => navigateToLocation(location)}
                >
                  <MapPin className="h-4 w-4 text-primary mr-2" />
                  <span className="flex-1">{language === 'en' ? location.name : location.name_ar}</span>
                  <Navigation className="h-4 w-4 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
      
      {/* Location info panel */}
      {selectedLocation && (
        <Card className="absolute right-4 bottom-4 w-80 max-w-[calc(100%-2rem)] shadow-lg">
          <div className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">{language === 'en' ? selectedLocation.name : selectedLocation.name_ar}</h3>
              <Button variant="ghost" size="icon" onClick={closeLocationInfo}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {selectedLocation.image && (
              <div className="mb-3 rounded-md overflow-hidden">
                <img 
                  src={selectedLocation.image} 
                  alt={language === 'en' ? selectedLocation.name : selectedLocation.name_ar} 
                  className="w-full h-40 object-cover"
                />
              </div>
            )}
            
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'en' ? selectedLocation.description : selectedLocation.description_ar}
            </p>
            
            <div className="mt-3 flex justify-end">
              <Button 
                variant="outline" 
                size="sm" 
                className="mr-2"
                onClick={closeLocationInfo}
              >
                <X className="h-4 w-4 mr-1" />
                {t("Close", "إغلاق")}
              </Button>
              <Button 
                size="sm"
                onClick={() => navigateToLocation(selectedLocation)}
              >
                <Navigation className="h-4 w-4 mr-1" />
                {t("Center", "تمركز")}
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}