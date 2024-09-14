import React,{useContext}from "react";
import Header from "../components/Header"
import NavBar from "../components/NavBar";
import StudentCard from "../components/StudentCard";
// import "./pages.css"
import SectionSelector from "../components/SectionSelector";
import UserContext from '../UserContext'
import { useOutletContext } from "react-router-dom";


function TeacherHome(){

  const context = useOutletContext(UserContext)
  console.log(context.sectionStudents)


    return (
        <>
          <header>
            <Header />
            <NavBar />
          </header>
          <br/>
          <main>
           <SectionSelector/>
            <br/><br/>
          <div id="student-card-container">
            {context.sectionStudents?(context.sectionStudents.map(student =>{
                return (<StudentCard student={student} key={student.id} />
                )
            })):(<p>Students coming</p>)}
          </div>
          </main>
        </>
      );
    }
    

export default TeacherHome