 
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from config import db, metadata

class Teacher(db.Model, SerializerMixin): 
    __tablename__ = "teachers"

    id =db.Column(db.Integer, primary_key=True)
    fname=db.Column(db.String)
    lname=db.Column(db.String)
    email=db.Column(db.String)
    school=db.Column(db.String)
    role=db.Column(db.String)
    # sections=db.relationship('Section', back_populates="teacher", cascade='all, delete-orphan')
    # prizes=db.relationship('Prize', back_populates="teacher", cascade='all, delete-orphan')
    # serialize_rules = ('-prizes','-sections.teacher',)

    def __repr__(self):
        return f"{self.fname}{self.lname} from {self.school}"
    
    @validates('fname')
    def validate_fnamel(self, key, fname):
        if fname:
            return fname
        else: 
            raise ValueError("name must be a nonempty string")
    
    @validates('lname')
    def validate_lname(self, key, lname):
        if lname:
            return lname
        else: 
            raise ValueError("last name must be a nonempty string")    
        
    @validates('email')
    def validate_email(self, key, email):
        if email:
            matched_email = Teacher.query.filter(Teacher.email== email).first()
            if matched_email:
                raise ValueError("Email is already in use") 
            elif'@' not in email:
                raise ValueError("Failed simple email validation")
        return email
    
class Section(db.Model, SerializerMixin):
    __tablename__ ="sections"

    #serialize_rules = ("-students.section",)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    section_code = db.Column(db.String, nullable=False, unique=True)
    teacher_id= db.Column(db.Integer, db.ForeignKey("teachers.id"))
    teacher = db.relationship("Teacher",back_populates ="sections")
    students = db.relationship('Student', back_populates="section", cascade='all, delete-orphan')

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
    #serialize_rules = ('-section.students','-orders.student',)
    #orders = db.relationship('Order', back_populates='student', cascade='all, delete-orphan')
    

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
    #teacher=db.relationship("Teacher", back_populates="prizes")
    #orders = db.relationship('Order', back_populates='prize', cascade='all, delete-orphan')

    # serialize_rules = ('-teacher','-orders.prize',)
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

    def __repr__ (self):
        return f"{self.question}" 

class Assignment(db.Model,SerializerMixin):
    id = db.Column(db.Integer,primary_key=True)
    student_id =db.Column(db.Integer, db.ForeignKey("students.id"))
    quiz_id = db.Column(db.Integer,db.ForeignKey("quizzes.id"))
    status = db.Column(db.String)
    score =db.Column(db.Integer)
