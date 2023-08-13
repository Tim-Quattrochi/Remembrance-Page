import {
  useReducer,
  useEffect,
  createContext,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils.js/constants";
import axios from "../utils.js/axios";
import useAuthContext from "./useAuthContext";

const initialState = {
  isAuthenticated: null,
  user: null,
};

//For google pop up
// window.open(
//   `https://jerrykrikava.com${API_URL}/google`,
//   "_self"
// );

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
      console.log(error);
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
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  // const getUser = useCallback(async () => {
  //   try {
  //     const res = await axios.get("/user");
  //     localStorage.setItem(
  //       "Remembrance-User",
  //       JSON.stringify(res.data)
  //     );
  //     dispatch({
  //       type: "LOGIN",
  //       payload: res.data,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     dispatch({ type: "LOGOUT" });
  //   }
  // }, [dispatch]);

  // useEffect(() => {
  //   getUser();
  // }, [getUser]);

  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("Remembrance-User"));
  };

  useEffect(() => {
    const savedUser = getCurrentUser() || false;
    console.log("fire");
    if (savedUser) {
      dispatch({ type: "LOGIN", payload: savedUser });
    } else {
      dispatch({ type: "LOGOUT" });
    }
  }, [dispatch]);

  return { state, getCurrentUser, signout, login, signup };
}
