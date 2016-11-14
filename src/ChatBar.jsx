import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {message: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({message: event.target.value});
  }

  handleSubmit(event) {
    //alert('Text field value is: ' + this.state.message);

    this.props.onPostMessage(this.state.message);
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
          defaultValue={this.props.currentUser}
          //value={this.props.footer.value}
          onChange={this.handleChange}
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