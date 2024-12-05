import HomePage from "./components/HomePage/HomePage";
import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import Login from "./components/login/login";
import Board from "./components/Board/Board";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/board" element={<Board />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
