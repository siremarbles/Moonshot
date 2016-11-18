import React, { Component } from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

import UserVerifyOne from './u_verify_one';
import UserVerifyTwo from './u_verify_two';
import UserVerifyThree from './u_verify_three';
import UserFeed from './user_feed';

class ProfileFeed extends Component {
  componentWillMount() {
    this.props.fetchMessage();
    this.props.fetchUserFeedData();
  }

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

onChange(state) {
    this.setState(state);
    this.forceUpdate();
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

  renderButtons() {
    return(
      <div className='container'>

        <Link to='/create-group' className='btn btn-primary'>Create Group</Link>
      </div>
    );
  }

  renderName() {
    if (!this.props.user) {
      return (<div>Loading.x.x.</div>);
    } else if (this.props.user.verification <= 1) {
      return (
        <div>
          <h4>Welcome to your profile</h4>
          <p>We need a little more information about yourself before you get started.</p>
        </div>
      );
    } else {
      return (
        <h3>Welcome { this.props.user.firstName } {this.props.user.lastName}</h3>
      );
    }
  }

  renderGroups() {
    if (!this.props.user) {
      return <div>load</div>;
    } else if (this.props.user.groups.length != 0) {
      return (
        <div className='container'>
          <h3>My Groups</h3>
          <ul>
            { this.props.user.groups.map((group, i) => (
              <li className='groupListItem' groupListItemkey={i} type='button' onClick={ this.groupClicked.bind(this, group.groupName) }>{ group.groupName }</li>
            ))}
          </ul>
        </div>
      );
    }
  }

  groupClicked(name) {
    browserHistory.push('/group/' + name);
  }

  render() {
    return (
      <div className='container'>
        { this.renderName() }
        <UserVerifyOne />
        <UserVerifyTwo />
        <UserVerifyThree />
        <UserFeed />
        { this.renderGroups() }
        { this.renderButtons() }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    message: state.auth.message,
    errorMessage: state.auth.error,
    user: state.user.user
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
