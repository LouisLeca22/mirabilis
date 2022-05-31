import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import "./list.css";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import { es } from "react-date-range/src/locale";
import Listing from "../../components/Listing/Listing";
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading/Loading";
import { SearchContext } from "../../context/SearchContext";

function List({ type }) {
  const {dispatch, destination, category, from, options, dates} = useContext(SearchContext)
  const [openDate, setOpenDate] = useState(false);

  const [min, setMin] = useState(40)
  const [max, setMax] = useState(9000)

  const url = category ? `/${type}?city=${destination}&min=${min}&max=${max}&from=${from}&type=${category}` : `/${type}?city=${destination}&min=${min}&max=${max}&from=${from}`
  
  const {data, loading, error, reFetch} = useFetch(url, {}, type)


  


  const handleClick = () => {
    reFetch()
  }


  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Buscar</h1>
            {type === "flights" && (
              <div className="lsItem">
                <label>Desde</label>
                <input
                  onChange={(e) => dispatch({type: "CHANGE_FROM", payload: e.target.value})}
                  placeholder={from}
                  type="text"
                />
              </div>
            )}
            <div className="lsItem">
              {type === "hotels" && <label>Destinación</label>}
              {type === "flights" && <label>Hasta</label>}
              {type === "cars" && <label>Lugar de recogida</label>}
              <input
                 onChange={(e) => dispatch({type: "CHANGE_DESTINATION", payload: e.target.value})}
                placeholder={destination}
                type="text"
              />
            </div>
            <div className="lsItem">
              <label>Fecha a fecha</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                "dd/MM/yyyy"
              )} to ${format(dates[0].endDate, "dd/MM/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  locale={es}
                  editableDateInputs={true}
                  onChange={(item) => dispatch({type: "CHANGE_DATES",payload:[item.selection]})}
                  moveRangeOnFirstSelection={false}
                  ranges={dates}
                  minDate={new Date()}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Opciones</label>
              <div className="lsOptions">

            
              <div className="lsOptionItem">
                <span className="lsOptionText">Presupuesto minimo</span>
                <input type="number" min={100} max={9000}  onChange={e => setMin(e.target.value)} className="lsOptionInput" />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">Presupuesto máximo</span>
                <input type="number"  onChange={e => setMax(e.target.value)} min={100} max={9000} className="lsOptionInput" />
              </div>
              {options && 
              <>
            
              <div className="lsOptionItem">
                <span className="lsOptionText">Adultos</span>
                <input onChange={(e) => dispatch({type: "CHANGE_ADULTS", payload: e.target.value})} name="adults" min={1} value={options.adults} type="number" className="lsOptionInput" />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">Niños</span>
                <input onChange={(e) => dispatch({type: "CHANGE_CHILDREN", payload: e.target.value})} min={0} name="children" value={options.children} type="number" className="lsOptionInput" />
              </div>
              </>
                 }
              {type === "hotels" && (
                <div className="lsOptionItem">
                  <span className="lsOptionText">Habitaciones</span>
                  <input onChange={(e) => dispatch({type: "CHANGE_ROOMS", payload: e.target.value})} min={1} name="rooms" value={options.rooms} type="number" className="lsOptionInput" />
                </div>
              )}
                </div>
            </div>
            <button onClick={handleClick}>Buscar</button>
          </div>
          <div className="listResult">
            {loading ? <Loading /> : data && data.length > 0 ? data.map(item => (
              <Listing key={item._id} type={type} item={item}/>
            )): <div style={{fontSize: "2rem", textAlign: "center", fontWeight: "bold"}}>Lo siento, no hay resultado por su busqueda...</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
