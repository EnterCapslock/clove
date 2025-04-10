import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import LandingPage from "./pages/landing page/LandingPage";
import LoginSignupPage from "./pages/login signup page/Forms";
import DashboardPage from "./pages/DashboardPage";
import ProgressPage from "./pages/ProgressPage";
import MyDeckPage from "./pages/MyDeck/MyDeckPage";
import PreAssessmentPage from "./components/PreAssessment";
import AssessmentResultPage from "./components/AssessmentResult";
import SubtopicSelectionPage from "./pages/MyDeck/SubtopicSelectionPage";
import LessonsPage from "./pages/Lesson and Challenges Page/LessonsPage";
import TrainingPage from "./pages/Lesson and Challenges Page/TrainingPage";
import ChallengesPage from "./pages/Lesson and Challenges Page/ChallengesPage";
import ResultsPage from "./pages/Lesson and Challenges Page/ResultsPage";
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
              path="/progress"
              element={
                <ProtectedRoutes>
                  <ProgressPage />
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
              path="/my-deck/:topicId/pre-assessment"
              element={
                <ProtectedRoutes>
                  <PreAssessmentPage />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/my-deck/:topicId/pre-assessment/result"
              element={
                <ProtectedRoutes>
                  <AssessmentResultPage />
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
              path="/lesson/:topicId/:subtopicId"
              element={
                <ProtectedRoutes>
                  <LessonsPage />
                </ProtectedRoutes>
              }
            />

            <Route
              path="/lesson/:topicId/:subtopicId/training"
              element={
                <ProtectedRoutes>
                  <TrainingPage />
                </ProtectedRoutes>
              }
            />

            <Route
              path="/lesson/:topicId/:subtopicId/challenges"
              element={
                <ProtectedRoutes>
                  <ChallengesPage />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/my-deck/:topicId/:subtopicId/results"
              element={
                <ProtectedRoutes>
                  <ResultsPage />
                </ProtectedRoutes>
              }
            />
          </Routes>
        </Container>
      </Router>
    </MyDeckProvider>
  );
}

export default App;
