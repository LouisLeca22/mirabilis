import { useState } from "react"
import "./mailList.css"

function MailList() {

  const [alert, setAlert] = useState(null)
  const [email, setEmail] = useState("")


  const handleClick = () => {
    const isEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email)
    if(isEmail){

 
    setAlert("¡Su correo electrónico ha sido añadido a la lista!!")
  } else {
    setAlert("Por favor, añadec un correo electrónico válido")
  }
    setTimeout(() => {
      setAlert(null)
    }, (2000));
    
  }
  return (
    <div className="mail">
        <h1 className="mailTitle">
        Suscríbete para ver ofertas secretas 
        </h1>
        <span className="mailDesc">
        ¡Suscríbete y verás cómo bajan los precios! 
        </span>
        <div className="mailInputContainer">
            <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Introduce tu correo  electrónico" required/>
            <button onClick={handleClick}>¡Quiero subscribirme!</button>
        </div>

        {alert && <p style={{color: "teal"}}>{alert}</p> }
    </div>
  )
}

export default MailList