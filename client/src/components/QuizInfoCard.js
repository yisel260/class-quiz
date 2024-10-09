import React,{useContext} from 'react';
import UserContext from '../UserContext';

function QuizInforCard(){
    const context = useContext(UserContext)
    console.log(context.selectedQuiz)
    return(
        <>
        <div>
        <p>{context.selectedQuiz.title}</p>
        <p>{context.selectedQuiz.description}</p>
        <p>{context.selectedQuiz.category}</p>
        <p>{context.selectedQuiz.passing_score}</p>
        </div>
        </>
        
    )
    
}

export default QuizInforCard