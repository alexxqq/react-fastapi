"""com

Revision ID: 9c15bba5738e
Revises: 0eb3231cfbb7
Create Date: 2024-02-06 21:54:16.958124

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = '9c15bba5738e'
down_revision: Union[str, None] = '0eb3231cfbb7'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('operation')
    op.drop_table('task')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('task',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('name', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('description', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('date', postgresql.TIMESTAMP(), autoincrement=False, nullable=False),
    sa.Column('priority', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], name='task_user_id_fkey'),
    sa.PrimaryKeyConstraint('id', name='task_pkey')
    )
    op.create_table('operation',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('date', postgresql.TIMESTAMP(), autoincrement=False, nullable=False),
    sa.Column('type', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.PrimaryKeyConstraint('id', name='operation_pkey')
    )
    # ### end Alembic commands ###