import React, { Component } from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';


class UserProfile extends Component {

  componentDidMount() {

  }

  render() {
    return(
      <div>A user's Profile</div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    // viewUser: state.user.user
  }
}

// export default UserProfile;
export default connect(mapStateToProps, actions)(UserProfile);
