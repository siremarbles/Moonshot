import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import UserVerification from './profile/user_verification';
import UserFeed from './profile/user_feed';

class ProfileFeed extends Component {
  componentWillMount() {
    this.props.fetchMessage();
    this.props.fetchProfileData();
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className='alert alert-danger'>
          <strong>Oops!</strong> { this.props.errorMessage }
        </div>
      );
    }
  }

  renderName() {
    if (!this.props.user) {
      return (<div>Loading</div>);
    } else if (this.props.user.verification == 1) {
      return (
        <div>
          <h4>Welcome to your profile</h4>
          <p>We need a little more information about yourself before you get started.</p>
        </div>
      );
    } else if (this.props.user.firstName && this.props.user.lastName) {
      return (
        <h3>Welcome { this.props.user.firstName } {this.props.user.lastName}</h3>
      );
    }
  }

  render() {
    return (
      <div className='container'>
        { this.renderName() }
        <UserVerification />
        <UserFeed />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    message: state.auth.message,
    errorMessage: state.auth.error,
    user: state.auth.user
  };
}

export default connect(mapStateToProps, actions)(ProfileFeed);


/*
    This page is only accessible by the user that is logged in
    no other user will have access to this page
    this is where the user can change user info payment methods ect


    <UserFeed />
      needs to be used multiple times for each piece of activity feed thats going on
      we will use the .map function to populate it and probably need a sperate function
      outside of the render method to make this work properly
*/
