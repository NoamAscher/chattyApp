import React, {Component} from 'react';
import Message from './Message.jsx';
import MessageSystem from './msg_system.jsx';

class MessageList extends Component {
  componentDidMount() {
    console.log("MessageList componentDidMount");
  }
  render() {
    console.log("MessageList render");
    return (
      <div id="message-list">
          {this.props.messages.map((elm, index) => {
              return <Message key={index} message = {elm} />
          })
        }
      </div>
    );
  }
}

export default MessageList;