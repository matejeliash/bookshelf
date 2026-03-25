import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext"
import "./Navbar.css"


export function Navbar(){
    const {isLoggedIn,logout} = useAuth();

    return (
        <nav className="navbar">
                <Link className="navLogo" to="/">Bookshelf</Link>
                {isLoggedIn && <Link className="navLink" to="/shelf">Shelf</Link>}
                <Link className="navLink" to="/books">Books</Link>
                <Link className="navLink" to="/authors">Authors</Link>

        {!isLoggedIn ? 
         <Link className="navLink" to="/login">Login </Link>    
         :
         <button className="navBtn" onClick={logout}>Logout</button>
    
        }



        </nav>
    )
}