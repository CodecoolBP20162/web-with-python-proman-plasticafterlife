# This script can create the database tables based on your models

from models.basemodel import *
from models.board import Board
from models.card import Card


def rebuild_database():
    db.connect()

    db.drop_tables([Board, Card], safe=True)

    # List the tables here what we want to create
    db.create_tables(
        [Board, Card], safe=True)
