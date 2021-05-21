from datetime import datetime
import sys

from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.utils import redirect

app = Flask(__name__)
cors = CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
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

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}

@app.route('/api', methods=['POST', 'GET'])
def index():
    if request.method == "POST":
        front = request.form['front']
        back = request.form['back']
        new_card = FlashCard(front=front, back=back)
        try:
            db.session.add(new_card)
            db.session.commit()
            # redirect("/")
            return new_card.serializer()
        except Exception as e:
            return str(e)
    else:
        cards_query = FlashCard.query.order_by(FlashCard.date_created).all()
        return {"cards" : serialize_card(cards_query)}
        

@app.route("/delete/<int:id>")
def delete(id):
    card_to_delete = FlashCard.query.get_or_404(id)
    try:
        db.session.delete(card_to_delete)
        db.session.commit()
        return redirect("/")
    except:
        return "There was an issue with deleting your task."

@app.route("/update/<int:id>", methods=["POST"])
def update(id):
    card = FlashCard.query.get_or_404(id)
    if request.method == "POST":
        card.content = request.form['content']
        try:
            db.session.commit()
            return redirect("/")
        except:
            return "Something went wrong with updating your task."

if __name__ == "__main__":
    app.run(debug=True)


