import React,{useContext, useEffect, useState} from 'react';
import { prepareDataForValidation, useFormik } from "formik";
import UserContext from '../UserContext'
// import '../index.css';



function Quiz({selectedQuiz, setSelectedQuiz,result, setResult,showResult,setShowResult,currentQuestion,setCurrentQuestion}){

    const context = useContext(UserContext)
    const [answerIdx,setAnswerIdx] = useState(null)
    const [answer, setAnswer]=useState(null)
    const [inputAnswer,setInputAnswer]=useState("")
    const {question, options, correct_answer, type} =selectedQuiz.questions[currentQuestion]
    

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
        //add answer to array or dictionary or answers?  to store so teachers can see 
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
    

        if( currentQuestion !== selectedQuiz.questions.length - 1){
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

    const onDone=()=>{
        setResult({
            score:0,
            correctAnswers:0,
            wrongAnswers:0
        })
        setShowResult(false)
        setSelectedQuiz(null)
        //Update assigment Status to "completed"
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
                    <span>/{selectedQuiz.questions.length}</span>
                    <h3>{question|| 'No question available'}</h3>
                    {type === "multiple-choice" ? (
                        <ul>
                            {options.map((option, index) => (
                                <>
                                <input 
                                    type='radio'
                                    name='answer'
                                    onClick={() => OnAnswerClicked(option, index)} 
                                    key={option.id} 
                                    value={option}
                                    className={answerIdx === index ? "selectedAnswer" : null}
                                >
                                </input>
                                {option.option} 
                                </>
                            ))}
                        </ul>
                    ) : type === "short-answer" ? (
                        <div>
                            <input value = {inputAnswer} onChange= {handleInputChange} rows="4" cols="50"></input>
                        </div>
                    ) : null}
                    <div>
                        <button disabled={answerIdx === null && !inputAnswer} onClick={onClickNext}>
                            {currentQuestion === selectedQuiz.questions.length - 1 ? "Finished" : "Next"}
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <h2>Results</h2>
                    <p>Total Questions:<span>{selectedQuiz.questions.length}</span></p>
                    <p>Correct Answers:<span>{result.correctAnswers}</span></p>
                    <p>Wrong  Answers:<span>{result.wrongAnswers}</span></p>
                    <p>score:<span>{result.score}</span></p>

                    <button onClick={onTryAgain}>Try Again</button>
                    <button onClick={onDone}>All Done</button>



                </div>
            )}
        </div>
    );
}

export default Quiz
