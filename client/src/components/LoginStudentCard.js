import React,{useContext, useEffect, useState} from 'react';
import { useFormik } from "formik";
import UserContext from '../UserContext'


function LoginStudentCard({student}){
    const context = useContext(UserContext)


    const formik = useFormik({
        initialValues: {
          password: "",
          studentUserName:`${student.name}`,
        },
          onSubmit:(values)=>{
            fetch("/studentlogin", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
              }).then((r) => {
                if (r.ok) {
                  r.json().then((studentUser) =>{
                    context.setUser(studentUser)
                  });
                }
                else {
                  alert("oopsie that is not correct!")
                }
              }); 
          }});
     return(
        <div id='student-login-card-container'>
                <div id="student-login-card" key={student.id}>
                    <p id="student-login-name" >{student.name}</p> 
                    <form onSubmit={formik.handleSubmit}>
                      <input type='hidden' id="name" name="name" value={formik.studentUserName}></input>
                      <label>password:</label>
                      <input type="text" 
                      id="password"
                      name="password"
                      value={formik.values.password} 
                      onChange={formik.handleChange}
                      placeholder=""></input>
                      <input id="student-login-btn" className="action-button" type="submit" value = "log in!"/>
                    </form>
                </div>   
        
        </div>
)}

export default LoginStudentCard