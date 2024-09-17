import React, { useEffect,createContext, useState } from "react";
import LandingPage from "./LandingPage";
import TeacherHome from "./TeacherHome"
import StudentHome from "./StudentHome"
import UserContext from "../UserContext"
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function Root (){


    const [user,setUser]=useState("")
    const [sections, setSections]=useState("")
    const [sectionStudents,setSectionStudents]=useState("")
    const [sectionSelected,setSectionSelected]=useState("")
    const [quizzes, setQuizzes] = useState([{}]);
    // const [section,setSection] = useState() 
    // const [mySection,setMySection]=useState()

    // useEffect(() => {
    //     fetch("/check_session").then((response) => {
    //       if (response.ok) {
    //         response.json().then((user) => setUser(user));
    //       }
    //     });
    //       }, []);

   
    useEffect(() => {
        fetch("/teachers/1")
        .then((response)=>response.json())
            .then((teacher) => setUser(teacher))
    },[])


    useEffect(() => {
        user?(setData(user)):(<p>classes coming</p>)
      },[user,sections])

    function setData(user) {
        if (user.role=='teacher') {
          setSections(user.sections)
          setQuizzes(user.quizzes)
          if (sectionSelected) {
            getStudents(sectionSelected.id)}
          else {
            if( user.sections.length >0 ){
            setSectionSelected((user.sections[0]))
            }
            else{
              setSectionSelected (null)}
            }
          }
        else if (user.role === 'student') {
           console.log("user is a student") 
        }
    }
    
    // useEffect(() => {
    //    console.log("useEffect() called")
    //     if (sections){
    //       console.log(sections)
    //       if (sectionSelected) {
    //         console.log('section selected already')
    //       }
    //       else {
    //         const sectionId= sections[0].id
    //         console.log(sectionId)
    //         getStudents(sectionId);
    //         setSectionSelected(sectionId)
    //       }
    //     }
    //   },[sections] );
    
    function handleSectionChange(e){
      fetch(`/sections/${e.target.value}`)
      .then(res=>res.json())
      .then(section=>{
        // setSectionSelected(section)
        setSectionSelected(section)
      })

      // setSectionSelected(e.target.value)
      //   console.log(e.target.value)
      //   getStudents(e.target.value)
      }

     function getStudents(sectionId){
      fetch(`/studentsbysection/${sectionId}`)
      .then((res)=>res.json())
      .then((data) =>{
        setSectionStudents(data)
      })
     }

     function getSections(user){
      console.log(user)
      fetch(`/sectionsbyteacher/${user.id}`)
      .then((res)=>res.json())
      .then((data) =>{
        console.log(data)
        setSections(data)
      })

     }
  
     return (
      <>
      <Header/>
      <Outlet context= {{
        user,setUser, 
        sectionStudents,setSectionStudents, 
        sectionSelected, setSectionSelected,
        sections,setSections,
        handleSectionChange, 
        getSections,
        }}/>
      </>
     )

}

export default Root
