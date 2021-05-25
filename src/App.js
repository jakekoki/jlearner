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
    fetch("http://127.0.0.1:5000/api")
      .then((data) => data.json())
      .then((res) => {
        console.log(res);
        this.setState({ flashcards: res.cards });
      });
  }

  render() {
    return (
      <div className="App">
        <div className="NewCardForm">
          <form action="/api" method="POST">
            <input type="text" name="front" id="front" />
            <input type="text" name="back" id="back" />
            <input type="submit" value="Add Card" />
          </form>
        </div>
        {this.state.flashcards.map((card, idx) => {
          return <FlashCard id={card.id} front={card.front} back={card.back} />;
        })}
      </div>
    );
  }
}

export default App;
