import React, { useState, useEffect } from "react";
import {
  dropDownBox,
  switchButton,
} from "../JobByCategoriesPage/JobByCategoriesPage";
import { useNavigate, useParams } from "react-router";
import { fiverrService } from "../../services/fetchAPI";

export default function JobFindByNamePage() {
  const [result, setResult] = useState(null);
  let params = useParams();
  let navigate = useNavigate();

  let renderResult = () => {
    if (!result || !result.content) {
      return <p>{result ? "No data found" : "Loading..."}</p>;
    }

    return (
      <div>
        <div className="flex justify-between">
          <h2 className="my-4 text-gray-600 text-xl">
            {result.content.length} results
          </h2>
          <form className="flex justify-center items-center">
            <span className="min-w-16 text-gray-600">Sort by:</span>
            <div className="flex items-center">
              <select
                id="selectSortName"
                className="block py-2.5 px-0 w-full text-lg font-medium bg-transparent appearance-none dark:text-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 peer mx-2"
              >
                <option selected>Recommended</option>
                <option>Best selling</option>
                <option>Newest arrivals</option>
              </select>
            </div>
          </form>
        </div>
        <div className="grid gap-4 grid-cols-4">
          {result.content.map((jobs) => (
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
      .layCongViecTheoTen(params.id)
      .then((result) => {
        const data = result?.data || {};
        setResult(data);
      })
      .catch((err) => {
        setResult({ content: [] });
      });
  }, [params.id]);

  return (
    <div className="container">
      <div className="flex justify-between mt-48">
        <div className="flex justify-between w-1/2">
          {dropDownBox("Service options")}
          {dropDownBox("Seller details")}
          {dropDownBox("Budget")}
          {dropDownBox("Delivery times")}
        </div>
        <div className="flex justify-between w-5/12">
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
      <div className="my-8">{renderResult()}</div>
    </div>
  );
}
