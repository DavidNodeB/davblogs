import React from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/home");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <>
      <div className="w-screen h-screen bg-gradient-to-b from-slate-800 to-slate-900 flex items-center justify-center font-sans">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="bg-slate-800 rounded-md px-12"
        >
          <div className="form-control flex items-center flex-col py-4">
            <label className="text-4xl text-white font-semibold">Signup</label>
            <div className="input-field flex flex-col gap-10 py-6">
              <input
                className="py-1 px-2 bg-gray-600 text-white rounded-sm focus:outline-none"
                type="text"
                name="email"
                required
                placeholder="Email or Username"
              />
              <input
                className="py-1 px-2 bg-gray-600 text-white rounded-sm focus:outline-none"
                type="password"
                name="password"
                required
                placeholder="Password"
              />
              <button
                className="text-white bg-slate-700 p-1 rounded-sm"
                type="submit"
              >
                Create account
              </button>
              <div className="text-white flex flex-col items-center">
                <div className="text-white flex flex-col items-center">
                  Have an account?{" "}
                  <a className="underline" href="/">
                    Login!
                  </a>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
