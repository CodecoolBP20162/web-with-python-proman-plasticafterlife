from models.basemodel import *
from models.board import Board


class Card(BaseModel):
    title = CharField()
    board = ForeignKeyField(Board, related_name="card_list")
    status = "New"
