from build import rebuild_database
from example import main
from flask import *

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


@app.route('/cards', methods=['GET', 'POST'])
def cards():
    return render_template('cards.html')

if __name__ == '__main__':
    rebuild_database()
    main()
    app.run(debug=True)
