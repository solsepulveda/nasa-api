import { useEffect, useState } from "react";
import "../../App.css";
import Footer from "../footer";

import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase/firebase";
import { Link } from "react-router";

import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import {
  openNotificationSuccess,
  openNotificationRegistration,
} from "../../utils/Notification";
import { NavBar } from "../NarBar/NavBar";
import { LazyLoadImage } from "react-lazy-load-image-component";

function HomePage() {
  const [savedDate, setSavedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [selectedImage, setSelectedImage] = useState("");
  const [imageDate, setImageDate] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [counter, setCounter] = useState(0);
  const [video, setVideo] = useState("");
  const [type, setType] = useState("");
  const [spin, setSpin] = useState(false);

  const date = savedDate;
  const getAnyDay = () => {
    const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
    const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}&date=${date}&`;
    setSpin(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setSelectedImage(data.hdurl);
        setSelectedText(data.explanation);
        setImageDate(data.date);
        setVideo(data.url);
        setType(data.media_type);
        setSpin(false);
        /* console.log('cierta fecha', data); */ // Muestra los datos en la consola
      })
      .catch((error) => {
        console.error("Hubo un error al hacer el fetch:", error);
      });
  };

  useEffect(() => {
    getAnyDay();
  }, [savedDate]);

  const handleClickBack = () => {
    const today = new Date();

   /*  const today = new Date().toLocaleString('es-CL', {
      timeZone: 'America/Santiago',
    }); */
    // Calcula la fecha retrocediendo con base en el contador
    today.setDate(today.getDate() - (counter + 1));
    const formattedDate = today.toISOString().split("T")[0];
    setSavedDate(formattedDate);
    setCounter((prevCounter) => prevCounter + 1); // Actualiza el contador después
  };

  const handleClickNext = () => {
    const today = new Date();
    // Calcula la fecha avanzando con base en el contador
    today.setDate(today.getDate() - (counter - 1));
    const formattedDate = today.toISOString().split("T")[0];
    setSavedDate(formattedDate);
    setCounter((prevCounter) => prevCounter - 1); // Actualiza el contador después
  };

  useEffect(() => {
    console.log("current user", auth?.currentUser?.email);

  }, [selectedImage]);

  const todayDate = new Date().toISOString().split("T")[0];
  
  const pictureCollection = collection(db, "pictures");

  //Guardar en favoritos
  const addToFav = async () => {
    try {
      await addDoc(pictureCollection, {
        date: imageDate,
        explanation: selectedText,
        picture: selectedImage,
        userId: auth?.currentUser?.uid,
      });
      openNotificationSuccess("Se agregó a favoritos");
    } catch (err) {
      console.error(err);
      openNotificationRegistration();
    }
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <h1>Astronomy picture of the Day</h1>
        <div className="button-and-pic">
          {!spin && <ArrowLeftOutlined onClick={handleClickBack} />}
          {spin == true ? (
            <div className="spinner"></div>
          ) : (
            <div className="daily-image-container">
              {type == "image" ? (
                <a className="daily-image" href={selectedImage} target="_blank">
                  <LazyLoadImage
                    className="daily-image"
                    src={selectedImage}
                    effect="blur"
                  ></LazyLoadImage>
                </a>
              ) : (
                <iframe
                  className="daily-image"
                  width="560"
                  height="315"
                  src={video}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>
              )}
              <div className="fav-button">
                <a onClick={addToFav}>Guardar en favoritos </a>{" "}
                <HeartOutlined style={{ color: "#646cff" }} />
              </div>
              <p className="explanation">
                {imageDate} <br />
                {selectedText}
              </p>
            </div>
          )}
          {!spin && savedDate !== todayDate ? (
            <ArrowRightOutlined onClick={handleClickNext} />
          ) : (
            <span style={{ width: "1em" }} />
          )}
        </div>

        {auth.currentUser?.uid !== undefined && (
          <>
            <Link to="board">Ver imágenes guardadas</Link>
          </>
        )}
        <Footer></Footer>
      </div>
    </>
  );
}

export default HomePage;
