// import "./component.css"
import React, { useEffect, useState, useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useOutletContext } from "react-router-dom";
import { useNavigate} from "react-router-dom"
import UserContext from "../UserContext";

function SignUpForm(){

  const context = useContext(UserContext)
  console.log(context)


    const formSchema= yup.object().shape(
    {
      fname: yup.string().required("must enter a name").max(20),
      lname: yup.string().required("must enter a last name").max(20),
      email: yup.string().email("Invalid email").required("Must enter email"),
      school: yup.string().required("must enter a school name")
    })
  
    const formik = useFormik({
        initialValues: {
            fname: "",
            lname: "",
            email: "",
            school: "",
            password: "",
            role:"teacher"
        },
        validationSchema: formSchema,
        onSubmit: (values, {resetForm}) => {
            fetch("/teachers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values, null, 2),
            }).then((res) => {
                if (res.status === 201) {
                    fetch("/teacherlogin", {
                        method: "POST",
                        headers: {
                        "Content-Type": "application/json",
                        },
                        body: JSON.stringify(values, null, 2),
                    }).then((r) => {
                    if (r.ok) {
                    console.log("Response status:", r.status);
                    r.json().then((user) => context.onLogin(user));
                    } else {
                    console.log("Response not ok");
                    }
                })
                }else {
                   alert("Something went wrong please double check your infomation and try again")
                }
            });
                      
             }
            }
          )


   return( <>
    <div id="sign-up">
    <h3>Sign up</h3>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="fname">First Name: </label>
          <input
            id="fname"
            name="fname"
            onChange={formik.handleChange}
            value={formik.values.fname}
          /> 
          <p style={{ color: "red" }}> {formik.errors.fname}</p>


          <label htmlFor="lname">Last Name: </label>
          <input
            id="lname"
            name="lname"
            onChange={formik.handleChange}
            value={formik.values.lname}
          />
          <p style={{ color: "red" }}> {formik.errors.lname}</p>

          <label htmlFor="school">School: </label>
          <input
            id="school"
            name="school"
            onChange={formik.handleChange}
            value={formik.values.school}
          />
          <p style={{ color: "red" }}> {formik.errors.school}</p>

          <label htmlFor="email">E-mail: </label>
          <input
            id="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            
          />
          <p style={{ color: "red" }}> {formik.errors.email}</p>
          
          <label htmlFor="password">Password: </label>
          <input
            type="text"
            id="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            
          />
          <br/>
          <br/>

          <button className="action-btn" type="submit">Submit</button>

        
      </form>
    </div>
    </>
)}
export default SignUpForm;