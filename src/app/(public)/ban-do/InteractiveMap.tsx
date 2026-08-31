"use client";

import React, { useState, useRef, useMemo, useCallback, useEffect } from "react";
import Map, { Marker, NavigationControl, FullscreenControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import "./map.css";
import { MapPin, X, Search, UtensilsCrossed, Flame, Landmark, Camera, ChevronLeft, ChevronRight, Layers, Map as MapIcon } from "lucide-react";
import Link from "next/link";

// ===== Category config =====
type CategoryKey = "nha_hang" | "lo_gom" | "di_tich" | "check_in" | "dia_diem";

const CATEGORY_CONFIG: Record<CategoryKey, { label: string; icon: React.ElementType; color: string; cssClass: string }> = {
  nha_hang: { label: "Nhà hàng", icon: UtensilsCrossed, color: "#22c55e", cssClass: "marker-nha-hang" },
  lo_gom:   { label: "Lò gốm",   icon: Flame,            color: "#f97316", cssClass: "marker-lo-gom" },
  di_tich:  { label: "Di tích",   icon: Landmark,         color: "#8b5cf6", cssClass: "marker-di-tich" },
  check_in: { label: "Điểm check-in", icon: Camera,       color: "#ec4899", cssClass: "marker-check-in" },
  dia_diem: { label: "Địa điểm",  icon: MapPin,           color: "var(--pl-clay, #c2714f)", cssClass: "marker-dia-diem" },
};

const ALL_CATEGORIES: CategoryKey[] = ["lo_gom", "nha_hang", "di_tich", "check_in", "dia_diem"];

function getCategoryConfig(category: string | null | undefined) {
  return CATEGORY_CONFIG[(category as CategoryKey)] || CATEGORY_CONFIG.dia_diem;
}

// Get thumbnail for a location
function getThumbnail(loc: any): string | null {
  if (loc.thumbnail_url) return loc.thumbnail_url;
  if (loc.type === "household" && loc.households?.cover_image) return loc.households.cover_image;
  if (loc.gallery_urls?.length > 0) return loc.gallery_urls[0];
  return null;
}

// Get display name for a location
function getDisplayName(loc: any): string {
  return loc.type === "household" ? (loc.households?.name || "Không tên") : (loc.custom_name || "Không tên");
}

// Get description for a location
function getDescription(loc: any): string {
  return loc.type === "household" ? (loc.households?.bio_vi || "") : (loc.custom_description || "");
}

type Props = {
  locations: any[];
};

// ===== 3D Carousel Component =====
function Carousel3D({ images, activeIndex, onChangeIndex }: { images: string[]; activeIndex: number; onChangeIndex: (i: number) => void }) {
  if (images.length === 0) return null;

  const total = images.length;

  return (
    <div className="detail-carousel-wrapper">
      <div className="detail-carousel-stage">
        {images.map((url, i) => {
          let offset = i - activeIndex;
          // Wrap around for continuous feel
          if (offset > Math.floor(total / 2)) offset -= total;
          if (offset < -Math.floor(total / 2)) offset += total;

          const isActive = offset === 0;
          const absOffset = Math.abs(offset);
          const zIndex = 20 - absOffset;
          const translateX = offset * 280;
          const translateZ = isActive ? 0 : -150 * absOffset;
          const rotateY = offset * -25;
          const scale = isActive ? 1 : Math.max(0.6, 1 - absOffset * 0.15);
          const opacity = absOffset > 2 ? 0 : isActive ? 1 : 0.6;

          return (
            <div
              key={i}
              className={`detail-carousel-card ${isActive ? "active" : ""}`}
              style={{
                zIndex,
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                opacity,
                pointerEvents: isActive ? "auto" : "none",
              }}
              onClick={() => !isActive && onChangeIndex(i)}
            >
              <img src={url} alt={`Ảnh ${i + 1}`} />
            </div>
          );
        })}
      </div>

      {/* Nav arrows */}
      {total > 1 && (
        <>
          <button
            className="detail-carousel-nav detail-carousel-prev"
            onClick={() => onChangeIndex((activeIndex - 1 + total) % total)}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="detail-carousel-nav detail-carousel-next"
            onClick={() => onChangeIndex((activeIndex + 1) % total)}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Dots */}
      {total > 1 && (
        <div className="detail-carousel-dots">
          {images.map((_, i) => (
            <button
              key={i}
              className={`detail-carousel-dot ${i === activeIndex ? "active" : ""}`}
              onClick={() => onChangeIndex(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ===== Detail Overlay Component =====
function LocationDetailOverlay({ loc, onClose }: { loc: any; onClose: () => void }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const cat = getCategoryConfig(loc.category);
  const CatIcon = cat.icon;
  const name = getDisplayName(loc);
  const description = getDescription(loc);
  const images = getGalleryImagesStatic(loc);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && images.length > 1) {
        setActiveImageIndex(prev => (prev - 1 + images.length) % images.length);
      }
      if (e.key === "ArrowRight" && images.length > 1) {
        setActiveImageIndex(prev => (prev + 1) % images.length);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [images.length, onClose]);

  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-overlay-content" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button className="detail-close-btn" onClick={onClose}>
          <X className="w-5 h-5" />
        </button>

        {/* Carousel section */}
        {images.length > 0 && (
          <Carousel3D
            images={images}
            activeIndex={activeImageIndex}
            onChangeIndex={setActiveImageIndex}
          />
        )}

        {/* Info section */}
        <div className="detail-info-section">
          <div className="detail-info-header">
            <div className="detail-category-icon" style={{ backgroundColor: `${cat.color}20` }}>
              <CatIcon className="w-5 h-5" style={{ color: cat.color }} />
            </div>
            <div>
              <h2 className="detail-info-title">{name}</h2>
              <span className="detail-category-badge" style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>
                {cat.label}
              </span>
            </div>
          </div>

          {description && (
            <p className="detail-info-desc">{description}</p>
          )}

          {images.length > 0 && (
            <div className="detail-image-counter">
              {activeImageIndex + 1} / {images.length} ảnh
            </div>
          )}

          {loc.type === "household" && (
            <Link
              href={`/ho-nghe/${loc.household_id}`}
              className="detail-cta-button"
            >
              Xem hồ sơ nghệ nhân →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper function (static, outside component to avoid recreation)
function getGalleryImagesStatic(loc: any): string[] {
  if (!loc) return [];
  if (loc.type === "household") {
    const samples = loc.households?.household_samples || [];
    const images = samples.map((s: any) => s.image_url).filter(Boolean);
    if (loc.households?.cover_image) {
      images.unshift(loc.households.cover_image);
    }
    return images.slice(0, 12);
  } else {
    return loc.gallery_urls?.slice(0, 12) || [];
  }
}

export function InteractiveMap({ locations }: Props) {
  const [popupInfo, setPopupInfo] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [geocodeResults, setGeocodeResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Set<CategoryKey>>(new Set());
  const [panelCollapsed, setPanelCollapsed] = useState(false);
  const [is3D, setIs3D] = useState(false);
  const mapRef = useRef<any>(null);
  const searchTimeout = useRef<any>(null);

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  // Phù Lãng coordinates
  const initialViewState = {
    longitude: 106.2568,
    latitude: 21.1490,
    zoom: 14.5,
    pitch: 0,
    bearing: 0,
  };

  // Toggle 3D mode
  const toggle3D = useCallback(() => {
    const mapWrapper = mapRef.current;
    if (!mapWrapper) return;
    const map = mapWrapper.getMap(); // Get native Mapbox GL instance
    if (!map) return;
    const next3D = !is3D;
    setIs3D(next3D);

    if (next3D) {
      // Enable 3D terrain
      if (!map.getSource("mapbox-dem")) {
        map.addSource("mapbox-dem", {
          type: "raster-dem",
          url: "mapbox://mapbox.mapbox-terrain-dem-v1",
          tileSize: 512,
          maxzoom: 14,
        });
      }
      map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });

      // Add sky layer
      if (!map.getLayer("sky")) {
        map.addLayer({
          id: "sky",
          type: "sky",
          paint: {
            "sky-type": "atmosphere",
            "sky-atmosphere-sun": [0.0, 90.0],
            "sky-atmosphere-sun-intensity": 15,
          },
        });
      }

      // Add 3D buildings
      if (!map.getLayer("3d-buildings")) {
        const layers = map.getStyle().layers;
        const labelLayer = layers?.find((l: any) => l.type === "symbol" && l.layout?.["text-field"]);
        map.addLayer(
          {
            id: "3d-buildings",
            source: "composite",
            "source-layer": "building",
            filter: ["==", "extrude", "true"],
            type: "fill-extrusion",
            minzoom: 13,
            paint: {
              "fill-extrusion-color": "#d4a373",
              "fill-extrusion-height": ["get", "height"],
              "fill-extrusion-base": ["get", "min_height"],
              "fill-extrusion-opacity": 0.6,
            },
          },
          labelLayer?.id
        );
      }

      // Animate to 3D view
      map.easeTo({ pitch: 60, bearing: -20, duration: 1000 });
    } else {
      // Disable 3D
      if (map.getTerrain()) map.setTerrain(null);
      if (map.getLayer("sky")) map.removeLayer("sky");
      if (map.getLayer("3d-buildings")) map.removeLayer("3d-buildings");

      // Animate to 2D view
      map.easeTo({ pitch: 0, bearing: 0, duration: 800 });
    }
  }, [is3D]);

  // Toggle filter
  const toggleFilter = (category: CategoryKey) => {
    setActiveFilters(prev => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  // Filtered locations
  const filteredLocations = useMemo(() => {
    if (activeFilters.size === 0) return locations;
    return locations.filter(loc => {
      const cat = (loc.category || "dia_diem") as CategoryKey;
      return activeFilters.has(cat);
    });
  }, [locations, activeFilters]);

  // Remove Vietnamese diacritics for fuzzy search
  const removeDiacritics = useCallback((str: string) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toLowerCase();
  }, []);

  // Filter existing markers by name (diacritics-insensitive)
  const markerResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = removeDiacritics(searchQuery);
    return locations.filter(loc => {
      const name = getDisplayName(loc);
      if (!name) return false;
      // Match both with and without diacritics
      return name.toLowerCase().includes(searchQuery.toLowerCase()) || 
             removeDiacritics(name).includes(q);
    });
  }, [searchQuery, locations, removeDiacritics]);

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
        // bbox around Phù Lãng area for better local results
        const bbox = "106.15,21.05,106.40,21.25";
        const res = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(value)}.json?access_token=${mapboxToken}&country=vn&language=vi&limit=5&proximity=106.2568,21.1490&bbox=${bbox}&types=poi,address,place,neighborhood,locality`
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
        zoom: 16,
        duration: 800,
        essential: true,
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
                  {markerResults.map(loc => {
                    const cat = getCategoryConfig(loc.category);
                    const CatIcon = cat.icon;
                    return (
                      <button 
                        key={loc.id}
                        onClick={() => handleSearchResultClick(loc)}
                        className="w-full text-left px-4 py-3 hover:bg-[var(--pl-clay)]/5 transition-colors flex items-center gap-3 border-b border-[var(--pl-ash)]/10"
                      >
                        <div className="p-2 rounded-full shrink-0" style={{ backgroundColor: `${cat.color}20` }}>
                          <CatIcon className="w-4 h-4" style={{ color: cat.color }} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-sm text-[var(--pl-char)] truncate">
                            {getDisplayName(loc)}
                          </div>
                          <div className="text-xs text-muted-foreground">{cat.label}</div>
                        </div>
                        {getThumbnail(loc) && (
                          <img src={getThumbnail(loc)!} alt="" className="w-8 h-8 rounded-md object-cover shrink-0" />
                        )}
                      </button>
                    );
                  })}
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


        {/* Location List Panel */}
        {!searchQuery && (
          <div className={`mt-3 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-[var(--pl-ash)]/30 overflow-hidden map-location-panel ${panelCollapsed ? "collapsed" : ""}`}>
            <button
              className="map-panel-header"
              onClick={() => setPanelCollapsed(prev => !prev)}
            >
              <span className="text-sm font-semibold text-[var(--pl-char)] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[var(--pl-clay)]" />
                Điểm tham quan ({filteredLocations.length})
              </span>
              <span className={`map-panel-chevron ${panelCollapsed ? "" : "expanded"}`}>
                <ChevronRight className="w-4 h-4" />
              </span>
            </button>
            <div className="map-filter-scroll-wrapper">
              <div className="map-filter-bar map-filter-bar-scroll">
                {ALL_CATEGORIES.map(cat => {
                  const config = CATEGORY_CONFIG[cat];
                  const Icon = config.icon;
                  return (
                    <button
                      key={cat}
                      onClick={() => toggleFilter(cat)}
                      className={`map-filter-pill pill-${cat.replace("_", "-")} ${activeFilters.has(cat) ? "active" : ""}`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {config.label}
                    </button>
                  );
                })}
              </div>
            </div>
            {!panelCollapsed && (
              <div className="overflow-y-auto map-location-list divide-y divide-[var(--pl-ash)]/10">
                {filteredLocations.map(loc => {
                  const name = getDisplayName(loc);
                  const isActive = popupInfo?.id === loc.id;
                  const cat = getCategoryConfig(loc.category);
                  const CatIcon = cat.icon;
                  const thumb = getThumbnail(loc);
                  return (
                    <button
                      key={loc.id}
                      onClick={() => handleSearchResultClick(loc)}
                      className={`w-full text-left px-3 py-2.5 transition-colors flex items-center gap-2.5 ${
                        isActive 
                          ? "bg-[var(--pl-clay)]/10 border-l-3 border-[var(--pl-clay)]" 
                          : "hover:bg-[var(--pl-clay)]/5 border-l-3 border-transparent"
                      }`}
                    >
                      {thumb ? (
                        <img src={thumb} alt="" className="w-9 h-9 rounded-lg object-cover shrink-0 shadow-sm" />
                      ) : (
                        <div className={`p-1.5 rounded-lg shrink-0 ${isActive ? "bg-[var(--pl-clay)]" : ""}`} style={!isActive ? { backgroundColor: `${cat.color}15` } : {}}>
                          <CatIcon className="w-4 h-4" style={{ color: isActive ? "white" : cat.color }} />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className={`text-[13px] leading-tight truncate ${isActive ? "font-bold text-[var(--pl-clay)]" : "font-medium text-[var(--pl-char)]"}`}>
                          {name}
                        </div>
                        <div className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cat.color }}></span>
                          {cat.label}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Location count badge */}
      {/* Bottom controls */}
      <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2">
        <div className="bg-black/70 text-white text-xs px-3 py-1.5 rounded-full">
          {filteredLocations.length} điểm trên bản đồ
        </div>
        <button
          onClick={toggle3D}
          className={`map-3d-toggle ${is3D ? "active" : ""}`}
          title={is3D ? "Chuyển sang 2D" : "Chuyển sang 3D"}
        >
          {is3D ? <MapIcon className="w-4 h-4" /> : <Layers className="w-4 h-4" />}
          <span>{is3D ? "2D" : "3D"}</span>
        </button>
      </div>

      <Map
        ref={mapRef}
        initialViewState={initialViewState}
        mapStyle="mapbox://styles/mapbox/outdoors-v12"
        mapboxAccessToken={mapboxToken}
        maxPitch={85}
        onClick={() => {
          setShowSearchResults(false);
        }}
      >
        <NavigationControl position="top-right" />
        <FullscreenControl position="top-right" />

        {filteredLocations.map((loc) => {
          const cat = getCategoryConfig(loc.category);
          const CatIcon = cat.icon;
          const name = getDisplayName(loc);
          const thumb = getThumbnail(loc);

          return (
            <Marker 
              key={loc.id} 
              longitude={Number(loc.lng)} 
              latitude={Number(loc.lat)} 
              anchor="bottom"
              onClick={(e) => handleMarkerClick(e, loc)}
            >
              <div className={`map-marker-card ${cat.cssClass}`}>
                {/* Pulse effect */}
                <div className="map-marker-pulse"></div>
                
                {/* Info strip: thumbnail + name */}
                <div className="map-marker-info">
                  {thumb && (
                    <img src={thumb} alt="" className="map-marker-thumb" />
                  )}
                  <span className="map-marker-name">{name}</span>
                </div>

                {/* Category icon pin */}
                <div className="map-marker-icon">
                  <CatIcon className="w-5 h-5 text-white" />
                </div>

                {/* Pin tail */}
                <div className="map-marker-tail"></div>
              </div>
            </Marker>
          );
        })}

        {/* === Hoàng Sa & Trường Sa - Sovereignty Markers === */}
        <Marker longitude={112.0} latitude={16.5} anchor="center">
          <div className="sovereignty-marker">
            <div className="sovereignty-marker-flag">🇻🇳</div>
            <div className="sovereignty-marker-label">
              <strong>Quần đảo Hoàng Sa</strong>
              <span>Việt Nam</span>
            </div>
          </div>
        </Marker>

        <Marker longitude={111.92} latitude={8.65} anchor="center">
          <div className="sovereignty-marker">
            <div className="sovereignty-marker-flag">🇻🇳</div>
            <div className="sovereignty-marker-label">
              <strong>Quần đảo Trường Sa</strong>
              <span>Việt Nam</span>
            </div>
          </div>
        </Marker>
      </Map>

      {/* Full-screen Detail Overlay */}
      {popupInfo && (
        <LocationDetailOverlay
          loc={popupInfo}
          onClose={() => setPopupInfo(null)}
        />
      )}
    </div>
  );
}
