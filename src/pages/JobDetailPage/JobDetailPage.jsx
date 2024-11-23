import React, { useState, useEffect } from "react";
import { fiverrService } from "../../services/fetchAPI";
import { useParams } from "react-router";
import play from "./play-button.png";
import arrow from "./right-arrow.png";

export default function JobDetailPage() {
  const [detail, setDetail] = useState([]);
  const params = useParams();

  let renderDetailInfo = () => {
    if (!detail.length || !detail[0]?.dsNhomChiTietLoai) {
      return <p>Loading...</p>; // Hiển thị Loading nếu chưa có dữ liệu
    }

    return detail[0].dsNhomChiTietLoai.map((nhom) => (
      <div
        key={nhom.id}
        className="border border-gray-300 p-4 rounded-lg shadow-md"
      >
        {/* Hiển thị ảnh nếu có */}
        {nhom.hinhAnh ? (
          <img
            src={nhom.hinhAnh}
            alt={nhom.tenNhom}
            className="w-full h-52 object-cover mb-4 rounded-md"
          />
        ) : (
          <div className="w-full h-52 bg-gray-200 mb-4 rounded-md flex items-center justify-center">
            <p className="text-gray-500">No Image</p>
          </div>
        )}

        <h2 className="text-xl font-semibold mb-2">{nhom.tenNhom}</h2>
        {/* Danh sách chi tiết loại */}
        {nhom.dsChiTietLoai.length > 0 ? (
          <ul className="list-disc list-inside">
            {nhom.dsChiTietLoai.map((chiTiet) => (
              <li key={chiTiet.id} className="text-gray-700 list-none">
                {chiTiet.tenChiTiet}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No details available</p>
        )}
      </div>
    ));
  };

  useEffect(() => {
    fiverrService
      .layChiTietLoaiCongViec(params.id)
      .then((result) => {
        const data = result?.data?.content || [];
        setDetail(data);
      })
      .catch((err) => {
        setDetail([]);
      });
  }, [params.id]);

  return (
    <div className="container">
      <div className="bg-green-700 py-20 mt-32 rounded-xl text-white">
        <h2 className="text-xl font-medium tracking-wide text-center">
          Design to make you stand out.
        </h2>
        <button className="mt-8 flex text-lg justify-center items-center mx-auto border-white border px-6 py-4 rounded-xl bg-transparent hover:bg-white hover:text-green-700 transition duration-300 font-medium">
          <img src={play} className="max-w-6 mr-3" alt="" />
          {""}How Fiverr Works
        </button>
      </div>

      <div className="my-10">
        <h1 className="text-2xl font-bold">
          {detail.length > 0
            ? `Most popular in ${detail[0]?.tenLoaiCongViec}`
            : "Loading..."}
        </h1>
        <div className="flex my-4 justify-between">
          <div className="flex justify-center items-center p-2 border shadow-lg rounded-xl hover:text-green-500 transition duration-300">
            <img
              src="https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/8ab683c462bb7021359f813a67f0a210-1727008217020/HTML%20_%20CSS%20Developers.png"
              className="max-w-14"
              alt=""
            />
            <p className="mx-6 font-medium">HTML & CSS Developers</p>
            <img src={arrow} className="max-w-6" alt="" />
          </div>
          <div className="flex justify-center items-center p-2 border shadow-lg rounded-xl hover:text-green-500 transition duration-300">
            <img
              src="https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/148a459235c2efcccf74882dd6790246-1727083583530/Singers%20_%20Vocalists.png"
              className="max-w-14"
              alt=""
            />
            <p className="mx-6 font-medium">Single & Vocalists</p>
            <img src={arrow} className="max-w-6" alt="" />
          </div>
          <div className="flex justify-center items-center p-2 border shadow-lg rounded-xl hover:text-green-500 transition duration-300">
            <img
              src="https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/1857ea6cdffed9de2c5739f010338061-1727172011185/CRM%20management.png"
              className="max-w-14"
              alt=""
            />
            <p className="mx-6 font-medium">CRM Management</p>
            <img src={arrow} className="max-w-6" alt="" />
          </div>
          <div className="flex justify-center items-center p-2 border shadow-lg rounded-xl hover:text-green-500 transition duration-300">
            <img
              src="https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/a4f23e7ad88e3c639e545e7f1ef6c24c-1727084447011/Website%20Design.png"
              className="max-w-14"
              alt=""
            />
            <p className="mx-6 font-medium">Website Designs</p>
            <img src={arrow} className="max-w-6" alt="" />
          </div>
          <div className="flex justify-center items-center p-2 border shadow-lg rounded-xl hover:text-green-500 transition duration-300">
            <img
              src="https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/148a459235c2efcccf74882dd6790246-1727083583540/SEO.png"
              className="max-w-14"
              alt=""
            />
            <p className="mx-6 font-medium">SEO</p>
            <img src={arrow} className="max-w-6" alt="" />
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-bold mb-4">
          {detail.length > 0
            ? "Explore " + detail[0]?.tenLoaiCongViec
            : "Loading..."}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {renderDetailInfo()}
        </div>
      </div>

      <div className="my-16">
        <h1 className="text-center text-3xl font-bold">
          {detail.length > 0
            ? `Services Related To ${detail[0]?.tenLoaiCongViec}`
            : "Loading..."}
        </h1>
        <div className="mt-4 w-11/12 mx-auto flex justify-between flex-wrap">
          <p className="text-gray-500 bg-gray-200 font-medium p-2 rounded-xl my-2">
            Minimalist logo design
          </p>
          <p className="text-gray-500 bg-gray-200 font-medium p-2 rounded-xl my-2">
            Email marketing
          </p>
          <p className="text-gray-500 bg-gray-200 font-medium p-2 rounded-xl my-2">
            NFT Promotion
          </p>
          <p className="text-gray-500 bg-gray-200 font-medium p-2 rounded-xl my-2">
            Convert Website to App
          </p>
          <p className="text-gray-500 bg-gray-200 font-medium p-2 rounded-xl my-2">
            Python Developer
          </p>
          <p className="text-gray-500 bg-gray-200 font-medium p-2 rounded-xl my-2">
            Audio Book Voiceover
          </p>
          <p className="text-gray-500 bg-gray-200 font-medium p-2 rounded-xl my-2">
            Video Games Composers
          </p>
          <p className="text-gray-500 bg-gray-200 font-medium p-2 rounded-xl my-2">
            English to Spanish Translations
          </p>
          <p className="text-gray-500 bg-gray-200 font-medium p-2 rounded-xl my-2">
            AI Content Editing
          </p>
          <p className="text-gray-500 bg-gray-200 font-medium p-2 rounded-xl my-2">
            Book and eBook Writing
          </p>
          <p className="text-gray-500 bg-gray-200 font-medium p-2 rounded-xl my-2">
            Architecture 3D Animation
          </p>
          <p className="text-gray-500 bg-gray-200 font-medium p-2 rounded-xl my-2">
            AMV
          </p>
          <p className="text-gray-500 bg-gray-200 font-medium p-2 rounded-xl my-2">
            Youtube Editor
          </p>
          <p className="text-gray-500 bg-gray-200 font-medium p-2 rounded-xl my-2">
            Cartoon Animation
          </p>
        </div>
      </div>
    </div>
  );
}
