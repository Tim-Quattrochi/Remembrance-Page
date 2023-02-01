import Register from "./components/Register";
import Login from "./components/Login";
import LandingPage from "./pages/LandingPage";
import ErrorBoundary from "./components/ErrorBoundary";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import Protected from "./components/Protected";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import CreatePost from "./components/CreatePost";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ImageWall from "./components/ImageWall";
import NotFound404 from "./pages/NotFound404";
import UnderConstruction from "./components/UnderConstruction";
import axios from "axios";
import { useState, useEffect } from "react";
import { useProvideAuth } from "./hooks/useAuth";

import GoogleLoginBtn from "./components/GoogleLoginBtn";
function App() {
  const {
    state: { user },
    getUser,
  } = useProvideAuth();

  // useEffect(() => {
  //   getUser();
  // }, []);

  // useEffect(() => {
  //   axios
  //     .get("/api/user")
  //     .then((res) => {
  //       setUser(res.data);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }, []);

  // const getUser = async () => {
  //   try {
  //     const url = `${process.env.REACT_APP_API_URL}/users/login/success`;
  //     const { data } = await axios.get(url, {
  //       withCredentials: true,
  //     });
  //     console.log(data);
  //     setUser(data.user._json);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   getUser();
  // }, []);

  return (
    <div className="content-container">
      <ErrorBoundary>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={true}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <NavBar />
        <UnderConstruction />
        <Routes>
          <Route path="/fb" element={<GoogleLoginBtn />} />

          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<GoogleLoginBtn />} />
          <Route path="/login" element={<GoogleLoginBtn />} />
          <Route path="/pictures" element={<ImageWall />} />
          <Route path="/guest-book" element={<Protected />}>
            <Route path="/guest-book" element={<CreatePost />} />
          </Route>
          {/* <Route path="*" element={<NotFound404 />} /> */}
        </Routes>
        <ScrollToTop />
        <Footer />
      </ErrorBoundary>
    </div>
  );
}

export default App;
