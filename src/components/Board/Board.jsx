
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from '../firebase/firebase'
import { useEffect, useState } from 'react'
import '../Board/Board.css'
import { Link } from "react-router";
import { LogOut } from "../LogOut/LogOut";

const Board = () => {

    const [readPic, setReadPic] = useState([])
    const pictureCollection = collection(db, "pictures")

    useEffect(() => {
        const read = async () => {
            try {
                const data = await getDocs(pictureCollection)
                const filteredData = data.docs.map(
                    (doc) => ({ ...doc.data(), id: doc.id })
                )
                setReadPic(filteredData)
                console.log('filtered', filteredData)
                console.log(data?.docs, 'data')
            } catch (err) {
                console.error(err)
            }
        }

        read()
    }, [])

    const deleteFav = async (id) => {
        try{const deleteCollection = doc(db, "pictures",id)
        console.log(id)
        await deleteDoc(deleteCollection)
        setReadPic((prev) => prev.filter((item) => item.id !== id)); //esta línea la copié de chatgpt
    }catch(err){
        console.error(err)
    }
    }

    useEffect(() => { console.log('current user que es esto', auth?.currentUser?.uid) }, [readPic])


    return (
        <>
            <h1>Board</h1>
            <div className="board">
                {readPic.map((item) => (
                    auth.currentUser?.uid === item.userId && (
                        <div className="pic-container" key={item.id}>
                            <img className="saved-picture" src={item.picture} alt={`Imagen del ${item.date}`} />
                            <p>Fecha: {item.date}</p>
                            {/* <p>Explicación: {item.explanation}</p> */}
                            <a onClick={()=>deleteFav(item.id)} style={{ fontSize: '10px' }}>Eliminar</a>
                        </div>
                    )
                ))}
            </div>
            <Link to='/'>Inicio</Link>
            <LogOut/>
        </>
    )
}

export default Board