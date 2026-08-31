"use client";

import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { APIProvider, Map, AdvancedMarker, InfoWindow } from "@vis.gl/react-google-maps";
import "./google-map.css";
import { MapPin, X, Search, UtensilsCrossed, Flame, Landmark, Camera, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

// ===== Category config =====
type CategoryKey = "nha_hang" | "lo_gom" | "di_tich" | "check_in" | "dia_diem";

const CATEGORY_CONFIG: Record<CategoryKey, { label: string; icon: React.ElementType; color: string }> = {
  nha_hang: { label: "Nhà hàng", icon: UtensilsCrossed, color: "#22c55e" },
  lo_gom:   { label: "Lò gốm",   icon: Flame,            color: "#f97316" },
  di_tich:  { label: "Di tích",   icon: Landmark,         color: "#8b5cf6" },
  check_in: { label: "Điểm check-in", icon: Camera,       color: "#ec4899" },
  dia_diem: { label: "Địa điểm",  icon: MapPin,           color: "#c2714f" },
};

const ALL_CATEGORIES: CategoryKey[] = ["lo_gom", "nha_hang", "di_tich", "check_in", "dia_diem"];

function getCategoryConfig(category: string | null | undefined) {
  return CATEGORY_CONFIG[(category as CategoryKey)] || CATEGORY_CONFIG.dia_diem;
}

function getThumbnail(loc: any): string | null {
  if (loc.thumbnail_url) return loc.thumbnail_url;
  if (loc.type === "household" && loc.households?.cover_image) return loc.households.cover_image;
  if (loc.gallery_urls?.length > 0) return loc.gallery_urls[0];
  return null;
}

function getDisplayName(loc: any): string {
  return loc.type === "household" ? (loc.households?.name || "Không tên") : (loc.custom_name || "Không tên");
}

function getDescription(loc: any): string {
  return loc.type === "household" ? (loc.households?.bio_vi || "") : (loc.custom_description || "");
}

function getGalleryImages(loc: any): string[] {
  if (!loc) return [];
  if (loc.type === "household") {
    const samples = loc.households?.household_samples || [];
    const images = samples.map((s: any) => s.image_url).filter(Boolean);
    if (loc.households?.cover_image) images.unshift(loc.households.cover_image);
    return images.slice(0, 12);
  }
  return loc.gallery_urls?.slice(0, 12) || [];
}

// Remove Vietnamese diacritics for fuzzy search
function removeDiacritics(str: string) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase();
}

type Props = { locations: any[] };

