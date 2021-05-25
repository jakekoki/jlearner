import React, { Component } from "react";

class FlashCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      isFront: true,
      front: this.props.front,
      back: this.props.back,
    };
  }

  getCard = () => {
    if (this.state.isFront) {
      return this.state.front;
    } else {
      return this.state.back;
    }
  };

  flipCard = () => {
    this.setState({
      isFront: !this.state.isFront,
    });
  };

  updateCard = () => {
    const cardId = this.state.id
    fetch(`http://127.0.0.1:5000/delete/${cardId}`, { method: 'POST', mode: "no-cors" })
      .then(res => console.log(res))
    window.location.href = '/'
  }

  deleteCard = () => {
    const cardId = this.state.id
    fetch(`http://127.0.0.1:5000/delete/${cardId}`, { method: 'POST', mode: "no-cors" })
      .then(res => console.log(res))
    window.location.href = '/'
  }


  render() {
    const contents = this.getCard();
    return (
      <div className="FlashCard" onClick={(e) => this.flipCard(e)}>
        <div className="noselect">{contents}</div>
        <button onClick={() => this.deleteCard()} style={{verticalAlign: "bottom"}}>delete</button>
        <form action={`/update/${this.state.id}`} method="POST">
          <input type="text" name="front" id="front" />
          <input type="text" name="back" id="back" />
          <input type="submit" value="Update Card" />
        </form>
      </div>
    );
  }
}

export default FlashCard;
