import React from 'react';
import { Outlet, Link, useOutletContext } from 'react-router-dom';
import NavBar from '../components/NavBar';



function ManageClasses(){
    const context = useOutletContext()
    console.log(context.sections)
    return<>
     <p> ManageClasses </p>
     <NavBar/>
     <Link to="/manageclasses"> My Classes</Link>
     <Link to="/manageclasses/createclass"> Create class</Link>
     <Outlet context={context}/> 
     </>

} 

export default ManageClasses;