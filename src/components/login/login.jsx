import { auth, provider } from '../firebase/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, setPersistence, browserSessionPersistence } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { LogOut } from '../LogOut/LogOut'
import '../login/login.css'



const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginComponent, setLoginComponent]=useState(false)
    const [registerComponent, setRegisterComponent]=useState(true)
    const navigate= useNavigate()

    //persistencia
    const signIn = async () => {
        try {
            await setPersistence(auth, browserSessionPersistence);
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/board')
        } catch (err) {
            console.error(err)
           
        }
    };


    const signUp = async () => {
        try {

            await createUserWithEmailAndPassword(auth, email, password)
        } catch (err) {
            console.error(err)
        }
    }

    const signInWithGoogle = async () => {
        try {

            await signInWithPopup(auth, provider)
        } catch (err) {
            console.error(err)
        }
    }

    const logOut = async () => {
        try {
            await signOut(auth)
            navigate('/')
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => { console.log('current user', auth?.currentUser?.email) }, [email])

    return (
        <div className='sign-container'>
           {registerComponent&& <div className='sign'>
                <h1>Register</h1>
                <input placeholder="correo" onChange={(e) => setEmail(e.target.value)}></input>
                <input placeholder="contraseña" onChange={(e) => setPassword(e.target.value)}></input>
                <button onClick={signUp}>Registrarme</button>
                <button onClick={signInWithGoogle}>Registrarme con google</button>
                <p> ¿Ya tienes una cuenta? <a onClick={()=>{setLoginComponent(true);setRegisterComponent(false)}}> Entra aquí</a> </p>
                
               
            </div>}
           { loginComponent&&<div className='sign'>
                <h1>Login</h1>
                <input placeholder="correo" onChange={(e) => setEmail(e.target.value)}></input>
                <input placeholder="contraseña" onChange={(e) => setPassword(e.target.value)}></input>
                <button onClick={signIn }>Entrar</button>
                <p> ¿No tienes una cuenta? <a onClick={()=>{setLoginComponent(false);setRegisterComponent(true)}}> Regístrate aquí</a> </p>
            </div>}
            {/* <Board/> */}
            <a href='/'>Inicio</a>
            <LogOut/>
        </div>
    )
}

export default Login

