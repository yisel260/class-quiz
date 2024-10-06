import React,{useContext} from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {useOutletContext } from "react-router-dom";
import UserContext from "../UserContext";

function EditStudentForm({selectedStudent, editStudent, setEditStudent}){
  const context = useContext(UserContext)
  console.log(context.sectionSelected)
  console.log(selectedStudent)

  
    const formSchema= yup.object().shape(
    {
      name: yup.string().required("You must enter a student name").max(20),
      password: yup.string().required("You must enter a pasword").max(20),
      section_id: yup.number().required(),
      role: yup.string().required()
    })

    console.log(context.sectionSelected.id)

  const formik = useFormik({
      initialValues: {
        name: `${selectedStudent.name}`,
        password:`${selectedStudent.password}`,
        role:"student",
        section_id:context.sectionSelected.id,
      },
    //   validationSchema: formSchema,
      onSubmit: (values,{resetForm}) => {
        console.log("submit called")
        fetch(`/students/${selectedStudent.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values, null, 2),
        })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          context.getStudents(context.sectionSelected.id);
          setEditStudent(false)
          
        })
        resetForm()
      }
      })
return (
    <>
    
   <br/><br/>
    <div className="form-container">
    <h3>Edit student</h3>

    <form id= "add-student-form" onSubmit={formik.handleSubmit}>
        <label htmlFor="name"> Name: </label>
        <input
        id="name"
        name="name"
        onChange={formik.handleChange}
        value={formik.values.name}
        />
        <p style={{ color: "red" }}> {formik.errors.name}</p>


        <label htmlFor="password">Password: </label>
        <input
        id="password"
        name="password"
        onChange={formik.handleChange}
        value={formik.values.password}
        />

        <p style={{ color: "red" }}> {formik.errors.password}</p>

        <input
        type="hidden"
        id="section_id"
        name="section_id"
        onChange={formik.handleChange}
        value={formik.values.section_id}
        />

        <input
        type="hidden"
        id="role"
        name="role"
        onChange={formik.handleChange}
        value={formik.values.role}
        />
        <button className="action-btn" type="submit">Finished</button>
        </form>
        </div>
        </>
)
}

export default EditStudentForm 