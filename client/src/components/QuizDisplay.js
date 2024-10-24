import React,{useContext} from 'react';
import UserContext from '../UserContext';
import EditQuestionForm from '../components/EditQuestionForm';
import AddQuestionForm from "../components/AddQuestionForm";


function QuizDisplay(){
    const context = useContext(UserContext)

    function deleteQuestion(id) {
        fetch(`/questions/${id}`, {
            method: 'delete',
          })
            .then((res) => {
              if (res.ok) {
                context.getQuestions(context.selectedQuiz.id);
                console.log(context.selectedQuiz.id)
                context.setSelectedQuestion(null)
              }
            });
    }

    function onDelete() {
        fetch(`/quizzes/${context.selectedQuiz.id}`, {
            method: 'delete',
          })
            .then((res) => {
              if (res.ok) {
                context.getQuizzes(context.user.id);
                context.setSelectedQuiz(null)
                context.setShowQuiz(false)
              }
            });
    }

    function onEditClick(){
        context.setEditQuiz(true)
        context.setShowQuiz(false)
    }

    return(
        <>
        {context.selectedQuiz?(<>
        <div id='quiz-display-container'>
        <h2>{context.selectedQuiz.title}</h2>
        <p>{context.selectedQuiz.description}</p>
        <p>{context.selectedQuiz.category}</p>
        <p>Passing Score: {context.selectedQuiz.passing_score}</p>
        <button className= "action-btn" onClick={()=>onEditClick(context.selectedQuiz.id)}>Edit Quiz</button>
    <button className= "action-btn" onClick={()=>onDelete(context.setSelectedQuiz.id)}>Delete Quiz</button>
        </div>
        {context.selectedQuiz.questions.map((question) => {
         if (context.editedQuestion && question.id === context.editedQuestion.id) {
            return(<EditQuestionForm/>)}
         else {
            return (
                <div className='quiz-display-question-container' key = {question.id}>
                       <h2>{question.question}</h2>
                       <div>
                       {question.type ==="multiple-choice"?(<>
                        {
                        question.options.map((option)=>{
                            return(
                                
                                <p className={
                                    option.option === question.correct_answer ? "correct" : "incorrect"
                                }key={option.id}>{option.option}</p>
                            )
                            })
                       }
                       </>):(<>{question.correct_answer}</>)}

                       </div>
                       <br/>
                        <button className='mini-action-btn' onClick={()=>deleteQuestion(question.id)}>Delete Question</button>
                        <button className='mini-action-btn' onClick={()=>context.setEditedQuestion(question)}>Edit Question</button>
                       
                   </div>)
            }
        })}
     </>):null}
        </>
        
    )
    
}

export default QuizDisplay