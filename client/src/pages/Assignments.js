import React, { useContext, useMemo, useState } from 'react';
import UserContext from '../UserContext';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import AddAssignment from '../components/AddAssignment';



function Assignments() {
   console.log('Assignments being rendered')
   
    
    const context = useContext(UserContext);
    const [addAssignment,setAddAssignment ]= useState(false)


    function onDelete(quizId) {
      console.log("delete assignment called");
      const assignmentsToDelete = context.classAssignments.filter(
          (assignment) => assignment.quiz_id === quizId
      );
      console.log(assignmentsToDelete);
  
      const fetchPromises = assignmentsToDelete.map((assignment) => {
          return fetch(`/assignments/${assignment.id}`, {
              method: 'DELETE',
          });
      });
  
      Promise.all(fetchPromises)
          .then(() => {
              context.getAssignments(context.sectionSelected.id);
          })
          .catch((error) => {
              console.error('Error deleting assignments:', error);
          });
  }
    

    

    function doneAddingAssignments(){
      setAddAssignment(false)
    }

    function onAddStudentsToAssignment(quiz){
      context.setSelectedQuiz(quiz)
      setAddAssignment(true)
 

    }

    function deleteAssingment(student,quiz){
      console.log("delete assignment called")
      const assignment = context.classAssignments.find((assignment) => assignment.quiz_id === quiz.id && assignment.student_id === student.id)
      console.log(assignment)
      fetch(`/assignments/${assignment.id}`, {
        method: 'delete',
      })
        .then((res) => {
          if (res.ok) {
            context.getAssignments(context.sectionSelected.id);
          }
        });
      };
      
    return (
      <>
        <Header />
        <NavBar />
    
        {!context.user.quizzes || !context.classAssignments ? (
          <div>Loading...</div>
        ) : (
          <>
            {addAssignment ? (
              <>
                <AddAssignment setAddAssignment={setAddAssignment} />
                <button onClick={doneAddingAssignments} className="action-btn">
                  Finished
                </button>
              </>
            ) : (null)}
      
            <div className='container'>
              {context.user.quizzes.map((quiz) => {
                const students = context.classAssignments
                  .filter((assignment) => assignment.quiz_id === quiz.id)
                  .map((assignment) => {
                    const student = context.sectionSelected.students.find(
                      (student) => student.id === assignment.student_id
                    );
                    return student ? student : 'Unknown';
                  });
    
                const uniqueStudents = [...new Set(students)];

                return (
                  
                  <div className="assignments-by-quiz-container"key={quiz.id}>
                    <h3 className='asignment-quiz-title'>{quiz.title}</h3>
                    <div className='student-names-container'>{uniqueStudents.length > 0
                      ? (<>
                      {uniqueStudents.map((student)=>{
                        return <div className='assignment-card' key={student.id}>
                          <p> {student.name}</p><button className='mini-action-btn' onClick={()=>deleteAssingment(student,quiz)}>delete</button>
                        </div>
                      })}
                      </>)
                      : <div className='assignment-card' >No students assigned</div>}
                    </div>
                    <br/>
                    <button
                      className="mini-action-btn"
                      onClick={() => onAddStudentsToAssignment(quiz)}
                    >
                    
                      Add Students 
                    </button>
                    <button
                      className="mini-action-btn"
                      onClick={() => onDelete(quiz.id)}
                    >
                      Delete
                    </button>
                  </div>
  
                );
              })}
            </div>
          </>
        )}
      </>
    );
}

export default Assignments;