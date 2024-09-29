import React,{useContext, useEffect, useState} from 'react';
import { prepareDataForValidation, useFormik } from "formik";
import UserContext from '../UserContext'


function Quiz({quiz}){

    const context = useContext(UserContext)
    const [currentQuestion,setCurrentQuestion] = useState(0)
    const [answerIdx,setAnswerIdx] = useState(null)
    const [answer, setAnswer]=useState(null)
    const [showResult,setShowResult]=useState(false)
    console.log(quiz.questions)

    const {question, options, correct_answer, type} =quiz.questions[currentQuestion]
    const [result, setResult]= useState({
        score:0,
        correctAnswers:0,
        wrongAnswers:0
    })

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
    

        if( currentQuestion !== quiz.questions.length - 1){
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

    return (
        <div>
            {!showResult ? (
                <div className='quiz-container'>
                    <span>{currentQuestion + 1}</span>
                    <span>/{quiz.questions.length}</span>
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
                            <input rows="4" cols="50"></input>
                        </div>
                    ) : null}
                    <div>
                        <button onClick={onClickNext}>
                            {currentQuestion === quiz.questions.length - 1 ? "Finished" : "Next"}
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <h2>Results</h2>
                    <p>Total Questions:<span>{quiz.questions.length}</span></p>
                    <p>Correct Answers:<span>{result.correctAnswers}</span></p>
                    <p>Wrong  Answers:<span>{result.wrongAnswers}</span></p>
                    <p>score:<span>{result.score}</span></p>

                    <button onClick={onTryAgain}>Try Again</button>


                </div>
            )}
        </div>
    );
}

        // <>
        // <h3>{quiz.title}</h3>
        // <form>
        // {quiz.questions.map((question) => {
        //     if (question.type === 'multiple-choice') {
        //         console.log(question.options)
        //         return(
        //             <>
        //             <p key={question.id}>{question.question}</p>
        //             {question.options.map((option) =>{
        //                 return(
        //             <>
        //                <input key={option.id}
        //                  type="radio"
        //                  value={option}
        //                  name='questionOption'
        //                 //  onChange={() =>
        //                 //    handleAnswerSelection(currentQuestion, option)
        //                 //  }
        //                />
        //                {option.option}
        //                </> 
        //         )
        //             })}
        //             </>
        //         )
        //     }
        //     else if (question.type === 'short-answer') {
        //         return(
        //             <>
        //             <p key={question.id}>{question.question}</p>
        //             <textarea
        //              rows="4"
        //             cols="50"/>
        //             </>
        //         )
        //     }
        // })
        // }
        // <input type='submit'></input>
        // </form>
        // </>
//     )


// }

export default Quiz
