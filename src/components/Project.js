import React, { Component } from "react";
import "../App.css";
import FlashCard from "./FlashCard";

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flashcards: [],
      currentSearchResults: [],
      currentSearchQ: "",
      article: "",
      currentHighlight: "",
    };
  }

  componentDidMount() {
    fetch("http://127.0.0.1:5000/cards")
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

  makeCardFromHighlight(e) {
    e.preventDefault();
    if (this.state.currentHighlight) {
      const front = this.state.currentHighlight;
      const back = front.split("").reverse().join("");
      const card = {
        front: front,
        back: back,
      };
      fetch(`http://127.0.0.1:5000/cards`, {
        method: "POST",
        mode: "no-cors",
        // headers: {
        //   "Access-Control-Allow-Origin": "http://127.0.0.1:5000/cards",
        //   "Access-Control-Allow-Credentials": true,
        //   "Content-Type": "application/json",
        // },
        body: JSON.stringify(card),
      }).then((response) => {
        console.log(response);
      });
    }
  }

  getArticle(e, articleIdx) {
    e.preventDefault();
    const articleTitle = this.state.currentSearchResults[articleIdx];
    fetch(`http://127.0.0.1:5000/article/${articleTitle}`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "http://127.0.0.1:5000",
        "Access-Control-Allow-Credentials": true,
        mode: "no-cors",
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((response) => {
        this.setState({
          article: response.article,
        });
      });
  }

  getSelectionText() {
    var text = "";
    if (window.getSelection) {
      text = window.getSelection().toString();
    } else if (
      document.currentHighlight &&
      document.currentHighlight.type !== "Control"
    ) {
      text = document.currentHighlight.createRange().text;
    }
    this.setState({
      currentHighlight: text,
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
                  currentHighlight: select,
                });
                return <p>can you see this?</p>;
              }
            })
          }
        </div>
        {console.log(this.state)}
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
          {/* TODO: get rid of the style flag and put it in the css file
              I know inline styling isn't 'proper' or whatever */}
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
        <button onClick={(e) => this.makeCardFromHighlight(e)}>
          Make card
        </button>
        <div className="article">{this.state.article}</div>
      </div>
    );
  }
}

export default Project;
