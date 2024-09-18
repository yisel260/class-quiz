import React from 'react';

function StudentCard({ student }) {
    return (
        <div id="student-card">
            <p id="student-name">{student.name}</p>
            {student.assignments.map((assignment, index) => {
                return (
                    <React.Fragment key={assignment.id}>
                        <p>{assignment.quiz.title}</p>
                        <p>{assignment.status}</p>
                    </React.Fragment>
                );
            })}
            <br />
        </div>
    );
}

export default StudentCard