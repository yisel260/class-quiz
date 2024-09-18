"""add password column to teacher

Revision ID: 500706ae94d5
Revises: 4a08df269a2b
Create Date: 2024-09-18 15:28:39.505777

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '500706ae94d5'
down_revision = '4a08df269a2b'
branch_labels = None
depends_on = None


def upgrade():
       op.add_column('teachers', sa.Column('password_hash', sa.String(length=128), nullable=True))

def downgrade():
       op.drop_column('teachers', 'password_hash')
