import { useReducer, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils.js/constants";
import axios from "../utils.js/axios";
import useAuthContext from "./useAuthContext";
const initialState = {
  isAuthenticated: null,
  user: null,
};

export const AuthContext = createContext({});
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

export function ProvideAuth({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useProvideAuth() {
  const { state, dispatch } = useAuthContext();
  let navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const res = await axios.post("/user/login", {
        email: email,
        password: password,
      });

      localStorage.setItem(
        "Remembrance-User",
        JSON.stringify(res.data)
      );
      dispatch({
        type: "LOGIN",
        payload: res.data,
      });
      return res;
    } catch (error) {
      console.log(error);
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw error;
      }
    }
  };

  const signup = async (e) => {
    try {
      e.preventDefault();
      window.open(
        `https://jerrykrikava.com${API_URL}/google`,
        "_self"
      );
    } catch (error) {
      console.log(error);
      if (error.response) {
        throw new Error(error.response);
      } else {
        throw error;
      }
    }
  };

  const signout = async (e) => {
    e.preventDefault();
    localStorage.removeItem("Remembrance-User");
    try {
      await axios.post("/logout");
      dispatch({ type: "LOGOUT" });
      localStorage.removeItem("Remembrance-User");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const res = await axios.get("/user");
      localStorage.setItem(
        "Remembrance-User",
        JSON.stringify(res.data)
      );
      dispatch({
        type: "GOOGLE_USER",
        payload: res.data,
      });
    } catch (error) {
      console.error(error);
      dispatch({ type: "LOGOUT" });
    }
  };

  useEffect(() => {
    let mounted = true;
    getUser();

    return () => {
      mounted = false;
    };
  }, []);

  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("Remembrance-User"));
  };

  useEffect(() => {
    const savedUser = getCurrentUser() || false;

    if (savedUser) {
      dispatch({ type: "LOGIN", payload: savedUser });
    } else {
      dispatch({ type: "LOGOUT" });
    }
  }, [dispatch]);

  return { getUser, state, getCurrentUser, signout, login, signup };
}
