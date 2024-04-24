import React, { useContext, useState } from "react";
import styles from "./dashboard.module.css";
import { GlobalContext } from "../context/Context";
import { BiTrash } from "react-icons/bi";
import axios from "axios";

const Dashboard = () => {
  const handleUserDelete = (id) => {
    axios.post("", { id });
  };
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      registeredOn: "2022-04-20",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      registeredOn: "2022-04-21",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice@example.com",
      registeredOn: "2022-04-22",
    },
  ];

  const { product } = useContext(GlobalContext);

  console.log("dashboard");
  return (
    <div>
      {/* <AdminNavbar /> */}
      <div className={`${styles.section} ml-5`}>
        <h2 className={"font-bold text-2xl mb-4"}>Users</h2>
        <div className={styles.cardContainer}>
          {users.map((user) => (
            <div key={user.id} className={styles.card}>
              <div className="flex items-center justify-between">
                <h3>{user.name}</h3>
                <span
                  className="text-slate-900 cursor-pointer bg-white rounded-full p-2 font-bold"
                  onClick={() => {
                    handleUserDelete(user.id);
                  }}
                >
                  {/* <BiTrash /> */}
                  Delete
                </span>
              </div>
              <p>{user.email}</p>
              <p className={styles.registeredOn}>
                Registered on: {user.registeredOn}
              </p>
            </div>
          ))}
          <div className={`${styles.card} ${styles.seeMore}`}>
            <p>See More</p>
          </div>
        </div>
      </div>
      <div className={styles.section}>
        <h2 className={"font-bold text-2xl mb-4"}>Products</h2>
        <div className={styles.cardContainer}>
          {product.map((i) => (
            <div key={i.id} className={styles.card}>
              <div>
                <h3 className="font-semibold">{i.name}</h3>
                <p>Price: ${i.price}</p>
              </div>
              <div className="w-1/2">
                <img src={i.url} alt="" />
              </div>
            </div>
          ))}
          <div className={`${styles.card} ${styles.seeMore}`}>
            <p>See More</p>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Dashboard;
