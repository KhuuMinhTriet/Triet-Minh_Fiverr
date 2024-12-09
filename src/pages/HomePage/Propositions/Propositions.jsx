import React from "react";
import check from "./check.png";

export default function Propositions() {
  return (
    <div className="container my-20 lg:flex">
      <div className="lg:w-1/2">
        <h1 className="max-lg:text-2xl lg:text-4xl font-bold">
          A whole world of{" "}
          <span className="italic text-green-400">freelance</span> talent at
          your fingertips
        </h1>
        <div>
          <div className="flex items-center mt-6">
            <img
              src={check}
              alt=""
              className="max-lg:w-6 max-lg:h-6 lg:w-8 mr-2"
            />
            <h3 className="font-bold max-lg:text-xl lg:text-2xl">
              The best for every budget
            </h3>
          </div>
          <p className="tracking-wide mt-2">
            Find high-quality services at every price point. No hourly rates,
            just project-based pricing.
          </p>
        </div>
        <div>
          <div className="flex items-center mt-6">
            <img
              src={check}
              alt=""
              className="max-lg:w-6 max-lg:h-6 lg:w-8 mr-2"
            />
            <h3 className="font-bold max-lg:text-xl lg:text-2xl">
              Quality work done quickly
            </h3>
          </div>
          <p className="tracking-wide mt-2">
            Find the right freelancer to begin working on your project within
            minutes.
          </p>
        </div>
        <div>
          <div className="flex items-center mt-6">
            <img
              src={check}
              alt=""
              className="max-lg:w-6 max-lg:h-6 lg:w-8 mr-2"
            />
            <h3 className="font-bold max-lg:text-xl lg:text-2xl">
              Protected payments, every time
            </h3>
          </div>
          <p className="tracking-wide mt-2">
            Always know what you'll pay upfront. Your payment isn't released
            until you approve the work.
          </p>
        </div>
        <div>
          <div className="flex items-center mt-6">
            <img
              src={check}
              alt=""
              className="max-lg:w-6 max-lg:h-6 lg:w-8 mr-2"
            />
            <h3 className="font-bold max-lg:text-xl lg:text-2xl">
              24/7 support
            </h3>
          </div>
          <p className="tracking-wide mt-2">
            Questions? Our round-the-clock support team is available to help
            anytime, anywhere.
          </p>
        </div>
      </div>
      <div className="lg:w-1/2">
        <img
          src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_1.0/v1/attachments/generic_asset/asset/2321104e0c585cceea525419551d3a7c-1721984733481/fiverr-pro.png"
          alt=""
        />
      </div>
    </div>
  );
}
