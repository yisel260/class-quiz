#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask,request, make_response, session, jsonify
from flask_restful import Resource
from models import Teacher, Section,Student, Quiz, Question, Assignment
from config import app, db, api, bcrypt
import json

class Teachers(Resource):

    def get(self):
        response_dict_list = [n.to_dict() for n in Teacher.query.all()]
        print(response_dict_list)
        response = make_response(
            response_dict_list,
            200, )
        return response
    
    def post(self):
        data = request.get_json()
        new_teacher = Teacher(
            fname=data.get('fname'),
            lname=data.get('lname'),
            email=data.get('email'),
            role=data.get('role'),
            password=data.get('password'),
            school=data.get('school'),
        )
        db.session.add(new_teacher)
        db.session.commit()
        response_dict = jsonify(new_teacher.to_dict())
        response = make_response(
             response_dict,
            201,
        )
        return response
    
class TeacherByID(Resource):

    def get(self, id):
        response_dict = Teacher.query.filter_by(id=id).first().to_dict(only = ('id','fname','lname','email','school','role','sections', 'students',"quizzes"))
        response = make_response(
            response_dict,
            200,
        )
        return response
    
    def patch(self, teacher_id):
            data = request.get_json()

            teacher = Teacher.query.filter_by(id=teacher_id).first()

            teacher.fname=data.get('fname'),
            teacher.lname=data.get('lname'),
            teacher.email=data.get('email'),
            teacher.role=data.role('role'),
            teacher.school=data.get('school'),

            db.session.add(teacher)
            db.session.commit()

            teacher_dict = teacher.to_dict()

            response = make_response(teacher_dict, 200)
            return response

    def delete(self, teacher_id):
        teacher = Student.query.filter_by(id=teacher_id).first()
        response_body = teacher.to_dict()

        db.session.delete(teacher)
        db.session.commit()
        response = make_response(
            response_body,
            204
        )

        return response

