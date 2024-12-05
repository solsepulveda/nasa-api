import { auth, provider } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "../login/login.css";
import { openNotificationError } from "../../utils/Notification";
import { NavBar } from '../NarBar/NavBar';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginComponent, setLoginComponent] = useState(false);
  const [registerComponent, setRegisterComponent] = useState(true);
  const navigate = useNavigate();

  // iniciar sesión con persistencia
  const signIn = async () => {
    try {
      if (email.length < 1 || password < 1) {
        return openNotificationError("Los campos no deben estar vacíos");
      }
      await setPersistence(auth, browserSessionPersistence);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      console.error(err);
      if (err.code === "auth/invalid-email") {
        openNotificationError("Email no existe");
      }
    }
  };

  // registrarse con persistencia
  const signUp = async () => {
    try {
      if (email.length < 1 || password < 1) {
        return openNotificationError("Los campos no deben estar vacíos");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        navigate("/");
      }
    } catch (err) {
      console.error(err);
       if (err.code === "auth/invalid-email") {
        openNotificationError("Email no existe");
      } 
    }
  };

  //ingresar con google
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log("current user", auth?.currentUser?.email);
  }, [email]);

  return (
    <>
    <NavBar/>
    <div className="sign-container">
      {registerComponent && (
        <div className="sign">
          <h1>Regístrate</h1>
          <input
            onKeyDown={(e) => setEmail(e.target.value)}
            placeholder="correo"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="password"
            placeholder="contraseña"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button onClick={signUp}>Registrarme</button>
          <button onClick={signInWithGoogle}>Entrar con google</button>
          <p>
            {" "}
            ¿Ya tienes una cuenta?{" "}
            <a
              onClick={() => {
                setLoginComponent(true);
                setRegisterComponent(false);
              }}
            >
              {" "}
              Entra aquí
            </a>{" "}
          </p>
        </div>
      )}
      {loginComponent && (
        <div className="sign">
          <h1>Login</h1>
          <input
            placeholder="correo"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="password"
            placeholder="contraseña"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button onClick={signIn}>Entrar</button>
          <button onClick={signInWithGoogle}>Entrar con google</button>
          <p>
            {" "}
            ¿No tienes una cuenta?{" "}
            <a
              onClick={() => {
                setLoginComponent(false);
                setRegisterComponent(true);
              }}
            >
              {" "}
              Regístrate aquí
            </a>{" "}
          </p>
        </div>
      )}
      {/* <Board/> */}
      
      
    </div>
    </>
  );
};

export default Login;
