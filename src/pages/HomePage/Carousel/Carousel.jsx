import React from "react";
import BackgroundCarousel from "./BackgroundCarousel";
import SearchCarousel from "./SearchCarousel";

export default function Carousel() {
  return (
    <div className="relative">
      <SearchCarousel />
      <BackgroundCarousel />
      <div className="flex justify-center items-center bg-slate-50 space-x-10">
        <span className="text-gray-400 font-semibold text-xl">Trusted by:</span>
        <img
          src="https://demo5.cybersoft.edu.vn/img/fb.png"
          alt=""
          className="max-w-28"
        />
        <img
          src="https://demo5.cybersoft.edu.vn/img/google.png"
          alt=""
          className="max-w-28"
        />
        <img
          src="https://demo5.cybersoft.edu.vn/img/netflix.png"
          alt=""
          className="max-w-28"
        />
        <img
          src="https://demo5.cybersoft.edu.vn/img/pg.png"
          alt=""
          className="max-w-28"
        />
        <img
          src="https://demo5.cybersoft.edu.vn/img/paypal.png"
          alt=""
          className="max-w-28"
        />
      </div>
    </div>
  );
}
