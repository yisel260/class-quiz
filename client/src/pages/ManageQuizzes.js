import React, {useContext} from 'react';
import { Link, Outlet, useOutlet } from "react-router-dom";
import UserContext from '../UserContext';
import NavBar from '../components/NavBar';
function ManageQuizzes(){
    const context = useContext(UserContext)
    return(
     <>
     <NavBar/>
     <p> ManageQuizzes </p>
     <Link className="nav-link" to="/managequizzes/createquiz">Create Quizzes</Link>
     <Link className="nav-link" to="/managequizzes/update-quiz">Update Quizzes</Link>
     <Link className="nav-link" to="/managequizzes">My Quizzes</Link>
     <Link className="nav-link" to="/assignments">Assignments</Link>


     <Outlet context={context}/>

    </>)
} 

export default ManageQuizzes;