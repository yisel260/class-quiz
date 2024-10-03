import React from 'react';

function StudentCard({ student }) {
    return (
        <div id="student-card">
            <p id="student-name">{student.name}</p>
            {student.assignments.map((assignment, index) => {
                return (
                    <React.Fragment key={assignment.id}>
                        <p id='quiz-title'>{assignment.quiz.title}</p>
                        {assignment.status == "assigned"?( <p id='quiz-status'>{assignment.status}</p>):(<>{assignment.score}</>)}
                    </React.Fragment>
                );
            })}
            <br />
        </div>
    );
}

export default StudentCard