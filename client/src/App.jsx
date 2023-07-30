import {
  UnderConstruction,
  ErrorBoundary,
  NavBar,
  ScrollToTop,
  Footer,
  GoogleLoginBtn,
  CreatePost,
  ImageWall,
} from "./components";
import { LandingPage, NotFound404, Login, Register } from "./pages";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useProvideAuth } from "./hooks/useAuthProvider";

function App() {
  const {
    state: { user },
  } = useProvideAuth();

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
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pictures" element={<ImageWall />} />

          <Route path="/guest-book" element={<CreatePost />} />

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
