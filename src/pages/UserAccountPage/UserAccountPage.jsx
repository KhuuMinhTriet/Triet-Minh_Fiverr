import React, { useState, useEffect, useRef } from "react";
import { fiverrService } from "../../services/fetchAPI";
import { useParams } from "react-router";
import JobRented from "./JobRented";
import { useDispatch } from "react-redux";
import { uploadAvatarActionService } from "../../redux/userSlice";

export default function UserAccountPage() {
  const [user, setUser] = useState(null);
  let params = useParams();
  let dispatch = useDispatch();
  let fileInputRef = useRef(null);

  const handleChangeAvatar = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("formFile", file);

      dispatch(uploadAvatarActionService(formData))
        .unwrap()
        .then((result) => {
          console.log("Avatar uploaded successfully:", result);
        })
        .catch((err) => {
          console.error("Error uploading avatar:", err);
        });
    }
  };

  let renderUser = () => {
    if (!user || !user.content) {
      return <p>{user ? "Something is wrong" : "Loading data..."}</p>;
    }

    return (
      <div className="mt-40 mb-6 flex gap-6">
        <div className="w-1/3 p-6 border border-gray-300 rounded-lg shadow-lg shadow-green-300">
          <div>
            <div className="relative">
              <img
                src={
                  user.content.avatar === ""
                    ? "https://cdn-icons-png.flaticon.com/512/3178/3178179.png"
                    : user.content.avatar
                }
                className="w-40 h-40 mx-auto z-0"
                style={{ borderRadius: "50%" }}
                alt=""
              />
              <div
                className="absolute transition duration-300 bg-gray-300 opacity-0 hover:opacity-50 w-40 h-40 cursor-pointer top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center"
                style={{ borderRadius: "50%" }}
                onClick={() => fileInputRef.current.click()}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/45/45010.png"
                  className="h-10 w-10"
                  alt=""
                />
                <input
                  type="file"
                  id="uploadImg"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleChangeAvatar}
                />
              </div>
            </div>
            <p className="text-center text-2xl font-medium mt-4">
              {user.content.email}
            </p>
            <div className="flex justify-between items-center my-4">
              <div className="flex items-center gap-2">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/14035/14035502.png"
                  alt=""
                  className="max-w-4"
                />
                Country
              </div>
              <p>Vietnam</p>
            </div>
            <div className="flex justify-between items-center my-4">
              <div className="flex items-center gap-2">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/456/456212.png"
                  alt=""
                  className="max-w-4"
                />
                Member since
              </div>
              <p>Dec. 2024</p>
            </div>
          </div>

          <div className="border-t border-green-300 py-4">
            <h2 className="font-bold text-xl">Account info</h2>
            <div className="flex items-center leading-10">
              <h3 className="w-1/2">Name:</h3>
              <p className="w-1/2">{user.content.name}</p>
            </div>
            <div className="flex items-center leading-10">
              <h3 className="w-1/2">Mobile phone:</h3>
              <p className="w-1/2">{user.content.phone}</p>
            </div>
            <div className="flex items-center leading-10">
              <h3 className="w-1/2">Birthday:</h3>
              <p className="w-1/2">{user.content.birthday}</p>
            </div>
            <div className="flex items-center leading-10">
              <h3 className="w-1/2">Language Preference:</h3>
              <p className="w-1/2">English</p>
            </div>
            <div className="flex items-center leading-10">
              <h3 className="w-1/2">Native language:</h3>
              <p className="w-1/2">Vietnamese</p>
            </div>
          </div>

          <div className="border-t border-green-300 py-4">
            <h2 className="text-xl font-bold">Skills</h2>
          </div>

          <div className="border-t border-green-300 py-4">
            <h2 className="text-xl font-bold">Education</h2>
          </div>

          <div className="border-t border-green-300 py-4">
            <h2 className="text-xl font-bold">Certification</h2>
          </div>

          <div className="border-t border-green-300 py-4">
            <h2 className="text-xl font-bold">Socialize</h2>
            <div className="flex items-center gap-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png"
                className="max-w-6"
                alt=""
              />
              <a href="#" className="text-blue-500 hover:underline leading-10">
                Facebook
              </a>
            </div>
            <div className="flex items-center gap-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2111/2111432.png"
                className="max-w-6"
                alt=""
              />
              <a href="#" className="text-blue-500 hover:underline leading-10">
                Github
              </a>
            </div>
            <div className="flex items-center gap-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/15059/15059911.png"
                className="max-w-6"
                alt=""
              />
              <a href="#" className="text-blue-500 hover:underline leading-10">
                Stack overflow
              </a>
            </div>
            <div className="flex items-center gap-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
                className="max-w-6"
                alt=""
              />
              <a href="#" className="text-blue-500 hover:underline leading-10">
                Google
              </a>
            </div>
            <div className="flex items-center gap-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733544.png"
                className="max-w-6"
                alt=""
              />
              <a href="#" className="text-blue-500 hover:underline leading-10">
                Dribbble
              </a>
            </div>
            <div className="flex items-center gap-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/5968/5968830.png"
                className="max-w-6"
                alt=""
              />
              <a href="#" className="text-blue-500 hover:underline leading-10">
                Twitter (X)
              </a>
            </div>
            <div className="flex items-center gap-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png"
                className="max-w-6"
                alt=""
              />
              <a href="#" className="text-blue-500 hover:underline leading-10">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        <div className="w-2/3">
          <JobRented />
        </div>
      </div>
    );
  };

  useEffect(() => {
    fiverrService
      .layUserTheoID(params.id)
      .then((result) => {
        const data = result.data || {};
        setUser(data);
      })
      .catch((err) => {
        setUser({ content: [] });
      });
  }, [params.id]);

  return <div className="container">{renderUser()}</div>;
}
