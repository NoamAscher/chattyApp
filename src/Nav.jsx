import React, {Component} from 'react';
import Message from './Message.jsx';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {userCount: this.props.userCount};
  }

  componentDidMount() {
      console.log("Nav componentDidMount");
      console.log(this.state.userCount);
  }

  //const appTitle = "Chatty";

  render() {
    console.log("Nav render");

    return (
       <nav>
        <h1>"ChattyApp"</h1>
        <span className="user-count">{this.props.userCount} users online </span>
      </nav>
    );
  }
}



export default Nav;