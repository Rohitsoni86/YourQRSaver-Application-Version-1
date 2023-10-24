import React, { createContext, useContext } from "react";

export const LogContext = createContext({
  userLog: {
    isUserLoggedIn: false,
    userLocalToken: null,
  },
  //Functions That Controls Object

  toggleUserLog: (value) => {},
  updateLocalToken: (userToken) => {},
});

export const UserLogContextProvider = LogContext.Provider;
