import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import LandingPage from "./pages/landing page/LandingPage";
import LoginSignupPage from "./pages/login signup page/Forms";
import DashboardPage from "./pages/DashboardPage";
import MyDeckPage from "./pages/MyDeck/MyDeckPage";
import SubtopicSelectionPage from "./pages/MyDeck/SubtopicSelectionPage";
import LessonAndChallengesPage from "./pages/Lesson and Challenges Page/LessonAndChallengesPage";
import "bootstrap/dist/css/bootstrap.min.css";

import Layout from "./components/Layout"; // Sidebar Wrapper

import { MyDeckProvider } from "./context/MyDeckContext"; // useContext

// Wrapper for pages that require a sidebar
function ProtectedRoutes({ children }) {
  return <Layout>{children}</Layout>;
}

function App() {
  return (
    <MyDeckProvider>
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
              path="/my-deck/:topicId"
              element={
                <ProtectedRoutes>
                  <SubtopicSelectionPage />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/my-deck/:topicId/:subtopicId"
              element={<LessonAndChallengesPage />}
            />
            <Route path="/chall" element={<LessonAndChallengesPage />} />
          </Routes>
        </Container>
      </Router>
    </MyDeckProvider>
  );
}

export default App;
