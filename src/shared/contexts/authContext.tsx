import { FC, createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import userService from "../../services/user-service";
import jwtDecode from "jwt-decode";

type Decode_Token = {
  loginName: string;
  role: number;
};

export const AuthContext = createContext({
  token: "",
});

export const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  const checkLogin = () => {
    const token = JSON.stringify(localStorage.getItem("token") ?? "");
    if (userService.isLoggedIn()) {
      try {
        const decode_token = jwtDecode<Decode_Token>(token);
      } catch (error) {
        navigate("/");
        localStorage.removeItem("token");
      }
    } else {
      navigate("/");
    }
  };
  useEffect(() => {
    checkLogin();
  }, [location.pathname]);

  return (
    <AuthContext.Provider value={{ token }}>{children}</AuthContext.Provider>
  );
};
