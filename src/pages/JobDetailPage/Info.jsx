import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { fiverrService } from "../../services/fetchAPI";
import { Flex, Progress } from "antd";
import Comments from "./Comments";
import StickyBox from "react-sticky-box";

export default function Info() {
  const [detail, setDetail] = useState(null);
  const [activeFAQ, setActiveFAQ] = useState(null);
  let params = useParams();

  //đóng mở FAQ
  let toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  let renderDetail = () => {
    if (!detail || !detail.content) {
      return <p>{detail ? "No data found" : "Loading..."}</p>;
    }

    return (
      <div className="flex justify-between">
        <div className="w-3/5 my-3">
          <div>
            {detail.content.map((info) => (
              <div key={info.id}>
                <div>
                  <h1 className="text-3xl font-medium ">
                    {info.congViec?.tenCongViec}
                  </h1>
                  <div className="flex items-center justify-between my-6">
                    <div className="flex items-center">
                      <img
                        src={info.avatar || "https://via.placeholder.com/40"}
                        className="max-w-10 max-h-10 rounded-3xl"
                        alt=""
                      />
                      <p className="mx-4 font-medium">{info.tenNguoiTao}</p>
                    </div>
                    <div className="flex items-center">
                      <p className="mx-4 font-medium">
                        Level {""}
                        {info.congViec?.saoCongViec}
                      </p>
                      {star(info.congViec?.saoCongViec)}
                      <p className="mx-4 flex items-center">
                        <span className="text-yellow-500 mr-2 font-bold">
                          {info.congViec?.saoCongViec}
                        </span>
                        <span>({info.congViec?.danhGia})</span>
                      </p>
                      <p className="text-gray-600 font-medium mx-4">
                        5 order in queue
                      </p>
                    </div>
                  </div>
                  <div className="overflow-hidden">
                    <img
                      src={info.congViec?.hinhAnh}
                      className="w-full hover:scale-110 transition duration-300"
                      alt=""
                    />
                  </div>
                  <h2 className="font-bold text-xl my-6">About this Gig</h2>
                  <p className="text-gray-600 tracking-wide leading-7 text-lg mb-6">
                    {info.congViec?.moTa}
                  </p>
                </div>

                <div className="border-t border-gray-300">
                  <h1 className="text-xl font-bold mt-10 mb-4">
                    Get to know {info.tenNguoiTao}
                  </h1>
                  <div className="flex items-center gap-8">
                    <img
                      src={info.avatar}
                      className="max-w-36 max-h-36 rounded-full"
                      alt=""
                    />
                    <div>
                      <p className="text-lg font-medium">{info.tenNguoiTao}</p>
                      <p className="text-gray-600">{info.tenChiTietLoai}</p>
                      <div className="flex items-center gap-4 mt-2 mb-6">
                        {star(info.congViec?.saoCongViec)}
                        <span className="text-yellow-500 font-bold">
                          {info.congViec?.saoCongViec}
                        </span>
                        ({info.congViec?.danhGia})
                      </div>
                      <button className="rounded-lg bg-white text-green-500 border border-green-500 hover:bg-green-500 hover:text-white transition duration-300 px-6 py-2">
                        Contact me
                      </button>
                    </div>
                  </div>

                  <div>{faq()}</div>

                  <div>
                    {reviews(
                      info.congViec?.danhGia,
                      info.congViec?.saoCongViec
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* gọi component comment ở đây */}
            <Comments />
          </div>
        </div>

        <div className="w-2/6">
          <StickyBox offsetTop={200}>
            <div className="border border-gray-300 mt-6">
              <div className="text-center font-medium text-2xl border-b-black border-b p-4">
                Basic pack
              </div>
              <div className="p-4">
                {detail.content.map((info) => (
                  <div key={info.id}>
                    <p className="text-2xl font-medium">
                      US${info.congViec?.giaTien}
                    </p>
                    <p className="font-medium">
                      Save up to 10% with{" "}
                      <span className="text-green-500 hover:cursor-pointer">
                        Subscribe to Save
                      </span>
                    </p>
                    <p className="my-4 text-gray-600">
                      {info.congViec?.moTaNgan}
                    </p>

                    <div className="flex">
                      <div className="flex items-center mr-6">
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/109/109613.png"
                          alt=""
                          className="max-w-4"
                        />
                        <p className="mx-2">7-days Delivery</p>
                      </div>
                      <div className="flex items-center">
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/1250/1250694.png"
                          alt=""
                          className="max-w-4"
                        />
                        <p className="mx-2">Unlimited Revisions</p>
                      </div>
                    </div>

                    <div className="my-4">
                      <p className="flex items-center">
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/14034/14034688.png"
                          alt=""
                          className="max-w-5 mx-4"
                        />
                        Good feature
                      </p>
                      <p className="flex items-center">
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/14034/14034688.png"
                          alt=""
                          className="max-w-5 mx-4"
                        />
                        Good feature
                      </p>
                      <p className="flex items-center">
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/14034/14034688.png"
                          alt=""
                          className="max-w-5 mx-4"
                        />
                        Good feature
                      </p>
                    </div>

                    <div className="font-medium text-center">
                      <button className="w-full rounded-lg bg-green-500 text-white py-2">
                        Continue (US${info.congViec?.giaTien})
                      </button>
                      <button className="w-full text-green-500 bg-transparent py-2">
                        Compare packages
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </StickyBox>
        </div>
      </div>
    );
  };

  //thể hiện số sao dựa trên đánh giá
  let star = (num) => {
    switch (num) {
      case 1: {
        return (
          <div className="flex gap-1">
            <img
              src="https://cdn-icons-png.flaticon.com/512/12709/12709532.png"
              alt=""
              className="max-w-8"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/8367/8367768.png"
              alt=""
              className="max-w-8"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/8367/8367768.png"
              alt=""
              className="max-w-8"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/8367/8367768.png"
              alt=""
              className="max-w-8"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/8367/8367768.png"
              alt=""
              className="max-w-8"
            />
          </div>
        );
      }
      case 2: {
        return (
          <div className="flex gap-1">
            <img
              src="https://cdn-icons-png.flaticon.com/512/12709/12709532.png"
              alt=""
              className="max-w-8"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/12709/12709532.png"
              alt=""
              className="max-w-8"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/8367/8367768.png"
              alt=""
              className="max-w-8"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/8367/8367768.png"
              alt=""
              className="max-w-8"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/8367/8367768.png"
              alt=""
              className="max-w-8"
            />
          </div>
        );
      }
      case 3: {
        return (
          <div className="flex gap-1">
            <img
              src="https://cdn-icons-png.flaticon.com/512/12709/12709532.png"
              alt=""
              className="max-w-8"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/12709/12709532.png"
              alt=""
              className="max-w-8"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/12709/12709532.png"
              alt=""
              className="max-w-8"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/8367/8367768.png"
              alt=""
              className="max-w-8"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/8367/8367768.png"
              alt=""
              className="max-w-8"
            />
          </div>
        );
      }
      case 4: {
        return (
          <div className="flex gap-1">
            <img
              src="https://cdn-icons-png.flaticon.com/512/12709/12709532.png"
              alt=""
              className="max-w-8"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/12709/12709532.png"
              alt=""
              className="max-w-8"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/12709/12709532.png"
              alt=""
              className="max-w-8"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/12709/12709532.png"
              alt=""
              className="max-w-8"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/8367/8367768.png"
              alt=""
              className="max-w-8"
            />
          </div>
        );
      }
      case 5: {
        return (
          <div className="flex gap-1">
            <img
              src="https://cdn-icons-png.flaticon.com/512/12709/12709532.png"
              alt=""
              className="max-w-10"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/12709/12709532.png"
              alt=""
              className="max-w-10"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/12709/12709532.png"
              alt=""
              className="max-w-10"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/12709/12709532.png"
              alt=""
              className="max-w-10"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/12709/12709532.png"
              alt=""
              className="max-w-10"
            />
          </div>
        );
      }
      default: {
        return (
          <div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/12709/12709532.png"
              alt=""
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/12709/12709532.png"
              alt=""
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/12709/12709532.png"
              alt=""
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/12709/12709532.png"
              alt=""
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/12709/12709532.png"
              alt=""
            />
          </div>
        );
      }
    }
  };

  //mục faq cố định
  let faq = () => {
    return (
      <div className="max-w-full p-4">
        <h2 className="text-xl font-bold mt-10 mb-6">FAQ</h2>
        <div className="space-y-4">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="border-b pb-2">
                <button
                  className="w-full flex justify-between items-center text-left text-lg font-medium text-gray-600 tracking-wide focus:outline-none"
                  onClick={() => toggleFAQ(index)}
                >
                  There are many passages but the majority?
                  <span
                    className={`transform transition-transform duration-300 ${
                      activeFAQ === index ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    ▼
                  </span>
                </button>
                <div
                  className={`mt-4 text-gray-600 transition-max-height duration-300 overflow-hidden ${
                    activeFAQ === index ? "max-h-screen my-2" : "max-h-0"
                  }`}
                >
                  Voluptates amet earum velit nobis aliquam laboriosam nihil
                  debitis facere voluptatibus consectetur quae quasi fuga, ad
                  corrupti libero omnis sapiente non assumenda, incidunt
                  officiis eaque iste minima autem.
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  };

  //mục reviews
  let reviews = (reviewAmount, starAmount) => {
    return (
      <div>
        <h1 className="text-xl font-bold my-5">Reviews</h1>
        <div className="flex justify-between items-center">
          <p className="text-lg font-medium">
            {reviewAmount} reviews for this Gig
          </p>
          <div className="flex items-center">
            {star(starAmount)}
            <span className="mx-2 text-lg text-yellow-500 font-bold">
              {starAmount}
            </span>
          </div>
        </div>
        <div className="flex">
          <div className="w-1/2 pr-2">
            <ul>
              <li className="flex items-center">
                <button className="text-lg font-medium text-green-500 hover:text-green-600 hover:bg-gray-100 rounded-lg p-1">
                  5 stars
                </button>
                <Flex gap="small" vertical>
                  <Progress
                    showInfo={false}
                    percent={((reviewAmount - 5) / reviewAmount) * 100}
                    className="w-64 mx-6"
                    strokeColor="green"
                  />
                </Flex>
                <p>({reviewAmount - 5})</p>
              </li>
              <li className="flex items-center">
                <button className="text-lg font-medium text-green-500 hover:text-green-600 hover:bg-gray-100 rounded-lg p-1">
                  4 stars
                </button>
                <Flex gap="small" vertical>
                  <Progress
                    showInfo={false}
                    percent={(3 / reviewAmount) * 100}
                    className="w-64 mx-6"
                    strokeColor="green"
                  />
                </Flex>
                <p>(3)</p>
              </li>
              <li className="flex items-center">
                <button className="text-lg font-medium text-green-500 hover:text-green-600 hover:bg-gray-100 rounded-lg p-1">
                  3 stars
                </button>
                <Flex gap="small" vertical>
                  <Progress
                    showInfo={false}
                    percent={(1 / reviewAmount) * 100}
                    className="w-64 mx-6"
                    strokeColor="green"
                  />
                </Flex>
                <p>(1)</p>
              </li>
              <li className="flex items-center">
                <button className="text-lg font-medium text-green-500 hover:text-green-600 hover:bg-gray-100 rounded-lg p-1">
                  2 stars
                </button>
                <Flex gap="small" vertical>
                  <Progress
                    showInfo={false}
                    percent={(1 / reviewAmount) * 100}
                    className="w-64 mx-6"
                    strokeColor="green"
                  />
                </Flex>
                <p>(1)</p>
              </li>
              <li className="flex items-center">
                <button className="text-lg font-medium text-green-500 hover:text-green-600 hover:bg-gray-100 rounded-lg p-1">
                  1 stars
                </button>
                <Flex gap="small" vertical>
                  <Progress
                    showInfo={false}
                    percent={0}
                    className="w-64 mx-6"
                    strokeColor="green"
                  />
                </Flex>
                <p>(0)</p>
              </li>
            </ul>
          </div>
          <div className="w-1/2 pl-2 text-lg font-medium">
            <p className="my-1">Rating Breakdown</p>
            <ul>
              <li className="flex justify-between">
                <p className="text-gray-400 my-1">Seller communication level</p>
                <span className="text-yellow-500">{starAmount}</span>
              </li>
              <li className="flex justify-between">
                <p className="text-gray-400 my-1">Recommend to a friend</p>
                <span className="text-yellow-500">{starAmount}</span>
              </li>
              <li className="flex justify-between">
                <p className="text-gray-400 my-1">Service as described</p>
                <span className="text-yellow-500">{starAmount}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    fiverrService
      .layCongViecChiTiet(params.id)
      .then((result) => {
        const data = result?.data || {};
        setDetail(data);
      })
      .catch((err) => {
        setDetail({ content: [] });
      });
  }, [params.id]);

  return <div>{renderDetail()}</div>;
}
