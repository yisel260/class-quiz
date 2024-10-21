import React, { useContext, useMemo, useState } from 'react';
import UserContext from '../UserContext';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import AddAssignment from '../components/AddAssignment';
import EditAssignment from '../components/EditAssignment';


// instead of displayign the student asssignments we should display the assignments by quiz instead  and  then the names of the students assigned to it 

function Assignments() {
   console.log('Assignments being rendered')
   
    
    const context = useContext(UserContext);
    const [addAssignment,setAddAssignment ]= useState(false)
    const [editAssignment,setEditAssignment ]= useState(false)


    function onDelete(quizId) {
      console.log("delete assignment called")
       const assignmentsToDelete = context.classAssignments.filter((assignment) => assignment.quiz_id === quizId)
        console.log(assignmentsToDelete)
        assignmentsToDelete.forEach(assignment=>{
          fetch(`/assignments/${assignment.id}`, {
            method: 'DELETE',
          })})
            context.getAssignments(context.sectionSelected.id);
            };
    

    function onAddAssignment(){
      context.setSelectedQuiz(context.quizzes[0])
      setAddAssignment(true)
    }

    function doneAddingAssignments(){
      setAddAssignment(false)
    }

    function onAddStudentsToAssignment(quiz){
      context.setSelectedQuiz(quiz)
      setAddAssignment(true)
      // const assignment =context.classAssignments.filter(assignment => assignment.id === id)
      // console.log(assignment)
      // context.setSelectedAssignment(assignment[0])
      // setEditAssignment(true)

    }

    function deleteAssingment(student,quiz){
      console.log("delete assignment called")
      console.log(student)
      console.log(quiz)

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
    
            {editAssignment && <EditAssignment />}
    
            <div>
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
                  <div className="assingment-card-container">

                  <div className = "assingment-card" key={quiz.id}>
                    <h3>{quiz.title}</h3>
                    <div id='student-names-container'>{uniqueStudents.length > 0
                      ? (<>
                      {uniqueStudents.map((student)=>{
                        return <div key={student.id}>
                          <p> {student.name}</p><button onClick={()=>deleteAssingment(student,quiz)}>delete</button>
                        </div>
                      })}
                      </>)
                      : 'No students assigned'}
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