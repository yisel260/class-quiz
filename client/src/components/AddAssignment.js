import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../UserContext';

function AddAssignment({ setAddAssignment }) {
    const context = useContext(UserContext);
    useEffect(() => {
        const assignedStudents = context.classAssignments
            .filter(assignment => assignment.quiz_id === context.selectedQuiz.id)
            .map(assignment => assignment.student_id);
        context.setSelectedStudents(assignedStudents);
    }, [context.selectedQuiz, context.assignments]); 

    const handleStudentChange = (studentId) => {
        context.setSelectedStudents(prevSelected => {
            if (prevSelected.includes(studentId)) {
                return prevSelected.filter(id => id !== studentId);
            } else {
                return [...prevSelected, studentId];
            }
        });
    };

    function createAssignments(e) {
        e.preventDefault();
    
        const alreadyAssignedStudents = context.classAssignments
            .filter(assignment => assignment.quiz_id === context.selectedQuiz.id)
            .map(assignment => assignment.student_id);
    
        const newlySelectedStudents = context.selectedStudents.filter(
            studentId => !alreadyAssignedStudents.includes(studentId)
        );
    
        const fetchPromises = newlySelectedStudents.map(studentId => {
            const newAssignment = {
                student_id: studentId,
                quiz_id: context.selectedQuiz.id,
                score: 0,
                status: "assigned",
            };
            return fetch('/assignments', {
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
        });
    
        Promise.all(fetchPromises)
            .then(() => {
                context.getAssignments(context.sectionSelected.id);
            })
            .finally(() => {
                setAddAssignment(false);
                context.setSelectedStudents([]);
            });
    }

    function selectQuiz(quizId) {
        const quiz = context.quizzes.find(quiz => quiz.id === quizId);
        if (quiz) {
            context.setSelectedQuiz(quiz);
        } else {
            console.error('Quiz not found');
        }
    }

    return (
        <>
            <form onSubmit={createAssignments}>
                <label>Select a quiz:</label>
                <select name="quiz_id" onChange={(e) => selectQuiz(parseInt(e.target.value))}>
                    {context.user.quizzes.map(quiz => (
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
                            disabled={context.selectedStudents.includes(student.id)}
                            onChange={() => handleStudentChange(student.id)}
                        />
                        <label>{student.name}</label>
                    </div>
                ))}
                <button>Add Assignment</button>
            </form>
        </>
    );
}

export default AddAssignment;