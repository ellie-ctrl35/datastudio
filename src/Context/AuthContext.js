import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [userRequests, setUserRequests] = useState([]);

  const Login = (email, password) => {
    try {
      return axios.post("http://localhost:8080/login", { email, password })
        .then((res) => {
          console.log(res);
          const { email, role, token, username, id } = res.data;
          const UserInfo = { email, role, username, id, };
          console.log('The userInfo:', UserInfo);
          setUserInfo(UserInfo);
          setUserToken(token);
          localStorage.setItem("userInfo", JSON.stringify(UserInfo));
          localStorage.setItem("userToken", token);
          return res.status;
        })
        .catch((error) => {
          console.error("Login error from infoContext", error);
          setLoading(false);
          throw error;
        });
    } catch (error) {
      console.log("error from frontend")
    }
  };

  // Helper function to clear user info and token
  const clearUserInfo = () => {
    setUserToken(null);
    setUserInfo(null);
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userToken");
  };

  const register = (username, email, password, phone, role, comAssociate, lat, long) => {
    return axios.post("http://localhost:4000/register", { username, email, password, phone, role, comAssociate, lat, long })
      .then(res => res.status === 200 && console.log("Registration successful"))
      .catch(error => console.error("Registration error in InfoContext", error));
  };

  const logout = () => {
    setLoading(true);
    clearUserInfo();
    setLoading(false);
  };

  const isLogged = () => {
    const storedUserInfo = localStorage.getItem("userInfo");
    const storedToken = localStorage.getItem("userToken");
    if (storedUserInfo && storedToken) {
      setUserInfo(JSON.parse(storedUserInfo));
      setUserToken(storedToken);
    }
    setLoading(false);
  };

  useEffect(() => { isLogged() }, []);

  return (
    <AuthContext.Provider value={{ Login, logout, isLoading, userToken, userInfo, userRequests, register, isLogged }}>
      {children}
    </AuthContext.Provider>
  );
};
