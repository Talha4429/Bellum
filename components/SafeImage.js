"use client";

import Image from "next/image";
import { useState } from "react";

export default function SafeImage({ src, alt, className, fill, ...props }) {
  const [errored, setErrored] = useState(false);

  if (!src || errored) {
    return <div className={`${className} bg-hairline`} />;
  }

  return (
    <Image
      src={src}
      alt={alt || ""}
      fill={fill}
      className={className}
      onError={() => setErrored(true)}
      {...props}
    />
  );
}