import React,{useContext, useState} from 'react';
import { useFormik} from "formik";
import * as yup from "yup";
import UserContext from '../UserContext';
import QuizDisplay from '../components/QuizDisplay';


function CreateQuiz(){
    

    const context =useContext(UserContext)
    console.log(context.selectedQuiz)
    const [addingQuestion,setAddingQuestion]=useState(false)
    const [question,setQuestion]=useState("")
    const [newQuestion, setNewQuestion]=useState("")
    const [newQuiz,setNewQuiz]=useState(null)
    const [type,setType]=useState()
    // const [options,setOptions]=useState()
    const [correct_answer,setCorrectAnswer] = useState()
    const [quiz_id, setQuizId] = useState(context.selectedQuiz?.id || []);
    const [option1,setOption1]=useState("")
    const [option2,setOption2]=useState("")
    const [option3,setOption3]=useState("")
    const [option4,setOption4]=useState("")
    const [questionsDisplayed, setQuestionsDisplayed]=useState(context.selectedQuiz?.questions || [])
    const [shortAnswerAnswer,setShortAnswerAnswer]= useState("")


    const formik = useFormik({
        initialValues: {
            title:"",
            description:"",
            category:"", 
            point_value:0,
            passing_score:"",
            retry:false,
            teacher_id:`${context.user.id}`,
        },
        onSubmit:(values,{resetForm})=>{
            fetch ("/quizzes",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values,null,2),
            })
            .then((res)=>res.json())
            .then((data)=>{
                console.log(data);
                setNewQuiz(data)
                setQuizId(data.id)
                context.getQuizzes(context.user.id)
                context.setSelectedQuiz(data)
            })
            resetForm();
        }
    })

    function onAddQuestionClick(){
        setAddingQuestion(true)
    }

    function handlleCreateNewQuiz(e){
        e.preventDefault()
        fetch(`/questions`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                question:question,
                type:type,
                correct_answer:correct_answer,
                quiz_id:quiz_id,
            })
        })
        .then(res => res.json())
        .then((question) => {
            const options = [`${option1}`,`${option2}`,`${option3}`,`${option4}`]
            options.forEach(option => {
                fetch(`/options`,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        option: option,
                        question_id: question.id
                    })
                })
            })
            fetch(`/questions/${question.id}`)
            .then(res => res.json())
            .then(question => {
                setNewQuestion(question)
            })
        })    
        setQuestion("")
        setType("")
        // setOptions([])
        setCorrectAnswer("")
        setQuizId(context.selectedQuiz.id)
        setOption1("")
        setOption2("")
        setOption3("")
        setOption4("")
        setShortAnswerAnswer("")
        context.getQuiz(context.selectedQuiz.id)
        setAddingQuestion(false)
        setQuestionsDisplayed([...questionsDisplayed, newQuestion])
     }

     function handleTypeChange(e){
        console.log(`handling type change ${e.target.value}`)
        setType(e.target.value)
     }

     
     function handleQuestionChange(e){
        setQuestion(e.target.value)
     }
     
     function handleShortAnswerChange(e){
        setShortAnswerAnswer(e.target.value)
     }
     
     function handleOption1Change(e){
        setOption1(e.target.value)
     }
     
     function handleOption2Change(e){
        setOption2(e.target.value)
     }

     function handleOption3Change(e){
        setOption3(e.target.value)
     }

     function handleOption4Change(e){
        setOption4(e.target.value)
     }
    function handleCorrectAnswerChange(e){
        console.log(e.target.value)
        setCorrectAnswer(e.target.value)
 
    }

 
    return (
        <>
       {newQuiz? 
      ( <>
      <QuizDisplay/>
        <br/>
      <button  onClick= {onAddQuestionClick} className='action-btn'>Add question</button>
      </>)
       :( <form  onSubmit={formik.handleSubmit} id="add-prize-form">

            <label className="form-label" htmlFor = "title">Quiz title</label>
            <input type="text"
            id='title'
            onChange={formik.handleChange}
            value={formik.values.title}></input>
            <br/>
            <br/>
            <label className="form-label" htmlFor ="description">Description</label>
            <input type="text"
             id='description'
             onChange={formik.handleChange}
             value={formik.values.description}></input>
            <br/>
            <br/>
            <label className="form-label" htmlFor = "category">Category</label>
            <input type="text"
             id='category'
             onChange={formik.handleChange}
             value={formik.values.category}></input>
            <br/>
            <br/>
            <label className="form-label" htmlFor = "point_value">Point value</label>
            <input type="text"
             id='point_value'
             onChange={formik.handleChange}
             value={formik.values.point_value}></input>
            <br/>
            <br/>
            <label className="form-label" htmlFor="passing_score">Passing Score</label>
            <input type="text"
             id='passing_score'
             onChange={formik.handleChange}
             value={formik.values.passing_score}></input>
           
          
           <p role="group" aria-labelledby="my-radio-group">Allow students to retry?</p>
            <label>
                <input
                    type="radio"
                    name="picked"
                    value={true}
                    onChange={formik.handleChange}
                />
                Yes
            </label>
            <label>
                <input
                    type="radio"
                    name="picked"
                    value={false}
                    onChange={formik.handleChange}
                />
                No
            </label>
            <br /><br />

            <label className="form-label" htmlFor="teacher_id"> teacher id</label>
            <input type="text"
             id='teacher_id'
             onChange={formik.handleChange}
             value={formik.values.teacher_id}></input>
            <input className='action-btn' type="submit" value = "save quiz"/>
            </form>)}

            {addingQuestion?(<>
                <form className="form" id="add-question-form"   onSubmit={handlleCreateNewQuiz}> 
            
            <label> Question :</label>
            <input onChange={handleQuestionChange} type="text" id="question" value={question} name = "question" required/>
            <br/><br/>

            <p role="group" aria-labelledby="my-radio-group">type of question: </p>
            <label>
                <input
                    type="radio"
                    name="type"
                    value={"multiple-choice"}
                    onChange={handleTypeChange}
                />
                Multiple Choice
            </label>
            <label>
                <input
                    type="radio"
                    name="type"
                    value="short-answer"
                    onChange={handleTypeChange}
                />
                Short Answer
            </label>
            <br /><br />

            {type === "short-answer"? (<> 
            <label> Correct Answer </label>
            <input onChange={handleShortAnswerChange} type='text' id="short-answer-correct_answer" value={correct_answer}></input>
            </>):(
                <>
                <input onChange={handleCorrectAnswerChange} type="radio" id="correct_answer" name="correct_answer" value={option1}/>
                    <label>answer choice 1 </label>
                    <input onChange ={handleOption1Change}type='text' id="option-1" value={option1}></input><br /><br />

                <input onChange={handleCorrectAnswerChange} type="radio" id="correct_answer" name="correct_answer" value={option2}/>
                    <label>answer choice 2 </label>
                    <input onChange ={handleOption2Change} type='text' id="option-2" value={option2}></input><br /><br />

                <input onChange={handleCorrectAnswerChange} type="radio" id="correct_answer" name="correct_answer" value={option3}/>
                    <label>answer choice 3 </label>
                    <input onChange ={handleOption3Change} type='text' id="option-3" value={option3}></input><br /><br />

                <input onChange={handleCorrectAnswerChange} type="radio" id="correct_answer" name="correct_answer" value={option4}/>
                    <label>answer choice 4 </label>
                    <input onChange ={handleOption4Change} type='text' id="option-4" value={option4}></input><br /><br />
                </>)}
            <input type="submit" value="submit" className = "button" id="submitNewQuiz"/>
            </form>
            
            </>):null}


        </>
)}

export default CreateQuiz;