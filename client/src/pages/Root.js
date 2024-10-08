import React, { useEffect,useContext, useState } from "react";
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
    const [mySection,setMySection] = useState() 
    const [selectedQuiz,setSelectedQuiz] = useState(null)
    // const [mySection,setMySection]=useState()

    useEffect(() => {
        fetch("/check_session").then((response) => {
          if (response.ok) {
            response.json().then((user) => setUser(user));
          }
        });
          }, []);


    useEffect(() => {
        user?(setData(user)):(<p>classes coming</p>)
      },[user])

    function onLogin(user) {
        setUser(user)};
    
    function onLogOut() {
          setUser(null)};

    function setData(user) {
        if (user.role=='teacher') {
          setSections(user.sections)
          setQuizzes(user.quizzes)
          if (sectionSelected) {
            getStudents(sectionSelected.id)}
          else {
            if( user.sections.length >0 ){
            setSectionSelected((user.sections[0]))
            getStudents((user.sections[0]).id)}
            else{
              setSectionSelected (null)}
            }
          }
        else if (user.role === 'student') {
           console.log("user is a student") 
        }
    }

     function getStudents(sectionId){
      console.log("getstudents called")
      console.log(sectionId)
      fetch(`/studentsbysection/${sectionId}`)
      .then((res)=>res.json())
      .then((data) =>{
        console.log(data)
        setSectionStudents(data)
      })
     }

     function getQuizzes(userId){
      console.log("getQuizess called")
      fetch(`/teachers/${userId}`)
      .then((res)=>res.json())
      .then((user) =>{
        console.log(user.quizzes)
        setQuizzes(user.quizzes)
      })
     }
     function getSections(user){
      fetch(`/sectionsbyteacher/${user.id}`)
      .then((res)=>res.json())
      .then((data) =>{
        console.log(data)
        setSections(data)
      })

     }
  
     return (
      <>
      <UserContext.Provider value={{
        user,setUser, 
        sectionStudents,setSectionStudents, 
        sectionSelected, setSectionSelected,
        sections,setSections,
        getSections,
        getStudents,
        onLogin,
        onLogOut,
        getQuizzes,
        mySection,setMySection,
        quizzes, setQuizzes,
        selectedQuiz,setSelectedQuiz

        }}>
      <Outlet/>
      </UserContext.Provider>
      </>
     )

}

export default Root
