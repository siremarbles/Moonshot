import React, { Component } from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

class Groups extends Component {

  componentDidMount() {
    this.props.fetchAllGroups();
    this.props.fetchAllUsers();
  }

  groupClicked(name) {
    browserHistory.push('/group/' + name);
  }

  userClicked(name) {
    // console.log('user clicked');
    browserHistory.push('/profile/' + name);
  }

  renderGroups() {
    if (!this.props.groups) {
      return null;
    } else {
      return(
        <div className='container'>
          <h3>All Groups</h3>
          <ul>
            { this.props.groups.map((group, i) => (
              <li className='groupListItem' key={i} type='button' onClick={ this.groupClicked.bind(this, group.name) }>{ group.name }</li>
            ))}
          </ul>
        </div>
      );
    }
  }

  renderUsers() {
    console.log('this.props', this.props);
    if (!this.props.users) {
      return null;
    } else {
      return (
        <div className='container'>
          <h3>All Users</h3>
          <ul>
            { this.props.users.map((user, i) => (
              <li className='groupListItem' key={i} type='button' onClick={ this.userClicked.bind(this, user._id) }>{ user.firstName }</li>
            ))}
          </ul>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h2>Groups Page</h2>
        { this.renderGroups() }
        { this.renderUsers() }
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('state = ', state);
  return {
    errorMessage: state.auth.error,
    groups: state.group.groups,
    users: state.user.allUsers
  }
}

export default connect(mapStateToProps, actions)(Groups);
