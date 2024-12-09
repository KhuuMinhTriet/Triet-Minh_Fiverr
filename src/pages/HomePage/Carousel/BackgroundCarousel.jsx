import { useEffect, useState } from "react";

const BackgroundCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const images = [
    "https://img.freepik.com/premium-photo/portrait-young-woman-standing-against-yellow-background_1048944-15729169.jpg?w=1380",
    "https://img.freepik.com/free-photo/attractive-stylish-ginger-girl-with-confident-glance-selfassured-smile-pulling-mobile-phone_1258-140035.jpg?t=st=1731652358~exp=1731655958~hmac=78e9743c991bb3f5d2f6ee875c142aa8e09bb26cbfe5686f09039e47ecda564d&w=1380",
    "https://img.freepik.com/free-photo/portrait-cheerful-asian-man-pointing-fingers-upper-left-corner-smiling-showing-banner-satisfi_1258-110538.jpg?t=st=1731653364~exp=1731656964~hmac=9409dfe3b351c164eedeb11a033497cf8a6f6078d454811c64677185cfd09226&w=1380",
    "https://img.freepik.com/premium-photo/portrait-young-woman-with-arms-crossed-standing-against-yellow-wall_1048944-22463614.jpg?w=1380",
    "https://img.freepik.com/free-photo/shocked-young-man-looking-empty-space-showing-big-size-object-standing-blue-background_1258-155173.jpg?t=st=1731653521~exp=1731657121~hmac=4d67c792122444a48e95fd102b71609380fd794a68efa8a5d691a2b7ae6ba793&w=1380",
  ];

  useEffect(() => {
    // set thời gian chạy slide carousel
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    // quan sát co giãn khung hình
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, [images.length]);

  let carouselWidth =
    screenWidth >= 1024 ? 600 : screenWidth >= 768 ? 400 : 300;

  return (
    <div
      className="relative w-full z-0"
      data-carousel="static"
      style={{ height: carouselWidth }}
    >
      {/* Carousel wrapper */}
      <div className="relative">
        {images.map((src, index) => (
          <div
            key={index}
            className={`duration-700 ease-in-out ${
              index === activeIndex ? "" : "hidden"
            }`}
            data-carousel-item={index === activeIndex ? "active" : undefined}
          >
            <img
              src={src}
              className="block w-full"
              style={{ height: carouselWidth }}
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BackgroundCarousel;
