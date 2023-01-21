import Register from "./components/Register";
import Login from "./components/Login";
import LandingPage from "./pages/LandingPage";
import ErrorBoundary from "./components/ErrorBoundary";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import CreatePost from "./components/CreatePost";
import Footer from "./components/Footer";

function App() {
  return (
    <ErrorBoundary>
      <ToastContainer />
      <NavBar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post" element={<CreatePost />} />
      </Routes>
      <Footer />
    </ErrorBoundary>
  );
}

export default App;
