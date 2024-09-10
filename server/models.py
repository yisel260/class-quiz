 
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
    
