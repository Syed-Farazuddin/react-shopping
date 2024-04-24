/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { RiEyeCloseLine } from "react-icons/ri";
import { RxEyeOpen } from "react-icons/rx";

export default function LoginPage() {
  const [email, setName] = useState("");
  const [error, setError] = useState();
  const [showPass, setShowPass] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("All fields are required");
      return;
    }
    const response = await axios.post("http://localhost:4000/login", {
      email,
      password,
    });
    const { data } = response;
    console.log(data);
    if (data.success) {
      localStorage.setItem("auth", JSON.stringify(data?.user));
      localStorage.setItem("token", data?.user?.token);
      navigate("/");
    } else {
      setError(data.message);
    }
  };
  return (
    <div className="flex items-center justify-center h-[100vh] flex-col loginContainer">
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
            Sign In
          </span>
        </Link>
      </div>

      <div className="px-6 py-10 flex flex-col gap-5 bg-[#ffffff14] rounded-lg  w-[340px] border-2 border-slate-300">
        <h1 className="text-3xl text-center text-slate-800 font-bold">
          Sign in
        </h1>
        <div className="flex flex-col gap-2 ">
          <label className="text-slate-800 " htmlFor="Email">
            Username or email address
          </label>
          <input
            type="email"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={email}
            className="px-4 py-2 rounded-lg border border-slate-500 outline-blue-900"
          />
        </div>
        <div className="flex flex-col gap-2  outline-blue-900">
          <label className="text-slate-700 text-[18px]" htmlFor="password">
            Password
          </label>
          <div className="flex items-center justify-center bg-white rounded-lg  outline-blue-800  py-2 px-4 border border-slate-500">
            <input
              type={`${showPass ? "text" : "password"}`}
              className="rounded-lg border-none outline-none w-full"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
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
          className="px-4 py-2 w-full bg-slate-200 rounded-lg text-slate-950"
          onClick={handleSignIn}
        >
          Sign In
        </button>
      </div>
      <div className="errorMessages mt-5 uppercase">
        <p className="h-5 text-red-500">{error}</p>
      </div>
    </div>
  );
}
