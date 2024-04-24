import React from "react";
import AdminNavbar from "../AdminNav";
import Dashboard from "../Dashboard";

function AdminDashboard() {
  return (
    <div className="flex">
      <div className="w-[20%] bg-slate-400">
        <AdminNavbar className="w-full" />
      </div>
      <div className="w-[80%] bg-[#f4f4f4] h-auto px-5">
        <Dashboard />
      </div>
    </div>
  );
}

export default AdminDashboard;
