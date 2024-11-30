import React, { useState, useEffect } from "react";
import { fiverrService } from "../../services/fetchAPI";
import { useNavigate } from "react-router";

export default function JobRented() {
  const [rentedJob, setRentedJob] = useState(null);
  let navigate = useNavigate();

  let renderRentedJobs = () => {
    if (!rentedJob || !rentedJob.content) {
      return (
        <div className="border shadow-lg shadow-green-300 rounded-lg text-2xl font-medium py-8 text-center">
          It seem that you don't have any Gigs yet
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-8">
        {rentedJob.content.map((jobs) => (
          <div className="border shadow-lg shadow-green-300 rounded-lg p-4 flex gap-4">
            <div className="w-2/5">
              <img src={jobs.congViec?.hinhAnh} alt="" />
            </div>
            <div className="w-3/5 flex flex-col justify-between">
              <div>
                <h2 className="font-medium text-xl">
                  {jobs.congViec?.tenCongViec}
                </h2>
                <p className="leading-7 mt-2">{jobs.congViec?.moTaNgan}</p>
              </div>
              <div>
                <div className="flex justify-between items-center my-4">
                  <div>
                    <p className="text-lg">
                      ⭐{" "}
                      <span className="font-bold text-yellow-500">
                        {jobs.congViec?.saoCongViec}
                      </span>{" "}
                      ({jobs.congViec?.danhGia})
                    </p>
                  </div>
                  <p className="text-2xl">${jobs.congViec?.giaTien}</p>
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    className="text-white text-xl px-4 py-2 rounded-lg bg-green-500"
                    onClick={() => {
                      navigate(`/job-detail/${jobs.congViec?.id}`);
                    }}
                  >
                    Details
                  </button>
                  <button className="text-white text-xl px-4 py-2 rounded-lg bg-red-500">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    fiverrService
      .layDanhSachDaThue()
      .then((result) => {
        const data = result.data || {};
        setRentedJob(data);
      })
      .catch((err) => {
        setRentedJob({ content: [] });
      });
  }, []);

  return <div className="mb-8">{renderRentedJobs()}</div>;
}
