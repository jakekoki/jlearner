import json 
from datetime import datetime

from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.utils import redirect

import wikipedia

app = Flask(__name__)
cors = CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
client_url = "http://localhost:3000"
db = SQLAlchemy(app)

def serialize_card(q):
    res = []
    for card in q:
        res.append({
            "id" : card.id,
            "front" : card.front,
            "back" : card.back,
            "date_created" : card.date_created
        })

    return res

class FlashCard(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    front = db.Column(db.String(300), nullable=False)
    back = db.Column(db.String(300), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return "<FlashCard %r>" % self.id

@app.route('/api', methods=['POST', 'GET'])
def index():
    if request.method == "POST":
        # gotta process the raw string 
        card_str = request.get_data().decode('utf-8').replace("'", '"')
        card_json = json.loads(card_str)
        front = card_json["front"]
        back = card_json["back"]
        new_card = FlashCard(front=front, back=back)
        try:
            db.session.add(new_card)
            db.session.commit()
            return redirect(client_url)
        except Exception as e:
            return str(e)
    else:
        cards_query = FlashCard.query.order_by(FlashCard.date_created).all()
        return {"cards" : serialize_card(cards_query)}
        

@app.route("/delete/<int:id>", methods=['POST'])
def delete(id):
    card_to_delete = FlashCard.query.get_or_404(id)
    try:
        db.session.delete(card_to_delete)
        db.session.commit()
        return redirect(client_url)
    except:
        return "There was an issue with deleting your task."

@app.route("/update/<int:id>", methods=["POST"])
def update(id):
    card = FlashCard.query.get_or_404(id)
    if request.method == "POST":
        card.front = request.form['front']
        card.back = request.form['back']
        try:
            db.session.commit()
            return redirect(client_url)
        except:
            return "Something went wrong with updating your task."

@app.route("/search/<string:query>", methods=["GET"])
def search(query):
    try:
        q = wikipedia.search(query)
        return {"results" : q}
    except:
        return "Something went wrong with your query. :("

@app.route("/article/<string:title>", methods=["GET"])
def get_article(title):
    page = wikipedia.page(title)

    return {"article" : page.content}

if __name__ == "__main__":
    app.run(debug=True)

