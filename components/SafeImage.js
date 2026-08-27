"use client";

import Image from "next/image";
import { useState } from "react";

export default function SafeImage({ src, alt, className, fill, ...props }) {
  const [errored, setErrored] = useState(false);

  if (!src || errored) {
    return (
      <div className={`${className || ""} bg-[#F4F1EA] border border-[#E4E1DA] flex items-center justify-center`}>
        <span className="material-symbols-outlined text-[#B2ADA3] text-3xl select-none">
          person
        </span>
      </div>
    );
  }

  const isExternal = typeof src === "string" && (src.startsWith("http://") || src.startsWith("https://"));

  return (
    <Image
      src={src}
      alt={alt || "Bellum Studio"}
      fill={fill}
      className={className}
      unoptimized={isExternal || (typeof src === "string" && src.endsWith(".svg"))}
      onError={() => setErrored(true)}
      {...props}
    />
  );
}