import React from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        history("/home");
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
          <div className="flex flex-col items-center py-4">
            <label className="text-4xl text-white font-semibold">Login</label>
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
                Login
              </button>
              <div className="text-white flex flex-col items-center">
                <div className="text-white flex flex-col items-center">
                  Don't have an account?{" "}
                  <a className="underline" href="/signup">
                    Signup!
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
