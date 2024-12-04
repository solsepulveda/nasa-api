import "../NarBar/NavBar.css";
import { LogOut } from "../LogOut/LogOut";


export const NavBar = () => {
  return (
    <div className="navbar">
      <div className="left">
        <div>
          <a href="/">Inicio</a>
        </div>
      </div>
      <div className="right">
        <a href="/login">Ingresa aquí</a>
      </div>
      {/* <LogOut /> */}
    </div>
  );
};
