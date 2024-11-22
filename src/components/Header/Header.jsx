import React, { useState, useEffect } from "react";
import global from "./HeaderImg/language.png";
import dollar from "./HeaderImg/dollar.png";
import { fiverrService } from "../../services/fetchAPI";
import { NavLink, useNavigate } from "react-router-dom";
import logoWhite from "./HeaderImg/logo-white.png";
import logoBlack from "./HeaderImg/logo-black.png";
import { useSelector } from "react-redux";

export default function Header({ enableScroll }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuCongViec, setMenuCongViec] = useState([]);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  let navigate = useNavigate();
  let user = useSelector((state) => state.userSlice.dataLogin);

  let renderChiTietLoai = (dsChiTietLoai) => {
    return (
      <ul>
        {dsChiTietLoai.map((chiTiet) => (
          <li
            key={chiTiet.id}
            style={{ color: "#7d7d7d", paddingLeft: "20px" }}
          >
            {chiTiet.tenChiTiet}
          </li>
        ))}
      </ul>
    );
  };

  let renderNhomChiTietLoai = (dsNhomChiTietLoai) => {
    return (
      <ul>
        {dsNhomChiTietLoai.map((nhom) => (
          <li key={nhom.id} style={{ fontWeight: "bold", marginTop: "10px" }}>
            {nhom.tenNhom}
            {nhom.dsChiTietLoai.length > 0 &&
              renderChiTietLoai(nhom.dsChiTietLoai)}
          </li>
        ))}
      </ul>
    );
  };

  let renderUser = () => {
    if (user) {
      return (
        <li
          className="inline-block ml-8 font-medium py-4 text-lg"
          style={textColor}
        >
          <div className="flex items-center space-x-4">
            <p className="hover:text-green-500 transition duration-300">
              {user.user.name}
            </p>
            <button
              onClick={handleLogout}
              className="border-2 border-green-500 rounded-lg px-4 pb-1 text-xl text-green-500 bg-transparent hover:text-white hover:bg-green-500 transition duration-300"
            >
              Log out
            </button>
          </div>
        </li>
      );
    } else {
      return (
        <>
          <li
            className="inline-block ml-8 font-medium py-4 text-lg"
            style={textColor}
          >
            <NavLink
              className="hover:text-green-500 transition duration-300"
              to="/login"
            >
              Sign in
            </NavLink>
          </li>
          <li
            className="inline-block ml-8 font-medium py-4 text-lg"
            style={textColor}
          >
            <NavLink
              className="border-2 border-green-500 rounded-lg px-4 pb-1 text-xl text-green-500 bg-transparent hover:text-white hover:bg-green-500 transition duration-300"
              to="/register"
            >
              Join
            </NavLink>
          </li>
        </>
      );
    }
  };

  let handleLogout = () => {
    localStorage.removeItem("USER_LOGIN");
    window.location.href = "/";
  };

  useEffect(() => {
    fiverrService
      .layMenuLoaiCongViec()
      .then((result) => {
        setMenuCongViec(result.data.content);
      })
      .catch((err) => {});

    //Chỉ trang home mang hiệu ứng, các trang còn lại thì không
    if (!enableScroll) {
      setScrolled(true);
      return;
    }

    const handleScroll = () => {
      const isScrolled = window.scrollY > 1;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [enableScroll]);

  const navbarStyle = {
    position: "fixed",
    top: 0,
    width: "100%",
    padding: "1rem",
    backgroundColor: scrolled ? "white" : "transparent",
    transition: "background-color 0.3s ease",
    borderBottom: scrolled ? "2px solid #e5e7eb" : "none",
  };

  const searchBar = {
    display: scrolled ? "block" : "none",
  };

  const textColor = {
    color: scrolled ? "#4b5563" : "white",
  };

  return (
    <div style={navbarStyle} className="border-b-2 border-b-gray-200 z-20">
      <div className="container flex justify-between">
        <div className="flex">
          <NavLink to="/">
            <img
              src={scrolled ? logoBlack : logoWhite}
              className="w-36 h-16"
              alt=""
            />
          </NavLink>
          <form class="w-80 mx-8" style={searchBar}>
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
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
              </div>
              <input
                type="search"
                id="default-search"
                class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for your favorite service"
                required
              />
              <button
                type="submit"
                class="text-white absolute end-2.5 bottom-2.5 bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <nav>
          <ul>
            <li
              className="inline-block ml-8 font-medium py-4 text-lg"
              style={textColor}
            >
              <button className="hover:text-green-500 transition duration-300">
                Fiverr Pro
              </button>
            </li>
            <li
              className="inline-block ml-8 font-medium py-4 text-lg"
              style={textColor}
            >
              <button className="hover:text-green-500 transition duration-300">
                Explore
              </button>
            </li>
            <li
              className="inline-block ml-8 font-medium py-4 text-lg"
              style={textColor}
            >
              <button className="hover:text-green-500 transition duration-300 flex items-center">
                <img src={global} className="max-w-3" alt="" />
                <p className="pl-2">English</p>
              </button>
            </li>
            <li
              className="inline-block ml-8 font-medium py-4 text-lg"
              style={textColor}
            >
              <button className="hover:text-green-500 transition duration-300 flex items-center">
                <img src={dollar} className="max-w-3" alt="" />
                <p className="pl-2">USD</p>
              </button>
            </li>
            <li
              className="inline-block ml-8 font-medium py-4 text-lg"
              style={textColor}
            >
              <button className="hover:text-green-500 transition duration-300">
                Become a Seller
              </button>
            </li>
            {renderUser()}
          </ul>
        </nav>
      </div>

      <div
        className="flex justify-center relative container"
        style={{ display: scrolled ? "block" : "none" }}
      >
        <ul className="flex list-none gap-5 cursor-pointer mt-6">
          {/* Render danh sách các loại công việc */}
          {menuCongViec.map((loaiCongViec) => (
            <li
              key={loaiCongViec.id}
              onMouseEnter={() => setHoveredMenu(loaiCongViec.id)} // Xác định menu đang hover
              onMouseLeave={() => setHoveredMenu(null)} // Xóa trạng thái hover khi rời chuột
              className="relative"
            >
              <button
                onClick={() => {
                  navigate(`/job-detail/${loaiCongViec.id}`);
                }}
              >
                {loaiCongViec.tenLoaiCongViec}
              </button>

              {/* Hiển thị menu chi tiết nếu đang hover */}
              {hoveredMenu === loaiCongViec.id &&
                loaiCongViec.dsNhomChiTietLoai.length > 0 && (
                  <div className="absolute top-full left-0 bg-white border border-solid border-gray-200  min-w-72 w-auto p-6">
                    {renderNhomChiTietLoai(loaiCongViec.dsNhomChiTietLoai)}
                  </div>
                )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
