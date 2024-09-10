
import React from 'react';
// import Header from '../components/Header';
//import SignUpForm from '../components/SignUpForm';
//import Login from'../components/Login';
import { useFormik } from 'formik';
//import { useOutletContext } from 'react-router-dom';


function LandingPage(){

    // const context = useOutletContext()

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

    return (
        <>
        <p>This is the landing page</p>
          {/* <header>
              <Header />
          </header> */}
          <main>
            <h1>Welcome to Class Quiz! </h1>
            <div>
                <h2 className='section-banner'>I am a student:</h2> 
            </div>
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
            <div>
            <h2 className='section-banner'>I am a teacher:</h2> 
            </div>
            <div id="teacher-section">
                  <div id="log-in-form" className="section">
                      {/* <Login onLogin={handleLogin}/> */}
                  </div>
                  <div id= "or">
                  <h3>Or</h3>
                  </div>
                  <div id="sign-up-form"className="section">
                      {/* <SignUpForm onLogin={handleLogin}/> */}
                  </div>
              </div>
            </main>
          </>
    
      )
}

export default LandingPage