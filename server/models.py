 
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from config import db
from sqlalchemy.ext.hybrid import hybrid_property
from config import bcrypt


class Teacher(db.Model, SerializerMixin):
    __tablename__ = "teachers"

    id = db.Column(db.Integer, primary_key=True)
    fname = db.Column(db.String)
    lname = db.Column(db.String)
    email = db.Column(db.String)
    password_hash = db.Column(db.String, nullable=False)  # Keep the column name as is
    school = db.Column(db.String)
    role = db.Column(db.String)

    sections = db.relationship('Section', back_populates="teacher", cascade='all, delete-orphan')
    quizzes = db.relationship('Quiz', back_populates="teacher", cascade='all, delete-orphan')
    students = association_proxy('sections', 'students', creator=lambda student_obj: Student(student=student_obj))

    serialize_rules = ('-sections.teacher', '-teacher.quizzes',)

    @hybrid_property
    def password(self):
        return self.password_hash  # Return the value stored in the column

    @password.setter
    def password(self, password):
        # utf-8 encoding and decoding is required in python 3
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self.password_hash = password_hash.decode('utf-8')  # Set the column value

    def authenticate(self, password):
        return bcrypt.check_password_hash(self.password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f"{self.fname} {self.lname} from {self.school}"

    @validates('fname')
    def validate_fname(self, key, fname):
        if not fname:
            raise ValueError("First name must be a nonempty string")
        return fname

    @validates('lname')
    def validate_lname(self, key, lname):
        if not lname:
            raise ValueError("Last name must be a nonempty string")
        return lname

    @validates('email')
    def validate_email(self, key, email):
        if not email:
            raise ValueError("Email must be provided")
        matched_email = Teacher.query.filter(Teacher.email == email).first()
        if matched_email:
            raise ValueError("Email is already in use")
        if '@' not in email:
            raise ValueError("Failed simple email validation")
        return email
    
class Section(db.Model, SerializerMixin):
    __tablename__ ="sections"


    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    section_code = db.Column(db.String, nullable=False, unique=True)
    teacher_id= db.Column(db.Integer, db.ForeignKey("teachers.id"))
   
    teacher = db.relationship("Teacher",back_populates ="sections")
    students = db.relationship('Student', back_populates="section", cascade='all, delete-orphan')

    serialize_rules = ("-students.section", '-section.teacher')

    def __repr__(self):
        return f"{self.name} class code: {self.section_code}"


class Student(db.Model, SerializerMixin):
    __tablename__ ="students"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    role  = db.Column(db.String)
    section_id= db.Column(db.Integer, db.ForeignKey("sections.id"))

    section = db.relationship("Section",back_populates ="students")
    assignments = db.relationship('Assignment', back_populates='student', cascade='all, delete-orphan')
    teacher = association_proxy('section', 'teacher',
                                  creator=lambda teacher_obj: Teacher(teacher=teacher_obj))

    serialize_rules = ('-section.students', '-assignments.student', '-student.quizzes')

    def __repr__(self):
        return f"student:{self.name} password:{self.password} "
    
class Quiz(db.Model,SerializerMixin):
    __tablename__ ="quizzes"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    description=db.Column(db.String)
    category=db.Column(db.String)
    point_value=db.Column(db.Integer)
    passing_score=db.Column(db.Integer)
    retry = db.Column(db.Boolean) 
    teacher_id=db.Column(db.Integer, db.ForeignKey("teachers.id"))
    
    teacher= db.relationship("Teacher", back_populates="quizzes")
    assignments = db.relationship('Assignment', back_populates='quiz', cascade='all, delete-orphan')
    
    questions =db.relationship('Question', back_populates='quiz', cascade='all, delete-orphan')
    
    serialize_rules = ('-questions.quiz','-assignments','-teacher')


    def _repr_(self):
        return f"{self.title} , {self.description}"
    

class Question(db.Model, SerializerMixin): 
    __tablename__ = 'questions'

    id = db.Column(db.Integer, primary_key=True) 
    question= db.Column(db.String)
    type = db.Column(db.String) 
    options = db.Column(db.String) 
    correct_answer = db.Column(db.String)
    quiz_id = db.Column(db.Integer, db.ForeignKey("quizzes.id"))

    quiz=db.relationship('Quiz', back_populates ='questions')

    serialize_rules = ('-quiz.questions',)



    def __repr__ (self):
        return f"{self.question}" 

class Assignment(db.Model,SerializerMixin):
    __tablename__ = "assignments"

    id = db.Column(db.Integer,primary_key=True)
    student_id =db.Column(db.Integer, db.ForeignKey("students.id"))
    quiz_id = db.Column(db.Integer,db.ForeignKey("quizzes.id"))
    status = db.Column(db.String)
    score =db.Column(db.Integer)

    student=db.relationship('Student',back_populates="assignments")
   
    quiz=db.relationship('Quiz',back_populates="assignments")

    serialize_rules = ('-assignment.student', '-assignment.quiz')


    