// ===== 3D Carousel Component =====
function Carousel3D({ images, activeIndex, onChangeIndex }: { images: string[]; activeIndex: number; onChangeIndex: (i: number) => void }) {
  if (images.length === 0) return null;
  const total = images.length;

  return (
    <div className="gm-carousel-wrapper">
      <div className="gm-carousel-stage">
        {images.map((url, i) => {
          let offset = i - activeIndex;
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
            <div key={i} className={`gm-carousel-card ${isActive ? "active" : ""}`}
              style={{ zIndex, transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`, opacity, pointerEvents: isActive ? "auto" : "none" }}
              onClick={() => !isActive && onChangeIndex(i)}>
              <img src={url} alt={`Ảnh ${i + 1}`} />
            </div>
          );
        })}
      </div>
      {total > 1 && (
        <>
          <button className="gm-carousel-nav gm-carousel-prev" onClick={() => onChangeIndex((activeIndex - 1 + total) % total)}>
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button className="gm-carousel-nav gm-carousel-next" onClick={() => onChangeIndex((activeIndex + 1) % total)}>
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}
      {total > 1 && (
        <div className="gm-carousel-dots">
          {images.map((_, i) => (
            <button key={i} className={`gm-carousel-dot ${i === activeIndex ? "active" : ""}`} onClick={() => onChangeIndex(i)} />
          ))}
        </div>
      )}
    </div>
  );
}

// ===== Detail Overlay =====
function LocationDetailOverlay({ loc, onClose }: { loc: any; onClose: () => void }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const cat = getCategoryConfig(loc.category);
  const CatIcon = cat.icon;
  const name = getDisplayName(loc);
  const description = getDescription(loc);
  const images = getGalleryImages(loc);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && images.length > 1) setActiveImageIndex(prev => (prev - 1 + images.length) % images.length);
      if (e.key === "ArrowRight" && images.length > 1) setActiveImageIndex(prev => (prev + 1) % images.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [images.length, onClose]);

  return (
    <div className="gm-detail-overlay" onClick={onClose}>
      <div className="gm-detail-content" onClick={(e) => e.stopPropagation()}>
        <button className="gm-detail-close" onClick={onClose}><X className="w-5 h-5" /></button>
        {images.length > 0 && <Carousel3D images={images} activeIndex={activeImageIndex} onChangeIndex={setActiveImageIndex} />}
        <div className="gm-detail-info">
          <div className="gm-detail-header">
            <div className="gm-detail-icon" style={{ backgroundColor: `${cat.color}20` }}>
              <CatIcon className="w-5 h-5" style={{ color: cat.color }} />
            </div>
            <div>
              <h2 className="gm-detail-title">{name}</h2>
              <span className="gm-detail-badge" style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>{cat.label}</span>
            </div>
          </div>
          {description && <p className="gm-detail-desc">{description}</p>}
          {images.length > 0 && <div className="gm-detail-counter">{activeImageIndex + 1} / {images.length} ảnh</div>}
          {loc.type === "household" && (
            <Link href={`/ho-nghe/${loc.household_id}`} className="gm-detail-cta">Xem hồ sơ nghệ nhân →</Link>
          )}
        </div>
      </div>
    </div>
  );
}

// ===== Main Google Map Component =====
export function GoogleMap3D({ locations }: Props) {
  const [selectedLoc, setSelectedLoc] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<Set<CategoryKey | "all">>(new Set(["all"]));
  const mapRef = useRef<google.maps.Map | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

  const center = { lat: 21.1490, lng: 106.2568 };

  const toggleFilter = (category: CategoryKey | "all") => {
    setActiveFilters(prev => {
      const next = new Set(prev);
      if (category === "all") return new Set(["all"]);
      next.delete("all");
      if (next.has(category)) { next.delete(category); if (next.size === 0) return new Set(["all"]); }
      else next.add(category);
      return next;
    });
  };

  const filteredLocations = useMemo(() => {
    if (activeFilters.has("all")) return locations;
    return locations.filter(loc => activeFilters.has((loc.category || "dia_diem") as CategoryKey));
  }, [locations, activeFilters]);

  const markerResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = removeDiacritics(searchQuery);
    return locations.filter(loc => {
      const name = getDisplayName(loc);
      if (!name) return false;
      return name.toLowerCase().includes(searchQuery.toLowerCase()) || removeDiacritics(name).includes(q);
    });
  }, [searchQuery, locations]);

  const handleMarkerClick = useCallback((loc: any) => {
    setSelectedLoc(loc);
    if (mapRef.current) {
      mapRef.current.panTo({ lat: Number(loc.lat), lng: Number(loc.lng) });
      mapRef.current.setZoom(18);
    }
  }, []);

  const handleSearchResultClick = (loc: any) => {
    setSearchQuery("");
    handleMarkerClick(loc);
  };

  if (!apiKey) {
    return (
      <div className="w-full h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-secondary/50 text-center p-8">
        <MapPin className="w-12 h-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-bold">Chưa cấu hình Google Maps API Key</h3>
        <p className="text-muted-foreground mt-2 max-w-md">
          Vui lòng thêm biến <code>NEXT_PUBLIC_GOOGLE_MAPS_KEY</code> vào file .env
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-[calc(100vh-64px)] relative">
      {/* Search + Filter + Location list panel */}
      <div className="absolute top-4 left-4 z-10 w-full max-w-sm px-4 md:px-0">
        {/* Search bar */}
        <div className="relative bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="flex items-center px-4 py-3">
            <Search className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
            <input type="text" placeholder="Tìm kiếm địa điểm, lò gốm..."
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-sm min-w-0" />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="p-1 hover:bg-gray-100 rounded shrink-0">
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>
          {searchQuery && markerResults.length > 0 && (
            <div className="border-t max-h-60 overflow-y-auto">
              {markerResults.map(loc => {
                const cat = getCategoryConfig(loc.category);
                const CatIcon = cat.icon;
                return (
                  <button key={loc.id} onClick={() => handleSearchResultClick(loc)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 border-b border-gray-100">
                    <div className="p-2 rounded-full shrink-0" style={{ backgroundColor: `${cat.color}20` }}>
                      <CatIcon className="w-4 h-4" style={{ color: cat.color }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-sm truncate">{getDisplayName(loc)}</div>
                      <div className="text-xs text-gray-500">{cat.label}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Location list with filters */}
        {!searchQuery && (
          <div className="mt-3 bg-white/95 rounded-xl shadow-xl border border-gray-200 overflow-hidden max-h-[calc(100vh-280px)]">
            <div className="px-4 py-3 bg-amber-50 border-b">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-700" />
                  Điểm tham quan ({filteredLocations.length})
                </span>
              </div>
              <div className="flex gap-1.5 flex-wrap">
                <button onClick={() => toggleFilter("all")}
                  className={`gm-pill ${activeFilters.has("all") ? "active" : ""}`}>Tất cả</button>
                {ALL_CATEGORIES.map(cat => {
                  const config = CATEGORY_CONFIG[cat];
                  const Icon = config.icon;
                  return (
                    <button key={cat} onClick={() => toggleFilter(cat)}
                      className={`gm-pill ${activeFilters.has(cat) ? "active" : ""}`}
                      style={activeFilters.has(cat) ? { borderColor: config.color, color: config.color } : {}}>
                      <Icon className="w-3.5 h-3.5" /> {config.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="overflow-y-auto max-h-[calc(100vh-380px)] divide-y divide-gray-100">
              {filteredLocations.map(loc => {
                const name = getDisplayName(loc);
                const isActive = selectedLoc?.id === loc.id;
                const cat = getCategoryConfig(loc.category);
                const CatIcon = cat.icon;
                const thumb = getThumbnail(loc);
                return (
                  <button key={loc.id} onClick={() => handleSearchResultClick(loc)}
                    className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${isActive ? "bg-amber-50 border-l-4 border-amber-600" : "hover:bg-gray-50 border-l-4 border-transparent"}`}>
                    {thumb ? (
                      <img src={thumb} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0 shadow-sm" />
                    ) : (
                      <div className="p-2 rounded-lg shrink-0" style={{ backgroundColor: `${cat.color}15` }}>
                        <CatIcon className="w-5 h-5" style={{ color: cat.color }} />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className={`text-sm truncate ${isActive ? "font-bold text-amber-700" : "font-medium"}`}>{name}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-1.5">
                        <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }}></span>
                        {cat.label}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Badge */}
      <div className="absolute bottom-4 left-4 z-10 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full">
        {filteredLocations.length} điểm trên bản đồ
      </div>

      {/* Google Map */}
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={center}
          defaultZoom={15}
          defaultTilt={45}
          mapId="phu-lang-3d-map"
          gestureHandling="greedy"
          disableDefaultUI={false}
          className="w-full h-full"
          onCameraChanged={(ev) => {
            // Store map ref
          }}
          ref={(map: any) => {
            if (map) mapRef.current = map;
          }}
        >
          {/* Location markers */}
          {filteredLocations.map((loc) => {
            const cat = getCategoryConfig(loc.category);
            const CatIcon = cat.icon;
            const name = getDisplayName(loc);
            const thumb = getThumbnail(loc);

            return (
              <AdvancedMarker
                key={loc.id}
                position={{ lat: Number(loc.lat), lng: Number(loc.lng) }}
                onClick={() => handleMarkerClick(loc)}
              >
                <div className="gm-marker">
                  <div className="gm-marker-info">
                    {thumb && <img src={thumb} alt="" className="gm-marker-thumb" />}
                    <span className="gm-marker-name">{name}</span>
                  </div>
                  <div className="gm-marker-icon" style={{ backgroundColor: cat.color }}>
                    <CatIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="gm-marker-tail"></div>
                </div>
              </AdvancedMarker>
            );
          })}

          {/* Hoàng Sa & Trường Sa */}
          <AdvancedMarker position={{ lat: 16.5, lng: 112.0 }}>
            <div className="gm-sovereignty">
              <span className="gm-sovereignty-flag">🇻🇳</span>
              <div className="gm-sovereignty-text">
                <strong>Quần đảo Hoàng Sa</strong>
                <span>Việt Nam</span>
              </div>
            </div>
          </AdvancedMarker>

          <AdvancedMarker position={{ lat: 8.65, lng: 111.92 }}>
            <div className="gm-sovereignty">
              <span className="gm-sovereignty-flag">🇻🇳</span>
              <div className="gm-sovereignty-text">
                <strong>Quần đảo Trường Sa</strong>
                <span>Việt Nam</span>
              </div>
            </div>
          </AdvancedMarker>
        </Map>
      </APIProvider>

      {/* Detail overlay */}
      {selectedLoc && (
        <LocationDetailOverlay loc={selectedLoc} onClose={() => setSelectedLoc(null)} />
      )}
    </div>
  );
}
