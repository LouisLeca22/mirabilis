import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Loading from "../../components/Loading/Loading";
import MailList from "../../components/MailList/MailList";
import Navbar from "../../components/Navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";
import "./single.css";
import Reserve from "../../components/Reserve/Reserve";

function Single({ type }) {
  const navigate = useNavigate();
  const [slideIndex, setSlideIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const handleOpen = (index) => {
    setOpen(true);
    setSlideIndex(index);
  };

  useEffect(() => {
    (open || modal) &&
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          setOpen(false);
          setModal(false);
        }
      });
  }, [open, modal]);

  const handleArrow = (direction) => {
    if (direction === "left") {
      if (slideIndex === 0) {
        setSlideIndex(data.photos.length - 1);
      } else {
        setSlideIndex((prev) => prev - 1);
      }
    } else {
      if (slideIndex === data.photos.length - 1) {
        setSlideIndex(0);
      } else {
        setSlideIndex((prev) => prev + 1);
      }
    }
  };

  const { data, loading, error } = useFetch(`/${type}/find/${id}`);
  const { destination, dates, options } = useContext(SearchContext);
  const { user } = useContext(AuthContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate);

  const handleClick = () => {
    if (user) {
      setModal(true);
    } else {
      navigate("/login");
    }
  };
  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        <Loading />
      ) : (
        <>
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleArrow("left")}
              />
              <div className="sliderWrapper">
                <img
                  src={data.photos[slideIndex]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                onClick={() => handleArrow("right")}
                icon={faCircleArrowRight}
                className="arrow"
              />
            </div>
          )}
          <div className="singleContainer">
            <div className="singleWrapper">
              <h1 className="singleTitle">{data.name}</h1>
              <div className="singleAddress">
                <FontAwesomeIcon icon={faLocationDot} />
                <span>{data.address}</span>
              </div>
              <div className="singleDistance">
                {!type === "flights" && (
                  <span>Bien ubicado - {data.distance}m del centro</span>
                )}
              </div>
              <div className="singlePriceHighLight">
                <span>Disponibilidad limitada para tus fechas</span>
              </div>
              <div className="singleImages">
                {data.photos.map((photo, index) => (
                  <div key={index} className="singleImgWrapper">
                    <img
                      onClick={() => handleOpen(index)}
                      src={photo}
                      alt=""
                      className="singleImg"
                    />
                  </div>
                ))}
              </div>
              <div className="singleDetails">
                <div className="singleDetailsTexts">
                  <h1 className="singleTitle">{data.title}</h1>
                  <p className="singleDesc">{data.desc}</p>
                </div>
                {type === "hotels" && (
                  <div className="singleDetailsPrice">
                    <h1>¡Ideal para estancias de {days} noches!</h1>
                    <span>
                      Este alojamiento está en el corazón de {data.city}
                    </span>
                    <h2>
                      <b>{days * options.rooms * data.cheapestPrice}€</b> (
                      {days} noches)
                    </h2>
                    <button onClick={handleClick}>Reserva ahora</button>
                  </div>
                )}
              </div>
              {type === "flights" && (
                  <div className="singleDetailsPrice" style={{ width:"200px", marginTop: "20px"}}>
                    <h1>¡Ideal para vaijes de {days} dias!</h1>
                    <h2>
                      <b>{data.cheapestPrice}€</b>
                    </h2>
                    <button onClick={handleClick}>Reserva ahora</button>
                  </div>
                )}

              {type === "cars" && (
                     <div className="singleDetailsPrice">
                     <h1>¡Ideal para estancias de {days} días!</h1>
                     <span>
                       Se puede alquiler este coche en el centro de {data.city}
                     </span>
                     <h2>
                       <b>{days * data.cheapestPrice}€</b> (
                       {days} días)
                     </h2>
                     <button onClick={handleClick}>Reserva ahora</button>
                   </div>
              )}
            </div>
            <MailList />
          </div>
          <Footer />
        </>
      )}
      {modal && <Reserve setModal={setModal} ressourceId={id} />}
    </div>
  );
}

export default Single;
