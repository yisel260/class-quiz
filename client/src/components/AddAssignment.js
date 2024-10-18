import React,{useContext, useState} from 'react';
import UserContext from '../UserContext';


function AddAssignment(){

    const context = useContext(UserContext)
    const [selectedStudents,setSelectedStudents]=useState([])

    //display form select quiz and then choose students
    //set selected quiz to chosen quiz
    //add each student to an array 
    //cycle through array and add one assignment for each student with quiz selected id  = quiz_id
    //update display 



    return(<>
    <form>
        <label>Select a quiz:</label>
        <select name="quiz_id" onChange={(e)=>context.setSelectedQuiz(parseInt(e.target.value))}>
        {context.user.quizzes.map(quiz =>(
            <option key={quiz.id} value={quiz.id}>{quiz.title}</option>
        ))}
        </select>
        <label>Select students:</label>
        <select multiple name="students" onChange={(e) => {
           const selectedValues = Array.from(e.target.selectedOptions, option => parseInt(option.value));
           setSelectedStudents(selectedValues);
           console.log(selectedStudents)
       }}>
        {context.sectionSelected.students.map(student =>(
            <option key={student.id} value={student.id}>{student.name}</option>
        ))}
        </select>
        <button type="submit">Add Assignment</button>
    </form>
    </>)
}
export default AddAssignment