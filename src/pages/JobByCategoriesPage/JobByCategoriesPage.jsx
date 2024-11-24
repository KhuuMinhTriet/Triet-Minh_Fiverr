import React, { useState, useEffect } from "react";
import { fiverrService } from "../../services/fetchAPI";
import { useParams } from "react-router";

export default function JobByCategoriesPage() {
  const [categories, setCategories] = useState(null);
  let params = useParams();

  let renderCategories = () => {
    if (!categories || !categories.content) {
      return <p>{categories ? "No data found" : "Loading..."}</p>;
    }

    return (
      <div>
        <h2 className="my-4 text-gray-600">
          {categories.content.length} results
        </h2>
        <div className="grid gap-4 grid-cols-4">
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
                <h3 className="text-base my-2 mx-0">
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
                <p className="font-bold my-2 mx-0">
                  From US${jobs.congViec?.giaTien || "N/A"}
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
      <div className="flex justify-between">
        <div className="flex justify-between w-1/2"></div>
      </div>
      <div className="mt-40 mb-20">{renderCategories()}</div>
    </div>
  );
}
