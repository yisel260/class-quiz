import React,{useContext} from 'react';
import { useFormik} from "formik";
import UserContext from '../UserContext';


function EditQuiz(){

    const context =useContext(UserContext)

    console.log(context.selectedQuiz.title)
    const formik = useFormik({
        initialValues: {
            title:`${context.selectedQuiz.title}`,
            description:`${context.selectedQuiz.description}`,
            category:`${context.selectedQuiz.category}` ,
            point_value:`${context.selectedQuiz.point_value}`,
            passing_score:`${context.selectedQuiz.passing_score}`,
            retry:`${context.selectedQuiz.retry}`,
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
                console.log(data);
                // setNewQuiz(data)
                // setQuizId(data.id)
                context.getQuizzes(context.user.id)
                context.setSelectedQuiz(data)
            })
            resetForm();
        }
    })
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
        </form>
        </>)
} 

export default EditQuiz;