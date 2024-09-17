import React, {useContext} from 'react';
import { Outlet, Link, useOutletContext } from 'react-router-dom';
import NavBar from '../components/NavBar';
import UserContext from '../UserContext';



function ManageClasses(){
    const context = useContext(UserContext)
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