"""added name to assignments

Revision ID: 4a08df269a2b
Revises: 32582d5abb40
Create Date: 2024-09-11 20:13:40.773572

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4a08df269a2b'
down_revision = '32582d5abb40'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('assignments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('student_id', sa.Integer(), nullable=True),
    sa.Column('quiz_id', sa.Integer(), nullable=True),
    sa.Column('status', sa.String(), nullable=True),
    sa.Column('score', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['quiz_id'], ['quizzes.id'], name=op.f('fk_assignments_quiz_id_quizzes')),
    sa.ForeignKeyConstraint(['student_id'], ['students.id'], name=op.f('fk_assignments_student_id_students')),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('assignment')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('assignment',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('student_id', sa.INTEGER(), nullable=True),
    sa.Column('quiz_id', sa.INTEGER(), nullable=True),
    sa.Column('status', sa.VARCHAR(), nullable=True),
    sa.Column('score', sa.INTEGER(), nullable=True),
    sa.ForeignKeyConstraint(['quiz_id'], ['quizzes.id'], name='fk_assignment_quiz_id_quizzes'),
    sa.ForeignKeyConstraint(['student_id'], ['students.id'], name='fk_assignment_student_id_students'),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('assignments')
    # ### end Alembic commands ###
