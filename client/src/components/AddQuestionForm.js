import React,{useContext, useState} from 'react';
import { useFormik} from "formik";
import * as yup from "yup";
import { useOutletContext } from 'react-router-dom';
import UserContext from '../UserContext';
import AddStudentForm from './AddStudentForm';


function AddQuestionForm(){

    const context =useContext(UserContext)
    console.log(context.selectedQuiz)
    const formik = useFormik({
        initialValues: {
            question:"",
            type:"",
            correct_answer:"", 
            quiz_id:`${context.selectedQuiz.id}`
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
                console.log(data);
                context.setSelectedQuiz(data)
            })
            resetForm();
        }
    })

    return (
        <>
         <form  onSubmit={formik.handleSubmit} id="add-question-form">
            <label className="form-label" htmlFor = "title">Question: </label>
            <input type="text"
            id='question'
            onChange={formik.handleChange}
            value={formik.values.question}></input>
            <br/>
            <br/>
           <p role="group" aria-labelledby="my-radio-group">type of question: </p>
            <label>
                <input
                    type="radio"
                    name="type"
                    value={true}
                    onChange={formik.handleChange}
                />
                Multiple Choice
            </label>
            <label>
                <input
                    type="radio"
                    name="type"
                    value={false}
                    onChange={formik.handleChange}
                />
                Short Answer
            </label>
            <br /><br />

            <label className="form-label" htmlFor="teacher_id"> teacher id</label>
            <input type="text"
             id='teacher_id'
             onChange={formik.handleChange}
             value={formik.values.teacher_id}></input>
            <input className='action-btn' type="submit" value = "save quiz"/>
            </form>
        </>
)
}

export default AddQuestionForm;