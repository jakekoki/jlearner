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

  render() {
    return (
      <div className="App">
        <FlashCard front={"sdf"} back={"asdf"} />
        <FlashCard front={"sdf"} back={"asdf"} />
        <FlashCard front={"sdf"} back={"asdf"} />
      </div>
    );
  }
}

export default App;
