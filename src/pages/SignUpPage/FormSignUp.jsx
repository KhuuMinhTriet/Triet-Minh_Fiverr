import React from "react";
import { Form, Input, DatePicker, Checkbox, Radio } from "antd";
import { useDispatch } from "react-redux";
import { registerActionService } from "../../redux/userSlice";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

const FormSignUp = () => {
  let dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(registerActionService(values))
      .unwrap()
      .then(() => {
        Swal.fire("", "Registration successfully", "success");
      })
      .catch((err) => {
        Swal.fire("", "Registration fail", "error");
      });
  };

  return (
    <Form
      name="signUp"
      layout="vertical"
      onFinish={onFinish}
      style={{ width: 300 }}
      wrapperCol={{
        span: 24,
      }}
      autoComplete="off"
      className="my-10"
    >
      <div className="mx-auto mt-4">
        <h1 className="text-green-500 text-center text-3xl font-bold pb-8">
          SIGN UP TO FIVERR
        </h1>
      </div>
      <Form.Item
        name="name"
        rules={[{ required: true, message: "Account name can't be blank" }]}
      >
        <Input
          placeholder="Your account"
          className=" border-2 border-solid border-green-200"
        />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Email can't be blank" }]}
      >
        <Input
          placeholder="Your Email"
          className=" border-2 border-solid border-green-200"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Password can't be blank" }]}
      >
        <Input.Password
          placeholder="Password"
          className="border-2 border-solid border-green-200"
          style={{ "--placeholder-color": "black" }}
        />
      </Form.Item>
      <Form.Item
        name="cpassword"
        dependencies={["password"]}
        rules={[
          { required: true, message: "Please confirm your password!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Passwords do not match!"));
            },
          }),
        ]}
        validateTrigger={["onSubmit"]}
      >
        <Input.Password
          placeholder="Confirm password"
          className="border-2 border-solid border-green-200"
          style={{ "--placeholder-color": "black" }}
        />
      </Form.Item>

      <Form.Item
        name="phone"
        rules={[{ required: true, message: "Phone number can't be blank" }]}
      >
        <Input
          placeholder="Your phone number"
          className=" border-2 border-solid border-green-200"
        />
      </Form.Item>
      <Form.Item
        name="birthday"
        rules={[{ required: true, message: "Please set your date of birth" }]}
      >
        <DatePicker
          className=" border-2 border-solid border-green-200 w-full"
          placeholder="yyyy-MM-dd"
        />
      </Form.Item>

      <Form.Item
        name="gender"
        rules={[
          {
            required: true,
            message: "Please choose your gender",
          },
        ]}
      >
        <Radio.Group>
          <Radio value={true}>Male</Radio>
          <Radio value={false}>Female</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name="terms"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(
                    new Error("You need to agree with our Term of services")
                  ),
          },
        ]}
      >
        <Checkbox>
          I agree all statements in{" "}
          <span>
            <a href="" className="text-green-500 font-medium">
              Terms of service
            </a>
          </span>
        </Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          span: 24,
        }}
      >
        <button className="bg-green-500 hover:bg-green-700 font-medium text-white w-full py-2 rounded-lg">
          JOIN US
        </button>
      </Form.Item>
      <span className="font-semibold">
        Already a member?{""}
        <NavLink
          to="/login"
          className="text-green-500 hover:text-green-700   ml-2"
        >
          Sign in now
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

export default FormSignUp;
