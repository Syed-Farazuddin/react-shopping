/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { RiEyeCloseLine } from "react-icons/ri";
import { RxEyeOpen } from "react-icons/rx";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [secret, setSecret] = useState("");
  const [error, setError] = useState();
  const [showPass, setShowPass] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password || !secret || !name) {
      setError("All fields are required");
      return;
    }
    const response = await axios.post("http://localhost:4000/register", {
      name: name,
      email: email,
      password: password,
      secret: secret,
    });
    // console.log(response);
    const { data } = response;
    console.log(data);
    if (data.success) {
      navigate("/login");
    } else {
      setError(data.message);
    }
  };
  return (
    <div className="flex items-center justify-center h-[120vh] flex-col loginContainer">
      <div className="flex fixed top-0 right-0 left-0  py-4 px-6 justify-between items-center">
        <Link
          to={"/"}
          className="flex items-center justify-end text-white cursor-pointer"
        >
          <span className="text-4xl font-serif text-slate-950">Painters</span>
        </Link>
        <Link to={"/login"} className="flex text-white gap-4">
          <p className="text-slate-800">Already have an Account ?</p>
          <span className="hover:underline cursor-pointer text-slate-900 font-semibold">
            Sign in
          </span>
        </Link>
      </div>

      <div className="px-6 py-10 flex flex-col gap-5 bg-[#ffffff14] rounded-lg  w-[340px]  border-2 border-slate-300">
        <h1 className="text-3xl text-center text-slate-700 font-bold">
          Sign up
        </h1>
        <div className="flex flex-col gap-2 ">
          <label className="text-slate-700" htmlFor="Email">
            Username
          </label>
          <input
            type="email"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            className="px-4 py-2 rounded-lg border outline-blue-900 border-slate-500"
          />
        </div>
        <div className="flex flex-col gap-2 ">
          <label className="text-slate-700" htmlFor="Email">
            Email address
          </label>
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            className="px-4 py-2 rounded-lg border outline-blue-900 border-slate-500"
          />
        </div>
        <div className="flex flex-col gap-2">
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

        <div className="flex flex-col gap-2 ">
          <label className="text-slate-700" htmlFor="Email">
            Enter your secret key
          </label>
          <input
            type="text"
            onChange={(e) => {
              setSecret(e.target.value);
            }}
            value={secret}
            className="px-4 py-2 rounded-lg border outline-blue-900 border-slate-500"
          />
        </div>

        <button
          className="px-4 py-2 w-full rounded-lg text-black bg-slate-200"
          onClick={(e) => {
            handleSignIn(e);
          }}
        >
          Sign Up
        </button>
      </div>
      <div className="flex gap-2 text-slate-800 mt-4">
        <span>Note:</span>
        <p>Your secret is used to recover your password</p>
      </div>
      <div className="errorMessages mt-5 uppercase">
        <p className="h-5 text-red-500">{error}</p>
      </div>
    </div>
  );
}
