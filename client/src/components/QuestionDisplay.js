import React,{useContext} from 'react';
import UserContext from '../UserContext';

function QuestionDisplay(question){
    const context = useContext(UserContext)
    return(
        <>
        <div key = {question.id}>
        <p>{question.question}</p>
        {question.options.map((option)=>{
            return(
                <p key={option.id}>{option}</p>
            )
        })}
        </div>
        </>
        
    )
    
}

export default QuestionDisplay