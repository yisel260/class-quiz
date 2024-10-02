
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
      console.log("User is present:", context.user);
      if (context.user.role === 'teacher') {
          return <TeacherHome />;
      } else if (context.user.role === 'student') {
        console.log("Student is present:", context.user)
        return <StudentHome />;
      }
    }
    else if (context.sectionSelected) {
          console.log("Section is set:", context.sectionSelected);
          return <Section />;
      }
     else {
      console.log("No user present");
      return (
          <>
              <p>This is the landing page</p>
              <main>
                  <h1>Welcome to Class Quiz!</h1>
                  <h2 className='section-banner'>I am a student:</h2>
                  <div id="student-section">
                      <form onSubmit={formik.handleSubmit}>
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
                          <input className="action-button" type="submit" value="Go!" />
                      </form>
                  </div>
                  <h2 className='section-banner'>I am a teacher:</h2>
                  <div id="teacher-section">
                      <TeacherLogin />
                      <button onClick={onSingUpClick}>I don't have an account</button>
                  </div>
              </main>
          </>
      );
  }
}

export default LandingPage;

