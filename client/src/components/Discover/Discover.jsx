import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";
import Loading from "../Loading/Loading";
import "./discover.css";

const Discover = () => {

  const {data, loading, error} = useFetch("/api/hotels/countByType", {})
  const navigate = useNavigate()
  const {dispatch} = useContext(SearchContext)


  return (
    <div className="pList">
      {loading ? <Loading /> : 
        
      (<>
      <div className="pListItem"  onClick={() => {
       dispatch({type: "RESET_SEARCH"});
       dispatch({type: "CHANGE_DESTINATION", payload: "Paris"}); 
       dispatch({type: "CHANGE_CATEGORY", payload: "hotel"})
       navigate("/hotels")}}>
        <img
          src="https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o="
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>Hoteles</h1>
          <h2>2230 hoteles</h2>
        </div>
      </div>
      <div className="pListItem" onClick={() => {
       dispatch({type: "RESET_SEARCH"});
       dispatch({type: "CHANGE_DESTINATION", payload: "Paris"}); 
       dispatch({type: "CHANGE_CATEGORY", payload: "apartment"})
       navigate("/hotels")}}>
        <img
          src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg"
          alt=""
          className="pListImg"
        />
        <div className="pListTitles" >
          <h1>Pisos</h1>
          <h2>2933 pisos</h2>
        </div>
      </div>
      <div className="pListItem" onClick={() => {
       dispatch({type: "RESET_SEARCH"});
       dispatch({type: "CHANGE_DESTINATION", payload: "Paris"}); 
       dispatch({type: "CHANGE_CATEGORY", payload: "resort"})
       navigate("/hotels")}}>
        <img
          src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg"
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>Resorts</h1>
          <h2>2399 resorts</h2>
        </div>
      </div>
      <div className="pListItem" onClick={() => {
       dispatch({type: "RESET_SEARCH"});
       dispatch({type: "CHANGE_DESTINATION", payload: "Paris"}); 
       dispatch({type: "CHANGE_CATEGORY", payload: "villa"})
       navigate("/hotels")}}>
        <img
          src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg"
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>Villas</h1>
          <h2>4303 villas</h2>
        </div>
      </div>
      <div className="pListItem" onClick={() => {
       dispatch({type: "RESET_SEARCH"});
       dispatch({type: "CHANGE_DESTINATION", payload: "Paris"}); 
       dispatch({type: "CHANGE_CATEGORY", payload: "cabin"})
       navigate("/hotels")}}>
        <img
          src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg"
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>Cabañas y casas de campo </h1>
          <h2>1203 cabañas</h2>
        </div>
      </div>
      </>)}
    </div>
  );
};

export default Discover;