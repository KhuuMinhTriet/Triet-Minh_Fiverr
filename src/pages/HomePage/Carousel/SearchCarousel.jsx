import React from "react";

export default function SearchCarousel() {
  const searchCarousel = {
    left: "6%",
    top: "30%",
  };

  return (
    <div className="absolute z-10" style={searchCarousel}>
      <div className="text-5xl tracking-wide leading-normal text-white font-semibold">
        <h1>Scale your professional</h1>
        <h1>
          workplace with <span className="italic">freelancers</span>
        </h1>
      </div>

      <form class="max-w-md my-6">
        <div class="flex">
          <div class="relative w-full">
            <input
              type="search"
              id="location-search"
              class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 rounded-s-lg"
              placeholder="Search for any device..."
              required
            />
            <button
              type="submit"
              class="absolute top-0 end-0 h-full p-2.5 text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                class="w-4 h-4"
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
              <span class="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
