import React,{useContext, useState} from 'react';
import UserContext from '../UserContext';
import Quiz from '../components/Quiz'
// import "/src/index.css"

function StudentHome(){
    const context = useContext(UserContext);
    const quizzes =[]
    const [selectedQuiz,setSelectedQuiz] = useState()
    const [showQuizzes,setShowQuizzes] = useState(true)
    const [showResult,setShowResult]=useState(false)
    const [currentQuestion,setCurrentQuestion] = useState(0)

    const [result, setResult]= useState({
        score:0,
        correctAnswers:0,
        wrongAnswers:0
    })
        
    context.user.assignments.forEach((assignment) => { 
                quizzes.push(assignment.quiz);
        })
        
    function selectQuiz(e,quiz){
        setSelectedQuiz(quiz)
        setResult({
            score:0,
            correctAnswers:0,
            wrongAnswers:0
        })
        setShowResult(false)
        setCurrentQuestion(0)

    }

    console.log(selectedQuiz)
    return (
    <>
        <p> Student Home </p>
        {quizzes.map((quiz) =>{
            return (
                <>
                <div 
                    className={quiz.status == "completed" ? "completed":"not-completed"} 
                    key={quiz.id} 
                    onClick= {(e)=>selectQuiz(e,quiz)}>{quiz.title}
                </div>
                </>
            )
            })
        }
        {selectedQuiz? (<Quiz 
        selectedQuiz={selectedQuiz} 
        setSelectedQuiz={setSelectedQuiz} 
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