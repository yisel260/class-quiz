import React from 'react';
import { Link, Outlet, useOutlet } from "react-router-dom";

import NavBar from '../components/NavBar';
function ManageQuizzes(){
    return(
     <>
     <NavBar/>
     <p> ManageQuizzes </p>
     <Link className="nav-link" to="/managequizzes/createquiz">Create Quizzes</Link>
     <Link className="nav-link" to="/managequizzes/update-quiz">Update Quizzes</Link>
     <Link className="nav-link" to="/managequizzes/myquizzes">My Quizzes</Link>

     <Outlet/>

    </>)
} 

export default ManageQuizzes;