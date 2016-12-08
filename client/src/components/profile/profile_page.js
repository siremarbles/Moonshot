import React, { Component } from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';


class UserProfile extends Component {

  componentDidMount() {
    this.props.fetchProfileData(this.props.params.id);
  }

  renderInviteToGroup() {
    const inviteGroups = [];
    const vUGroups = this.props.viewUser.groups;
    const uGroups = this.props.user.groups;

    for (var i = uGroups.length - 1; i >= 0; i--) {
      var count = 0;
      for (var e = vUGroups.length - 1; e >= 0; e--) {
        if (uGroups[i].groupName != vUGroups[e].groupName) {
          count++;
        }
      }
      if (count === vUGroups.length) {
        console.log('send invite for group, ', uGroups[i].groupName);
        inviteGroups.push(uGroups[i]);
      }
    }

/*
  ALSO ALSO ALSO ALSO ALSO ALSO
    NEED TO CHECK
      TO SEE IF THE GROUP WE WANT TO BE ABLE TO INVITE THE USER TO...
        HAS ALREADY BEEN SENT AN IS PENDING ...
*/

    const viewUserName = this.props.viewUser.firstName + ' ' + this.props.viewUser.lastName;
    const userName = this.props.user.firstName + ' ' + this.props.user.lastName;

    return (
      <div>
        { inviteGroups.map((group, q) => (
          <button className='btn btn-primary' key={q} onClick={ () => this.props.sendGroupInvite(this.props.user._id, userName, this.props.viewUser._id, viewUserName, group.groupId, group.groupName) }>Invite { this.props.viewUser.firstName } to { group.groupName }</button>
        ))}
      </div>
    );
  }

  renderFollowUserRequestButton() {
    var hasRequest = false;
    const followingName = this.props.viewUser.firstName + ' ' + this.props.viewUser.lastName;
    const followerName = this.props.user.firstName + ' ' + this.props.user.lastName;
    const followers = this.props.viewUser.usersThatFollow;

    for (var i = 0; i < followers.length; i++) {
      if (followers[i].followerId == this.props.user._id) {
        return(<div>You are following this user</div>);
      }
    }

    this.props.viewUser.userFollowRequest.map((user, i) => {
        if (user.followerId = this.props.user._id) { hasRequest = true; }
    });

    if (hasRequest) {
      return( <button className='btn btn-primary'>Awaiting User Follow Response</button> );
    } else {
      return( <button className='btn btn-primary' onClick={ () => this.props.requestFollowUser(this.props.viewUser._id, followingName, followerName) } >Request To Follow</button> );
    }
  }

  render() {
    console.log('this.props = ', this.props);
    if (!this.props.viewUser || !this.props.user) {
      return (<div>Loading</div>);
    } else {
      return(
        <div className='container'>
          <h3>{ this.props.viewUser.firstName } Profile Page</h3>
          { this.renderFollowUserRequestButton() }
          { this.renderInviteToGroup() }
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    viewUser: state.user.profileUser,
    user: state.user.user
  }
}

export default connect(mapStateToProps, actions)(UserProfile);
