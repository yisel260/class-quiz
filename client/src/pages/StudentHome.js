import React,{useContext, useState} from 'react';
import UserContext from '../UserContext';
import Quiz from '../components/Quiz'
import Header from '../components/Header';
// import "/src/index.css"

function StudentHome(){
    const context = useContext(UserContext);
    const quizzes =[]
    const [showQuizzes,setShowQuizzes] = useState(true)
    const [showResult,setShowResult]=useState(false)
    const [currentQuestion,setCurrentQuestion] = useState(0)
 console.log(context.studentAssignments)
    const [result, setResult]= useState({
        score:0,
        correctAnswers:0,
        wrongAnswers:0
    })
        
    function selectAssignment(e,assignment){
        context.setSelectedAssignment(assignment)
        
        context.setSelectedQuiz(assignment.quiz)
        setResult({
            score:0,
            correctAnswers:0,
            wrongAnswers:0
        })
        setShowResult(false)
        setCurrentQuestion(0)

    }

    return (
    <>
        <Header/>
        <div id="student-assignment-container">
        {context.studentAssignments.map((assignment) =>{
            return (
                <>
                <div 
                    className= "quiz-assignment-card"
                    key={assignment.id} 
                    >
                        {assignment.quiz.title}
                        <button className=
                        {assignment.status === "assigned" ? (
                        "assigned"
                        ) : (
                        assignment.score >= assignment.quiz.passing_score ? (
                            "completed"
                        ) : (
                            "attempted"
                        )
                        )}

                        onClick={(e) => selectAssignment(e, assignment)}>
                            {assignment.status === "assigned" ? (
                            "Start"
                            ) : (
                            assignment.score > assignment.quiz.passing_score ? (
                                "All Done!"
                            ) : (
                                "Try Again"
                            )
                            )}
                        </button>
                </div>
                </>
            )
            })
        }
        </div>
        {context.selectedQuiz? (<Quiz 
        showQuizzes={showQuizzes} 
        setShowQuizzes={setShowQuizzes}
        result={result}
        setResult={setResult}
        showResult={showResult} 
        setShowResult={setShowResult} 
        currentQuestion = {currentQuestion}w
        setCurrentQuestion={setCurrentQuestion}
         />) : null}
    </>
)
}

export default StudentHome;