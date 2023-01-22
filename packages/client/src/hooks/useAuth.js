import {
  useReducer,
  useEffect,
  useContext,
  createContext,
} from "react";
import { useNavigate } from "react-router-dom";
import axios from "../hooks/useAxios";

const initialState = {
  isAuthenticated: null,
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case "LOGOUT":
      localStorage.clear();
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

  const signup = async (name, email, password, confirmPassword) => {
    try {
      await axios.post("/users", {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      });
      return await login(email, password);
    } catch (error) {
      console.log(error);
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw error;
      }
    }
  };

  const signout = (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };
  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("Remembrance-User"));
  };

  useEffect(() => {
    const savedUser =
      JSON.parse(localStorage.getItem("Remembrance-User")) || false;

    if (savedUser) {
      dispatch({ type: "LOGIN", payload: savedUser });
    } else {
      dispatch({ type: "LOGOUT" });
    }
  }, [dispatch]);

  return { state, getCurrentUser, signout, login, signup };
}
