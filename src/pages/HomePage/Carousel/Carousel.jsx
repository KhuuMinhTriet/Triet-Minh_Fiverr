import React from "react";
import BackgroundCarousel from "./BackgroundCarousel";
import SearchCarousel from "./SearchCarousel";

export default function Carousel() {
  return (
    <div className="relative">
      <SearchCarousel />
      <BackgroundCarousel />
    </div>
  );
}
