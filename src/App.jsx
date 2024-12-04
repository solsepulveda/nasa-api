import HomePage from './components/HomePage/HomePage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Login from "./components/login/login"
import Board from "./components/Board/Board";
import { NavBar } from './components/NarBar/NavBar';


function App() {
return(
  <>
  <NavBar/>
<Router>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<Login/>} />
    <Route path="/board" element={<Board/>} />
  </Routes>
</Router>
  </>


)
}

export default App
