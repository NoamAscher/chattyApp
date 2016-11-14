import React, {Component} from 'react';

class MessageSystem extends Component {
  componentDidMount() {
    console.log("MessageSystem componentDidMount");
  }
  render() {
    console.log("MessageSystem render");
    return (
      <div className="message system">
        Anonymous1 changed their name to nomnom.
      </div>
    );
  }
}

export default MessageSystem;