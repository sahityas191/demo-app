import React, { Component } from "react";
import './App.css';
import Navbar from './components/navbar';
import Home from "./components/home";


class App extends React.Component {
  constructor() {
    super();
    this.state = { term: 'react'};
  }

  render(){
    return (
      <div>
        <Navbar></Navbar>
        <div className="jumbotron">
          <Home searchTerm={this.state.term}></Home>
        </div>
      </div>
    );
  }
}

export default App;