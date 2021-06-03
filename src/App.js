import "./App.css";
import React, { Component } from "react";
import Project from "./components/Project";

// I think I just need to move the current article to the backend
// Makes sense, right, I'm gonna have a project model, which contains a set of flashcards and an article.
class App extends Component {

  render() {
    return (
      <div>
        <Project />
      </div>
    );
  }
}

export default App;
