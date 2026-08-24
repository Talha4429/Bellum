"use client";

import Image from "next/image";
import { useState } from "react";

export default function SafeImage({ src, alt, className, fill, ...props }) {
  const [errored, setErrored] = useState(false);

  if (!src || errored) {
    return <div className={`${className || ""} bg-[#f1edec] border border-[#E4E1DA]`} />;
  }

  const isExternal = typeof src === "string" && (src.startsWith("http://") || src.startsWith("https://"));

  return (
    <Image
      src={src}
      alt={alt || "Bellum Studio"}
      fill={fill}
      className={className}
      unoptimized={isExternal}
      onError={() => setErrored(true)}
      {...props}
    />
  );
}