import React, { Component } from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

class Groups extends Component {

  componentDidMount() {
    this.props.fetchAllGroups();
  }

  groupClicked(name) {
    browserHistory.push('/group/' + name);
  }

  renderGroups() {
    if (!this.props.groups) {
      return null;
    } else {
      return(
        <ul>
          { this.props.groups.map((group, i) => (
            <li className='groupListItem' key={i} type='button' onClick={ this.groupClicked.bind(this, group.name) }>{ group.name }</li>
          ))}
        </ul>
      );
    }
  }

  render() {
    return (
      <div>
        <h2>Groups Page</h2>
        { this.renderGroups() }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    groups: state.auth.groups
  }
}

export default connect(mapStateToProps, actions)(Groups);
