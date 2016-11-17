import React, { Component } from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class Group extends Component {

  componentDidMount() {
    this.props.fetchGroupData(this.props.params.id);
  }

  renderMembers() {
    if (!this.props.group) {
      return null;
    } else {
      console.log(this.props.group);
      return (
        <ul>
          { this.props.group.members.map((member, i) => (
            <li className='groupListItem' key={i}>{ member.name }</li>
          ))}
        </ul>
      );
    }
  }

  render() {
    return (
      <div className='container'>
        <h3>This an individual Group Page</h3>
        { this.renderMembers() }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    group: state.group.group
  }
}

// export default Group;
export default connect(mapStateToProps, actions)(Group);
