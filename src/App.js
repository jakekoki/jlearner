import "./App.css";
import React, { Component } from "react";

import FlashCard from "./components/FlashCard";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flashcards: [],
      currentSearch: [],
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

  search(q = "guitar") {
    fetch(`http://127.0.0.1:5000/search/${q}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "http://127.0.0.1:5000",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json",
      },
    })
      .then((data) => (data ? data.json() : {}))
      .then((response) =>
        this.setState({
          currentSearch: response.results,
        })
      );
  }

  render() {
    {
      console.log(this.state);
    }
    return (
      <div className="App">
        <div className="NewCardForm">
          <form action="/api" method="POST">
            <input type="text" name="front" id="front" />
            <input type="text" name="back" id="back" />
            <input type="submit" value="Add Card" />
          </form>
        </div>
        <button onClick={() => this.search()}>click me daddy</button>

        <div className="CardPane">
          {this.state.flashcards.map((card, idx) => {
            return (
              <FlashCard id={card.id} front={card.front} back={card.back} />
            );
          })}
        </div>
        <div className="SearchResults">
          {this.state.currentSearch.map((result, idx) => {
            return <div ><a href="">{result}</a> </div>;
          })}
        </div>
      </div>
    );
  }
}

export default App;
