import React,{useState} from "react";
import "./component.css"

function StudentCard({student}){

    return (
        <div id="student-card">
            <p id="student-name">{student.name}</p>
            <p id ="student-assignments">Points: {student.assingments}</p>
            <br />
        </div>
)}

export default StudentCard;