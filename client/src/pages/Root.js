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
    const [selectedQuestion,setSelectedQuestion] = useState(null)
    const [quizQuestions,setQuizQuestions] = useState(null)
    const [selectedStudent,setSelectedStudent] = useState(null)


    const [question,setQuestion]=useState("")
    const [type,setType]=useState()
    const [options,setOptions]=useState()
    const [correct_answer,setCorrectAnswer] = useState()
    // const [quiz_id,setQuizID]=useState(selectedQuiz.id)
    const [option1,setOption1]=useState("")
    const [option2,setOption2]=useState("")
    const [option3,setOption3]=useState("")
    const [option4,setOption4]=useState("")
    const [shortAnswerAnswer,setShortAnswerAnswer]= useState("")
    const [addingQuiz, setAddingQuiz]=useState(false)
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

     function getQuestions(quizId){
      fetch(`quizzes/${quizId}`)
      .then((res)=>res.json())
      .then((data) =>{
        console.log(data)
        setSelectedQuiz(data)
        setQuizQuestions(data.questions)
      })
     }

     function getQuiz(id) {
      fetch(`/quizzes/${id}`)
      .then((res)=>res.json())
      .then((quiz)=> setSelectedQuiz(quiz))
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
        getQuiz,
        setMySection,  // use this to set the selected section for a student
        mySection,setMySection,
        quizzes, setQuizzes,
        selectedQuiz,setSelectedQuiz,
        selectedStudent,setSelectedStudent,
        selectedQuestion,setSelectedQuestion,
        getQuestions,
        quizQuestions,setQuizQuestions,
        question,setQuestion,
        type,setType,
        options,setOptions,
        correct_answer,setCorrectAnswer,
        // quiz_id,setQuizID,
        option1,setOption1,
        option2,setOption2,
        option3,setOption3,
        option4,setOption4,
        shortAnswerAnswer,setShortAnswerAnswer,
        addingQuiz, setAddingQuiz
        

        }}>
      <Outlet/>
      </UserContext.Provider>
      </>
     )

}

export default Root
