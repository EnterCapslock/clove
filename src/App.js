import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginSignupPage from "./pages/login signup page/LoginSignupPage";
import LandingPage from "./pages/landing page/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import MyDeckPage from "./pages/MyDeckPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/LoginSignupPage" element={<LoginSignupPage />} />
          <Route path="/DashboardPage" element={<DashboardPage />} />
          <Route path="/MyDeckPage" element={<MyDeckPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
