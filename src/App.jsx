import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import LandingPage from "./pages/landing page/LandingPage";
import LoginSignupPage from "./pages/login signup page/Forms";
import DashboardPage from "./pages/DashboardPage";
import MyDeckPage from "./pages/MyDeck/MyDeckPage";
import TopicDetailsPage from "./pages/MyDeck/TopicDetailsPage";
import Layout from "./components/Layout"; // Sidebar Wrapper
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap styles

// Wrapper for pages that require a sidebar
function ProtectedRoutes({ children }) {
  return <Layout>{children}</Layout>;
}

function App() {
  return (
    <Router>
      <Container fluid className="app-container p-0 m-0">
        <Routes>
          {/* Public Pages (No Sidebar) */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login-signup" element={<LoginSignupPage />} />

          {/* Protected Pages (With Sidebar) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes>
                <DashboardPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/my-deck"
            element={
              <ProtectedRoutes>
                <MyDeckPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/topic/:topicId"
            element={
              <ProtectedRoutes>
                <TopicDetailsPage />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
