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
      ]
    }

    this.onPostMessage = this.onPostMessage.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:4000');
    console.log("App componentDidMount");
    this.socket.onopen = function () {
      console.log("Connected to server");
    };

  // setTimeout(() => {
  //   console.log("Fake incoming message");
  //   // Add a new message to the list of messages in the data store
  //   var next_id = this.state.messages.length + 1;
  //   const newMessage = {id: next_id, username: this.state.currentUser, content: "Hello there!"};
  //   const messages = this.state.messages.concat(newMessage)
  //   // Update the state of the app component.
  //   // Calling setState will trigger a call to render() in App and all child components.
  //   this.setState({messages: messages})
  // }, 300);
  }

  onPostMessage(message) {
    console.log(message);
    var next_id = this.state.messages.length + 1;
    const newMessage = {id: next_id, username: this.state.currentUser, content: message};
    const messages = this.state.messages.concat(newMessage)
    this.setState({messages: messages})
    this.socket.send(`User ${this.state.currentUser} said ${message}`);

    //= function(message) {
     //       JSONParse(this.setState({username: this.state.currentUser, content: message }));
    //}//.bind(this);
  }

  render () {
      console.log("App render");
      //console.log(this.state.messages);
      return (
      //console.log("State", this.state.contacts);    <- not yet
        <div className="wrapper">
          <Nav />
          <MessageList messages = {this.state.messages}/>
          <ChatBar currentUser = {this.state.currentUser} onPostMessage = {this.onPostMessage}    />
        </div>
    );
  }
}

export default App;

