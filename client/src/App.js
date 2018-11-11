import React, { Component } from "react";
import logo from "./logo.svg";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from "./components/Main";
import "./App.css";
import Yes from "./components/Yes";
import No from "./components/No";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App App-header">
          <Route exact path="/" component={Main} />
          <Route exact path="/Yes" component={Yes} />
          <Route exact path="/No" component={No} />
        </div>
      </Router>
    );
  }
}

export default App;
