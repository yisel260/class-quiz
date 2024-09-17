import React,{useState} from "react";
// import "./component.css"

function StudentCard({student}){

    return (
        <div  id="student-card">
            <p id="student-name">{student.name}</p>
            {student.assignments.map((assignment)=>{
                return (
                    <>
                     <p>{assignment.quiz.title}</p>
                     <p>{assignment.status}</p>
                    </>
                   

                )
            }
    )}
            <br />
        </div>
)}

export default StudentCard;