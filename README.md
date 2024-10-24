# Class Quiz 

## Project description

Teachers are increasingly asked to provide individualized instruction for their students. Most teachers agree that this will be helpful for students and do their best to provide instruction at different levels in and different ways for students. However, due to lack of both planning and class time, teachers are not always able to provide more individualized practice to students.  

This tool will be an aid for teachers. They can create “quizzes” which can be used as quizzes or as practice. They can create different quizzes for different students and assign it to a group or to specific students. Students are able to access this practice problems or quizzes on their own time. Teachers will also save time. They can easily create a set of practice problems for math, reading questions or writing prompts.  This set can be reused again and again without printing or copying.  They will also save time grading as most quizzes can be graded automatically.  


## Features

### Student features 

Students can: 
- Log in with a class code provided by the teacher and thier personal password
- See their assingned quizzes listed, color coded by completion status
- Click on a quiz or assingment to see the list of questions associated with it 
- Answer and submit thier assignments
- See thier score   and wheter they passed the quiz or not 
- Retry a quiz if the teacher has allowed retries 

#### Teacher features

Teachers can : 

- Sign up for an account 
- Log in to their account with  thier Email and Password
- Crate classes and pupulate them with thier students
- Create student accounts 
- See, Add, Delete or Update thier classes 
- See, Add, Delete or Update students in thier classes 
- Create quizzes that include both multiple choice or short answer questions
- See, Edit, Delete or Update the quizzes
- See and  Edit, Delete or Add questions to each quiz
- Assign quizzes to different students 
- See each student's assignments, thier completion status status, and the score 


## Set Up

### Server 
Follow the usual commands to set up yout python enviroment 

    pipenv install 
    pipenv shell 

This project is set up with a proxy, please make sure to export your port to 5555.

    cd server
    export_FLASK_RUN_PORT=5555 

### Client 

Install dependencies and  start the application:

  cd client
  npm install 
  npm start

 
##  Models 

This project uses 7 related models :

```js
  table teachers {
  id interger [primary key]
  email string 
  fname string
  lname string 
  school string 
  role string
}

table students {
  id interger [primary key]
  name string 
  password string 
  points interger 
  section_id interger
  role string 
}


table sections {
 id interger 
 name string 
 teacher_id integer
 section_code string
}

table  quizes{
  id interger [primary key]
  title string
  description string
  teacher_id interger
  passing_score interger 
  category string
  retry boolean 
  point_value interger
}

table assigments{
  id interger [primary key]
  student_id interger 
  quiz_id_id interger 
  status string
  score integer
}

table  questions{
  id interger [primary key]
  type string
  question string  
  correct_answer string 
  quiz_id interger
   
}

table  options{
  id interger [primary key]
  option string
  question_id string     
}
```

Some important relationships: 

  One to many relationships: 
- a teacher has many classes 
- a section has many students 
- a teacher has many quizzes 
- a student has many assingments 
- a quiz has many questions 
- a question has many options 

Many to many relationships: 
- a student can have many quizzes through assignments 
- a quiz can have many students assingned 



