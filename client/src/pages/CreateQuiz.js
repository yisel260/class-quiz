import React,{useContext, useState} from 'react';
import { useFormik} from "formik";
import * as yup from "yup";
import UserContext from '../UserContext';
import QuizDisplay from '../components/QuizDisplay';
import AddQuestionForm from '../components/AddQuestionForm';


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
        // setOptions([])
        setQuizId(context.selectedQuiz.id)
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
            <AddQuestionForm/>
            </>):null}


        </>
)}

export default CreateQuiz;