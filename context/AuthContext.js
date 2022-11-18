import { createContext, useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const handleError = (message) => {
    const errors = [];
    Object.keys(message).map((key) => {
      message[key].map((e) => {
        errors.push(e);
      });
    });
    return errors.join();
  };

  // Register user
  const register = async (user) => {
    setError(null);
    setLoading(true);
    try {
      const res = await axios("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: user,
      });
      const data = await res.data;
      if (res.status === 201) {
        setLoading(false);
        router.push("/");
      } else {
        console.log(data);
        setLoading(false);
      }
    } catch (error) {
      setError(handleError(error.response.data.message));
      setLoading(false);
    }
  };

  // Login user
  const login = async (user) => {
    setError(null);
    setLoading(true);
    try {
      const res = await axios("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: user,
      });

      const data = await res.data;

      if (res.status === 200) {
        setUser(data.user);
        setLoading(false);
        router.push("/");
      } else {
        console.log(data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError(handleError(error.response.data.message));
    }
  };

  // Logout user
  const logout = async () => {
    setError(null);

    try {
      const res = await axios("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: user,
      });

      const data = await res.data;

      if (res.status === 200) {
        setUser(null);
        router.push("/");
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error.response.data);
      setError(handleError(error.response.data));
    }
  };

  // Check if user logged in
  const checkUserLoggedIn = async () => {
    setError(null);

    try {
      const res = await axios("/api/auth/me", {
        method: "GET",
      });
      const data = await res.data;

      if (res.status === 200) {
        setUser(data.user);
      } else {
        setUser(null);
        console.log(data);
      }
    } catch (error) {
      setUser(null);
      setError(handleError(error.response.data));
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, error, loading, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
