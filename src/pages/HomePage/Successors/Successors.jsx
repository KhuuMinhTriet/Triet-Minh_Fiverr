import React from "react";

export default function Successors() {
  return (
    <div className="py-12 container">
      <div>
        <h1 className="text-5xl text-gray-600 font-medium tracking-normal">
          What success on Fiverr looks like
        </h1>
        <p className="pt-4 py-10">
          Vontélle Eyewear turns to Fiverr freelancers to bring their vision to
          life.
        </p>
        <video
          poster="https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/ef51b45f79342925d5268e0b2377eae8-1704717764992/thumbnail.png"
          autoPlay
          controls
          preload="auto"
          className="w-full rounded-2xl object-cover"
          style={{ height: 620 }}
        >
          <source
            src="https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/v1/video-attachments/generic_asset/asset/4934b0c8f6441211d97f83585a7c9c00-1722433273322/Vontelle%20Cutdown-%20Breakthrough%20V5"
            type="video/mp4"
          />
        </video>
      </div>
      <div>
        <h2 className="text-4xl text-gray-600 tracking-normal mt-10">
          Vontélle’s go-to services
        </h2>
        <div className="grid max-lg:grid-cols-3 gap-5 lg:grid-cols-5">
          <button>
            <div className="shadow-md py-6 hover:shadow-xl h-44 rounded-xl">
              <img
                src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_80,dpr_1.0/v1/attachments/generic_asset/asset/818fbc450c6b7f14664e7d15584f008b-1722417666557/3D-Industrial-Design_2x.png"
                alt=""
                className="mx-auto"
              />
              <p>3D Industrial Design</p>
            </div>
          </button>
          <button>
            <div className="shadow-md py-6 hover:shadow-xl h-44 rounded-xl">
              <img
                src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_80,dpr_1.0/v1/attachments/generic_asset/asset/818fbc450c6b7f14664e7d15584f008b-1722417666565/E-commerce-Website-Development_2x.png"
                alt=""
                className="mx-auto"
              />
              <p>
                E-Commerce <br /> Website Development
              </p>
            </div>
          </button>
          <button>
            <div className="shadow-md py-6 hover:shadow-xl h-44 rounded-xl">
              <img
                src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_80,dpr_1.0/v1/attachments/generic_asset/asset/818fbc450c6b7f14664e7d15584f008b-1722417666560/Email-Marketing_2x.png"
                alt=""
                className="mx-auto"
              />
              <p>Email Marketing</p>
            </div>
          </button>
          <button>
            <div className="shadow-md py-6 hover:shadow-xl h-44 rounded-xl">
              <img
                src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_80,dpr_1.0/v1/attachments/generic_asset/asset/818fbc450c6b7f14664e7d15584f008b-1722417666567/Press-Releases_2x.png"
                alt=""
                className="mx-auto"
              />
              <p>Press Releases</p>
            </div>
          </button>
          <button>
            <div className="shadow-md py-6 hover:shadow-xl h-44 rounded-xl">
              <img
                src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_80,dpr_1.0/v1/attachments/generic_asset/asset/818fbc450c6b7f14664e7d15584f008b-1722417666561/Logo-Design_2x.png"
                alt=""
                className="mx-auto"
              />
              <p>Logo Design</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
