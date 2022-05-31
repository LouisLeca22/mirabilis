import { useRef, useEffect, useState, useContext } from "react";
import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { es } from "react-date-range/src/locale";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";

function HomeSearch({ kind }) {
  const navigate = useNavigate();
  const optionRef = useRef(null);
  const dateRef = useRef(null);

  const [openDate, setOpenDate] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (optionRef.current && !optionRef.current.contains(event.target)) {
        setOpenOptions(false);
      }
      if (dateRef.current && !dateRef.current.contains(event.target)) {
        setOpenDate(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [optionRef, dateRef]);

  const handleSearch = () => {
    dispatch({ type: "CHANGE_CATEGORY", payload: null });
    switch (kind) {
      case "hotels":
        navigate("/hotels");
        break;
      case "flights":
        navigate("/flights");
        break;
      case "cars":
        navigate("/cars");
        break;
      default:
        navigate("/");
    }
  };

  const { dispatch, destination, from, options, dates } =
    useContext(SearchContext);

  const [input, setInput] = useState("");
  const [inputFrom, setInputFrom] = useState("") 
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsFrom, setSuggestionsFrom] = useState([])

  const handleChange = (input) => {
    dispatch({ type: "CHANGE_DESTINATION", payload: input });
    let matches = [];
    if (input.length > 0) {
      matches = possibilities.filter((p) => {
        const regex = new RegExp(`${input}`, "gi");
        return p.match(regex);
      });
    }
    setSuggestions(matches);
    setInput(input);
  };


  const handleFrom = (input) => {
    dispatch({ type: "CHANGE_FROM", payload: input });
    let matches = [];
    if (input.length > 0) {
      matches = possibilitiesFrom.filter((p) => {
        const regex = new RegExp(`${input}`, "gi");
        return p.match(regex);
      });
    }
    setSuggestionsFrom(matches);
    setInputFrom(input);
  };



  const [possibilities, setPossibilities] = useState([]);
  const [possibilitiesFrom, setPossibilitiesFrom] = useState([])

  const { data } = useFetch(`/${kind}`);

  

  useEffect(() => {
    const formattedArray = data?.map((item) => item.city);
    const filteredArray = formattedArray?.filter(
      (element, index) => formattedArray.indexOf(element) === index
    );
    setPossibilities(filteredArray);

  }, [data]);

  useEffect(() => {
  
    if(kind === "flights"){
      const formattedArray = data?.map((item) => item.from);
      const filteredArray = formattedArray?.filter(
        (element, index) => formattedArray.indexOf(element) === index
      );
      setPossibilitiesFrom(filteredArray);
    }
  },[data, kind])

  return (
    <>
      <div className="headerSearch">
        {kind === "hotels" && (
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faBed} className="headerIcon" />
            <input
              type="text"
              placeholder="¿Adónde vamos? "
              className="headerSearchInput"
              value={input}
              onChange={(e) => handleChange(e.target.value)}
              onBlur={() => {
                setTimeout(() => {
                  setSuggestions([]);
                }, 200);
              }}
            />
            {suggestions.length > 0 && (
              <div className="suggestionBox">
                {suggestions.map((suggestion, index) => (
                  <div
                    onClick={() => {
                      setInput(suggestion);
                      dispatch({
                        type: "CHANGE_DESTINATION",
                        payload: suggestion,
                      });
                    }}
                    key={index}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {kind === "flights" && (
          <>
            <div className="headerSearchItem">
              <FontAwesomeIcon icon={faPlane} className="headerIcon" />
              <input
                type="text"
                placeholder="Desde"
                className="headerSearchInput"
                value={inputFrom}
                onChange={(e) => handleFrom(e.target.value)}
                onBlur={() => {
                  setTimeout(() => {
                    setSuggestionsFrom([]);
                  }, 200);
                }}
              />
                {suggestionsFrom.length > 0 && (
                <div className="suggestionBox">
                  {suggestionsFrom.map((suggestion, index) => (
                    <div
                      onClick={() => {
                        setInputFrom(suggestion);
                        dispatch({
                          type: "CHANGE_FROM",
                          payload: suggestion,
                        });
                      }}
                      key={index}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="headerSearchItem">
              <FontAwesomeIcon icon={faPlane} className="headerIcon" />
              <input
                type="text"
                placeholder="Hasta "
                className="headerSearchInput"
                value={input}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={() => {
                  setTimeout(() => {
                    setSuggestions([]);
                  }, 200);
                }}
              />
                  {suggestions.length > 0 && (
                <div className="suggestionBox">
                  {suggestions.map((suggestion, index) => (
                    <div
                      onClick={() => {
                        setInput(suggestion);
                        dispatch({
                          type: "CHANGE_DESTINATION",
                          payload: suggestion,
                        });
                      }}
                      key={index}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {kind === "cars" && (
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faCar} className="headerIcon" />
            <input
              type="text"
              placeholder="Lugar de recogida"
              className="headerSearchInput"
              value={input}
              onChange={(e) => handleChange(e.target.value)}
              onBlur={() => {
                setTimeout(() => {
                  setSuggestions([]);
                }, 200);
              }}
            />
                  {suggestions.length > 0 && (
              <div className="suggestionBox">
                {suggestions.map((suggestion, index) => (
                  <div
                    onClick={() => {
                      setInput(suggestion);
                      dispatch({
                        type: "CHANGE_DESTINATION",
                        payload: suggestion,
                      });
                    }}
                    key={index}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="headerSearchItem" ref={dateRef}>
          <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
          <span
            onClick={() => setOpenDate(!openDate)}
            className="headerSearchText"
          >{`${format(dates[0].startDate, "dd/MM/yyyy")} hasta ${format(
            dates[0].endDate,
            "dd/MM/yyyy"
          )}`}</span>
          {openDate && (
            <DateRange
              locale={es}
              editableDateInputs={true}
              onChange={(item) =>
                dispatch({ type: "CHANGE_DATES", payload: [item.selection] })
              }
              moveRangeOnFirstSelection={false}
              ranges={dates}
              className="date"
              minDate={new Date()}
            />
          )}
        </div>
        {(kind === "hotels" || kind === "flights") && (
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faPerson} className="headerIcon" />
            <span
              onClick={() => setOpenOptions(!openOptions)}
              className="headerSearchText"
            >
              {`${options.adults} adultos • ${options.children} niños •`}
              {kind === "hotels" && `  ${options.rooms} habitaciones`}{" "}
            </span>
            {openOptions && (
              <div className="options" ref={optionRef}>
                <div className="optionItem">
                  <span className="optionText">Adulto</span>
                  <div className="optionCounter">
                    <button
                      disabled={options.adults <= 1}
                      className="optionCounterButton"
                      onClick={() =>
                        dispatch({
                          type: "CHANGE_ADULTS",
                          payload: options.adults - 1,
                        })
                      }
                    >
                      -
                    </button>
                    <span className="optionCounterNumber">
                      {options.adults}
                    </span>
                    <button
                      className="optionCounterButton"
                      onClick={() =>
                        dispatch({
                          type: "CHANGE_ADULTS",
                          payload: options.adults + 1,
                        })
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="optionItem">
                  <span className="optionText">Niños</span>
                  <div className="optionCounter">
                    <button
                      disabled={options.children <= 1}
                      className="optionCounterButton"
                      onClick={() =>
                        dispatch({
                          type: "CHANGE_CHILDREN",
                          payload: options.children - 1,
                        })
                      }
                    >
                      -
                    </button>
                    <span className="optionCounterNumber">
                      {options.children}
                    </span>
                    <button
                      className="optionCounterButton"
                      onClick={() =>
                        dispatch({
                          type: "CHANGE_CHILDREN",
                          payload: options.children + 1,
                        })
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                {kind === "hotels" && (
                  <div className="optionItem">
                    <span className="optionText">Habitaciónes</span>
                    <div className="optionCounter">
                      <button
                        disabled={options.rooms <= 1}
                        className="optionCounterButton"
                        onClick={() =>
                          dispatch({
                            type: "CHANGE_ROOMS",
                            payload: options.rooms - 1,
                          })
                        }
                      >
                        -
                      </button>
                      <span className="optionCounterNumber">
                        {options.rooms}
                      </span>
                      <button
                        className="optionCounterButton"
                        onClick={() =>
                          dispatch({
                            type: "CHANGE_ROOMS",
                            payload: options.rooms + 1,
                          })
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        <div className="headerSearchItem">
          <button className="headerBtn" onClick={handleSearch}>
            Buscar
          </button>
        </div>
      </div>
    </>
  );
}

export default HomeSearch;
