"use client";

import React, { useState, useRef, useMemo } from "react";
import Map, { Marker, Popup, NavigationControl, FullscreenControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import "./map.css"; // Custom map CSS for 3D Arc and Pulse
import { MapPin, X, Search, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  locations: any[];
};

export function InteractiveMap({ locations }: Props) {
  const [popupInfo, setPopupInfo] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const mapRef = useRef<any>(null);

  // Phù Lãng coordinates approx (Quế Võ, Bắc Ninh)
  const initialViewState = {
    longitude: 106.2568,
    latitude: 21.1490,
    zoom: 14.5,
    pitch: 45,
    bearing: 0,
  };

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return locations.filter(loc => {
      const name = loc.type === "household" ? loc.households?.name : loc.custom_name;
      return name?.toLowerCase().includes(q);
    });
  }, [searchQuery, locations]);

  const handleMarkerClick = (e: any, loc: any) => {
    if (e?.originalEvent) {
      e.originalEvent.stopPropagation();
    }
    setPopupInfo(loc);
    
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [loc.lng, loc.lat],
        zoom: 17,
        pitch: 60,
        bearing: 0,
        duration: 1500
      });
    }
  };

  const handleSearchResultClick = (loc: any) => {
    setSearchQuery("");
    setShowSearchResults(false);
    handleMarkerClick(null, loc);
  };

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  if (!mapboxToken) {
    return (
      <div className="w-full h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-secondary/50 text-center p-8">
        <MapPin className="w-12 h-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-bold">Chưa cấu hình Mapbox Token</h3>
        <p className="text-muted-foreground mt-2 max-w-md">
          Vui lòng thêm biến môi trường <code>NEXT_PUBLIC_MAPBOX_TOKEN</code> vào file .env để kích hoạt bản đồ 3D.
        </p>
      </div>
    );
  }

  // Helper function to extract gallery images for a location
  const getGalleryImages = (loc: any) => {
    if (!loc) return [];
    if (loc.type === "household") {
      const samples = loc.households?.household_samples || [];
      const images = samples.map((s: any) => s.image_url).filter(Boolean);
      // Include avatar as first image if exists
      if (loc.households?.avatar_url) {
        images.unshift(loc.households.avatar_url);
      }
      return images.slice(0, 7); // Limit to 7 images for arc
    } else {
      return loc.gallery_urls?.slice(0, 7) || [];
    }
  };

  return (
    <div className="w-full h-[calc(100vh-64px)] relative">
      {/* Search Bar Overlay */}
      <div className="absolute top-4 left-4 z-10 w-full max-w-sm px-4 md:px-0">
        <div className="relative bg-white rounded-xl shadow-xl border border-[var(--pl-ash)]/30 overflow-hidden">
          <div className="flex items-center px-4 py-3 bg-white">
            <Search className="w-5 h-5 text-muted-foreground mr-3 shrink-0" />
            <input 
              type="text"
              placeholder="Tìm kiếm lò gốm, địa điểm..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              onFocus={() => setShowSearchResults(true)}
              className="flex-1 bg-transparent border-none outline-none text-sm text-[var(--pl-char)] min-w-0"
            />
            {searchQuery && (
              <button onClick={() => {setSearchQuery(""); setShowSearchResults(false)}} className="p-1 hover:bg-secondary rounded shrink-0">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>
          {showSearchResults && searchResults.length > 0 && (
            <div className="border-t border-[var(--pl-ash)]/20 max-h-64 overflow-y-auto bg-white">
              {searchResults.map(loc => (
                <button 
                  key={loc.id}
                  onClick={() => handleSearchResultClick(loc)}
                  className="w-full text-left px-4 py-3 hover:bg-[var(--pl-clay)]/5 transition-colors flex items-center gap-3 border-b border-[var(--pl-ash)]/10 last:border-0"
                >
                  <div className="bg-[var(--pl-clay)]/10 p-2 rounded-full shrink-0">
                    <MapPin className="w-4 h-4 text-[var(--pl-clay)]" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium text-sm text-[var(--pl-char)] truncate">
                      {loc.type === "household" ? loc.households?.name : loc.custom_name}
                    </div>
                    <div className="text-xs text-muted-foreground capitalize">{loc.type === 'household' ? 'Hộ nghề' : 'Địa điểm'}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
          {showSearchResults && searchQuery && searchResults.length === 0 && (
             <div className="border-t border-[var(--pl-ash)]/20 p-4 text-center text-sm text-muted-foreground bg-white">
                Không tìm thấy địa điểm nào.
             </div>
          )}
        </div>
      </div>

      <Map
        ref={mapRef}
        initialViewState={initialViewState}
        mapStyle="mapbox://styles/mapbox/outdoors-v12"
        mapboxAccessToken={mapboxToken}
        terrain={{ source: 'mapbox-dem', exaggeration: 1.5 }}
        maxPitch={85}
        onClick={() => {
          setShowSearchResults(false);
          setPopupInfo(null); // click outside closes popup
        }}
      >
        <NavigationControl position="top-right" />
        <FullscreenControl position="top-right" />

        {locations.map((loc) => (
          <Marker 
            key={loc.id} 
            longitude={loc.lng} 
            latitude={loc.lat} 
            anchor="bottom"
            onClick={(e) => handleMarkerClick(e, loc)}
          >
            <div className="relative group cursor-pointer z-0 hover:z-50">
              {/* Pulse effect */}
              <div className="map-marker-pulse"></div>
              
              <div className="w-10 h-10 bg-[var(--pl-clay)] rounded-full flex items-center justify-center shadow-lg border-2 border-white transform transition-transform group-hover:scale-110 relative z-10">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              
              <div className="absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-md text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl font-medium z-20">
                {loc.type === "household" ? loc.households?.name : loc.custom_name}
              </div>
            </div>
          </Marker>
        ))}

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={popupInfo.lng}
            latitude={popupInfo.lat}
            closeButton={false}
            className="z-50 custom-popup"
            style={{ padding: 0 }}
          >
            {/* 3D Arc Gallery overlay attached to popup */}
            {getGalleryImages(popupInfo).length > 0 && (
              <div className="arc-gallery-container">
                {getGalleryImages(popupInfo).map((imgUrl: string, idx: number, arr: any[]) => {
                  // Calculate angle for arc spread (e.g. from -60deg to +60deg depending on item count)
                  const totalItems = arr.length;
                  const spread = Math.min(180, totalItems * 30); // Max spread 180 degrees
                  const startAngle = -spread / 2;
                  const step = totalItems > 1 ? spread / (totalItems - 1) : 0;
                  const angle = startAngle + (idx * step);
                  
                  // Animation delay so they pop in one by one
                  const delay = idx * 0.1;
                  
                  return (
                    <div 
                      key={idx} 
                      className="arc-card"
                      style={{ 
                        "--arc-angle": `${angle}deg`,
                        animationDelay: `${delay}s`
                      } as React.CSSProperties}
                    >
                      <img src={imgUrl} alt="Gallery" />
                    </div>
                  );
                })}
              </div>
            )}

            {/* Normal Information Box */}
            <div className="p-3 w-64 bg-white rounded-lg shadow-xl relative z-10 mt-10">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-base text-[var(--pl-char)] pr-4">
                  {popupInfo.type === "household" ? popupInfo.households?.name : popupInfo.custom_name}
                </h3>
                <button onClick={() => setPopupInfo(null)} className="p-1 hover:bg-secondary rounded-full shrink-0 transition-colors">
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
              
              <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                {popupInfo.type === "household" ? popupInfo.households?.description : popupInfo.custom_description}
              </p>

              {popupInfo.type === "household" && (
                <Link href={`/ho-nghe/${popupInfo.household_id}`} className="flex items-center justify-center w-full py-2.5 bg-[var(--pl-clay)] text-white rounded-lg font-medium text-sm hover:bg-[var(--pl-eel)] transition-colors shadow-md">
                  Xem hồ sơ nghệ nhân
                </Link>
              )}
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}
