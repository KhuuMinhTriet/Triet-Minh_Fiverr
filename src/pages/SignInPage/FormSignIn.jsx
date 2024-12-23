import React from "react";
import { Form, Input } from "antd";
import { NavLink, useNavigate  } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleLogin } from "./SigninRequest" // Import hàm xử lý đăng nhập

const FormLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinishNew = async (values) => {
    try {
      await handleLogin(values, dispatch, navigate);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    alert("Something is wrong");
  };

  return (
    <Form
      name="basic"
      layout="vertical"
      style={{ width: 300 }}
      wrapperCol={{
        span: 24,
      }}
      onFinish={onFinishNew}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div className="mx-auto mt-20 mb-4">
        <h1 className="text-green-500 text-center text-3xl font-bold pb-8">
          SIGN IN TO FIVERR
        </h1>
      </div>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Email can't be blank",
          },
        ]}
      >
        <Input
          placeholder="Your email"
          className="border-2 border-solid border-green-200"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Password can't be blank",
          },
        ]}
      >
        <Input.Password
          placeholder="Password"
          className="border-2 border-solid border-green-200"
          style={{ "--placeholder-color": "black" }}
        />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          span: 24,
        }}
      >
        <button className="bg-green-500 hover:bg-green-700 font-medium text-white w-full py-2 rounded-lg">
          SIGN IN
        </button>
      </Form.Item>
      <span className="font-semibold">
        Don't have an account yet?{" "}
        <NavLink
          to="/register"
          className="text-green-500 hover:text-green-700   ml-2"
        >
          Join us now!
        </NavLink>
      </span>
      <style>
        {`
        .ant-input::placeholder, .ant-input-password input::placeholder {
          color: var(--placeholder-color);
        }
      `}
      </style>
    </Form>
  );
};

export default FormLogin;
