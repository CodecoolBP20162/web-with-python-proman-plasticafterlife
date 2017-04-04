from build import rebuild_database
from example import main
from flask import *
from models.board import Board
from models.card import Card

app = Flask(__name__)
app.config.from_object(__name__)
app.config.update(dict(
    DEBUG=True,
    SECRET_KEY="plastic secret key"
))


@app.route('/', methods=['GET'])
def index():
    return render_template("main_page.html")


@app.route('/boards', methods=['GET', 'POST'])
def boards():
    return render_template('boards.html')


@app.route('/get-boards')
def get_boards():
    boards = Board.select()
    boards_dict = {}
    for board in boards:
        boards_dict[str(board.id)] = {'title': board.title, 'id': board.id}

    return jsonify({'boards': boards_dict})



@app.route('/cards', methods=['GET', 'POST'])
def cards():
    return render_template('cards.html')

if __name__ == '__main__':
    rebuild_database()
    main()
    app.run(debug=True)
