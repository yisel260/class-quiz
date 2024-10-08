"""create Assignment  model

Revision ID: 57bbde6fc6fd
Revises: 24d44d290024
Create Date: 2024-09-10 18:17:36.517267

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '57bbde6fc6fd'
down_revision = '24d44d290024'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('assignment',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('student_id', sa.Integer(), nullable=True),
    sa.Column('quiz_id', sa.Integer(), nullable=True),
    sa.Column('status', sa.String(), nullable=True),
    sa.Column('score', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['quiz_id'], ['quizzes.id'], name=op.f('fk_assignment_quiz_id_quizzes')),
    sa.ForeignKeyConstraint(['student_id'], ['students.id'], name=op.f('fk_assignment_student_id_students')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('assignment')
    # ### end Alembic commands ###
