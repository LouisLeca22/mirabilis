import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="fLists">
        <ul className="fList">
          <li className="fListItem">Países </li>
          <li className="fListItem">Regiones </li>
          <li className="fListItem">Ciudades </li>
          <li className="fListItem">Zonas</li>
          <li className="fListItem">Aeropuertos</li>
          <li className="fListItem">Hoteles</li>
        </ul>
        <ul className="fList">
          <li className="fListItem">Alojamienotos </li>
          <li className="fListItem">Pisos </li>
          <li className="fListItem">Resorts </li>
          <li className="fListItem">Villas</li>
          <li className="fListItem">Cabañas y casas de campo</li>
        </ul>
        <ul className="fList">
          <li className="fListItem">Lugares únicos para alojarse </li>
          <li className="fListItem">Blog</li>
          <li className="fListItem">Artículos de viaje </li>
          <li className="fListItem">Comunidad de viajeros</li>
          <li className="fListItem">Ofertas de temporada y de vacaciones </li>
        </ul>
        <ul className="fList">
          <li className="fListItem">Destinos </li>
          <li className="fListItem">Buscador de vuelos</li>
          <li className="fListItem">Alquiler de coches </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;