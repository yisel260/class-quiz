import React,{useContext} from 'react';
import UserContext from '../UserContext';


function EditAssignments({setAddAssignment}){
    const context = useContext(UserContext)


    //display for with previous information about students selected and assigned 
    //allow user to select and diselect student as needed 
    //after user selects all students, click save to update the assignments 
    //add each student to an array 
    //cycle through array and add one assignment for each student with quiz selected id  = quiz_id
    //update display

    const handleStudentChange = (studentId) => {
        context.setSelectedStudents(prevSelected => {
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
        context.selectedStudents.forEach(studentId => {
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
    }    
    
    return(<>
    <form onSubmit={(e)=>{createAssignments(e)}}type="submit">
        <label>Quiz:</label>
        {context.selectedQuiz.title}
        <br/>
        <label>Select students:</label>
        {context.sectionSelected.students.map(student => (
    <div key={student.id}>
        <input 
            type="checkbox" 
            value={student.id} 
            checked={context.selectedStudents.includes(student.id)}
            onChange={() => handleStudentChange(student.id)}
        />
        <label>{student.name}</label>
    </div>
        ))}
        <button>Add Assignment</button>
    </form>
    </>)
}
export default EditAssignments