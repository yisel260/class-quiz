import React, {useContext} from 'react';
import { Outlet, Link, useOutletContext } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import UserContext from '../UserContext';



function ManageClasses(){
    const context = useContext(UserContext)
    console.log(context.sections)
    return<>
     <Header/>
     <NavBar/>
     <br/>     <br/>

     <Link className="mini-nav-link"to="/manageclasses"> My Classes</Link>
     <Link className="mini-nav-link" to="/manageclasses/createclass"> Create class</Link>
     <Outlet context={context}/> 
     </>

} 

export default ManageClasses;