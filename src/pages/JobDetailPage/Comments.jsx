import React, { useState, useEffect } from "react";
import { fiverrService } from "../../services/fetchAPI";
import { useParams } from "react-router";
import { Rate } from "antd";

export default function Comments() {
  const [comments, setComments] = useState({ content: [] });
  const [rating, setRating] = useState(0);
  let params = useParams();

  let handleRateChange = (number) => {
    setRating(number);
  };

  useEffect(() => {
    fiverrService
      .layBinhLuanTheoCongViec(params.id)
      .then((result) => {
        const data = result?.data || { content: [] };
        setComments(data);
      })
      .catch((err) => {
        setComments({ content: [] });
      });
  }, [params.id]);

  return (
    <div>
      <form class="w-1/2 my-10">
        <div class="flex">
          <div class="relative w-full">
            <input
              type="search"
              id="location-search"
              class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg  border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-green-500 rounded-s-lg"
              placeholder="Search reviews"
              required
            />
            <button
              type="submit"
              class="absolute top-0 end-0 h-full p-2.5 text-sm font-medium text-white bg-black rounded-e-lg focus:ring-4 focus:outline-none"
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

      <div>
        {comments?.content?.map((comment) => (
          <div
            key={comment.id}
            className="border border-gray-300 p-4 my-8 rounded-lg"
          >
            <div className="flex items-center gap-4 border-b border-b-gray-300 pb-4">
              <img
                src={comment.avatar}
                className="rounded-full max-w-16"
                alt=""
              />
              <div>
                <div className="flex items-center gap-4">
                  <p className="text-xl font-medium">
                    {comment.tenNguoiBinhLuan}
                  </p>
                  <span className="text-xl text-yellow-500 font-bold flex items-center gap-2">
                    {comment.saoBinhLuan}{" "}
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/12709/12709532.png"
                      className="max-w-8"
                      alt=""
                    />
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1200px-Flag_of_Vietnam.svg.png"
                    className="max-w-6 rounded-sm"
                    alt=""
                  />
                  <p className="text-lg text-gray-500">Vietnam</p>
                </div>
              </div>
            </div>

            <div className="py-3 border-b border-b-gray-300">
              <p>{comment.noiDung}</p>
            </div>

            <div className="flex gap-4 text-gray-600 text-lg pt-4">
              <p>Helpful? </p>
              <img
                src="https://cdn-icons-png.flaticon.com/512/126/126473.png"
                className="max-w-6"
                alt=""
              />
              <p>Yes</p>
              <img
                src="https://cdn-icons-png.flaticon.com/512/4466/4466315.png"
                className="max-w-6"
                alt=""
              />
              <p>No</p>
            </div>
          </div>
        )) || <p className="text-center">There are no comments yet.</p>}
      </div>

      <div className="my-5">
        <div className="flex items-center justify-between text-xl font-bold">
          <h1>Leave some comments</h1>
          <div className="flex items-center gap-4">
            <p>Rating</p>
            <Rate onChange={handleRateChange} />
          </div>
        </div>
        <textarea
          id="message"
          rows="4"
          class="block p-4 my-4 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your thoughts here..."
        ></textarea>
        <button className="text-white bg-green-500 py-2 px-6 rounded-lg">
          Comment
        </button>
      </div>
    </div>
  );
}
