import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { useContext, useState } from "react"
import { useLocation } from "react-router-dom"
import { SearchContext } from "../../context/SearchContext"
import useFetch from "../../hooks/useFetch"
import Loading from "../Loading/Loading"
import "./reserve.css"

function Reserve({setModal, ressourceId}) {
  const location = useLocation()
  const type = location.pathname.split("/")[1]
  const [selectedRooms, setSelectedRooms] = useState([])

  const {data, loading, error} = useFetch(`/${type}/rooms/${ressourceId}`)
  const {dates} = useContext(SearchContext)
  const [success, setSuccess] = useState(null)



  const handleSelect = (e) => {
    const checked = e.target.checked
    const value = e.target.value
    setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter(item => item !== value))
  }

  const getDatesInRange = (start, end) => { 
    const date = new Date(start.getTime());
    let list = []
    while(date <= end){
      list.push(new Date(date).getTime())
      date.setDate(date.getDate() + 1)
    }

    return list
  }

  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate)

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some(date => allDates.includes(new Date(date).getTime()))
    return !isFound
  }
  
  const handleClick = async () => {
    try {
      const array = await Promise.all(selectedRooms.map(roomId => {
        const res =  fetch(`/rooms/availability/${roomId}`, {
          method: "PUT",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({dates: allDates})
        })

        return res
      }))
      const message = await array[0].json()
      setSuccess(message)
      setTimeout(() => {
        setSuccess(null)
        setModal(false)
      }, 4000);
    } catch (error) {
      console.log(error)
    }
  }

 
  return (

  
    <div className="reserve">
      <div className="rContainer">
      
      <FontAwesomeIcon icon={faCircleXmark}  className="rClose" onClick={() => {setModal(false)}}/>
      {success ? (
       <span>{success}</span>

      ): (
        
        <>
      <span>Selecciona tu {type === "hotels" ? "habitación" : type === "flights" ? "vuelo" : "coche"} </span>
      {loading ? <Loading /> : data && data.map(item => (
        <div className="rItem" key={item._id}>
          <div className="rInfo">
            <div className="rTitle">{item.title}</div>
            <div className="rDesc">{item.desc}</div>
            <div className="rMax">Número máximo de personas <b>{item.maxPeople}</b></div>
            <div className="rPrice">{item.price}</div>
          </div>
          <div className="rSelectRooms">

        
            {item.roomNumbers.map((roomNumber) => (
          <div className="room" key={roomNumber._id}>
              <label>
                {roomNumber.number}
              </label>
              <input type="checkbox" disabled={!isAvailable(roomNumber)} value={roomNumber._id} onChange={handleSelect} />
          </div>
            ))}
            </div>
        </div>
      ))}
      <button className="rButton" onClick={handleClick}>¡Reserva ahora!</button>
      </>
      )}
      </div>
    </div>
  )
}

export default Reserve