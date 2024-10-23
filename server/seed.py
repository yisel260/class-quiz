#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Teacher,Section,Student,Quiz,Question, Assignment, Option

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
        Option.query.delete()
        
        teachers = []
        for n in range(5):
            teacher = Teacher(
            fname=fake.first_name(),
            lname=fake.last_name(),
            school=fake.company(),
            email=fake.email(),
            role="teacher"
        )

        # Set a default password for demonstration purposes
            teacher.password = 'password'

            teachers.append(teacher)
            db.session.add(teacher)

        # Commit all changes at once
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
        for section in sections:
            for n in range(5): 
                student=Student(
                name = fake.first_name(),
                password = fake.word(),
                role = "student",
                section_id=section.id)
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
                    point_value='5',
                    passing_score='4',
                    retry = fake.boolean(chance_of_getting_true= 50),
                    teacher_id= teacher.id
                )
                quizzes.append(quiz)
                db.session.add(quiz)
                db.session.commit()

        questions = []
        types = ['short-answer', 'multiple-choice']
        optionslist=['option1','option2','option3','option4']

        for quiz in quizzes:   
            for n in range(5):
                question=Question(
                    question=f' {fake.sentence()}?',
                    type = rc(types), 
                    correct_answer = "option3",
                    quiz_id = quiz.id
                )
                questions.append(question)
            db.session.add_all(questions)
            db.session.commit()
            

        for question in questions:
                options = []  # Reset options list for each question
                option1 = Option(option='option1', question_id=question.id)
                options.append(option1)
                option2 = Option(option='option2', question_id=question.id)
                options.append(option2)
                option3 = Option(option='option3', question_id=question.id)
                options.append(option3)
                option4 = Option(option='option4', question_id=question.id)
                options.append(option4)

                db.session.add_all(options)
                db.session.commit()


        assignments=[]
        for student in students:   
            for n in range(2):
                assignment=Assignment(
                    student_id = student.id,
                    quiz_id = randint(1, 3),
                    status = 'assigned',
                    score = randint(1, 10)
                                )
                assignments.append(assignment)
            db.session.add_all(assignments)
            db.session.commit()


        print("Seeding completed...")
