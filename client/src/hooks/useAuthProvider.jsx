import {
  useReducer,
  useEffect,
  createContext,
  useCallback,
} from "react";
import { API_URL, ENV } from "../utils.js/constants";
import axios from "../utils.js/axios";
import { logError } from "../helpers/logErrors";
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

// eslint-disable-next-line react/prop-types
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

  const login = async (email, password) => {
    if (!email || !password) {
      throw new Error(`please fill in email and password`);
    }

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
      logError(error);
      if (error.response) {
        //I did notice that the error is coming as error here but as message in register.
        throw new Error(error.response.data.error);
      } else {
        throw error;
      }
    }
  };

  const signup = async (name, email, password, confirmPassword) => {
    const userData = { name, email, password, confirmPassword };
    try {
      const register = await axios.post("/user/register", userData);

      dispatch({
        type: "LOGIN",
        payload: register.data,
      });
      localStorage.setItem(
        "Remembrance-User",
        JSON.stringify(register.data)
      );
      const { token } = register.data;
      return token;
    } catch (error) {
      logError(error);
      if (error.response) {
        throw new Error(
          error.response.data.message || error.response.data.error
        );
      } else {
        throw error;
      }
    }
  };

  const signupWithGoogle = async (e) => {
    e.preventDefault();
    const devUrl = "http://localhost:5173";
    const prodUrl = "https://jerrykrikava.com";

    try {
      window.open(
        `${ENV === "production" ? prodUrl : devUrl}${API_URL}/google`,
        "_self"
      );
    } catch (error) {
      logError(error);
      if (error.response) {
        throw new Error(error.response.data.message);
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
    } catch (error) {
      logError(error);
    }
  };

  const getUser = useCallback(async () => {
    try {
      const res = await axios.get("/user");

      localStorage.setItem(
        "Remembrance-User",
        JSON.stringify(res.data)
      );
      dispatch({
        type: "LOGIN",
        payload: res.data,
      });
    } catch (error) {
      logError(error);
    }
  }, [dispatch]);

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
  }, [dispatch, getUser]);

  return {
    state,
    getCurrentUser,
    signout,
    login,
    signup,
    signupWithGoogle,
    getUser,
  };
}
