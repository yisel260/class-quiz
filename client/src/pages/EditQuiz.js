import React,{useContext, useState} from 'react';
import { useFormik} from "formik";
import UserContext from '../UserContext';
import AddQuestionForm from "../components/AddQuestionForm";
import EditQuestionForm from '../components/EditQuestionForm';


function EditQuiz({setEditQuiz,setShowQuiz}){

    const context =useContext(UserContext)

    const formik = useFormik({
        initialValues: {
            title: `${context.selectedQuiz.title}`,
            description: `${context.selectedQuiz.description}`,
            category: `${context.selectedQuiz.category}`,
            point_value: `${context.selectedQuiz.point_value}`,
            passing_score: `${context.selectedQuiz.passing_score}`,
            retry: context.selectedQuiz.retry,
            teacher_id: `${context.user.id}`,
        },
        onSubmit: (values, { resetForm }) => {
            values.retry = values.retry === "true";
    
            fetch(`/quizzes/${context.selectedQuiz.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            })
                .then((res) => res.json())
                .then((data) => {
                    context.getQuizzes(context.user.id);
                    context.setSelectedQuiz(data);
                });
            resetForm();
            context.setEditQuiz(false);
            context.setShowQuiz(true)
        },
    });

    
    return( 
        <>
        
        <form  onSubmit={formik.handleSubmit} id="add-prize-form">

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
        <br/>
        <br/>
        <label className="form-label" htmlFor="passing_score">Passing Score</label>
        <input onChange={formik.handleChange}
                type="number" min = "1" 
                max={context.selectedQuiz.questions.length} 
                id="passing_score" value={formik.values.passing_score}>
                    
                </input><p>/{context.selectedQuiz.questions.length}</p>
       
      
       <p role="group" aria-labelledby="my-radio-group">Allow students to retry?</p>
            <label>
                <input
                    type="radio"
                    name="retry"
                    value="true"
                    checked={formik.values.retry === true}
                    onChange={() => formik.setFieldValue('retry', true)}
                />
                Yes
            </label>
            <label>
                <input
                    type="radio"
                    name="retry"
                    value="false"
                    checked={formik.values.retry === false}
                    onChange={() => formik.setFieldValue('retry', false)}
                />
                No
            </label>
        <br /><br />
        <input type="hidden"
         id='teacher_id'
         onChange={formik.handleChange}
         value={formik.values.teacher_id}></input>
         <input className='action-btn' type="submit" value = "save quiz"/>
            </form>

        </>)
} 

export default EditQuiz;