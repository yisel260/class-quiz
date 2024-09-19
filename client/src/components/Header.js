import React ,{useContext}from "react";
import UserContext from "../UserContext";
// import "./component.css"

function Header(){
    const context=useContext(UserContext)
 
 
    function handleLogout(){
        fetch("/logout", {
        method: "DELETE",
      }).then(() => context.onLogOut())
    }
 
   return( <>
    <div className="header">
        <h1 id="header-title">Class Quiz! </h1>
        <button id="logout" className="action-button" onClick={handleLogout}>Log Out</button>

    </div>
    </>
)}

export default Header;