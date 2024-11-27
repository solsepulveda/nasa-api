import HomePage from "./components/homepage/homepage"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Login from "./components/login/login"
import Board from "./components/Board/Board";


function App() {
return(
<Router>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<Login/>} />
    <Route path="/board" element={<Board/>} />
  </Routes>
</Router>


)
}

export default App
