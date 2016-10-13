import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Profile extends Component {
  componentWillMount() {
    this.props.fetchMessage();
  }
  render() {
    return (
      <div>
        <h2>Profile</h2>
        <div>Our message from the db is as follows...</div>
        <div>{ this.props.message }</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { message: state.auth.message };
}

export default connect(mapStateToProps, actions)(Profile);
