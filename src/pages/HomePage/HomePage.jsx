import React from "react";
import Carousel from "./Carousel/Carousel";
import PopularServices from "./PopularServices/PopularServices";
import Propositions from "./Propositions/Propositions";

export default function HomePage() {
  return (
    <div>
      <Carousel />
      <PopularServices />
      <div className="bg-green-50 py-20">
        <Propositions />
      </div>
    </div>
  );
}
