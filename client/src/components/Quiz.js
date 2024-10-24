import React,{useContext, useEffect, useState} from 'react';
import { prepareDataForValidation, useFormik } from "formik";
import UserContext from '../UserContext'
// import '../index.css';



function Quiz({result, setResult,showResult,setShowResult,currentQuestion,setCurrentQuestion}){

    const context = useContext(UserContext)
    const [answerIdx,setAnswerIdx] = useState(null)
    const [answer, setAnswer]=useState(null)
    const [inputAnswer,setInputAnswer]=useState("")
    const {question, options, correct_answer, type} =context.selectedQuiz.questions[currentQuestion]
    

    const OnAnswerClicked = (option, index) => {
        console.log(option,index, correct_answer)
        setAnswerIdx(index);
        if(option.option=== correct_answer) {
            setAnswer(true)
        }else{
            setAnswer(false)
        }

    }
    const onClickNext = () => {
        setAnswerIdx(null)
        setInputAnswer("")
        setResult((prev)=>
        answer?
        {
            ...prev, 
            score:prev.score+1,
            correctAnswers: prev.correctAnswers +1  
        }:{
            ...prev,
            wrongAnswers: prev.wrongAnswers +1
        })
    

        if( currentQuestion !== context.selectedQuiz.questions.length - 1){
            setCurrentQuestion((currentQuestion)=>currentQuestion + 1)
        }else {
            setCurrentQuestion(0);
            setShowResult(true);
        }}

    const onTryAgain=()=>{
        setResult({
            score:0,
            correctAnswers:0,
            wrongAnswers:0
        })
        setShowResult(false)
    }

    const onDone = () => {
        fetch(`/assignments/${context.selectedAssignment.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                status: "completed",
                score: result.score 
            }),
        })
        .then((response) => response.json())
        .then(() => {
            // This block will execute once the fetch request is complete
            setResult({
                score: 0,
                correctAnswers: 0,
                wrongAnswers: 0
            });
            context.getStudentAssignments(context.user.id);
            setShowResult(false);
            context.setSelectedQuiz(null);
        })
        .catch((error) => {
            console.error('Error updating the assignment:', error);
        });
    }

    
    const handleInputChange = (e)=>{
        setInputAnswer(e.target.value)
        if (e.target.value === correct_answer){
            setAnswer(true)
        }else setAnswer(false)
    }

    return (
        <div>
            {!showResult ? (
                <div className='quiz-container'>
                    <span>{currentQuestion + 1}</span>
                    <span>/{context.selectedQuiz.questions.length}</span>
                    <h3 id='question-displayed'>{question|| 'No question available'}</h3>
                    {type === "multiple-choice" ? (
                        <ul>
                            {options.map((option, index) => (
                                <div key={option.id} >
                                <input 
                                    type='radio'
                                    name='answer'
                                    onClick={() => OnAnswerClicked(option, index)} 
                                    value={option}
                                    className={answerIdx === index ? "selectedAnswer" : null}
                                >
                                </input>
                                {option.option} 
                                </div>
                            ))}
                        </ul>
                    ) : type === "short-answer" ? (
                        <div id='short-answer-input-container'>
                            <input value = {inputAnswer} onChange= {handleInputChange} rows="4" cols="50"></input>
                        </div>
                    ) : null}
                    <div id='next-btn-container' >
                        <br />
                        <button className="action-btn" disabled={answerIdx === null && !inputAnswer} onClick={onClickNext}>
                            {currentQuestion ===context.selectedQuiz.questions.length - 1 ? "Finished" : "Next"}
                        </button>
                    </div>
                </div>
            ) : (
                <div className='results-container'>
                    <h2>Results</h2>
                    <p>Total Questions:<span>{context.selectedQuiz.questions.length}</span></p>
                    <p>Correct Answers:<span>{result.correctAnswers}</span></p>
                    <p>Wrong  Answers:<span>{result.wrongAnswers}</span></p>
                    <p>score:<span>{result.score}</span></p>

                    <button className='mini-action-btn' onClick={onTryAgain}>Try Again</button>
                    <button className='mini-action-btn' onClick={onDone}>All Done</button>
                </div> 
            )}
        </div>
    );
}

export default Quiz
