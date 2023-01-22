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

function App() {
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

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pictures" element={<ImageWall />} />
          <Route path="/guest-book" element={<Protected />}>
            <Route path="/guest-book" element={<CreatePost />} />
          </Route>
        </Routes>
        <ScrollToTop />
        <Footer />
      </ErrorBoundary>
    </div>
  );
}

export default App;
