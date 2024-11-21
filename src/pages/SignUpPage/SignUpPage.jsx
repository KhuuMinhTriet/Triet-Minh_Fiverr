import React from "react";
import FormSignUp from "./FormSignUp";
import signUp from "./sign-up.jpg";

export default function SignUpPage() {
  return (
    <div className="mt-28 mb-6 flex justify-center py-10 w-2/3 mx-auto">
      <div className="w-2/5">
        <FormSignUp />
      </div>
      <img src={signUp} alt="" className="w-3/5" />
    </div>
  );
}
