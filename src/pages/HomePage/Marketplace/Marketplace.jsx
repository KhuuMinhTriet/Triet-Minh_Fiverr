import React from "react";
import graphics from "./Marketplace_Img/graphics-design.d32a2f8.svg";
import digital from "./Marketplace_Img/online-marketing.74e221b.svg";
import writing from "./Marketplace_Img/writing-translation.32ebe2e.svg";
import vid from "./Marketplace_Img/video-animation.f0d9d71.svg";
import music from "./Marketplace_Img/music-audio.320af20.svg";
import programming from "./Marketplace_Img/programming.9362366.svg";
import business from "./Marketplace_Img/business.bbdf319.svg";
import seo from "./Marketplace_Img/lifestyle.745b575.svg";
import blog from "./Marketplace_Img/data.718910f.svg";

export default function Marketplace() {
  return (
    <div className="container">
      <h1 className="text-5xl text-gray-600 font-medium tracking-normal">
        Explore the marketplace
      </h1>
      <ul className="grid max-md:grid-cols-2 max-lg:grid-cols-3 lg:grid-cols-6 gap-5">
        <li className="text-center shadow-lg hover:shadow-xl my-8 px-6 py-8 rounded-xl">
          <a href="">
            <img src={graphics} alt="" className="block w-12 h-12 mx-auto" />
            <p>Graphics & Design</p>
          </a>
        </li>
        <li className="text-center shadow-lg hover:shadow-xl my-8 px-6 py-8 rounded-xl">
          <a href="">
            <img src={digital} alt="" className="block w-12 h-12 mx-auto" />
            <p>Digital Marketing</p>
          </a>
        </li>
        <li className="text-center shadow-lg hover:shadow-xl my-8 px-6 py-8 rounded-xl">
          <a href="">
            <img src={writing} alt="" className="block w-12 h-12 mx-auto" />
            <p>Writing & Translations</p>
          </a>
        </li>
        <li className="text-center shadow-lg hover:shadow-xl my-8 px-6 py-8 rounded-xl">
          <a href="">
            <img src={vid} alt="" className="block w-12 h-12 mx-auto" />
            <p>Video & Animation</p>
          </a>
        </li>
        <li className="text-center shadow-lg hover:shadow-xl my-8 px-6 py-8 rounded-xl">
          <a href="">
            <img src={music} alt="" className="block w-12 h-12 mx-auto" />
            <p>Music & Audio</p>
          </a>
        </li>
        <li className="text-center shadow-lg hover:shadow-xl my-8 px-6 py-8 rounded-xl">
          <a href="">
            <img src={programming} alt="" className="block w-12 h-12 mx-auto" />
            <p>Programming & Tech</p>
          </a>
        </li>
        <li className="text-center shadow-lg hover:shadow-xl my-8 px-6 py-8 rounded-xl">
          <a href="">
            <img src={business} alt="" className="block w-12 h-12 mx-auto" />
            <p>Business</p>
          </a>
        </li>
        <li className="text-center shadow-lg hover:shadow-xl my-8 px-6 py-8 rounded-xl">
          <a href="">
            <img src={seo} alt="" className="block w-12 h-12 mx-auto" />
            <p>SEO</p>
          </a>
        </li>
        <li className="text-center shadow-lg hover:shadow-xl my-8 px-6 py-8 rounded-xl">
          <a href="">
            <img src={blog} alt="" className="block w-12 h-12 mx-auto" />
            <p>Design Blog</p>
          </a>
        </li>
      </ul>
    </div>
  );
}
