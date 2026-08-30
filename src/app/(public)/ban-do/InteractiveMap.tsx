"use client";

import React, { useState, useRef, useMemo } from "react";
import Map, { Marker, Popup, NavigationControl, FullscreenControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin, X } from "lucide-react";
import Link from "next/link";

type Props = {
  locations: any[];
};

export function InteractiveMap({ locations }: Props) {
  const [popupInfo, setPopupInfo] = useState<any>(null);
  const mapRef = useRef<any>(null);

  // Phù Lãng coordinates approx
  const initialViewState = {
    longitude: 106.1264,
    latitude: 21.1352,
    zoom: 14,
    pitch: 45,
    bearing: -17.6,
  };

  const handleMarkerClick = (e: any, loc: any) => {
    e.originalEvent.stopPropagation();
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

  // If no token, the map might not load properly, or we can use a fallback. 
  // We'll rely on the env var.
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  if (!mapboxToken) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-secondary/50 text-center p-8">
        <MapPin className="w-12 h-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-bold">Chưa cấu hình Mapbox Token</h3>
        <p className="text-muted-foreground mt-2 max-w-md">
          Vui lòng thêm biến môi trường <code>NEXT_PUBLIC_MAPBOX_TOKEN</code> vào file .env để kích hoạt bản đồ 3D.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-[calc(100vh-64px)] relative">
      <Map
        ref={mapRef}
        initialViewState={initialViewState}
        mapStyle="mapbox://styles/mapbox/outdoors-v12"
        mapboxAccessToken={mapboxToken}
        terrain={{ source: 'mapbox-dem', exaggeration: 1.5 }}
        maxPitch={85}
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
            <div className="relative group cursor-pointer">
              <div className="w-10 h-10 bg-[var(--pl-clay)] rounded-full flex items-center justify-center shadow-lg border-2 border-white transform transition-transform group-hover:scale-110">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/75 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
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
            onClose={() => setPopupInfo(null)}
            closeButton={false}
            className="z-50"
          >
            <div className="p-3 w-64">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-[var(--pl-char)]">
                  {popupInfo.type === "household" ? popupInfo.households?.name : popupInfo.custom_name}
                </h3>
                <button onClick={() => setPopupInfo(null)} className="p-1 hover:bg-secondary rounded">
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              {popupInfo.type === "household" && popupInfo.households?.avatar_url && (
                <img src={popupInfo.households.avatar_url} alt="" className="w-full h-32 object-cover rounded mb-3" />
              )}
              {popupInfo.type === "custom" && popupInfo.custom_media_url && (
                <img src={popupInfo.custom_media_url} alt="" className="w-full h-32 object-cover rounded mb-3" />
              )}

              <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                {popupInfo.type === "household" ? popupInfo.households?.description : popupInfo.custom_description}
              </p>

              {popupInfo.type === "household" && (
                <Link href={`/ho-nghe/${popupInfo.household_id}`} className="block w-full text-center py-2 bg-[var(--pl-clay)] text-white rounded font-medium text-sm hover:bg-[var(--pl-eel)] transition-colors">
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
