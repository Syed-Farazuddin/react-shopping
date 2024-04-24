import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { RxEyeOpen } from "react-icons/rx";
import { RiEyeCloseLine } from "react-icons/ri";
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [secret, setSecret] = useState("");
  const [newPass, setNewPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState();

  const navigate = useNavigate();
  const handleNewPassword = async (e) => {
    e.preventDefault();
    if (!email || !newPass) {
      setError("All fields are required");
      return;
    }
    const response = await axios.post("http://localhost:4000/login", {
      email,
      newPass,
    });
    const { data } = response;
    console.log(data);
    if (data.success) {
      navigate("/login");
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="h-[100vh] flex items-center justify-center flex-col">
      <div className="flex fixed top-0 right-0 left-0  py-4 px-6 justify-between items-center ">
        <Link
          to={"/"}
          className="flex items-center justify-end text-white cursor-pointer"
        >
          <span className="text-4xl font-serif text-slate-950">Painters</span>
        </Link>
        <Link to={"/register"} className="flex text-white gap-4">
          <p className="text-slate-800">Don't have an Account ?</p>
          <span className="hover:underline cursor-pointer text-slate-900 font-semibold">
            Sign up
          </span>
        </Link>
      </div>
      <div className="px-6 py-10 flex flex-col gap-5 bg-[#ffffff14] rounded-lg  w-[340px] border-2 border-slate-300">
        <h1 className="text-2xl mb-2 text-center text-slate-800 font-bold">
          Forgot Password
        </h1>
        <div className="flex flex-col gap-2 ">
          <label className="text-slate-800 " htmlFor="Email">
            Enter your email address
          </label>
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            className="px-4 py-2 rounded-lg border border-slate-500 outline-blue-900"
          />
        </div>
        <div className="flex flex-col gap-2 ">
          <label className="text-slate-800 " htmlFor="secret">
            Enter your Secret Key
          </label>
          <input
            type="text"
            onChange={(e) => {
              setSecret(e.target.value);
            }}
            value={secret}
            className="px-4 py-2 rounded-lg border border-slate-500 outline-blue-900"
          />
        </div>
        <div className="flex flex-col gap-2  outline-blue-900">
          <label className="text-slate-700 text-[18px]" htmlFor="password">
            Create Password
          </label>
          <div className="flex items-center justify-center bg-white rounded-lg  outline-blue-800  py-2 px-4 border border-slate-500">
            <input
              type={`${showPass ? "text" : "password"}`}
              className="rounded-lg border-none outline-none w-full"
              value={newPass}
              onChange={(e) => {
                setNewPass(e.target.value);
              }}
            />
            <p
              className="text-slate-900 cursor-pointer"
              onClick={() => {
                setShowPass((prev) => !prev);
              }}
            >
              {showPass ? (
                <>
                  <RxEyeOpen />
                </>
              ) : (
                <>
                  <RiEyeCloseLine />
                </>
              )}
            </p>
          </div>
        </div>
        <Link to={"/forgot-password"}>Forgot your password?</Link>
        <button
          className="px-4 py-2 w-full bg-green-700 rounded-lg text-white"
          onClick={(e) => handleNewPassword(e)}
        >
          Create new password
        </button>
      </div>
      <div className="errorMessages mt-5 uppercase">
        <p className="h-5 text-red-500">{error}</p>
      </div>
    </div>
  );
}

export default ForgotPassword;
