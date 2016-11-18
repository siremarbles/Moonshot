import React, { Component } from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';


class UserProfile extends Component {

  componentDidMount() {
    console.log(this.props.params.id);
    this.props.fetchProfileData(this.props.params.id);
  }

  render() {
    console.log('this.props', this.props);
    return(
      <div>A user's Profile</div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    viewUser: state.profile.profileUser
  }
}

// export default UserProfile;
export default connect(mapStateToProps, actions)(UserProfile);
