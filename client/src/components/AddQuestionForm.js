import React,{useContext, useState} from 'react';
import { useFormik} from "formik";
import * as yup from "yup";
import UserContext from '../UserContext';


function AddQuestionForm(){

    const context =useContext(UserContext)

    function handlleAddQuestion(e){
        e.preventDefault()
        fetch(`/questions`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                question:context.question,
                type:context.type,
                correct_answer:context.correct_answer,
                quiz_id:context.selectedQuiz.id,
            })
        })
        .then(res => res.json())
        .then((question) => {
            const options = [`${context.option1}`,`${context.option2}`,`${context.option3}`,`${context.option4}`]
            options.forEach(option => {
                fetch(`/options`,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        option: option,
                        question_id: question.id
                    })
                })
            })
    
        })
        .then(()=>{
        context.setQuestion("")
        context.setType("")
        context.setOptions([])
        context.setCorrectAnswer("")
        // context.setQuizID(context.selectedQuiz.id)
        context.setOption1("")
        context.setOption2("")
        context.setOption3("")
        context.setOption4("")
        context.setShortAnswerAnswer("")
        context.getQuestions(context.selectedQuiz.id)})
     }

     function handleTypeChange(e){
        console.log(`handling type change ${e.target.value}`)
        context.setType(e.target.value)
     }

     
     function handleQuestionChange(e){
       context.setQuestion(e.target.value)
     }
     
     function handleShortAnswerChange(e){
        context.setShortAnswerAnswer(e.target.value)
     }
     
     function handleOption1Change(e){
        context.setOption1(e.target.value)
     }
     
     function handleOption2Change(e){
        context.setOption2(e.target.value)
     }

     function handleOption3Change(e){
        context.setOption3(e.target.value)
     }

     function handleOption4Change(e){
        context.setOption4(e.target.value)
     }
    function handleCorrectAnswerChange(e){
        context.setCorrectAnswer(e.target.value)
 
    }

    return (
        <>
        <form className="form" id="add-question-form"   onSubmit={handlleAddQuestion}> 
            
            <label> Question :</label>
            <input onChange={handleQuestionChange} type="text" id="question" value={context.question} name = "question" required/>
            <br/><br/>

            <p role="group" aria-labelledby="my-radio-group">type of question: </p>
            <label>
                <input
                    type="radio"
                    name="type"
                    value={"multiple-choice"}
                    onChange={handleTypeChange}
                />
                Multiple Choice
            </label>
            <label>
                <input
                    type="radio"
                    name="type"
                    value="short-answer"
                    onChange={handleTypeChange}
                />
                Short Answer
            </label>
            <br /><br />

            {context.type === "short-answer"? (<> 
            <label> Correct Answer </label>
            <input onChange={handleShortAnswerChange} type='text' id="short-answer-correct_answer" value={context.correct_answer}></input>
            </>):(
                <>
                <input onChange={handleCorrectAnswerChange} type="radio" id="correct_answer" name="correct_answer" value={context.option1}/>
                    <label>answer choice 1 </label>
                    <input onChange ={handleOption1Change}type='text' id="option-1" value={context.option1}></input><br /><br />

                <input onChange={handleCorrectAnswerChange} type="radio" id="correct_answer" name="correct_answer" value={context.option2}/>
                    <label>answer choice 2 </label>
                    <input onChange ={handleOption2Change} type='text' id="option-2" value={context.option2}></input><br /><br />

                <input onChange={handleCorrectAnswerChange} type="radio" id="correct_answer" name="correct_answer" value={context.option3}/>
                    <label>answer choice 3 </label>
                    <input onChange ={handleOption3Change} type='text' id="option-3" value={context.option3}></input><br /><br />

                <input onChange={handleCorrectAnswerChange} type="radio" id="correct_answer" name="correct_answer" value={context.option4}/>
                    <label>answer choice 4 </label>
                    <input onChange ={handleOption4Change} type='text' id="option-4" value={context.option4}></input><br /><br />
                </>)}
            <input type="submit" value="submit" className = "button" id="submitNewQuiz"/>
            </form>


        </>
)
}

export default AddQuestionForm;