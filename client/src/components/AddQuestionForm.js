import React,{useContext, useState} from 'react';
import { useFormik} from "formik";
import * as yup from "yup";
import { useOutletContext } from 'react-router-dom';
import UserContext from '../UserContext';
import AddStudentForm from './AddStudentForm';


function AddQuestionForm(){

    const context =useContext(UserContext)
    const [question,setQuestion]=useState("")
    const [type,setType]=useState()
    const [options,setOptions]=useState()
    const [correct_answer,setCorrectAnswer] = useState()
    const [quiz_id,setQuizID]=useState(context.selectedQuiz.id)
    console.log(context.selectedQuiz.id)
    const [option1,setOption1]=useState("")
    const [option2,setOption2]=useState("")
    const [option3,setOption3]=useState("")
    const [option4,setOption4]=useState("")
    const [shortAnswerAnswer,setShortAnswerAnswer]= useState("")


    function handlleCreateNewQuiz(e){
        e.preventDefault()
        fetch(`/questions`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                question:question,
                type:type,
                correct_answer:correct_answer,
                quiz_id:quiz_id,
            })
        })
        .then(res => res.json())
        .then((question) => {
            console.log(question)
            const options = [`${option1}`,`${option2}`,`${option3}`,`${option4}`]
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
        setQuestion("")
        setType("")
        setOptions([])
        setCorrectAnswer("")
        setQuizID(context.selectedQuiz.id)
        setOption1("")
        setOption2("")
        setOption3("")
        setOption4("")
        setShortAnswerAnswer("")
     }

     function handleTypeChange(e){
        console.log(`handling type change ${e.target.value}`)
        setType(e.target.value)
     }

     
     function handleQuestionChange(e){
        setQuestion(e.target.value)
     }
     
     function handleShortAnswerChange(e){
        setShortAnswerAnswer(e.target.value)
     }
     
     function handleOption1Change(e){
        setOption1(e.target.value)
     }
     
     function handleOption2Change(e){
        setOption2(e.target.value)
     }

     function handleOption3Change(e){
        setOption3(e.target.value)
     }

     function handleOption4Change(e){
        setOption4(e.target.value)
     }
    function handleCorrectAnswerChange(e){
        console.log(e.target.value)
        setCorrectAnswer(e.target.value)
 
    }

    return (
        <>
        <form className="form" id="add-question-form"   onSubmit={handlleCreateNewQuiz}> 
            
            <label> Question :</label>
            <input onChange={handleQuestionChange} type="text" id="question" value={question} name = "question" required/>
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

            {type === "short-answer"? (<> 
            <label> Correct Answer </label>
            <input onChange={handleShortAnswerChange} type='text' id="short-answer-correct_answer" value={correct_answer}></input>
            </>):(
                <>
                <input onChange={handleCorrectAnswerChange} type="radio" id="correct_answer" name="correct_answer" value={option1}/>
                    <label>answer choice 1 </label>
                    <input onChange ={handleOption1Change}type='text' id="option-1" value={option1}></input><br /><br />

                <input onChange={handleCorrectAnswerChange} type="radio" id="correct_answer" name="correct_answer" value={option2}/>
                    <label>answer choice 2 </label>
                    <input onChange ={handleOption2Change} type='text' id="option-2" value={option2}></input><br /><br />

                <input onChange={handleCorrectAnswerChange} type="radio" id="correct_answer" name="correct_answer" value={option3}/>
                    <label>answer choice 3 </label>
                    <input onChange ={handleOption3Change} type='text' id="option-3" value={option3}></input><br /><br />

                <input onChange={handleCorrectAnswerChange} type="radio" id="correct_answer" name="correct_answer" value={option4}/>
                    <label>answer choice 4 </label>
                    <input onChange ={handleOption4Change} type='text' id="option-4" value={option4}></input><br /><br />
                </>)}
            <input type="submit" value="submit" className = "button" id="submitNewQuiz"/>
            </form>


        </>
)
}

export default AddQuestionForm;