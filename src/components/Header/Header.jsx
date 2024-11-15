import React, { useState, useEffect } from "react";
import logo from "./HeaderImg/logo.png";
import global from "./HeaderImg/language.png";
import dollar from "./HeaderImg/dollar.png";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 1;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarStyle = {
    position: "fixed",
    top: 0,
    width: "100%",
    padding: "1rem",
    backgroundColor: scrolled ? "white" : "transparent",
    transition: "background-color 0.3s ease",
    borderBottom: scrolled ? "2px solid #e5e7eb" : "none",
  };

  const searchBar = {
    display: scrolled ? "block" : "none",
  };

  const textColor = {
    color: scrolled ? "#4b5563" : "white",
  };

  return (
    <div style={navbarStyle} className="border-b-2 border-b-gray-200 z-20">
      <div className="container flex justify-between">
        <div className="flex">
          <img src={logo} className="max-w-36 max-h-16" alt="" />
          <form class="w-80 mx-8" style={searchBar}>
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Mockups, Logos..."
                required
              />
              <button
                type="submit"
                class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <nav>
          <ul>
            <li
              className="inline-block ml-8 font-medium py-4 text-lg"
              style={textColor}
            >
              <button className="hover:text-green-500 transition duration-300">
                Fiverr Pro
              </button>
            </li>
            <li
              className="inline-block ml-8 font-medium py-4 text-lg"
              style={textColor}
            >
              <button className="hover:text-green-500 transition duration-300">
                Explore
              </button>
            </li>
            <li
              className="inline-block ml-8 font-medium py-4 text-lg"
              style={textColor}
            >
              <button className="hover:text-green-500 transition duration-300 flex items-center">
                <img src={global} className="max-w-3" alt="" />
                <p className="pl-2">English</p>
              </button>
            </li>
            <li
              className="inline-block ml-8 font-medium py-4 text-lg"
              style={textColor}
            >
              <button className="hover:text-green-500 transition duration-300 flex items-center">
                <img src={dollar} className="max-w-3" alt="" />
                <p className="pl-2">USD</p>
              </button>
            </li>
            <li
              className="inline-block ml-8 font-medium py-4 text-lg"
              style={textColor}
            >
              <button className="hover:text-green-500 transition duration-300">
                Become a Seller
              </button>
            </li>
            <li
              className="inline-block ml-8 font-medium py-4 text-lg"
              style={textColor}
            >
              <button className="hover:text-green-500 transition duration-300">
                Sign in
              </button>
            </li>
            <li className="inline-block ml-8">
              <button className="border-2 border-green-500 rounded-lg px-4 pb-1 text-xl text-green-500 bg-transparent hover:text-white hover:bg-green-500 transition duration-300">
                Join
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
