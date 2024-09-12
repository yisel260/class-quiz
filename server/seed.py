#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Teacher,Section,Student,Quiz,Question, Assignment

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        Teacher.query.delete()
        Section.query.delete()
        Student.query.delete()
        Quiz.query.delete()
        Question.query.delete()
        Assignment.query.delete()
       
        teachers = []
        for n in range(5):
            teacher = Teacher(
                fname=fake.first_name(),
                lname=fake.last_name(),
                school=fake.company(),
                email=fake.email(),
                role="teacher"
            )
            teachers.append(teacher)
            db.session.add(teacher)
            db.session.commit()
        
        sections =[]
        for teacher in teachers:
            for n in range(4):
                section = Section(
                    name=fake.word(),
                    section_code=fake.word(),
                    teacher_id=teacher.id
                )
                sections.append(section)
                db.session.add(section)
                db.session.commit()

        students=[]
        for n in range(50): 
            student=Student(
            name = fake.first_name(),
            password = fake.word(),
            role = "student",
            section_id=rc(sections).id)
            students.append(student)
            db.session.add(student)
            db.session.commit()


        quizzes = []
        categories = ['math', 'reading', 'science', 'spelling']
        for teacher in teachers:   
            for n in range(3):
                quiz=Quiz(
                    title = fake.sentence(nb_words = 3),
                    description=fake.sentence(nb_words=5),
                    category=rc(categories),
                    point_value='10',
                    passing_score='8',
                    retry = fake.boolean(chance_of_getting_true= 50),
                    teacher_id= teacher.id
                )
                quizzes.append(quiz)
                db.session.add(quiz)
                db.session.commit()

        questions = []
        types = ['short-answer', 'multiple-choice']
        optionslist=['option1','options2','opstion3','option4']

        for quiz in quizzes:   
            for n in range(10):
                question=Question(
                    question=f' {fake.sentence()}?',
                    type = rc(types), 
                    options='option1, options2, opstion3 , option4',
                    correct_answer = rc(optionslist),
                    quiz_id = quiz.id
                )
                questions.append(question)
            db.session.add_all(questions)
            db.session.commit()

        assignments=[]
        for student in students:   
            for n in range(2):
                assignment=Assignment(
                    student_id = student.id,
                    quiz_id = rc(quizzes).id,
                    status = 'assigned',
                    score = randint(1, 10)
                                )
                assignments.append(assignment)
            db.session.add_all(assignments)
            db.session.commit()


        print("Seeding completed...")
