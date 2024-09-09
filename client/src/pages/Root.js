import React, { useEffect, useState } from "react";
import {Outlet} from "react-router-dom"
import NavBar from "../components/NavBar";

function Root (){
    return (
    <>
    <h1>This is the root </h1>
    <NavBar/>
    <Outlet/>
    </>)
}
 
export default Root
