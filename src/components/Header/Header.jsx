import React, { useState, useEffect, useRef } from "react";
import global from "./HeaderImg/language.png";
import dollar from "./HeaderImg/dollar.png";
import { fiverrService } from "../../services/fetchAPI";
import { NavLink, useNavigate } from "react-router-dom";
import logoWhite from "./HeaderImg/logo-white.png";
import logoBlack from "./HeaderImg/logo-black.png";
import { useSelector } from "react-redux";
import "./Header.css";
import DropDownMenu from "./DropDownMenu";

export default function Header({ enableScroll }) {
  const [scrolled, setScrolled] = useState(false); // quan sát hành vi của header khi cuộn trang
  const [menuCongViec, setMenuCongViec] = useState([]);
  const [hoveredMenu, setHoveredMenu] = useState(null); // hover menu để xổ xuống chi tiết
  const [searchValue, setSearchValue] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  let navigate = useNavigate();
  let user = useSelector((state) => state.userSlice.dataLogin);
  let containerMenuRef = useRef(null);
  let itemRefs = useRef({});

  const handleSearch = (e) => {
    e.preventDefault(); // Ngăn form submit mặc định
    if (searchValue.trim() !== "") {
      navigate(`/job-by-name/${searchValue}`);
    }
  };

  const scrollLeft = () => {
    if (containerMenuRef.current) {
      containerMenuRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerMenuRef.current) {
      containerMenuRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  let renderChiTietLoai = (dsChiTietLoai) => {
    return (
      <ul>
        {dsChiTietLoai.map((chiTiet) => (
          <li
            key={chiTiet.id}
            style={{ color: "#7d7d7d", paddingLeft: "20px" }}
          >
            <button
              className="hover:text-green-500 transition duration-300"
              onClick={() => {
                navigate(`/job-by-categories/${chiTiet.id}`);
              }}
            >
              {chiTiet.tenChiTiet}
            </button>
          </li>
        ))}
      </ul>
    );
  };

  let renderNhomChiTietLoai = (dsNhomChiTietLoai) => {
    return (
      <ul>
        {dsNhomChiTietLoai.map((nhom) => (
          <li
            key={nhom.id}
            className="font-bold mt-2.5 border-t border-gray-400 pt-3"
          >
            <p className="hover:cursor-auto">{nhom.tenNhom}</p>
            {nhom.dsChiTietLoai.length > 0 &&
              renderChiTietLoai(nhom.dsChiTietLoai)}
          </li>
        ))}
      </ul>
    );
  };

  let renderUser = () => {
    if (user) {
      let renderIdentity = () => {
        if (user.user.avatar === "")
          return (
            <p
              className="hover:text-green-500 transition duration-300"
              onClick={() => {
                navigate(`/user/${user.user.id}`);
              }}
            >
              {user.user.name}
            </p>
          );
        else
          return (
            <img
              src={user.user.avatar}
              alt=""
              className="w-14 h-14 hover:cursor-pointer"
              style={{ borderRadius: "50%" }}
              onClick={() => {
                navigate(`/user/${user.user.id}`);
              }}
            />
          );
      };

      return (
        <li
          className="inline-block font-medium text-lg xl:ml-8"
          style={textColor}
        >
          <div className="flex items-center space-x-4">
            {renderIdentity()}
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
            className="xl:inline-block font-medium xl:py-4 text-lg xl:ml-8"
            style={textColor}
          >
            <NavLink
              className="border-2 border-green-500 rounded-lg px-4 pb-1 text-xl text-green-500 bg-transparent hover:text-white hover:bg-green-500 transition duration-300"
              to="/login"
            >
              Sign in
            </NavLink>
          </li>
          <li
            className="xl:inline-block xl:ml-8 font-medium xl:py-4 text-lg"
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
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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
              className="w-28 h-12"
              alt=""
            />
          </NavLink>
          <form className="w-80 mx-8" style={searchBar} onSubmit={handleSearch}>
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for your favorite service"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <nav>
          {/* Toggle sidebar button */}
          <div className="flex items-center justify-between px-6 xl:hidden">
            <button
              className="text-3xl focus:outline-none"
              style={{ color: scrolled ? "black" : "white" }}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              ☰
            </button>
          </div>

          {/* Overlay */}
          {isSidebarOpen && (
            <div
              className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 z-40"
              onClick={() => setIsSidebarOpen(false)} // Đóng sidebar khi nhấn overlay
            />
          )}

          {/* Sidebar (screen < 1024px) */}
          <div
            className={`absolute top-0 left-0 w-56 h-screen bg-white shadow-lg z-50 transition-transform duration-300 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } xl:hidden`}
          >
            <ul className="flex flex-col items-start space-y-6 p-6">
              <li className="font-medium text-lg">
                <button className="hover:text-green-500 transition duration-300">
                  Fiverr Pro
                </button>
              </li>
              <li className="font-medium text-lg">
                <button className="hover:text-green-500 transition duration-300">
                  Explore
                </button>
              </li>
              <li className="font-medium text-lg flex items-center">
                <img src={global} className="max-w-3" alt="" />
                <p className="pl-2">English</p>
              </li>
              <li className="font-medium text-lg flex items-center">
                <img src={dollar} className="max-w-3" alt="" />
                <p className="pl-2">USD</p>
              </li>
              <li className="font-medium text-lg">
                <button className="hover:text-green-500 transition duration-300">
                  Become a Seller
                </button>
              </li>
              {renderUser()}
            </ul>
          </div>

          {/* Default navbar */}
          <ul className="hidden xl:flex items-center">
            <li
              className="inline-block ml-8 font-medium text-lg"
              style={textColor}
            >
              <button className="hover:text-green-500 transition duration-300">
                Fiverr Pro
              </button>
            </li>
            <li
              className="inline-block ml-8 font-medium text-lg"
              style={textColor}
            >
              <button className="hover:text-green-500 transition duration-300">
                Explore
              </button>
            </li>
            <li
              className="inline-block ml-8 font-medium text-lg"
              style={textColor}
            >
              <button className="hover:text-green-500 transition duration-300 flex items-center">
                <img src={global} className="max-w-3" alt="" />
                <p className="pl-2">English</p>
              </button>
            </li>
            <li
              className="inline-block ml-8 font-medium text-lg"
              style={textColor}
            >
              <button className="hover:text-green-500 transition duration-300 flex items-center">
                <img src={dollar} className="max-w-3" alt="" />
                <p className="pl-2">USD</p>
              </button>
            </li>
            <li
              className="inline-block ml-8 font-medium text-lg"
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

      <div className="relative">
        <div
          className="flex items-center gap-5 container relative"
          style={{ display: scrolled ? "block" : "none" }}
        >
          <button
            onClick={scrollLeft}
            className="max-xl:absolute xl:hidden -left-10 top-1/2 transform -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-full p-2"
          >
            &lt;
          </button>

          <ul
            className="flex justify-between overflow-x-auto overflow-y-visible whitespace-nowrap list-none gap-5 cursor-pointer mt-6 no-scrollbar"
            ref={containerMenuRef}
          >
            {/* Render danh sách các loại công việc */}
            {menuCongViec.map((loaiCongViec) => (
              <li
                key={loaiCongViec.id}
                ref={(el) => (itemRefs.current[loaiCongViec.id] = el)}
                onMouseEnter={() => {
                  setHoveredMenu(loaiCongViec.id);
                }} // Xác định menu đang hover
                onMouseLeave={() => setHoveredMenu(null)} // Xóa trạng thái hover khi rời chuột
                className="relative"
              >
                <button
                  onClick={() => {
                    navigate(`/job-type/${loaiCongViec.id}`);
                  }}
                >
                  {loaiCongViec.tenLoaiCongViec}
                </button>

                {/* Hiển thị menu chi tiết nếu đang hover */}
                {hoveredMenu === loaiCongViec.id &&
                  loaiCongViec.dsNhomChiTietLoai.length > 0 && (
                    <DropDownMenu parentRef={itemRefs.current[loaiCongViec.id]}>
                      {renderNhomChiTietLoai(loaiCongViec.dsNhomChiTietLoai)}
                    </DropDownMenu>
                  )}
              </li>
            ))}
          </ul>

          <button
            onClick={scrollRight}
            className="max-xl:absolute xl:hidden -right-10 top-1/2 transform -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-full p-2"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
