import React,{useContext, useState} from 'react';
import { useFormik} from "formik";
import * as yup from "yup";
import UserContext from '../UserContext';
import QuizDisplay from '../components/QuizDisplay';
import AddQuestionForm from '../components/AddQuestionForm';


function CreateQuiz(){
    

    const context =useContext(UserContext)


    const formik = useFormik({
        initialValues: {
            title:"",
            description:"",
            category:"", 
            point_value:0,
            passing_score:"",
            retry:false,
            teacher_id:`${context.user.id}`,
        },
        onSubmit:(values,{resetForm})=>{
            fetch ("/quizzes",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values,null,2),
            })
            .then((res)=>res.json())
            .then((data)=>{
                context.getQuizzes(context.user.id)
                context.setSelectedQuiz(data)
                context.setNewQuiz(data)
            })
            resetForm();
        }
    })

    function onAddQuestionClick(){
        context.setAddingQuestion(true)
    }

    function handlleCreateNewQuiz(e){
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
                quiz_id:context.quiz_id,
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
            fetch(`/questions/${question.id}`)
            .then(res => res.json())
            .then(question => {
                context.setNewQuestion(question)
            })
        })    
        // setOptions([])
        context.setAddingQuestion(false)
        context.setQuestionsDisplayed([...context.questionsDisplayed, context.newQuestion])
     }
  
 
    return (
        <>
       {context.newQuiz? 
      ( <>
      <QuizDisplay/>
        <br/>
      <button  onClick= {onAddQuestionClick} className='action-btn'>Add question</button>
      </>)
       :( <form  onSubmit={formik.handleSubmit} id="add-prize-form">

            <label className="form-label" htmlFor = "title">Quiz title</label>
            <input type="text"
            id='title'
            onChange={formik.handleChange}
            value={formik.values.title}></input>
            <br/>
            <br/>
            <label className="form-label" htmlFor ="description">Description</label>
            <input type="text"
             id='description'
             onChange={formik.handleChange}
             value={formik.values.description}></input>
            <br/>
            <br/>
            <label className="form-label" htmlFor = "category">Category</label>
            <input type="text"
             id='category'
             onChange={formik.handleChange}
             value={formik.values.category}></input>
            <br/>
            <br/>
            <label className="form-label" htmlFor = "point_value">Point value</label>
            <input type="text"
             id='point_value'
             onChange={formik.handleChange}
             value={formik.values.point_value}></input>
            <br/>
            <br/>
            <label className="form-label" htmlFor="passing_score">Passing Score</label>
            <input type="text"
             id='passing_score'
             onChange={formik.handleChange}
             value={formik.values.passing_score}></input>
           
          
           <p role="group" aria-labelledby="my-radio-group">Allow students to retry?</p>
            <label>
                <input
                    type="radio"
                    name="picked"
                    value={true}
                    onChange={formik.handleChange}
                />
                Yes
            </label>
            <label>
                <input
                    type="radio"
                    name="picked"
                    value={false}
                    onChange={formik.handleChange}
                />
                No
            </label>
            <br /><br />

            <label className="form-label" htmlFor="teacher_id"> teacher id</label>
            <input type="text"
             id='teacher_id'
             onChange={formik.handleChange}
             value={formik.values.teacher_id}></input>
            <input className='action-btn' type="submit" value = "save quiz"/>
            </form>)}

            {context.addingQuestion?(<>
            <AddQuestionForm/>
            </>):null}


        </>
)}

export default CreateQuiz;