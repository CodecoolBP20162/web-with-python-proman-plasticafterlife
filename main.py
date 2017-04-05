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


@app.route('/boards', methods=['GET'])
def boards():
    return render_template('boards.html')


@app.route('/get-boards')
def get_boards():
    boards = Board.select()
    boards_dict = {}
    for board in boards:
        boards_dict[str(board.id)] = {
            'title': board.title,
            'id': board.id}

    return jsonify({'boards': boards_dict})


@app.route('/get-cards/<boardid>')
def get_cards(boardid):
    cards = Card.select().where(Card.board == boardid)
    cards_dict = []
    for card in cards:
        cards_dict.append({
            'id': card.id,
            'content': card.content,
            'status': card.status})

    return jsonify(cards_dict)


@app.route('/post-cards', methods=['POST'])
def post_cards():
    # card_id = request.form['id']
    card_content = request.form['content']
    card_status = request.form['status']
    board_id = request.form['board_id']
    Card.create(content=card_content, board=board_id, status=card_status)
    return jsonify({"status": 'ok'})


@app.route('/post-boards', methods=['POST'])
def post_boards():
    board_title = request.form['title']
    Board.create(title=board_title)
    return jsonify({"status": 'ok'})


@app.route('/cards', methods=['GET', 'POST'])
def cards():
    return render_template('cards.html')

if __name__ == '__main__':
    rebuild_database()
    main()
    app.run(debug=True)
