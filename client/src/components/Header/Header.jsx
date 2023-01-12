import { faBed, faCar, faPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useState} from "react";
import HomeSearch from "../HomeSearch/HomeSearch";


import "./header.css";
import { useLocation, useNavigate } from "react-router-dom";

function Header({ type }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [kind, setKind] = useState(location.pathname === "/" ? "hotels" : location.pathname.substring(1));

  const handleNav = (arg) => {
    if (location.pathname === "/") {
      setKind(arg);
    } else {
      setKind(arg);
      navigate(`/${arg}`)
    }
  };

 



  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <div
            onClick={() => handleNav("hotels")}
            className={
             (kind === "hotels" || kind.includes("hotels")) ? "headerListItem active" : "headerListItem"
            }
          >
            <FontAwesomeIcon icon={faBed} />
            <span>Alojamiento</span>
          </div>
          <div
            onClick={() => handleNav("flights")}
            className={
              (kind === "flights" || kind.includes("flights")) ? "headerListItem active" : "headerListItem"
            }
          >
            <FontAwesomeIcon icon={faPlane} />
            <span>Vuelos</span>
          </div>
          <div
            onClick={() => handleNav("cars")}
            className={
              (kind === "cars" || kind.includes("cars"))? "headerListItem active" : "headerListItem"
            }
          >
            <FontAwesomeIcon icon={faCar} />
            <span>Alquiler de coches</span>
          </div>
        </div>
        {type !== "list" && (
          <>
            <h1 className="headerTitle">
              ¡Disfruta de nuestras últimas rebajas!
            </h1>
            <p className="headerDesc">
              Un descuento instantáneo del 10% al planificar su primer viaje con
              nosotros
            </p>

            <HomeSearch
              kind={kind}
          
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
