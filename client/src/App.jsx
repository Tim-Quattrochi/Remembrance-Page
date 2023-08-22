import {
  ErrorBoundary,
  NavBar,
  ScrollToTop,
  Footer,
} from "./components";
import { LandingPage, NotFound404 } from "./pages";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  return (
    <ErrorBoundary>
      <div className="content-container">
        <NavBar />
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={true}
          pauseOnFocusLoss="false"
          draggable
          pauseOnHover
          theme="dark"
        />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
        <ScrollToTop />
      </div>
      <Footer />
    </ErrorBoundary>
  );
}

export default App;
