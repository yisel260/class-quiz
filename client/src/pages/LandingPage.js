
import React,{useContext} from 'react';
//import Header from '../components/Header';
//import SignUpForm from '../components/SignUpForm';
import TeacherLogin from'../components/TeacherLogin';
import TeacherHome from './TeacherHome';
import StudentHome from './StudentHome';
import { useFormik } from 'formik';
import { useOutletContext } from 'react-router-dom';
import UserContext from '../UserContext';
import Section from './Section';
import { useNavigate} from "react-router-dom"



function LandingPage() {
    const context = useContext(UserContext);
    const navigate = useNavigate();


    const onSingUpClick=()=>{
        navigate('/sign-up')
    }


    const formik = useFormik({
      initialValues: {
          sectionCode: "",
      },
      onSubmit: (values,{resetForm}) => {
          fetch(`/sections/${values.sectionCode}`)
              .then((res) => {
                  if (res.ok) {
                      res.json().then((data) => {
                          context.setSectionSelected(data);
                      });
                  } else {
                      alert("Ooopsie that class code could not be found.");
                  }
                  resetForm()
              });
      },
  });

  if (context.user) {
      if (context.user.role === 'teacher') {
          return <TeacherHome />;
      } else if (context.user.role === 'student') {
        return <StudentHome />;
      }
    }
    else if (context.sectionSelected) {
          return <Section />;
      }
     else {
      return (
          <>
              <main>
                  <h1 className='banners' id='welcome'>Welcome to Class Quiz!</h1>
                  <div className="login-sections" id="student-section">
                  <h2 className='section-banner'>I am a student:</h2>
                      <form className='forms' id='student-login-form' onSubmit={formik.handleSubmit}>
                          <label>Class code:</label>
                          <input
                              type="text"
                              className="form-control"
                              id="sectionCode"
                              name="sectionCode"
                              value={formik.values.sectionCode}
                              onChange={formik.handleChange}
                              placeholder=""
                          />
                          <input className="action-btn" id="submit-class-code" type="submit" value="Go!" />
                      </form>
                  </div>
                  <div className="login-sections" id="teacher-section">
                  <h2 className='section-banner'>I am a teacher:</h2>
                      <TeacherLogin />
                      <br/>
                      <button className="action-btn" id="sign-up" onClick={onSingUpClick}>Sign Up</button>
                  </div>
              </main>
          </>
      );
  }
}

export default LandingPage;

