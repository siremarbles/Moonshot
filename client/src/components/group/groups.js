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
    browserHistory.push('/profile/' + name);
  }

  renderGroups() {
    if (!this.props.groups) {
      return null;
    } else {
      return(
        <div className='container'>
          <div className='panel'>
            <div className='panel-body'>
          <h3>All Groups</h3>
          <ul>
            { this.props.groups.map((group, i) => (
              <li className='groupListItem' key={i} type='button' onClick={ this.groupClicked.bind(this, group.name) }>{ group.name }</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
      );
    }
  }

  renderUsers() {
    if (!this.props.users) {
      return null;
    } else {
      return (
        <div className='container'>
          <div className='panel'>
            <div className='panel-body'>
          <h3>All Users</h3>
          <ul>
            { this.props.users.map((user, i) => (
              <li className='groupListItem' key={i} type='button' onClick={ this.userClicked.bind(this, user._id) }>{ user.firstName }</li>
            ))}
          </ul>
        </div>
        </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className='container'>
        <div className="row">

      <div classname ="panel">

        <div className='panel-heading'>
          <h3 className='panel-title'>Groups Page</h3>
          </div>
           <div className='panel-body'>

              { this.renderGroups() }
              { this.renderUsers() }
            </div>

        </div>
       </div>
    </div>
    );
  }
}


function mapStateToProps(state) {
  // console.log('state = ', state);
  return {
    errorMessage: state.auth.error,
    groups: state.group.groups,
    users: state.user.allUsers
  }
}

export default connect(mapStateToProps, actions)(Groups);
