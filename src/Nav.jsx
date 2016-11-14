import React, {Component} from 'react';
import Message from './Message.jsx';

class Nav extends Component {
  componentDidMount() {
      console.log("Nav componentDidMount");
  }

  //const appTitle = "Chatty";

  render() {
    console.log("Nav render");

    return (
       <nav>
        <h1>"ChattyApp"</h1>
      </nav>
    );
  }
}



export default Nav;