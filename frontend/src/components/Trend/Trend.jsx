import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Loading from "../Loading/Loading";
import "./trend.css"

function Trend() {

  const {data, loading, error} = useFetch("/hotels?featured=true&limit=4", {})

  return (
    <div className="trend">
      {loading ? <Loading /> : (data && data.map(item => (

       <Link to={`/hotels/${item._id}`} className="trendItem" key={item._id}>
         <img
           src={item.photos[0]}
           alt=""
           className="trendImg"
         />
         <span className="trendName">{item.name}</span>
         <span className="trendCity">{item.city}</span>
         <span className="trendPrice">{item.cheapestPrice}</span>
         <div className="trendRating">
           <button>{item.rating}</button>
           <span>Fantástico</span>
         </div>
       </Link>
          ))
      )}
     </div>
   );
}

export default Trend