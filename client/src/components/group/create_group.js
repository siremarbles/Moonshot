import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class CreateGroup extends Component {

  handleFormSubmit(formProps) {
    const groupName = formProps.gName;
    this.props.createGroup({ groupName });
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
            { gName.touch && gName.error && <div className='error'>{ gName.error }</div> }
            </fieldset>
            { this.renderAlert() }
            <button action='submit' className='btn btn-primary'>Create Group!</button>
          </form>
        </div>
      </div>
    );
  }
}

function validate(formProps) {
  const errors = {};
  if (!formProps.gName) {
    errors.gName = 'Enter a Group Name.'
  }
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
