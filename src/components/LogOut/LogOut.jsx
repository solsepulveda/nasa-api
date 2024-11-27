import { auth, } from '../firebase/firebase'
import { signOut,  } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import '../login/login.css'


export const LogOut=()=>{
    const navigate= useNavigate()

    const logOut = async () => {
        try {
            await signOut(auth)
            navigate('/')
        } catch (err) {
            console.error(err)
        }
    }

    return(
        <>
        {auth.currentUser?.uid !== undefined &&<a onClick={logOut}>Cerrar sesión</a>}
        </>
    )
}