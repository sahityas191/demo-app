import React from "react";

class Navbar extends React.Component {
    
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <nav className="navbar bg-light">
          <div className="container-fluid">
            <a className="navbar-brand">Demo App</a>
          </div>
        </nav>
      );
    }
};

export default Navbar;