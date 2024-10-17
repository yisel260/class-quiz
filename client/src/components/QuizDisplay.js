import React,{useContext} from 'react';
import UserContext from '../UserContext';

function QuizDisplay(){
    const context = useContext(UserContext)
    return(
        <>
        {context.selectedQuiz?(<>
        <div>
        <p>{context.selectedQuiz.title}</p>
        <p>{context.selectedQuiz.description}</p>
        <p>{context.selectedQuiz.category}</p>
        <p>{context.selectedQuiz.passing_score}</p>
        </div>
        {context.selectedQuiz.questions.map((question) => {
            return (
                <div key={question.id}>
                    <p>{question.question}</p>

                    {question.type === "multiple-choice" ? (
                        question.options.map((option) => (
                            <p key={option.id}>{option.option}</p>
                        ))
                    ) : (
                        <p>{question.correct_answer}</p>
                    )}
                </div>
                );
            })}
     </>):null}
        </>
        
    )
    
}

export default QuizDisplay