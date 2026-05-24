import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

// create context
const AuthContext = createContext();

// provider
export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );

  const [loading, setLoading] = useState(true);

  // ─────────────────────────────────────────────
  // LOGIN
  // ─────────────────────────────────────────────
  const login = async (email, password) => {

    try {

      const response = await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      const data = response.data;

      // save token
      localStorage.setItem(
        "token",
        data.token
      );

      setToken(data.token);

      setUser(data.user);

      return {
        success: true,
      };

    } catch (error) {

      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Login failed",
      };
    }
  };

  // ─────────────────────────────────────────────
  // REGISTER
  // ─────────────────────────────────────────────
  const register = async (formData) => {

    try {

      const response = await api.post(
        "/auth/register",
        formData
      );

      return {
        success: true,
        data: response.data,
      };

    } catch (error) {

      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Registration failed",
      };
    }
  };

  // ─────────────────────────────────────────────
  // LOGOUT
  // ─────────────────────────────────────────────
  const logout = () => {

    localStorage.removeItem("token");

    setToken(null);

    setUser(null);
  };

  // ─────────────────────────────────────────────
  // GET CURRENT USER
  // ─────────────────────────────────────────────
  const getCurrentUser = async () => {

    try {

      const response = await api.get(
        "/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data.user);

    } catch (error) {

      console.log(error);

      logout();

    } finally {

      setLoading(false);
    }
  };

  // ─────────────────────────────────────────────
  // AUTO LOGIN IF TOKEN EXISTS
  // ─────────────────────────────────────────────
  useEffect(() => {

    if (token) {

      getCurrentUser();

    } else {

      setLoading(false);
    }

  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};