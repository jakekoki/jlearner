import "./App.css";
import React, { Component } from "react";

import FlashCard from "./components/FlashCard";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flashcards: [],
      currentSearchResults: [],
      currentSearchQ: "",
      article: "",
      selection: "",
    };
  }

  componentDidMount() {
    fetch("http://127.0.0.1:5000/api")
      .then((data) => data.json())
      .then((res) => {
        this.setState({ flashcards: res.cards });
      });
  }

  queryChange(e) {
    e.preventDefault();
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    });
  }

  querySubmit(e) {
    e.preventDefault();
    if (this.state.currentSearchQ) {
      const currentSearchQ = this.state.currentSearchQ;
      fetch(`http://127.0.0.1:5000/search/${currentSearchQ}`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "http://127.0.0.1:5000",
          "Access-Control-Allow-Credentials": true,
          "Content-Type": "application/json",
        },
      })
        .then((data) => data.json())
        .then((response) => {
          this.setState({
            currentSearchResults: response.results,
          });
        });
    }
  }

  getArticle(e, articleIdx) {
    e.preventDefault();
    const articleTitle = this.state.currentSearchResults[articleIdx];
    fetch(`http://127.0.0.1:5000/article/${articleTitle}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "http://127.0.0.1:5000",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((response) => {
        localStorage.setItem("article", response.article);
        this.setState({
          article: localStorage.getItem("article"),
        });
      });
  }

  getSelectionText() {
    var text = "";
    if (window.getSelection) {
      text = window.getSelection().toString();
    } else if (document.selection && document.selection.type !== "Control") {
      text = document.selection.createRange().text;
    }
    this.setState({
      selection: text,
    });
  }

  render() {
    return (
      <div className="App">
        <div>
          {
            (document.onmouseup = () => {
              const select = window.getSelection().toString();
              if (select) {
                this.setState({
                  selection: select,
                });
                return <p>can you see this?</p>;
              }
            })
          }
        </div>
        {console.log(this.state)}
        <div className="NewCardForm">
          <form action="/api" method="POST">
            <input type="text" name="front" id="front" />
            <input type="text" name="back" id="back" />
            <input type="submit" value="Add Card" />
          </form>
        </div>
        <div>
          <form onSubmit={(e) => this.querySubmit(e)}>
            <input
              type="text"
              name="currentSearchQ"
              onChange={(e) => this.queryChange(e)}
            />
            <input type="submit" />
          </form>
        </div>
        <div className="CardPane">
          {this.state.flashcards.map((card, idx) => {
            return (
              <FlashCard id={card.id} front={card.front} back={card.back} />
            );
          })}
        </div>
        <div className="SearchResults">
          <ul>
            {this.state.currentSearchResults.map((result, idx) => {
              return (
                <li>
                  <a onClick={(e) => this.getArticle(e, idx)}>{result}</a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="article">
          {this.state.article ? this.state.article : "No article present."}
        </div>
      </div>
    );
  }
}

export default App;
