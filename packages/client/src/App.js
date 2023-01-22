import Register from "./components/Register";
import Login from "./components/Login";
import LandingPage from "./pages/LandingPage";
import ErrorBoundary from "./components/ErrorBoundary";
import NavBar from "./components/NavBar";
import { useProvideAuth } from "./hooks/useAuth";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import CreatePost from "./components/CreatePost";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ImageWall from "./components/ImageWall";

function App() {
  const {
    state: { user },
  } = useProvideAuth();

  console.log(user);

  return (
    <div className="content-container">
      <ErrorBoundary>
        <ToastContainer />
        <NavBar />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/post" element={<CreatePost />} />
          <Route path="/pictures" element={<ImageWall />} />
        </Routes>
        <ScrollToTop />
        <Footer />
      </ErrorBoundary>
    </div>
  );
}

export default App;
