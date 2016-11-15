import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class CreateGroup extends Component {

  handleFormSubmit(formProps) {
    const groupName = formProps.gName;
    this.props.createGroup({ groupName });
  }

  render() {
    const { handleSubmit, fields: { gName }} = this.props;

    return (
      <div>
        <h3>Create A New Group Page</h3>
        <div className='container'>
          <h4>Create a Group</h4>
          <form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) } className='container'>
            <fieldset className='form-group'>
            <label>Group Name:</label>
            <input className='form-control' { ...gName } />
            </fieldset>
            <button action='submit' className='btn btn-primary'>Create Group!</button>
          </form>
        </div>
      </div>
    );
  }
}

function validate(formProps) {
  const errors = {};

  return errors;
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    user: state.auth.user
  }
}

export default reduxForm({
  form: 'createGroupForm',
  fields: ['gName'],
  validate: validate
}, mapStateToProps, actions)(CreateGroup);
