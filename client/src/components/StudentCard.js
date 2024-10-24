import React from 'react';

function StudentCard({ student }) {
    return (
        <div className="student-card">
            <p className="student-name">{student.name}</p>
            {student.assignments.map((assignment, index) => {
                return (
                    <React.Fragment key={assignment.id}>
                    <p className='quiz-title'>{assignment.quiz.title}</p>
                    {assignment.status === "assigned" ? (<p>Assigned</p>                    
                    ) : (
                    assignment.score >= assignment.quiz.passing_score ? (
                        <p>Completed</p>
                    ) : (
                        <p>Attempted</p>
                    ))}
                    <p> score:{assignment.score}/{assignment.quiz.questions.length}</p>
                    </React.Fragment>)})}
        </div>
    );
}

export default StudentCard