class TeacherLogin(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('email')
        password = data.get('password')

        print(username,password)

        if not username or not password:
            return {'message': 'Username and password are required'}, 400

        teacher = Teacher.query.filter(Teacher.email==username).first()

        if teacher and teacher.authenticate(password):
            session['teacherUser_id'] = teacher.id
            print(f"Session after login: {session}")  # Debug print
            return teacher.to_dict(), 200

        return {'error': 'Invalid username or password'}, 401
    
class Logout(Resource):
    def delete(self):
        session['studentUser_id'] = None
        session['teacherUser_id'] = None

        return {'message': '204: No Content'}, 204

class StudentLogIn(Resource):

    def post(self):
        student = request.get_json()
        studentUserName = student.get('studentUserName')
        print(studentUserName)

        studentUser = Student.query.filter(Student.name == studentUserName).first()

        password = student.get('password')
        if password == studentUser.password:
            session['studentUser_id'] = studentUser.id
            response = make_response(studentUser.to_dict(), 200)
            return response 
        else:
            return {}, 401

    
class CheckSession(Resource):
    def get(self):
        print(f"Session in CheckSession: {session}")  # Debug print
        print(self)

        teacherUser = Teacher.query.filter(Teacher.id == session.get('teacherUser_id')).first()
        studentUser =Student.query.filter(Student.id == session.get('studentUser_id')).first()

        print(f"Teacher User: {teacherUser}")
        print(f"Student User: {studentUser}")

        if teacherUser:
            return teacherUser.to_dict()
        else: 
            if studentUser:
                return studentUser.to_dict()
        return {}, 401


class Sections(Resource):
    def get(self):
        response_dict_list = [n.to_dict() for n in Section.query.all()]
        response = make_response(
            response_dict_list,
            200, )
        return response
    
    def post(self):
        data = request.get_json()
        new_section = Section(
            name=data.get('name'),
            section_code=data.get('section_code'),
            teacher_id=data.get('teacher_id'),
        )
        db.session.add(new_section)
        db.session.commit()
        response_dict = jsonify(new_section.to_dict())
        response = make_response(
             response_dict,
            201,
        )
        return response
    
class SectionBySectionCode(Resource):
    def get(self, section_code):
        response_dict = Section.query.filter_by(section_code=section_code).first().to_dict()
        response = make_response(
            response_dict,
            200,
        )
        return response
    
class SectionById(Resource):
    def get(self, section_id):
        response_dict = Section.query.filter_by(id=section_id).first().to_dict()
        response = make_response(
            response_dict,
            200,
        )
        return response
    
    def patch(self, section_id):
            data = request.get_json()

            section = Section.query.filter_by(id=section_id).first()

            section.name=data.get('name'),
            section.section_code=data.get('section_code'),
            section.teacher_id=data.get('teacher_id'),

            db.session.add(section)
            db.session.commit()

            section_dict = section.to_dict()

            response = make_response(section_dict, 200)
            return response
    
    def delete(self, section_id):
            section = Section.query.filter_by(id=section_id).first()
            response_body = section.to_dict()

            db.session.delete(section)
            db.session.commit()
            response = make_response(
                response_body,
                204
            )

            return response

    
class SectionsByTeacher(Resource):
    def get(self, teacher_id):
        
        sections = Section.query.filter_by(teacher_id=teacher_id).all()

        response_dict = [n.to_dict() for n in sections ]

        response = make_response(
            response_dict,
            200,
        )
        return response
    
    
    
class Students(Resource):
    def get(self):
        response_dict_list = [n.to_dict() for n in Student.query.all()]
        response = make_response(
            response_dict_list,
            200, )
        return response
    
    def post(self):
        data = request.get_json()
        new_student = Student(
            name=data.get('name'),
            password=data.get('password'),
            role=data.get('role'),
            section_id=data.get('section_id'),
        )
        db.session.add(new_student)
        db.session.commit()
        response_dict = jsonify(new_student.to_dict())
        response = make_response(
             response_dict,
            201,
        )
        return response
    
class StudentsById(Resource):

    def get(self,student_id):
        response_dict = Student.query.filter_by(id=student_id).first().to_dict()
        response = make_response(
            response_dict,
            200,
        )
        return response
    
    def patch(self, student_id):
        data = request.get_json()
        student = Student.query.filter_by(id = student_id).first()

        student.name=data.get('name'),
        student.password=data.get('password'),
        student.role=data.get('role'),
        student.section_id=data.get('section_id'),
        
        db.session.add(student)
        db.session.commit()

        student_dict = student.to_dict()

        response = make_response(
            student_dict,
            200
        )
        return  response


    def delete(self, student_id):
        student = Student.query.filter_by(id=student_id).first()
        response_body = student.to_dict()

        db.session.delete(student)
        db.session.commit()
        response = make_response(
            response_body,
            204
        )

        return response

    
class StudentsBySection(Resource):
    def get(self, section_id):
        studentsInSection = Student.query.filter(Student.section_id == section_id).all()
        response_dict = [n.to_dict() for n in studentsInSection]
        response = make_response(
            response_dict,
            200,
        )
        return response



class Quizzes(Resource):

    def get(self):
        response_dict_list = [n.to_dict() for n in Quiz.query.all()]
        response = make_response(
            response_dict_list,
            200, )
        return response
    
    def post(self):
        data = request.get_json()
        new_prize = Quiz(
            title=data.get['title'],
            description=data.get('description'),
            category=data.get('category'),
            point_value=data.get('point_value'),
            passing_score=data.get('passing_score'),
            retry = data.get('retry'),
            teacher_id=data.get('teacher_id'),
        )
        db.session.add(new_prize)
        db.session.commit()
        response_dict = jsonify(new_prize.to_dict())
        response = make_response(
             response_dict,
            201,
        )
        return response
    

    
class QuizzesByTeacher(Resource):

    def get(self, quizzes_id):
        quizzes = Quiz.query.filter_by(quizzes_id=quizzes_id).all()
        response_dict_list = [n.to_dict() for n in quizzes]
        response = make_response(
            response_dict_list,
            200, )
        return response

    
class QuizById(Resource):

    def get(self,quiz_id):
        response_dict = Quiz.query.filter_by(id=quiz_id).first().to_dict()
        response = make_response(
            response_dict,
            200,
        )
        return response
    
    def patch(self, quiz_id):
        data = request.get_json()

        quiz = Quiz.query.filter_by(id=quiz_id).first()

        quiz.title=data.get['title'],
        quiz.description=data.get('description'),
        quiz.category=data.get('category'),
        quiz.point_value=data.get('point_value'),
        quiz.passing_score=data.get('passing_score'),
        quiz.retry = data.get('retry'),
        quiz.teacher_id=data.get('teacher_id'),

        db.session.add(quiz)
        db.session.commit()

        quiz_dict = quiz.to_dict()

        response = make_response(quiz_dict, 200)
        return response


    def delete(self, quiz_id):
        quiz = Quiz.query.filter_by(id=quiz_id).first()
        response_body = quiz.to_dict()

        db.session.delete(quiz)
        db.session.commit()
        response = make_response(
            response_body,
            204
        )

        return response



class Assignments(Resource):

    def get(self):
        response_dict_list = [n.to_dict() for n in Assignment.query.all()]
        response = make_response(
            response_dict_list,
            200, )
        return response
    
    def post(self):
        data = request.get_json()
        new_assignment = Assignment(
            student_id =data.get['student_id'],
            quiz_id = data.get['quiz_id'],
            status = data.get['status'],
            score =data.get['score']
        )
        db.session.add(new_assignment)
        db.session.commit()
        response_dict = jsonify(new_assignment.to_dict())
        response = make_response(
             response_dict,
            201,
        )
        return response
    
class AssignmentsById(Resource):

    def get(self,assignment_id):
        response_dict = Assignment.query.filter_by(id=assignment_id).first().to_dict()
        response = make_response(
            response_dict,
            200,
        )
        return response
    
    def patch(self, assignment_id):
        data = request.get_json()

        assignment = Assignment.query.filter_by(id=assignment_id).first()

        assignment.status = data.get('status')

        db.session.add(assignment)
        db.session.commit()

        assignment_dict = assignment.to_dict()

        response = make_response(assignment_dict, 200)
        return response


    def delete(self, assignment_id):
        assignment = Assignment.query.filter_by(id=assignment_id).first()
        response_body = assignment.to_dict()

        db.session.delete(assignment)
        db.session.commit()
        response = make_response(
            response_body,
            204
        )

        return response
    
class AssigmentsByStudent(Resource):
    def get(self, student_id):
        orders = Assignment.query.filter_by(student_id=student_id).all()
        response_dict_list = [n.to_dict() for n in orders]
        response = make_response(
            response_dict_list,
            200, )
        return response

class Questions(Resource):
    def get(self):
        response_dict_list = [n.to_dict() for n in Question.query.all()]
        response = make_response(
            response_dict_list,
            200, )
        return response
    
    def post(self):
        data = request.get_json()
        new_question = Question(
            question=data.get('question'),
            type=data.get('type'),
            options=data.get('options'),
            correct_answer=data.get('correct_answer'),
            quiz_id=data.get('quiz_id'),
        )
        db.session.add(new_question)
        db.session.commit()
        response_dict = jsonify(new_question.to_dict())
        response = make_response(
             response_dict,
            201,
        )
        return response
    
class QuestionsById(Resource):

    def get(self,question_id):
        response_dict = Question.query.filter_by(id=question_id).first().to_dict()
        response = make_response(
            response_dict,
            200,
        )
        return response
    
    def patch(self, question_id):
        data = request.get_json()

        question = Assignment.query.filter_by(id=question_id).first()
        
        question.question=data.get('question'),
        question.type=data.get('type'),
        question.options=data.get('options'),
        question.correct_answer=data.get('correct_answer'),
        question.quiz_id=data.get('quiz_id'),
        
        db.session.add(question)
        db.session.commit()

        assignment_dict = question.to_dict()

        response = make_response(assignment_dict, 200)
        return response


    def delete(self, question_id):
        student = Student.query.filter_by(id=question_id).first()
        response_body = student.to_dict()

        db.session.delete(student)
        db.session.commit()
        response = make_response(
            response_body,
            204
        )

        return response
    
    
api.add_resource(TeacherByID, '/teachers/<int:id>')
api.add_resource(Teachers, '/teachers')
api.add_resource(TeacherLogin,'/teacherlogin')
api.add_resource(Logout,'/logout')
api.add_resource(CheckSession, '/check_session')
api.add_resource(Quizzes,'/quizzes')
api.add_resource(QuizById,'/quizzes/<int:quiz_id>')
api.add_resource(Sections,'/sections')
api.add_resource(SectionBySectionCode, '/sections/<string:section_code>')
api.add_resource(SectionById, '/sections/<int:section_id>')
api.add_resource(Students, '/students')
api.add_resource(StudentsById, '/students/<int:student_id>')
api.add_resource(StudentsBySection,"/studentsbysection/<int:section_id>")
api.add_resource(StudentLogIn, '/studentlogin')
# api.add_resource(PrizesByTeacher, '/prizesbyteacher/<int:teacher_id>')
api.add_resource(SectionsByTeacher,"/sectionsbyteacher/<int:teacher_id>")
api.add_resource(Assignments, "/assignments")
api.add_resource(AssignmentsById , "/assignmentsById/<int:order_id>")
# api.add_resource(OrdersByStudent, "/ordersByStudent/<int:student_id>")
api.add_resource(Questions, '/questions')
api.add_resource(QuestionsById, '/questions/<int:question_id>')






if __name__ == '__main__':
    app.run(port=5555, debug=True)

