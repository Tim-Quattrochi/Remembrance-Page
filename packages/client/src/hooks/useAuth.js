import {
  useReducer,
  useEffect,
  useContext,
  createContext,
} from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils.js/constants";
import axios from "../utils.js/axios";

const initialState = {
  isAuthenticated: null,
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GOOGLE_USER":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case "LOGOUT":
      window.localStorage.removeItem("Remembrance-User");
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

const authContext = createContext();

export function ProvideAuth({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <authContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(authContext);
};

export function useProvideAuth() {
  const { state, dispatch } = useAuth();
  let navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const res = await axios.post("/users/login", {
        email: email,
        password: password,
      });

      localStorage.setItem(
        "Remembrance-User",
        JSON.stringify(res.data)
      );
      dispatch({
        type: "GOOGLE_USER",
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
    window.localStorage.clear("Remembrance-User");
    try {
      await axios.post("/logout");

      dispatch({ type: "LOGOUT" });
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
    const savedUser =
      JSON.parse(localStorage.getItem("Remembrance-User")) || false;

    if (savedUser) {
      dispatch({ type: "GOOGLE_USER", payload: savedUser });
    } else {
      dispatch({ type: "LOGOUT" });
    }
  }, []);

  return { getUser, state, getCurrentUser, signout, login, signup };
}
