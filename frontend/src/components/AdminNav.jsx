// AdminNavbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./nav.module.css";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/adminlogin");
  };
  return (
    <nav
      className={`flex justify-between items-center flex-col h-[100vh] my-auto bg-slate-400 px-5 py-10`}
    >
      <div className={styles.logo}>
        <Link
          to="/admin-Dashboard"
          className={`text-2xl w-full font-bold text-slate-900`}
        >
          Dashboard
        </Link>
      </div>
      <div className={`flex items-center justify-between flex-col gap-6`}>
        <Link
          to="/adminproducts"
          className={`text-lg font-semibold text-slate-800`}
        >
          Products
        </Link>
        <Link
          to="/adminusers"
          className={`text-lg font-semibold text-slate-800`}
        >
          Users
        </Link>
      </div>
      <div className={`text-slate-800 font-semibold`}>
        Welcome
        <span className="font-bold font-serif text-slate-900">
          {localStorage.getItem("name")}
        </span>
      </div>
      <button
        onClick={handleLogout}
        className="border border-slate-800 text-slate-950 font-bold rounded-md px-4 py-2"
      >
        Logout
      </button>
    </nav>
  );
};

export default AdminNavbar;
