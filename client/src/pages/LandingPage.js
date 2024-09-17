
import React,{useContext} from 'react';
//import Header from '../components/Header';
//import SignUpForm from '../components/SignUpForm';
import TeacherLogin from'../components/TeacherLogin';
import TeacherHome from './TeacherHome';
import StudentHome from './StudentHome';
import { useFormik } from 'formik';
import { useOutletContext } from 'react-router-dom';
import UserContext from '../UserContext';


function LandingPage(){

    const context = useContext(UserContext)

    // function handleLogin(user) {
    //    context.setUser(user);
    //   }

    const formik = useFormik(
        {
          initialValues:{
            sectionCode:"",
          },
          onSubmit: (values)=>{
            console.log(values.sectionCode)
            fetch(`/sections/${values.sectionCode}`)
            .then((res) =>{
              if (res.ok){
                res.json()
            //     .then((data) => {
            //       context.setSection(data.id)
            //   })
              }
              else {
                alert("Ooopsie that class code could not be found. ")
              }
            })
          }
        }
      )

    if (context.user){
      if (context.user.role === 'teacher'){
          return (
              <TeacherHome/>
      );
      }else if (context.user.role === "student"){
          return <StudentHome/>
      }
  }else {
    return (
        <>
        <p>This is the landing page</p>
          {/* <header>
              <Header />
          </header> */}
          <main>
            <h1>Welcome to Class Quiz! </h1>
            <h2 className='section-banner'>I am a student:</h2> 
               <div id="student-section">
                  <form onSubmit={formik.handleSubmit}>
                    <label>Class code:</label>
                    <input type="text" 
                    className="form-control" 
                    id="senctionCode"
                    name="sectionCode"
                    value={formik.values.sectionCode} 
                    onChange={formik.handleChange}
                    placeholder=""></input>
                    <input className="action-button" type="submit" value = "Go!"/>
                  </form>
                </div>
            <h2 className='section-banner'>I am a teacher:</h2> 
            <div id="teacher-section">
                <TeacherLogin />
                <p>I don't have an account</p> 
            </div>
            </main>
          </>
    
      )
}}

export default LandingPage