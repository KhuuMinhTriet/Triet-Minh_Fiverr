import React, { useState, useEffect } from "react";
import { fiverrService } from "../../services/fetchAPI";
import { useNavigate, useParams } from "react-router";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export let dropDownBox = (title) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-lg font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {title}
          <img
            src="https://cdn-icons-png.flaticon.com/512/7996/7996254.png"
            className="max-w-7 bg-transparent"
            alt=""
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <p className="block px-4 py-2 text-lg text-green-500 font-medium data-[focus]:outline-none">
              Service Offerings
            </p>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
            >
              Offer subscriptions <span className="text-gray-400">(375)</span>
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
            >
              Pald video consultations{" "}
              <span className="text-gray-400">(175)</span>
            </a>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
};

export let switchButton = (title) => {
  return (
    <div>
      <label className="inline-flex items-center cursor-pointer">
        <input type="checkbox" defaultValue className="sr-only peer" />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500" />
        <span className="ms-3 text-lg font-medium text-gray-900 dark:text-gray-300">
          {title}
        </span>
      </label>
      ;
    </div>
  );
};

export default function JobByCategoriesPage() {
  const [categories, setCategories] = useState(null);
  let params = useParams();
  let navigate = useNavigate();

  let renderCategories = () => {
    if (!categories || !categories.content) {
      return <p>{categories ? "No data found" : "Loading..."}</p>;
    }

    return (
      <div>
        <div className="flex justify-between">
          <h2 className="my-4 text-gray-600 text-xl">
            {categories.content.length} results
          </h2>
          <form className="flex justify-center items-center">
            <span className="min-w-16 text-gray-600">Sort by:</span>
            <div className="flex items-center">
              <select
                id="selectSort"
                className="block py-2.5 px-0 w-full text-lg font-medium bg-transparent appearance-none dark:text-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 peer mx-2"
                defaultValue="recommend"
              >
                <option value="recommend">Recommended</option>
                <option value="bestSelling">Best selling</option>
                <option value="newest">Newest arrivals</option>
              </select>
            </div>
          </form>
        </div>
        <div className="grid gap-4 max-md:grid-cols-2 max-lg:grid-cols-3 lg:grid-cols-4">
          {categories.content.map((jobs) => (
            <div
              key={jobs.id}
              className="border border-solid border-gray-300 rounded-lg shadow-md"
            >
              <img
                src={
                  jobs.congViec?.hinhAnh || "https://via.placeholder.com/150"
                }
                alt={jobs.congViec?.tenCongViec || "No image available"}
                className="w-full rounded-t-lg"
              />

              <div className="px-4">
                <div className="flex items-center mt-2">
                  <img
                    src={jobs.avatar || "https://via.placeholder.com/40"}
                    alt={jobs.tenNguoiTao || "No name"}
                    className="max-w-10 max-h-10 rounded-3xl mr-4"
                  />
                  <div className="flex items-center w-full justify-between">
                    <p className="m-0 font-bold">
                      {jobs.tenNguoiTao || "Unknown"}
                    </p>
                    <p className="m-0">
                      Level {jobs.congViec?.saoCongViec || 0}
                    </p>
                  </div>
                </div>
                <h3
                  className="text-base my-2 mx-0 hover:text-green-500 hover:cursor-pointer transition duration-300"
                  onClick={() => {
                    navigate(`/job-detail/${jobs.id}`);
                  }}
                >
                  {jobs.congViec?.tenCongViec || "Unnamed job"}
                </h3>

                <div className="flex gap-2">
                  <span className="text-yellow-500 font-bold">
                    ⭐ {jobs.congViec?.saoCongViec || 0}
                  </span>
                  <span className="text-gray-400 font-medium">
                    ({jobs.congViec?.danhGia || 0})
                  </span>
                </div>
              </div>

              <div className="border-t px-4 mt-2">
                <p className="font-medium my-2 mx-0">
                  From {""}
                  <span className="font-bold text-xl">
                    US$
                    {jobs.congViec?.giaTien || "N/A"}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  useEffect(() => {
    fiverrService
      .layCongViecTheoChiTietLoai(params.id)
      .then((result) => {
        const data = result?.data || {};
        setCategories(data);
      })
      .catch((err) => {
        setCategories({ content: [] });
      });
  }, [params.id]);

  return (
    <div className="container">
      <div className="mt-48">
        <div className="lg:flex justify-between">
          <div className="flex justify-between lg:w-1/2">
            {dropDownBox("Service options")}
            {dropDownBox("Seller details")}
            {dropDownBox("Budget")}
            {dropDownBox("Delivery times")}
          </div>
          <div className="flex justify-between max-lg:mt-10 lg:w-5/12">
            <div className="flex justify-center items-center">
              {switchButton("Pro services")}
            </div>
            <div className="flex justify-center items-center">
              {switchButton("Local sellers")}
            </div>
            <div className="flex justify-center items-center">
              {switchButton("Online sellers")}
            </div>
          </div>
        </div>
        <div className="mb-8">{renderCategories()}</div>
      </div>
    </div>
  );
}
