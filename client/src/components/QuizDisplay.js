import React,{useContext} from 'react';
import UserContext from '../UserContext';

function QuizDisplay(){
    const context = useContext(UserContext)
    console.log(context.selectedQuiz.questions)
    return(
        <>
        <div>
        <p>{context.selectedQuiz.title}</p>
        <p>{context.selectedQuiz.description}</p>
        <p>{context.selectedQuiz.category}</p>
        <p>{context.selectedQuiz.passing_score}</p>
        </div>
        
        {context.selectedQuiz.questions.map((question) => {
         return (
         <div key = {question.id}>
            <p>{question.question}</p>
                {question.options.map((option)=>{
                return(
                    <p key={option.id}>{option.option}</p>
                )
                })}
        </div>)})}
        </>
        
    )
    
}

export default QuizDisplay