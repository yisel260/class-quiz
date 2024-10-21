import React,{useContext, useState} from 'react';
import UserContext from '../UserContext';


function AddAssignment({setAddAssignment}){
    const context = useContext(UserContext)
    const [selectedStudents,setSelectedStudents]=useState([])


    //display form select quiz and then choose students
    //set selected quiz to chosen quiz
    //add each student to an array 
    //cycle through array and add one assignment for each student with quiz selected id  = quiz_id
    //update display 

    const handleStudentChange = (studentId) => {
        setSelectedStudents(prevSelected => {
            if (prevSelected.includes(studentId)) {
                return prevSelected.filter(id => id !== studentId);
            } else {
                return [...prevSelected, studentId];
            }
        });
    };

    function createAssignments(e){
        console.log('createAssignments called');
        e.preventDefault()
        selectedStudents.forEach(studentId => {
            const newAssignment = {
                student_id: studentId,
                quiz_id: context.selectedQuiz.id,
                score: 0,
                status:"assigned",
        
            }
            fetch('/assignments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newAssignment),
            })
           .then(res => res.json())
           .then(data => {
                console.log('Success:', data);
            })
           .catch((error) => {
                console.error('Error:', error);
            });
            context.getAssignments(context.sectionSelected.id)
            

        })
        setAddAssignment(false)
    }    

    function selectQuiz(quizId) {
        const quiz = context.quizzes.find(quiz => quiz.id === quizId);
        if (quiz) {
            context.setSelectedQuiz(quiz);
        } else {
            console.error('Quiz not found');
        }
    }

    console.log(context.selectedQuiz)
    
    return(<>
    <form onSubmit={(e)=>{createAssignments(e)}}type="submit">
        <label>Select a quiz:</label>
        <select name="quiz_id" onChange={(e)=>selectQuiz(parseInt(e.target.value))}>
        {context.user.quizzes.map(quiz =>(
            <option key={quiz.id} value={quiz.id}>{quiz.title}</option>
        ))}
        </select>
        <br/>
        <label>Select students:</label>
        {context.sectionSelected.students.map(student => (
    <div key={student.id}>
        <input 
            type="checkbox" 
            value={student.id} 
            checked={selectedStudents.includes(student.id)}
            onChange={() => handleStudentChange(student.id)}
        />
        <label>{student.name}</label>
    </div>
        ))}
        <button>Add Assignment</button>
    </form>
    </>)
}
export default AddAssignment