import React,{useContext} from 'react';
import UserContext from '../UserContext';
import Header from '../components/Header';
import { useNavigate} from "react-router-dom"
import LoginStudentCard from '../components/LoginStudentCard';


function Section(){
    const context = useContext(UserContext)
    const navigate = useNavigate();


    function redirectHome(){
        context.setMySection(null)
        context.setUser(null)
        navigate('/')
    }
    return(
        <>
        <Header/>
        <h2>Welcome!</h2>
        <button onClick={redirectHome} id="different-class-btn" className="action-btn" >Choose a different class</button>
        <br/>
        {context.mySection.students.map(student=>{
            return(
                <LoginStudentCard  student={student} key={student.id}/>)}
        )}
        </>
    )
    }
    

export default Section;

