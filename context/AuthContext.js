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

  // const handleError = (message) => {
  //     const errors = [];
  //     Object.keys(message).map((key) => {
  //         message[key].map((e) => {
  //             errors.push(e)
  //         })
  //     })
  //     return errors.join();
  // }

  // Register user
  const register = async (user) => {
    setError(null);
    setLoading(true);

    const res = await axios("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: user,
    });

    const data = await res.data;

    if (res.status === 200) {
      setLoading(false);
      router.push("/auth/login");
    } else {
      setError(/*handleError*/ data.message);
      setLoading(false);
    }
  };

  // Login user
  const login = async (user) => {
    setError(null);
    setLoading(true);

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
      setError(/*handleError*/ data.message);
      setLoading(false);
    }
  };

  // Logout user
  const logout = async () => {
    setError(null);

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
      setError(/*handleError*/ data.message);
    }
  };

  // Check if user logged in
  const checkUserLoggedIn = async () => {
    setError(null);

    const res = await axios("/api/auth/me", {
      method: "GET",
    });
    const data = await res.data;

    if (res.status === 200) {
      setUser(data.user);
    } else {
      setUser(null);
      setError(/*handleError*/ data.message);
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
