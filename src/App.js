// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing page/LandingPage";
import LoginSignupPage from "./pages/login signup page/Forms";
import DashboardPage from "./pages/DashboardPage";
import MyDeckPage from "./pages/MyDeckPage";
import TopicDetail from "./pages/TopicDetail";

// The Layout that wraps routes that need a sidebar
import Layout from "./components/Layout";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Pages WITHOUT sidebar */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login-signup" element={<LoginSignupPage />} />

          {/* Pages WITH sidebar: wrap them in Layout */}
          <Route
            path="/dashboard"
            element={
              <Layout>
                <DashboardPage />
              </Layout>
            }
          />
          <Route
            path="/my-deck"
            element={
              <Layout>
                <MyDeckPage />
              </Layout>
            }
          />
          <Route path="/topic/:topicId" element={<Layout><TopicDetail /></Layout>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
