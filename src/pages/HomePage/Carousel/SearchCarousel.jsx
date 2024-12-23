import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchCarousel() {
  const [searchValue, setSearchValue] = useState("");
  let navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault(); // Ngăn form submit mặc định
    if (searchValue.trim() !== "") {
      navigate(`/job-by-name/${searchValue}`);
    }
  };

  return (
    <div className="absolute z-10" style={{ top: "30%", left: "6%" }}>
      <div className="max-md:text-3xl max-lg:text-4xl lg:text-5xl tracking-wide leading-normal text-white font-semibold">
        <h1>Scale your professional</h1>
        <h1>
          workplace with <span className="italic">freelancers</span>
        </h1>
      </div>

      <form className="max-w-md my-6" onSubmit={handleSearch}>
        <div className="flex">
          <div className="relative w-full">
            <input
              type="search"
              id="location-search"
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 rounded-s-lg"
              placeholder="Search for any device..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              required
            />
            <button
              type="submit"
              className="absolute top-0 end-0 h-full p-2.5 text-sm font-medium text-white bg-green-500 rounded-e-lg hover:bg-green-700 focus:ring-4 focus:outline-none"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
