import React, { useEffect,useState } from "react";
import UserContext from "../UserContext"
import { Outlet } from "react-router-dom";

function Root (){
  console.log('root being rendered');

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
    const [option1,setOption1]=useState("")
    const [option2,setOption2]=useState("")
    const [option3,setOption3]=useState("")
    const [option4,setOption4]=useState("")
    const [shortAnswerAnswer,setShortAnswerAnswer]= useState("")
    const [addingQuiz, setAddingQuiz]=useState(false)
    const [editedQuestion, setEditedQuestion] = useState(null)

    const [addingQuestion,setAddingQuestion]=useState(false)
    const [newQuestion, setNewQuestion]=useState("")
    const [newQuiz,setNewQuiz]=useState(null)
    const [questionsDisplayed, setQuestionsDisplayed]=useState(selectedQuiz?.questions || [])

    const [classAssignments, setClassAssignments]=useState()
    const [selectedAssignment, setSelectedAssignment]= useState(null)


    const [selectedStudents,setSelectedStudents]=useState([])


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
            getStudents(sectionSelected.id)
            getAssignments(sectionSelected.id)}
          else {
            if( user.sections.length >0 ){
            setSectionSelected((user.sections[0]))
            getStudents((user.sections[0]).id)
            
            getAssignments((user.sections[0]).id)}
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

     function getAssignments(sectionId){
      console.log("get Assignmnents called")
      fetch(`/assignmentsbysection/${sectionId}`)
      .then((res)=>res.json())
      .then((data) =>{
        setClassAssignments(data)
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
      fetch(`/quizzes/${quizId}`)
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
        setMySection,
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
        option1,setOption1,
        option2,setOption2,
        option3,setOption3,
        option4,setOption4,
        shortAnswerAnswer,setShortAnswerAnswer,
        addingQuiz, setAddingQuiz,
        editedQuestion, setEditedQuestion,
        addingQuestion,setAddingQuestion,
        newQuestion, setNewQuestion,
        newQuiz, setNewQuiz,
        questionsDisplayed, setQuestionsDisplayed,
        classAssignments, setClassAssignments,
        selectedAssignment, setSelectedAssignment,
        getAssignments,
        selectedStudents,setSelectedStudents
       
        }}>
      <Outlet/>
      </UserContext.Provider>
      </>
     )

}

export default Root
