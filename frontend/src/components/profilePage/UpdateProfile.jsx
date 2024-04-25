import React, { useContext, useState } from "react";
import { RiEyeCloseLine } from "react-icons/ri";
import { RxEyeOpen } from "react-icons/rx";
import { Link } from "react-router-dom";
import Layout from "../Layout/index";
import { GlobalContext } from "../../context/Context";
import axios from "axios";

function UpdateProfile() {
  const { userInfo } = useContext(GlobalContext);
  const [name, setName] = useState(userInfo?.name);
  const [email, setEmail] = useState(userInfo?.email);
  const [password, setPassword] = useState(userInfo?.password);
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [mobile, setMobile] = useState(userInfo?.mobile);
  const [secret, setSecret] = useState(userInfo?.secret);
  const handleUpdateProfile = async () => {
    if (!password) {
      setError("Password is required to update your fields");
      return;
    }
    const response = await axios.put(
      "http://localhost:4000/updateProfile",
      {
        email,
        password,
        mobile,
        secret,
        name,
      },
      {
        Headers: { Authorization: localStorage.getItem("token") },
      }
    );
    console.log(response);
  };

  return (
    <Layout>
      <div className="flex items-center justify-center h-auto flex-col loginContainer">
        <div className="px-6 py-10 flex flex-col gap-5 bg-[#ffffff14] rounded-lg  w-[340px] border-2 border-slate-300 mt-10">
          <h1 className="text-3xl text-center text-slate-800 font-bold">
            Update profile
          </h1>
          <div className="flex flex-col gap-2 ">
            <label className="text-slate-800 " htmlFor="Email">
              Username
            </label>
            <input
              type="email"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
              className="px-4 py-2 rounded-lg border border-slate-500 outline-blue-900"
            />
          </div>
          <div className="flex flex-col gap-2 ">
            <label className="text-slate-800 " htmlFor="Email">
              Email address
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
            <label className="text-slate-800 " htmlFor="Email">
              Mobile Number
            </label>
            <input
              type="email"
              onChange={(e) => {
                setMobile(e.target.value);
              }}
              value={mobile}
              className="px-4 py-2 rounded-lg border border-slate-500 outline-blue-900"
            />
          </div>
          <div className="flex flex-col gap-2 ">
            <label className="text-slate-800 " htmlFor="Email">
              Secret key
            </label>
            <input
              type="email"
              onChange={(e) => {
                setSecret(e.target.value);
              }}
              value={secret}
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
          <Link to={"/change-password"}>Change your password?</Link>
          <button
            className="px-4 py-2 w-full bg-green-700 rounded-lg text-white"
            onClick={() => {
              handleUpdateProfile();
            }}
          >
            Update Profile
          </button>
        </div>
        <div className="errorMessages mt-5 uppercase">
          <p className="h-5 text-red-500">{error}</p>
        </div>
      </div>
    </Layout>
  );
}

export default UpdateProfile;
