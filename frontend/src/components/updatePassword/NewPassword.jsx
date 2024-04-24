import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { RxEyeOpen } from "react-icons/rx";
import { RiEyeCloseLine } from "react-icons/ri";
import Layout from "../Layout/index";
import { GlobalContext } from "../../context/Context";

function NewPassword() {
  const { userInfo } = useContext(GlobalContext);
  const [password, setPassword] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState();

  const navigate = useNavigate();
  const handleNewPassword = async (e) => {
    e.preventDefault();
    if (!password || !newPass || !confirmNewPass) {
      setError("All fields are required");
      return;
    }
    if (newPass !== confirmNewPass) {
      setError("Your password doesn't match");
      return;
    }

    const response = await axios.post("http://localhost:4000/updatePassword", {
      password,
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

  useEffect(() => {
    if (userInfo === null || !userInfo) {
      navigate("/login");
    }
  });
  return (
    <Layout>
      <div className="h-[100vh] flex items-center justify-center flex-col">
        <div className="px-6 py-10 flex flex-col gap-5 bg-[#ffffff14] rounded-lg  w-[340px] border-2 border-slate-300">
          <h1 className="text-2xl mb-2 text-center text-slate-800 font-bold">
            Update your Password
          </h1>
          <div className="flex flex-col gap-2 ">
            <label className="text-slate-800 " htmlFor="Email">
              Enter your current password
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
            <label className="text-slate-800 " htmlFor="secret">
              Enter your New password
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
          <div className="flex flex-col gap-2  outline-blue-900">
            <label className="text-slate-700 text-[18px]" htmlFor="password">
              Confirm Password
            </label>
            <div className="flex items-center justify-center bg-white rounded-lg  outline-blue-800  py-2 px-4 border border-slate-500">
              <input
                type={`${showPass ? "text" : "password"}`}
                className="rounded-lg border-none outline-none w-full"
                value={confirmNewPass}
                onChange={(e) => {
                  setConfirmNewPass(e.target.value);
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
    </Layout>
  );
}

export default NewPassword;
