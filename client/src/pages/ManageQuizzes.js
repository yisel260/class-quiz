import React, {useContext} from 'react';
import { Link, Outlet, useOutlet } from "react-router-dom";
import UserContext from '../UserContext';
import NavBar from '../components/NavBar';
import Header from '../components/Header';

function ManageQuizzes(){
    const context = useContext(UserContext)

    return(
     <>
     <Header/>
     <NavBar/>
     <br/>
     <br/>
     <Link className="mini-nav-link" to="/managequizzes">My Quizzes</Link>
     <Link className="mini-nav-link" to="/managequizzes/createquiz">New Quiz</Link>
     <br/>
     <br/>
     <Outlet context={context}/>
    </>)
} 

export default ManageQuizzes;