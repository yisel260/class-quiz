import React, { useEffect,createContext, useState } from "react";
import LandingPage from "./LandingPage";
import TeacherHome from "./TeacherHome"
import StudentHome from "./StudentHome"
import UserContext from "../UserContext"

function Root (){


    const [user,setUser]=useState("")
    const [sections, setSections]=useState("")
    const [students,setStudents]=useState("")
    const [sectionSelected,setSectionSelected]=useState("")
    // const [prizes, setPrizes] = useState([{}]);
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
      },[user])

    function setData(user) {
        if (user.type==='teacher') {
        setSections(user.sections)
        setStudents(user.students)
        // setQuizzes(user.quizzes)-->will not work for now because relationship has recursion errors
        }
        else if (user.type === 'student') {
           console.log("user is a student") 
        }
    }

    function getSections(userId) {
        fetch(`/sectionsbyteacher/${userId}`)
          .then((response) =>response.json())
          .then(data =>{
            setSections(data)
          })
    
      }
    
    useEffect(() => {
        if (sections){
          if (sectionSelected) {
            console.log('section selected already')
          }
          else {
            const sectionId= sections[0].id
            getStudents(sectionId);
            setSectionSelected(sectionId)
          }
        }
      },[sections] );
    
    function handleSectionChange(e){
        setSectionSelected(e.target.value)
        console.log(e.target.value)
        getStudents(e.target.value)
      }

     function getStudents(sectionId){
      fetch(`/studentsbysection/${sectionId}`)
      .then((res)=>res.json())
      .then((data) =>{
        setStudents(data)
      })
     }
    
if (user){
    if (user.role === 'teacher'){
        return (
        <UserContext.Provider value={{user,setUser}}>
            <TeacherHome/>
        </UserContext.Provider>
    );
    }else if (user.role === "student"){
        return <StudentHome/>
    }
}else {
    return <LandingPage/>
}
}

export default Root
