import React, { Component } from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class UserVerifyOne extends Component {

  render() {
    if (!this.props.user) {
      return (<div>Loading...</div>);
    } else if (this.props.user.verification == 0) {
      return(
        <div>
          <h3>Verification 1</h3>
          <p>Please check your email for a confimation email and click the link to confirm you're a real person.</p>
        </div>
      );
    } else {
      return null;
    }
  }
}

function mapStateToProps(state) {
  return {
    message: state.auth.message,
    errorMessage: state.auth.error,
    user: state.user.user
  };
}

export default connect(mapStateToProps)(UserVerifyOne);
