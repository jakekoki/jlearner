import React, { Component } from 'react';
import './App.css';

class FlashCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFront : true,
      front: "fr",
      back: "b"
    }
  }

  getCard() {
    if (this.state.isFront) {
      return this.state.front;
    } else {
      return this.state.back;
    }
  }

  flipCard = () => {
    this.setState({
      isFront : !this.state.isFront
    })
  }

  render() {
    const contents = this.getCard()
    return (
      <div className="FlashCard" onClick={e => this.flipCard(e)}> {contents} </div>
    )
  }
}



function App() {
  return (
    <div className="App">
      <FlashCard />
      <FlashCard />
    </div>
  );
}

export default App;
