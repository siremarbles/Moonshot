import React, { Component } from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';


class UserProfile extends Component {

  componentDidMount() {
    this.props.fetchProfileData(this.props.params.id);
    this.props.fetchUserFeedData();
  }

  renderFollowUserRequestButton() {

    if (!this.props.viewUser) {
      return null;
    } else {
      const loggedInId = localStorage.getItem('userId');
      var hasRequest = false;
      const followingName = this.props.viewUser.firstName + ' ' + this.props.viewUser.lastName;
      const followerName = this.props.user.firstName + ' ' + this.props.user.lastName;

      this.props.viewUser.userFollowRequest.map((user, i) => {
          if (user.followerId = loggedInId) { hasRequest = true; }
      });

      if (hasRequest) {
        return( <button className='btn btn-primary'>Awaiting User Follow Response</button> );
      } else {
        return( <button className='btn btn-primary' onClick={ () => this.props.requestFollowUser(this.props.viewUser._id, followingName, followerName) } >Request To Follow</button> );
      }

    }
  }

  renderName() {
    if (!this.props.viewUser) {
      return (<div>Loading</div>);
    } else {
      if (!this.props.user) {
        return (<div>Loading</div>);
      } else {
        return (
          <div className='container'>
            <h3>{ this.props.viewUser.firstName } Profile Page</h3>
            { this.renderFollowUserRequestButton() }
          </div>
        );
      }
    }
  }

  render() {
    return(
      <div>
        { this.renderName() }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    viewUser: state.profile.profileUser,
    user: state.user.user
  }
}

export default connect(mapStateToProps, actions)(UserProfile);
