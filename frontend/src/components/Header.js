import React, { useContext } from "react";
import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/Context";
function Header() {
  const navigate = useNavigate();
  const { userInfo } = useContext(GlobalContext);
  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="flex justify-between items-center px-6 py-4 h-auto w-full border-b-2 border-slate-300">
      <div className="flex items-center justify-center">
        <Link to={"/"} className="text-2xl font-bold text-blue-500 font-serif">
          Painters
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <ul className="flex items-center justify-between gap-8">
          <Link
            to={"/cart"}
            className="flex gap-1 items-center justify-center hover:text-blue-500 cursor-pointer text-lg"
          >
            <span>
              <AiOutlineShoppingCart />
            </span>
            <p>Cart</p>
          </Link>
          <Link
            to={"/profile"}
            className="flex gap-1 items-center justify-center hover:text-blue-500 cursor-pointer text-lg"
          >
            <span>
              <AiOutlineUser />
            </span>
            <p>{!userInfo || userInfo === null ? "Guest" : userInfo?.name}</p>
          </Link>
          <div className="flex gap-1 items-center justify-center hover:text-blue-500 cursor-pointer text-lg">
            {userInfo === null || !userInfo ? (
              <Link
                to={"/login"}
                className="px-2 py-1 border border-blue-500 rounded-lg"
              >
                Login
              </Link>
            ) : (
              <span
                className="px-2 py-1 border border-blue-500 rounded-lg"
                onClick={() => {
                  handleLogout();
                }}
              >
                Logout
              </span>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
}

export default Header;
