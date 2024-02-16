"""com

Revision ID: 20b3350ceec0
Revises: 14a7153c58dc
Create Date: 2024-02-08 01:47:18.689237

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = '20b3350ceec0'
down_revision: Union[str, None] = '14a7153c58dc'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('task_tag')
    op.drop_table('tags')
    op.drop_table('tasks')
    op.drop_table('operation')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('operation',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('date', postgresql.TIMESTAMP(), autoincrement=False, nullable=False),
    sa.Column('type', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.PrimaryKeyConstraint('id', name='operation_pkey')
    )
    op.create_table('tasks',
    sa.Column('id', sa.INTEGER(), server_default=sa.text("nextval('tasks_id_seq'::regclass)"), autoincrement=True, nullable=False),
    sa.Column('name', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('description', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('date', postgresql.TIMESTAMP(), autoincrement=False, nullable=False),
    sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], name='tasks_user_id_fkey', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id', name='tasks_pkey'),
    postgresql_ignore_search_path=False
    )
    op.create_table('tags',
    sa.Column('id', sa.INTEGER(), server_default=sa.text("nextval('tags_id_seq'::regclass)"), autoincrement=True, nullable=False),
    sa.PrimaryKeyConstraint('id', name='tags_pkey'),
    postgresql_ignore_search_path=False
    )
    op.create_table('task_tag',
    sa.Column('tag_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('task_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['tag_id'], ['tags.id'], name='task_tag_tag_id_fkey', ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['task_id'], ['tasks.id'], name='task_tag_task_id_fkey', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('tag_id', 'task_id', name='task_tag_pkey')
    )
    # ### end Alembic commands ###
