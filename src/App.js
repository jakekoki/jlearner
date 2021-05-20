import React, { Component } from "react";
import FlashCard from './components/FlashCard';
import "./App.css";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flashcards: [],
    };
  }

  addFlashCard(front="front", back="back") { 
    var flashcards = this.state.flashcards.slice(0, this.state.flashcards.length);
    flashcards.push({
      front: front, 
      back: back
    })

    this.setState({
      flashcards : flashcards
    })
  }

  render() {
    return (
      <div className="App">
        <div className="NewCardForm">
          <button onClick={() => this.addFlashCard()}>Push me, daddy.</button>
        </div>
        {console.log(this.state.flashcards)}
        {this.state.flashcards.map((card, idx) => {
          return (
            <FlashCard front={card.front} back={card.back} />
          )
        })}

      </div>
    );
  }
}

export default App;
