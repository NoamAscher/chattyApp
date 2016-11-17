import React, {Component} from 'react';
import Nav from './Nav.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props){
    super(props)
    // Set the initial state of the component
    this.state = {
      currentUser: "Bob",
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ],
      // Initially client count set to 0.
      userCount: 0
    }
    this.onPostMessage = this.onPostMessage.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:4000');
    console.log("App componentDidMount");
    this.socket.onopen = () => {
      console.log("Connected to server");
      this.socket.onmessage = (event) => {
        // if the message is a user count update
        // (upon connection or disconnection):
        if (JSON.parse(event.data).userCount) {
          this.setState({userCount: JSON.parse(event.data).userCount});
        // message handling behaviour all other situations:
        } else {
          var messages = this.state.messages;
          messages = messages.concat(JSON.parse(event.data));
          this.setState({messages: messages});
        }
      };
    };
  }

  onPostMessage(username, message) {
    const newMessage = {type: "postMessage", username: username, content: message};
    if (username !== this.state.currentUser) {
      var notification = `*** ${this.state.currentUser} changed their name to ${username} ***`;
      this.state.currentUser = username;
      this.socket.send(JSON.stringify({type: "postNotification", content: notification}));
    }
    if (message !== '') {
      this.socket.send(JSON.stringify(newMessage));
    }
  }

  render () {
      console.log("App render");

      return (
        <div className="wrapper">
          <Nav userCount = {this.state.userCount} />
          <MessageList messages = {this.state.messages} />
          <ChatBar currentUser = {this.state.currentUser} onPostMessage = {this.onPostMessage} />
        </div>
    );
  }
}

export default App;

