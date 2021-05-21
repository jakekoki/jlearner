import "./App.css";
import React, { Component } from "react";

import FlashCard from "./components/FlashCard";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flashcards: [],
    };
  }

  componentDidMount() {
    console.log(this.state)
    fetch("http://127.0.0.1:5000/api")
    .then(data => data.json())
    .then(res => {
      console.log(res);
      this.setState({flashcards : res.cards})
    })
  }

  addFlashCard(front = "front", back = "back") {
    var flashcards = this.state.flashcards.slice(
      0,
      this.state.flashcards.length
    );
    flashcards.push({
      front: front,
      back: back,
    });

    // this.setState({
    //   flashcards : flashcards
    // })
  }

  render() {
    return (
      <div className="App">
        <div className="NewCardForm">
          <form action="/" method="POST">
            <input type="text" name="front" id="front" />
            <input type="text" name="back" id="back" />
            <input type="submit" value="Add Card" />
          </form>
        </div>
        {this.state.flashcards.map((card, idx) => {
          return <FlashCard front={card.front} back={card.back} />;
        })}
      </div>
    );
  }
}

export default App;
