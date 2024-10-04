import React, {useContext} from 'react';
import { Link, Outlet, useOutlet } from "react-router-dom";
import UserContext from '../UserContext';
import NavBar from '../components/NavBar';
import Header from '../components/Header';

function Help(){
    const context = useContext(UserContext)

    return(
     <>
     <Header/>
     <NavBar/>
     <br/>
     <br/>
     <Outlet context={context}/>
    </>)} 

export default Help;