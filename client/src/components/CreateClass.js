import React, {useEffect, useContext} from 'react';
import UserContext from '../UserContext';
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from "yup"

function CreateClass(){
      const navigate = useNavigate();

    const context = useContext(UserContext)
    console.log(context)
    const formSchema= yup.object().shape(
    {
      name: yup.string().required("You must enter a clasname").max(20),
      section_code: yup.string().required(
        "You must enter a classcode, think of something unique but easy to remember for students").max(20),
    })

const formik = useFormik({
    initialValues: {
        name:"",
        section_code:"", 
        teacher_id:`${context.user.id}`
    },
    validationSchema: formSchema,
    onSubmit:(values,{resetForm})=>{
        fetch(`/sections/${values.section_code}`)
        .then(res=>{
            if (res.ok){
                alert("A class with this class code already exist. Please try again, think of something unique but easy to remember for your students")
            }
            else {
                fetch ("/sections",{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values,null,2),
                })
                .then((res)=>res.json())
                .then((section)=>{
                    console.log(section)
                    context.setSectionSelected(section)
                    context.getSections(context.user)
                    context.getStudents(section.id)

                })
                resetForm();
            }
            return navigate("/manageclasses");

        })

     }

    })
return(
    


    <div className="form-container">
    <br/>
    <h3>Add a class </h3>

    < form id= "add-section-form" onSubmit={formik.handleSubmit}>
        <label htmlFor='name'>Class Name:</label>
        <input 
        type='text'
        name='name'
        value={formik.values.name}
        onChange={formik.handleChange}
         />
        <p style={{ color: "red" }}> {formik.errors.name}</p>

        <label htmlFor='section_code'>Class Code:</label>
        <input 
        type='text'
        name='section_code'
        value={formik.values.section_code}
        onChange={formik.handleChange}
         /> 
        <p style={{ color: "BLue" }}> {formik.errors.section_code}</p>

        <label htmlFor='teacher_id'></label>
        <input 
        type='hidden'
        name='teacher_id'
        value={formik.values.teacher_id}
        onChange={formik.handleChange}
         />
        <button className="action-button" type="submit">Submit</button>
    </form>
    </div>

)
}


export default CreateClass;