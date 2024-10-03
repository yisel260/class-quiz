import React from 'react';
import { useFormik } from "formik";
import * as yup from "yup";
import { useOutletContext } from 'react-router-dom';


function CreateQuiz({setAddPrize}){

    const context =useOutletContext()

    const formik = useFormik({
        initialValues: {
            foto:"",
            description:"",
            point_value:"", 
            inventory:"",
            number_requested:"0",
            teacher_id:`${context.user.id}`,
        },
        onSubmit:(values,{resetForm})=>{
            console.log(context.user.id)
            fetch ("/prizes",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values,null,2),
            })
            .then((res)=>res.json())
            .then((data)=>{
                context.getPrizes(context.user.id)
            })
            resetForm();
            setAddPrize()
        }
    })

    return (
        <>
        <form  onSubmit={formik.handleSubmit} id="add-prize-form">

            <label className="form-label" htmlFor = "prize-foto">Foto</label>
            <input type="text"
            id='foto'
            onChange={formik.handleChange}
            value={formik.values.foto}></input>

            <label className="form-label" htmlFor ="description">Description</label>
            <input type="text"
             id='description'
             onChange={formik.handleChange}
             value={formik.values.description}></input>
            <br/>
            <br/>
            <label className="form-label" htmlFor = "points">Point value</label>
            <input type="text"
             id='point_value'
             onChange={formik.handleChange}
             value={formik.values.point_value}></input>
        

            <label className="form-label" htmlFor="inventory">Number Available</label>
            <input type="text"
             id='inventory'
             onChange={formik.handleChange}
             value={formik.values.inventory}></input>

            <input type="hidden"
            id='number_requested'
             onChange={formik.handleChange}
             value={formik.values.number_requested}></input>

            <input type="hidden"
             id='teacher_id'
             onChange={formik.handleChange}
             value={formik.values.teacher_id}></input>
             <br/>
             <br/>

            <input className='action-button' type="submit" value = "add question"/>
            </form>
        </>
)}

export default CreateQuiz;