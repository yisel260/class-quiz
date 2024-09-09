import { Link, useOutlet } from "react-router-dom";
import { useOutletContext, useNavigate } from "react-router-dom";

function NavBar() {

  return (
    <>
   <div id="navbar">
        <br/>
        <Link className="nav-link" to="/">Teacher Home</Link>
        <Link className="nav-link" to="/manageclasses">Mange Classes</Link>
        <Link className="nav-link" to="/managequizzes">Manage Quizzes</Link>
        <Link className="nav-link" to="/help">Help</Link>
    </div>
    </>
  );
};

export default NavBar;