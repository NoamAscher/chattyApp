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
    //this.onPostUsername = this.onPostUsername.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:4000');
    console.log("App componentDidMount");
    this.socket.onopen = () => {
      console.log("Connected to server");
      this.socket.onmessage = (event) => {
      //var msg = JSON.parse(event.data);
      console.log(event.data);
      var messages = this.state.messages;
      //console.log(this.state.currentUser, this.state.currentUser, this.state.currentUser);
      //var newU = JSON.parse(event.data).username;
      //console.log(newU, newU, newU);
      // if (JSON.parse(event.data).type == "incomingNotification") {
      //   messages = messages.concat(JSON.parse(event.data));
      // }
      messages = messages.concat(JSON.parse(event.data));
      //console.log(messages)
      this.setState({messages: messages})
    };
    };


    // very much doubt this is needed, clean up later
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

  // onPostUsername(username) {
  //   console.log(username);
  //   this.setState({currentUser: username});
  //   console.log(this.state.currentUser);
  // }

  onPostMessage(username, message) {
    console.log(message);
    const newMessage = {type: "postMessage", username: username, content: message};
    //const messages = this.state.messages.concat(newMessage)
    console.log("old or new???", this.state.currentUser)
    console.log("old or new???", username)
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

