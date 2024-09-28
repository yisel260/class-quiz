import React,{useContext} from 'react';
import UserContext from '../UserContext';

function StudentHome(){
    const context = useContext(UserContext);
    const quizzes =[]
        
    context.user.assignments.forEach((assignment) => { 
                quizzes.push(assignment.quiz);
        })
        
    
    console.log(quizzes)

    
    return <p> Student Home </p>
} 

export default StudentHome;