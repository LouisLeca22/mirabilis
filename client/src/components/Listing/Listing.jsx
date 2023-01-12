import { Link } from "react-router-dom";
import "./listing.css";

const Listing = ({type, item}) => {
  return (
    <div className="listing">
      <img
        src={item.photos[0]}
        alt=""
        className="listingImg"
      />
      <div className="listingDesc">
        <h1 className="listingTitle">{item.name}</h1>
        <span className="listingDistance">{item.distance}m a partir del centro de la ciudad</span>
        <span className="listingTaxiOp">{item.type}</span>
        <span className="listingSubtitle">
          {item.title}
        </span>
        <span className="listingFeatures">
          {item.desc}
        </span>
        <span className="listingCancelOp"> Oferta por tiempo limitado </span>
        <span className="listingCancelOpSubtitle">
         Programa de Viajes sostenibles
        </span>
      </div>
      <div className="listingDetails">
        <div className="listingRating">
          <span>{item.rating > 9? "Fabuloso" : item.rating > 8.5 ?"Fantástico" : "Muy bien"}</span>
          <button>{item.rating}</button>
        </div>
        <div className="listingDetailTexts">
          <span className="listingPrice">{item.cheapestPrice}€</span>
          <span className="listingTaxOp">incluye impuestos y cargos</span>
          <Link to={`/${type}/${item._id}`} className="listingCheckButton">Ver disponibilidad</Link>
        </div>
      </div>
    </div>
  );
};

export default Listing;