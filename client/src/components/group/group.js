import React, { Component } from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class Group extends Component {

  componentDidMount() {
    this.props.fetchGroupData(this.props.params.id);
  }

  render() {
    if (!this.props.group) {
      return(
        <div>Loading...</div>
      );
    } else {
      return (
        <div className='container'>
          <div classname='row'>
          <div classname='panel'>
          <div className='panel-heading'><div className='panel-title'><h3>{ this.props.group.name} Group Page</h3></div></div>

          <div classname ='panel-body'>
          <ul>
            <h4>Members:</h4>
            { this.props.group.members.map((member, i) => (
              <li className='groupListItem' key={i}>{ member.name }</li>
            ))}
          </ul>
          <button className='btn btn-primary' onClick={ () => this.props.addUserToGroup(this.props.group._id) } >Join Group</button>
          </div>
        </div>
       </div>
      </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    group: state.group.group,
    user: state.user.user
  }
}

export default connect(mapStateToProps, actions)(Group);
