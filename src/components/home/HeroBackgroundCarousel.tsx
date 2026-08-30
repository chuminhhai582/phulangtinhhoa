"use client";

import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";

export type HeroMedia = {
  id: string;
  type: "image" | "video";
  url: string;
};

interface Props {
  media: HeroMedia[];
}

export function HeroBackgroundCarousel({ media }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide if it's an image. If video, wait for onEnded.
  useEffect(() => {
    if (media.length <= 1) return;

    const currentMedia = media[currentIndex];
    let timer: NodeJS.Timeout;

    if (currentMedia.type === "image") {
      timer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % media.length);
      }, 5000); // 5 seconds per image
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [currentIndex, media]);

  const handleVideoEnded = () => {
    if (media.length > 1) {
      setCurrentIndex((prev) => (prev + 1) % media.length);
    }
  };

  if (!media || media.length === 0) {
    // Default gradient fallback if no media
    return <div className="absolute inset-0 bg-gradient-to-br from-[var(--pl-eel)]/5 via-transparent to-[var(--pl-clay)]/5 z-0" />;
  }

  return (
    <div className="absolute inset-0 overflow-hidden z-0 bg-[var(--pl-eel)]">
      {media.map((item, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {item.type === "image" ? (
              <img
                src={item.url}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full object-cover pointer-events-none">
                <ReactPlayer
                  url={item.url}
                  playing={isActive}
                  muted={true}
                  loop={media.length === 1}
                  onEnded={handleVideoEnded}
                  width="100%"
                  height="100%"
                  style={{ objectFit: "cover", transform: "scale(1.2)" }} // Scale to avoid black bars
                  config={{
                    youtube: {
                      playerVars: { showinfo: 0, controls: 0, rel: 0, modestbranding: 1 }
                    }
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
      {/* Overlay to ensure text remains readable on any background */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30 z-20" />
    </div>
  );
}
