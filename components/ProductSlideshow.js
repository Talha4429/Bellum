"use client";

import { useState } from "react";
import SafeImage from "./SafeImage";

export default function ProductSlideshow({
  images = [],
  alt = "Product",
  aspectRatio = "aspect-[4/5]",
  className = "",
  showBadge = true,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Normalize images array
  const imageList = Array.isArray(images) && images.length > 0
    ? images.filter(Boolean)
    : [];

  // Fallback if no images provided
  if (imageList.length === 0) {
    return (
      <div className={`${aspectRatio} w-full bg-[#f1edec] relative overflow-hidden ${className}`}>
        <SafeImage
          src="/images/products/chair.jpg"
          alt={alt}
          fill
          className="object-cover"
        />
      </div>
    );
  }

  // Single image view
  if (imageList.length === 1) {
    return (
      <div className={`${aspectRatio} w-full bg-[#f1edec] relative overflow-hidden ${className}`}>
        <SafeImage
          src={imageList[0]}
          alt={alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    );
  }

  function handlePrev(e) {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
  }

  function handleNext(e) {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
  }

  function handleDotClick(e, index) {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex(index);
  }

  return (
    <div className={`relative ${aspectRatio} w-full overflow-hidden bg-[#f1edec] group/slideshow ${className}`}>
      {/* Slides */}
      {imageList.map((img, idx) => (
        <div
          key={img + idx}
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
            idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <SafeImage
            src={img}
            alt={`${alt} - View ${idx + 1}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      ))}

      {/* Counter Badge */}
      {showBadge && (
        <div className="absolute top-3 right-3 z-20 bg-ink/70 backdrop-blur-md text-ivory text-[10px] font-sans px-2 py-0.5 tracking-wider opacity-0 group-hover/slideshow:opacity-100 transition-opacity duration-300 pointer-events-none">
          {currentIndex + 1} / {imageList.length}
        </div>
      )}

      {/* Navigation Arrows */}
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Previous image"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-none bg-white/80 backdrop-blur-sm text-ink flex items-center justify-center border border-[#E4E1DA] hover:bg-ink hover:text-ivory transition-all duration-200 opacity-0 group-hover/slideshow:opacity-100 focus:opacity-100 shadow-sm"
      >
        <span className="material-symbols-outlined text-[18px]">chevron_left</span>
      </button>

      <button
        type="button"
        onClick={handleNext}
        aria-label="Next image"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-none bg-white/80 backdrop-blur-sm text-ink flex items-center justify-center border border-[#E4E1DA] hover:bg-ink hover:text-ivory transition-all duration-200 opacity-0 group-hover/slideshow:opacity-100 focus:opacity-100 shadow-sm"
      >
        <span className="material-symbols-outlined text-[18px]">chevron_right</span>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-3 left-0 right-0 z-20 flex justify-center items-center gap-1.5 px-4 pointer-events-auto">
        {imageList.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={(e) => handleDotClick(e, idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 h-1 rounded-none ${
              idx === currentIndex
                ? "w-6 bg-ink"
                : "w-2 bg-ink/30 hover:bg-ink/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
