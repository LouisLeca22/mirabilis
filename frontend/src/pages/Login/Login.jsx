import "./login.css"
import {useContext, useState} from "react"
import { AuthContext } from "../../context/AuthContext"
import {useNavigate} from "react-router-dom"

function Login() {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined
    })

    const {loading, error, dispatch} = useContext(AuthContext)


    const handleChange = (e) => {
        setCredentials(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleLogin = async () => {
        dispatch({type: "LOGIN_START"})
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({name: credentials.username, password: credentials.password})
            })
            

            const data = await res.json()

            if(res.status !== 200){
                throw data
            }
        
            dispatch({type: "LOGIN_SUCCESS", payload: data})
            navigate("/")
        
        } catch (error) {
            dispatch({type: "LOGIN_ERROR", payload: error.message})
        }
    }

    
  return (
    <div className="login">
        <div className="loginContainer">
            <input type="text" placeholder="Nombre de usuario" name="username" className="loginInput" onChange={handleChange}/>
            <input type="password" placeholder="Contraseña" name="password" className="loginInput"  onChange={handleChange}
            />
            <button disabled={loading} onClick={handleLogin}className="loginButton">{loading ? "cargando..." : "Inicio de sesión"}</button>
            {error && <span>{error}</span>}
        </div>
    </div>
  )
}

export default Login