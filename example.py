from models.basemodel import *
from models.board import Board
from models.card import Card


class ExampleCard:

    def __init__(self, title, board):
        self.title = title
        self.board = board

    def generate_example(self):
        Card.create(title=self.title, board=self.board)


class ExampleBoard:

    def __init__(self, title):
        self.title = title

    def generate_example(self):
        Board.create(title=self.title)


def main():
    board_one = ExampleBoard("Board One")
    board_one.generate_example()
    board_two = ExampleBoard("Board Two")
    board_two.generate_example()
    card_one = ExampleCard("Card One", 1)
    card_one.generate_example()
    card_two = ExampleCard("Card Two", 1)
    card_two.generate_example()
    card_three = ExampleCard("Card Three", 2)
    card_three.generate_example()
    card_four = ExampleCard("Card Four", 2)
    card_four.generate_example()
