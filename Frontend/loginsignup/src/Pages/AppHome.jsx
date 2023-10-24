import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

import { LogContext } from "../context/index";

export default function AppHome() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const { userLog, toggleUserLog, userLocalToken } = useContext(LogContext);

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token) {
      setIsUserLoggedIn(true);
    } else {
      return;
    }
  }, [isUserLoggedIn]);

  return (
    <div className="headerContainer">
      <Navbar checkUserLog={isUserLoggedIn} logoutUser={setIsUserLoggedIn} />
      <div className="OutletContainer">
        <Outlet context={[setIsUserLoggedIn]} />
      </div>
    </div>
  );
}
