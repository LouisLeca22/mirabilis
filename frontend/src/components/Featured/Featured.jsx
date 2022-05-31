import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";
import Loading from "../Loading/Loading";
import "./featured.css";

const Featured = () => {
  const navigate = useNavigate()
  const {dispatch} = useContext(SearchContext)
  
  const {data, loading, error} = useFetch("/api/hotels/countByCity?cities=Paris,Madrid,Rome", {})


  return (
    <div className="featured">
    {loading ? <Loading /> :
      <>
     <div onClick={() => {
       dispatch({type: "RESET_SEARCH"});
       dispatch({type: "CHANGE_DESTINATION", payload: "Paris"}); 
       navigate("/hotels")}} className="featuredItem">
        <img
          src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=873&q=80"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Paris</h1>
          <h2>2023 alojamientos</h2>
        </div>
      </div>
      
      <div onClick={() => {
       dispatch({type: "RESET_SEARCH"});
       dispatch({type: "CHANGE_DESTINATION", payload: "Madrid"}); 
       navigate("/hotels")}} className="featuredItem">
        <img
          src="https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Madrid</h1>
          <h2>2873 alojamientos</h2>
        </div>
      </div>
      <div className="featuredItem"
      onClick={() => {
        dispatch({type: "RESET_SEARCH"});
        dispatch({type: "CHANGE_DESTINATION", payload: "Rome"}); 
        navigate("/hotels")}}
      >
        <img
          src="https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=796&q=80"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Roma</h1>
          <h2>1423 alojamientos</h2>
        </div>
      </div>
      </>  
      }
    </div>
  );
};

export default Featured;