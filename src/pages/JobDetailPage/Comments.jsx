import React, { useState, useEffect } from "react";
import { fiverrService } from "../../services/fetchAPI";
import { useNavigate, useParams } from "react-router";
import { Rate } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { postCommentActionService } from "../../redux/userSlice";

export default function Comments() {
  const [comments, setComments] = useState({ content: [] });
  const [visibleComments, setVisibleComments] = useState(3); //số lượng comments hiển thị
  const [rating, setRating] = useState(0);
  let params = useParams();
  let user = useSelector((state) => state.userSlice.dataLogin);
  let navigate = useNavigate();
  let dispatch = useDispatch();

  let handleRateChange = (number) => {
    setRating(number);
  };

  // hàm load thêm comments
  let handleLoadMore = () => {
    setVisibleComments((prev) => prev + 3);
  };

  let renderComments = () => {
    if (!comments?.content?.length) {
      return (
        <p className="text-center py-4 text-lg font-medium">
          There are no comments yet.
        </p>
      );
    }

    // hiển thị comments dựa trên state visibleComments
    let visible = comments.content.slice(0, visibleComments);

    return (
      <>
        {visible.map((comment) => (
          <div
            key={comment.id}
            className="border border-gray-300 p-4 my-8 rounded-lg"
          >
            <div className="flex items-center gap-4 border-b border-b-gray-300 pb-4">
              <img
                src={comment.avatar|| "https://via.placeholder.com/40"}
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
        ))}

        {/* Hiển thị nút Load more comments nếu còn comments */}
        {visibleComments < comments.content.length && (
          <div className="text-center my-4 font-bold text-lg">
            <button
              onClick={handleLoadMore}
              className="text-white bg-green-500 hover:bg-green-700 transition py-4 rounded-lg w-full"
            >
              Load more comments
            </button>
          </div>
        )}
      </>
    );
  };

  let handleCommentButton = () => {
    if (!user) {
      Swal.fire({
        title: "You must log in to post a comment! Do you want to log in now?",
        showDenyButton: true,
        confirmButtonText: "Log in now",
        confirmButtonColor: "#21c45d",
        denyButtonText: `Maybe later`,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    } else {
      if (rating === 0) {
        Swal.fire("Please give us a rate!");
      } else {
        const comment = document.getElementById("comment").value.trim();
        if (!comment) {
          Swal.fire("Please write a comment before submitting!");
          return;
        }

        const values = {
          maCongViec: params.id,
          maNguoiBinhLuan: user.user.id,
          ngayBinhLuan: new Date().toLocaleDateString("en-GB"),
          noiDung: comment,
          saoBinhLuan: rating,
        };

        dispatch(postCommentActionService(values))
          .unwrap()
          .then((result) => {
            window.location.reload();
          })
          .catch((err) => {
            Swal.fire("Oops! Something is wrong when you tried to comment");
          });
      }
    }
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
      <form className="w-1/2 my-10">
        <div className="flex">
          <div className="relative w-full">
            <input
              type="search"
              id="location-search"
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg  border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-green-500 rounded-s-lg"
              placeholder="Search reviews"
              required
            />
            <button
              type="submit"
              className="absolute top-0 end-0 h-full p-2.5 text-sm font-medium text-white bg-black rounded-e-lg focus:ring-4 focus:outline-none"
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

      <div>{renderComments()}</div>

      <div className="my-5">
        <div className="flex items-center justify-between text-xl font-bold">
          <h1>Leave some comments</h1>
          <div className="flex items-center gap-4">
            <p>Rating</p>
            <Rate onChange={handleRateChange} />
          </div>
        </div>
        <textarea
          id="comment"
          rows="4"
          className="block p-4 my-4 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your thoughts here..."
        ></textarea>
        <button
          className="text-white bg-green-500 py-2 px-6 rounded-lg"
          onClick={handleCommentButton}
        >
          Comment
        </button>
      </div>
    </div>
  );
}
