import React, { Component } from "react";
import SearchResult from './searchResult';

class Home extends Component {

     constructor(props) {
      super(props);
      this.state = { term: this.props.searchTerm };
    }

    handleChange = (value) => {
        if(value!==this.state.term){
            this.setState({ term: value });
        }
    };

    render() { 
        return (
            <div style={{'padding': '10px'}}>
                <h2 className="h2">TOPIC: <span className="text-muted">{this.state.term}</span></h2>
                <SearchResult key={this.state.term} value={this.state.term} onChange={this.handleChange} ></SearchResult>
            </div>
        );
    }
}

export default Home;