import React from 'react';
import { Link, Outlet, useOutlet } from "react-router-dom";


function ManageQuizzes(){
    return(
     <>
     <p> ManageQuizzes </p>
     <Link className="nav-link" to="/managequizzes/createquiz">Create Quizzes</Link>
     <Link className="nav-link" to="/managequizzes/update-quiz">Update Quizzes</Link>
     <Link className="nav-link" to="/managequizzes/myquizzes">My Quizzes</Link>

     <Outlet/>

    </>)
} 

export default ManageQuizzes;