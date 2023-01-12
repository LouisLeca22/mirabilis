import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./navbar.css";

function Navbar() {
  const { user, dispatch} = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({type: "LOGOUT"})
  }

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" className="logo">
          Mirabilis
        </Link>
        <div className="navItems">
          {user ? (
            <>
              <span className="greeting">¡Hola {user.name}!</span>
              <button onClick={handleLogout}className="navButton">Cerrar la sesión</button>
            </>
          ) : (
            <>
              <Link to="/register" className="navButton">
                Registrarse
              </Link>
              <Link to="/login" className="navButton">
                Iniciar sesión
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
