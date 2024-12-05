import "../NarBar/NavBar.css";
import { LogOut } from "../LogOut/LogOut";
import { auth } from '../firebase/firebase'



export const NavBar = () => {


  return (
    <div className="navbar">
      <div className="left">
        <div>
          <a href="/">Inicio</a>
        </div>
      </div>
      <div className="right">
        {auth.currentUser?.uid == undefined &&<a href="/login">Ingresa aquí</a>}
      {<LogOut />}
      </div>
    </div>
  );
};
