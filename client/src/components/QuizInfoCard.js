import React,{useContext} from 'react';
import UserContext from '../UserContext';

function QuizInforCard(){
    const context = useContext(UserContext)
    console.log(context.selectedQuiz)
    return(
        <>
        <p>QuizInfoCard</p>
        <p>{context.selectedQuiz.title}</p>
        {context.selectedQuiz.description}
        {context.selectedQuiz.category}
        {context.selectedQuiz.passing_score}
        </>
    )
    
}

export default QuizInforCard