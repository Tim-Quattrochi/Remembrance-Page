import LandingPage from "./pages/LandingPage";
import ErrorBoundary from "./components/ErrorBoundary";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import CreatePost from "./components/CreatePost";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ImageWall from "./components/ImageWall";
import NotFound404 from "./pages/NotFound404";
import { useProvideAuth } from "./hooks/useAuth";
import UnderConstruction from "./components/UnderConstruction";
import GoogleLoginBtn from "./components/GoogleLoginBtn";

function App() {
  const {
    state: { user },
  } = useProvideAuth();

  console.log(user);
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
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<GoogleLoginBtn />} />
          <Route path="/login" element={<GoogleLoginBtn />} />
          <Route path="/pictures" element={<ImageWall />} />
          user ?
          <Route path="/guest-book" element={<CreatePost />} />
          :
          <Route path="/login" element={<GoogleLoginBtn />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
        <ScrollToTop />
        <Footer />
      </ErrorBoundary>
    </div>
  );
}

export default App;
