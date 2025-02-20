import { Link, useOutlet } from "react-router-dom";
import { useOutletContext, useNavigate } from "react-router-dom";
import UserContext from '../UserContext'
import { useContext } from "react";
// import "../index.css"

function NavBar() {

  return (
    <>
   <div id="navbar">
        <br/>
        <Link className="nav-link" to="/">Teacher Home</Link>
        <Link className="nav-link" to="/manageclasses">Manage Classes</Link>
        <Link className="nav-link" to="/managequizzes">Manage Quizzes</Link>
        <Link className="nav-link" to="/assignments">Assignments</Link>
        <Link className="nav-link" to="/help">Help</Link>
    </div>
    </>
  );
};

export default NavBar;