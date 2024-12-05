import React, { useState, useEffect, useRef } from "react";
import { fiverrService } from "../../services/fetchAPI";
import { useParams } from "react-router";
import JobRented from "./JobRented";
import { useDispatch } from "react-redux";
import {
  updateUserActionService,
  uploadAvatarActionService,
} from "../../redux/userSlice";
import Select from "react-select";
import Swal from "sweetalert2";

export default function UserAccountPage() {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const [formValues, setFormValues] = useState({
    name: user?.content?.name || "",
    email: user?.content?.email || "",
    birthday: user?.content?.birthday || "",
    phone: user?.content?.phone || "",
    gender: user?.content?.gender || true,
    role: "USER",
    certification: user?.content?.certification || [],
    skill: user?.content?.skill || [],
  });

  let params = useParams();
  let dispatch = useDispatch();
  let fileInputRef = useRef(null);
  let userID = params.id;

  // đóng, mở modal
  let openModal = () => {
    setIsModalOpen(true);
  };
  let closeModal = () => setIsModalOpen(false);

  // hàm cập nhật avatar
  let handleChangeAvatar = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("formFile", file);

      dispatch(uploadAvatarActionService(formData))
        .unwrap()
        .then((result) => {
          window.location.reload();
        })
        .catch((err) => {});
    }
  };

  //Xử lý nhập vào input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  // Xử lý chọn skill
  const handleSelectChange = (selectedOptions) => {
    setSelectedSkills(selectedOptions);
    setFormValues((prev) => ({
      ...prev,
      skill: selectedOptions.map((skill) => skill.label),
    }));
  };

  //Xử lý certification
  const handleCertificationChange = (e) => {
    setFormValues((prev) => ({
      ...prev,
      certification: [e.target.value], // Đảm bảo là một mảng chứa chuỗi
    }));
  };

  let renderSkills = () => {
    return (
      <div className="w-full">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
          Skills
        </h3>
        <Select
          options={skills}
          isMulti
          closeMenuOnSelect={false}
          placeholder="-Select skills-"
          onChange={handleSelectChange}
          value={selectedSkills}
        />
      </div>
    );
  };

  let handleUpdateUser = () => {
    dispatch(updateUserActionService({ dataForm: formValues, id: userID }))
      .unwrap()
      .then((result) => {
        window.location.reload();
      })
      .catch((err) => {
        Swal.fire(
          "Something is wrong when you tried to updated your's account",
          "",
          "error"
        );
      });
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
              <button
                className="absolute top-0 right-0 hover:shadow-lg shadow-gray-700"
                type="button"
                onClick={openModal}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/14034/14034699.png"
                  className="w-10 h-10"
                  alt=""
                />
              </button>
              {/* Update Modal */}
              {isModalOpen && user && user.content && (
                <div
                  id="update-modal"
                  tabIndex={-1}
                  aria-hidden="true"
                  className="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
                  onClick={closeModal}
                >
                  <div
                    className="relative p-4 w-full max-w-2xl max-h-full"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                      <div className="p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl text-center font-semibold text-gray-900 dark:text-white">
                          Update User
                        </h3>
                      </div>

                      <div className="grid grid-cols-2 gap-4 p-6">
                        <div>
                          <div className="flex flex-col space-y-1">
                            <label
                              htmlFor="updateEmail"
                              className="text-lg font-medium text-gray-700 dark:text-gray-300"
                            >
                              Email
                            </label>
                            <input
                              name="email"
                              type="email"
                              id="updateEmail"
                              className="p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500 text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white disabled:text-gray-400"
                              value={formValues.email}
                              onChange={handleInputChange}
                              disabled
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex flex-col space-y-1">
                            <label
                              htmlFor="updatePhone"
                              className="text-lg font-medium text-gray-700 dark:text-gray-300"
                            >
                              Phone number
                            </label>
                            <input
                              name="phone"
                              type="tel"
                              id="updatePhone"
                              className="p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500 text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                              value={formValues.phone}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex flex-col space-y-1">
                            <label
                              htmlFor="updateName"
                              className="text-lg font-medium text-gray-700 dark:text-gray-300"
                            >
                              Name
                            </label>
                            <input
                              name="name"
                              type="text"
                              id="updateName"
                              className="p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500 text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                              value={formValues.name}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex flex-col space-y-1">
                            <label
                              htmlFor="updateBirthday"
                              className="text-lg font-medium text-gray-700 dark:text-gray-300"
                            >
                              Birthday
                            </label>
                            <input
                              name="birthday"
                              type="date"
                              id="updateBirthday"
                              className="p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500 text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                              value={formValues.birthday}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Gender
                          </h3>
                          <div className="flex gap-4">
                            <div className="flex items-center">
                              <input
                                className="hidden peer"
                                type="radio"
                                name="gender"
                                id="genderMale"
                                value={true}
                                checked={formValues.gender === true}
                                onChange={(e) =>
                                  setFormValues({ ...formValues, gender: true })
                                }
                              />
                              <label
                                className="inline-block h-5 w-5 cursor-pointer rounded-full border-2 border-gray-300 bg-transparent peer-checked:bg-blue-500"
                                htmlFor="genderMale"
                              ></label>
                              <span
                                className="ml-2 cursor-pointer"
                                htmlFor="genderMale"
                              >
                                Male
                              </span>
                            </div>
                            <div className="flex items-center">
                              <input
                                className="hidden peer"
                                type="radio"
                                name="gender"
                                id="genderFemale"
                                value={false}
                                checked={formValues.gender === false}
                                onChange={(e) =>
                                  setFormValues({
                                    ...formValues,
                                    gender: false,
                                  })
                                }
                              />
                              <label
                                className="inline-block h-5 w-5 cursor-pointer rounded-full border-2 border-gray-300 bg-transparent peer-checked:bg-blue-500"
                                htmlFor="genderFemale"
                              ></label>
                              <span
                                className="ml-2 cursor-pointer"
                                htmlFor="genderFemale"
                              >
                                Female
                              </span>
                            </div>
                          </div>
                        </div>
                        <div>{renderSkills()}</div>
                        <div>
                          <div className="flex flex-col space-y-1">
                            <label
                              htmlFor="updateCertification"
                              className="text-lg font-medium text-gray-700 dark:text-gray-300"
                            >
                              Certification
                            </label>
                            <input
                              name="certification"
                              type="text"
                              id="updateCertification"
                              className="p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500 text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                              value={formValues.certification[0] || ""}
                              onChange={handleCertificationChange}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button
                          type="button"
                          className="text-white bg-green-500 hover:bg-green-700 focus:outline-none font-medium rounded-lg text-lg px-5 py-2.5 text-center"
                          onClick={handleUpdateUser}
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          className="py-2.5 px-5 ms-3 text-lg font-medium text-white focus:outline-none bg-red-500 rounded-lg hover:bg-gray-700 focus:z-10"
                          onClick={closeModal}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

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
            {user.content.skill.map((skill) => {
              return <p>- {skill}</p>;
            })}
          </div>

          <div className="border-t border-green-300 py-4">
            <h2 className="text-xl font-bold">Education</h2>
            <p>- CYBERSOFT</p>
          </div>

          <div className="border-t border-green-300 py-4">
            <h2 className="text-xl font-bold">Certification</h2>-{" "}
            {user.content.certification[0]}
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

        if (data.content) {
          setFormValues({
            name: data.content.name || "",
            email: data.content.email || "",
            phone: data.content.phone || "",
            birthday: data.content.birthday || "",
            role: data.content.role,
            gender:
              data.content.gender !== undefined ? data.content.gender : true, // Giả định giá trị mặc định là true (Male)
            certification: data.content.certification || [],
            skill: data.content.skill || [],
          });
          setSelectedSkills(
            (data.content.skill || []).map((skill) => ({
              value: skill,
              label: skill,
            }))
          );
        }
      })
      .catch((err) => {
        setUser({ content: [] });
      });

    fiverrService
      .laySkill()
      .then((result) => {
        //format lại cho đúng định dạng Select trong thư viện
        const formattedSkills = result.data.content.map((skill) => ({
          value: skill.id,
          label: skill.tenSkill,
        }));

        setSkills(formattedSkills);
      })
      .catch((err) => {});
  }, [params.id]);

  return <div className="container">{renderUser()}</div>;
}
