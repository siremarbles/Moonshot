import React, { Component } from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';


class UserProfile extends Component {

  componentDidMount() {
    this.props.fetchProfileData(this.props.params.id);
  }

  renderName() {
    if (!this.props.viewUser) {
      return (<div>Loading</div>);
    } else {
      return (
        <div className='container'>
          <h3>{ this.props.viewUser.firstName } Profile Page</h3>
        </div>
      );
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
    viewUser: state.profile.profileUser
  }
}

export default connect(mapStateToProps, actions)(UserProfile);
