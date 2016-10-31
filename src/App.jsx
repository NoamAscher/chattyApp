import React, {Component} from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    // this line makes it so that when 'hereClicked' is invoked
    // as an event handler, 'this' inside of the function will
    // refer to the current App object.
    this.hereClicked = this.hereClicked.bind(this);
    this.state = {
      meters: 42
    };
  }
  hereClicked() {
    this.setState({
      meters: 113
    });
  }

  render() {
    return (
      <div>
        <form>
          <input name="meters" />
          <button>Convert</button>
        </form>
        <button onClick={this.hereClicked}>Click Here!</button>
        <div>{this.state.meters}</div>
      </div>
    );
  }
}

export default App;
