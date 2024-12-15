import React from "react";
import FormSignIn from "./FormSignIn";
import signIn from "./sign-in.png";

export default function SignInPage() {
  return (
    <div className="mt-28 mb-6 flex justify-center py-10 w-2/3 mx-auto max-lg:shadow-green-300 max-lg:rounded-lg max-lg:shadow-lg">
      <img src={signIn} alt="" className="max-lg:hidden lg:w-3/5" />
      <div className="lg:w-2/5">
        <FormSignIn />
      </div>
    </div>
  );
}
