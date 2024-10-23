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
           
            <input type="hidden"
             id='point_value'
             onChange={formik.handleChange}
             value={formik.values.point_value}></input>
           
            <input type="hidden"
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

            <input type="hidden"
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