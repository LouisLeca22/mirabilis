import { useState } from "react"
import {useNavigate} from "react-router-dom"
import "./register.css"

function Register() {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({
        username: undefined,
        email: undefined,
        password: undefined
    })

    const handleChange = (e) => {
        setCredentials(prev =>({...prev, [e.target.name]: e.target.value}))
    }

    const [success, setSuccess] = useState(null)
   

    const handleRegister = async () => {
      try {
        const res = await fetch("/auth/register", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({name: credentials.username, email: credentials.email, password: credentials.password})
      })
      

      const data = await res.json()

      if(res.status !== 200){
          throw data
      }
          
          setSuccess(data)
          setTimeout(() => {
            navigate("/login")
          }, [2000])
      
      } catch (error) {
        console.log(error)
      }
  }



  return (
    <div className="register">
    <div className="registerContainer">
        <input type="text" placeholder="Nombre de usuario" name="username" className="registerInput" onChange={handleChange}/>
        <input type="email" placeholder="correo electrónico" name="email" className="registerInput" onChange={handleChange}/>
        <input type="password" placeholder="Nombre de usuario" name="password" className="registerInput"  onChange={handleChange}/>
        <button onClick={handleRegister}className="registerButton">Registrarse</button>
        {success && <span>{success}</span>}
    </div>
</div>
  )
}

export default Register