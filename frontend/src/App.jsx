import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing-page/LandingPage";
import LoginSignupPage from "./pages/login-signup-page/Forms";
import DashboardPage from "./pages/DashboardPage";
import MyDeckPage from "./pages/MyDeckPage";
import TopicSelectionPage from "./pages/TopicSelectionPage";
import SubtopicSelectionPage from "./pages/SubtopicSelectionPage";
import GameChallengePage from "./pages/GameChallengePage"
import PreAssessmentPage from "./components/PreAssessment";
import PostAssessmentPage from "./components/PostAssessment";
import Layout from "./components/Layout";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* No sidebar pages */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login-signup" element={<LoginSignupPage />} />
          <Route path="/topic-selection" element={<TopicSelectionPage />} />

          {/* Pages with sidebar */}
          <Route path="/dashboard" element={<Layout><DashboardPage /></Layout>} />
          <Route path="/my-deck" element={<Layout><MyDeckPage /></Layout>} />
          <Route path="/topic/:topicId/pre-assessment" element={<Layout><PreAssessmentPage /></Layout>} />
          <Route path="/topic/:topicId/subtopics" element={<Layout><SubtopicSelectionPage /></Layout>} />
          <Route path="/topic/:topicId/subtopic/:subtopicId/challenge" element={<Layout><GameChallengePage /></Layout>} />
          <Route path="/topic/:topicId/post-assessment" element={<Layout><PostAssessmentPage /></Layout>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
