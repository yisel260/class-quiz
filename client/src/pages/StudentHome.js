import React,{useContext, useState} from 'react';
import UserContext from '../UserContext';
import Quiz from '../components/Quiz'

function StudentHome(){
    const context = useContext(UserContext);
    const quizzes =[]
    const [selectedQuiz,setSelectedQuiz] = useState()
        
    context.user.assignments.forEach((assignment) => { 
                quizzes.push(assignment.quiz);
        })
        
    
    console.log(quizzes)

    function selectQuiz(e,quiz){
        console.log(quiz)
        setSelectedQuiz(quiz)
    }

    console.log(selectedQuiz)
    return (
    <>
        <p> Student Home </p>
        {quizzes.map((quiz) =>{
            return (
                <button onClick= {(e)=>selectQuiz(e,quiz)} key={quiz.id}>{quiz.title}</button>
            )
            })
        }
        {selectedQuiz? (<Quiz quiz={selectedQuiz}/>) : null}
    </>
)
}

export default StudentHome;