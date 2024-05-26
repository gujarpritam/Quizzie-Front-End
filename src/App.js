import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserAuthPage from "./pages/UserAuthPage/UserAuthPage";
import HomePage from "./pages/HomePage/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import QuizPage from "./pages/QuizPage/QuizPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserAuthPage />} />
        <Route path="/home" element={<ProtectedRoute Component={HomePage} />} />
        <Route path="/quiz/:id" element={<QuizPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
