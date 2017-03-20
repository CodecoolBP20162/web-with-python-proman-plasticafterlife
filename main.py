from flask import *

app = Flask(__name__)
app.config.from_object(__name__)
app.config.update(dict(
    DEBUG=True,
    SECRET_KEY="plastic secret key"
))


@app.route('/', methods=['GET'])
def index():
    return render_template()


@app.route('/boards', methods=['GET', 'POST'])
def boards():
    return render_template()


@app.route('/cards', methods=['GET', 'POST'])
def cards():
    return render_template()

if __name__ == '__main__':
    app.run(debug=True)
