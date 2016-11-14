import React, {Component} from 'react';


class ConversionForm extends Component {
  constructor(props) {
    super(props);
    this.formSubmitted = this.formSubmitted.bind(this);
  }
  formSubmitted(event) {
    // Prevent the form from being submitted
    event.preventDefault();
    const newMeters = Number(this.meters.value);
    this.props.metersChanged(newMeters);
  }
  render() {
    return (
      <form onSubmit={this.formSubmitted}>
        <input ref= { (input) => { this.meters = input } } />
        <button>Convert</button>
      </form>
    );
  }
}


export default ConversionForm;