"use client";

import React, { useState, useRef, useMemo, useCallback } from "react";
import Map, { Marker, Popup, NavigationControl, FullscreenControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import "./map.css";
import { MapPin, X, Search } from "lucide-react";
import Link from "next/link";

type Props = {
  locations: any[];
};

export function InteractiveMap({ locations }: Props) {
  const [popupInfo, setPopupInfo] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [geocodeResults, setGeocodeResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const mapRef = useRef<any>(null);
  const searchTimeout = useRef<any>(null);

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  // Phù Lãng coordinates
  const initialViewState = {
    longitude: 106.2568,
    latitude: 21.1490,
    zoom: 14.5,
    pitch: 45,
    bearing: 0,
  };

  // Filter existing markers by name
  const markerResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return locations.filter(loc => {
      const name = loc.type === "household" ? loc.households?.name : loc.custom_name;
      return name?.toLowerCase().includes(q);
    });
  }, [searchQuery, locations]);

  // Geocode search using Mapbox API
  const handleSearchInput = useCallback((value: string) => {
    setSearchQuery(value);
    setShowSearchResults(true);

    // Clear previous timeout
    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    if (!value.trim() || !mapboxToken) {
      setGeocodeResults([]);
      return;
    }

    // Debounce geocoding requests (500ms)
    searchTimeout.current = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(value)}.json?access_token=${mapboxToken}&country=vn&language=vi&limit=5&proximity=106.2568,21.1490`
        );
        const data = await res.json();
        setGeocodeResults(data.features || []);
      } catch (err) {
        console.error("Geocode error:", err);
        setGeocodeResults([]);
      } finally {
        setSearching(false);
      }
    }, 500);
  }, [mapboxToken]);

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
    setGeocodeResults([]);
    handleMarkerClick(null, loc);
  };

  const handleGeocodeResultClick = (feature: any) => {
    setSearchQuery(feature.place_name);
    setShowSearchResults(false);
    setGeocodeResults([]);

    if (mapRef.current) {
      mapRef.current.flyTo({
        center: feature.center,
        zoom: 16,
        pitch: 50,
        bearing: 0,
        duration: 1500
      });
    }
  };

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
      if (loc.households?.cover_image) {
        images.unshift(loc.households.cover_image);
      }
      return images.slice(0, 7);
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
              placeholder="Tìm kiếm địa điểm, lò gốm..."
              value={searchQuery}
              onChange={(e) => handleSearchInput(e.target.value)}
              onFocus={() => setShowSearchResults(true)}
              className="flex-1 bg-transparent border-none outline-none text-sm text-[var(--pl-char)] min-w-0"
            />
            {searchQuery && (
              <button onClick={() => {setSearchQuery(""); setShowSearchResults(false); setGeocodeResults([]);}} className="p-1 hover:bg-secondary rounded shrink-0">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>

          {showSearchResults && searchQuery && (
            <div className="border-t border-[var(--pl-ash)]/20 max-h-72 overflow-y-auto bg-white">
              {/* Existing marker results */}
              {markerResults.length > 0 && (
                <>
                  <div className="px-4 py-2 text-xs font-semibold text-muted-foreground bg-gray-50 uppercase tracking-wide">Điểm đã ghim</div>
                  {markerResults.map(loc => (
                    <button 
                      key={loc.id}
                      onClick={() => handleSearchResultClick(loc)}
                      className="w-full text-left px-4 py-3 hover:bg-[var(--pl-clay)]/5 transition-colors flex items-center gap-3 border-b border-[var(--pl-ash)]/10"
                    >
                      <div className="bg-[var(--pl-clay)]/10 p-2 rounded-full shrink-0">
                        <MapPin className="w-4 h-4 text-[var(--pl-clay)]" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-sm text-[var(--pl-char)] truncate">
                          {loc.type === "household" ? loc.households?.name : loc.custom_name}
                        </div>
                        <div className="text-xs text-muted-foreground">{loc.type === 'household' ? 'Hộ nghề' : 'Địa điểm'}</div>
                      </div>
                    </button>
                  ))}
                </>
              )}

              {/* Geocode results from Mapbox */}
              {geocodeResults.length > 0 && (
                <>
                  <div className="px-4 py-2 text-xs font-semibold text-muted-foreground bg-gray-50 uppercase tracking-wide">Tìm trên bản đồ</div>
                  {geocodeResults.map((feature: any) => (
                    <button 
                      key={feature.id}
                      onClick={() => handleGeocodeResultClick(feature)}
                      className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors flex items-center gap-3 border-b border-[var(--pl-ash)]/10"
                    >
                      <div className="bg-blue-100 p-2 rounded-full shrink-0">
                        <Search className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-sm text-[var(--pl-char)] truncate">{feature.text}</div>
                        <div className="text-xs text-muted-foreground truncate">{feature.place_name}</div>
                      </div>
                    </button>
                  ))}
                </>
              )}

              {/* Loading */}
              {searching && (
                <div className="px-4 py-3 text-center text-sm text-muted-foreground">Đang tìm kiếm...</div>
              )}

              {/* No results */}
              {!searching && markerResults.length === 0 && geocodeResults.length === 0 && (
                <div className="px-4 py-3 text-center text-sm text-muted-foreground">Không tìm thấy kết quả.</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Debug: Show location count */}
      <div className="absolute bottom-4 left-4 z-10 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
        {locations.length} điểm trên bản đồ
      </div>

      <Map
        ref={mapRef}
        initialViewState={initialViewState}
        mapStyle="mapbox://styles/mapbox/outdoors-v12"
        mapboxAccessToken={mapboxToken}
        maxPitch={85}
        onClick={() => {
          setShowSearchResults(false);
          setPopupInfo(null);
        }}
      >
        <NavigationControl position="top-right" />
        <FullscreenControl position="top-right" />

        {locations.map((loc) => (
          <Marker 
            key={loc.id} 
            longitude={Number(loc.lng)} 
            latitude={Number(loc.lat)} 
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
            longitude={Number(popupInfo.lng)}
            latitude={Number(popupInfo.lat)}
            closeButton={false}
            className="z-50 custom-popup"
            style={{ padding: 0 }}
          >
            {/* 3D Arc Gallery */}
            {getGalleryImages(popupInfo).length > 0 && (
              <div className="arc-gallery-container">
                {getGalleryImages(popupInfo).map((imgUrl: string, idx: number, arr: any[]) => {
                  const totalItems = arr.length;
                  const spread = Math.min(180, totalItems * 30);
                  const startAngle = -spread / 2;
                  const step = totalItems > 1 ? spread / (totalItems - 1) : 0;
                  const angle = startAngle + (idx * step);
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

            {/* Info Box */}
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
                {popupInfo.type === "household" ? popupInfo.households?.bio_vi : popupInfo.custom_description}
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
