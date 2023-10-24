import React, { useEffect, useState } from "react";
import { UserLogContextProvider } from "./context";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import AppHome from "./Pages/AppHome";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import OwnerContact from "./Pages/OwnerContact";
import QRCodeGenerator from "./Pages/QRCodeGenerator";
import Signup from "./Pages/Signup";
import UserSavedQrCodeList from "./Pages/UserSavedQrCodeList";

export default function App() {
  const [userLog, setUserLog] = useState({});

  const toggleUserLog = (val) => {
    // first get previous values from existing state
    //Then create new ToDoObject
    // Create new Todo as an Object
    // Destructure current state object
    setUserLog((prev) => {
      return { ...prev, [userLog.isUserLoggedIn]: val };
    });
  };

  const updateLocalToken = (tokenFetched) => {
    setUserLog((prev) => {
      return { ...prev, [userLog.userLocalToken]: tokenFetched };
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("Token");
    console.log(token);
    if (token) {
      updateLocalToken(token);
      toggleUserLog(true);
    } else {
      updateLocalToken(null);
      toggleUserLog(false);
      return;
    }
  }, []);

  return (
    <>
      <UserLogContextProvider
        value={{ userLog, toggleUserLog, updateLocalToken }}
      >
        <Routes>
          <Route exact path="/" element={<AppHome />}>
            <Route index exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/Home" element={<Home />} />
            <Route
              exact
              path="/generatenewqrcodes"
              element={<QRCodeGenerator />}
            />
            <Route
              exact
              path="/savedqrcodes"
              element={<UserSavedQrCodeList />}
            />
            <Route exact path="/contact" element={<OwnerContact />} />
          </Route>
        </Routes>
      </UserLogContextProvider>
    </>
  );
}
