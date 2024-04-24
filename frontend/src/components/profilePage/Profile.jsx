import React, { useContext, useEffect } from "react";
import Layout from "../Layout/index";
import { FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/Context";

function Profile() {
  const navigate = useNavigate();
  const { userInfo } = useContext(GlobalContext);
  console.log(userInfo);
  useEffect(() => {
    if (userInfo === null || !userInfo) {
      navigate("/login");
    }
  });
  return (
    <Layout>
      <div className="container max-w-6xl mx-auto flex justify-center items-center mt-10 flex-col gap-5 w-full">
        <h1 className="text-2xl font-serif font-semibold mb-10">
          Profile Details
        </h1>
        <div className="flex flex-col w-1/2 gap-8 border border-slate-400 rounded-lg px-6 py-3 mb-10">
          <div className="flex flex-col w-full justify-between">
            <div className="flex w-full justify-between">
              <p className="font-bold text-xl">Name</p>
              <Link
                to={"/updateProfile"}
                className="px-4 py-2 rounded-lg hover:text-red-500 hover:bg-white"
              >
                <FaEdit />
              </Link>
            </div>
            <div>
              <h1>{userInfo?.name}</h1>
            </div>
          </div>
          <div className="flex flex-col w-full justify-between">
            <div className="flex w-full justify-between">
              <p className="font-bold text-xl">Email</p>
            </div>
            <div>
              <h1>{userInfo?.email}</h1>
            </div>
          </div>
          <div className="flex flex-col w-full justify-between">
            <div className="flex w-full justify-between">
              <p className="font-bold text-xl">Mobile Number</p>
            </div>
            <div>
              <h1>
                {userInfo?.mobile?.length > 0 ? userInfo?.mobile : "--------"}
              </h1>
            </div>
          </div>
          <div className="flex flex-col w-full justify-between">
            <div className="flex w-full justify-between">
              <p className="font-bold text-xl">Password</p>
            </div>
            <div>
              <h1>*******</h1>
            </div>
          </div>
          <div className="flex flex-col w-full justify-between">
            <div className="flex w-full justify-between">
              <p className="font-bold text-xl">Secret</p>
            </div>
            <div>
              <h1>{userInfo?.secret}</h1>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
