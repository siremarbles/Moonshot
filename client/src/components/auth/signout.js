import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signout extends Component {
  componentWillMount() {
    this.props.signoutUser();
  }

  render() {
    return (
      <div>
        <h2>Thanks for using Moonshot!</h2>
        <h4>See you soon!</h4>
      </div>
    );
  }
}

export default connect(null, actions)(Signout);
