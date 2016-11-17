import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props);
    this.state = {username: this.props.currentUser, message: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({message: event.target.value});
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }


  handleSubmit(event) {
    this.props.onPostMessage(this.state.username, this.state.message);
  }

  componentDidMount() {
    console.log("Footer componentDidMount");
  }

  render() {
    console.log("Footer render");
    return (
      <footer>
        <input id="username"
          type="text"
          placeholder="Your Name (Optional)"
          value={this.state.username}
          onChange={this.handleUsernameChange}
          />

         <input
          id="new-message"
          type="text"
          placeholder="Type a message and hit ENTER"
          value={this.state.message}
          onChange={this.handleChange}
          />

          <button onClick={this.handleSubmit}>
          Submit
          </button>
      </footer>
    );
  }
}

export default ChatBar;