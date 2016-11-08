import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as actions from '../actions';

class ProfileFeed extends Component {
  componentWillMount() {
    const { handleSubmit, fields: { firstName, lastName, dob }} = this.props;
    this.props.fetchMessage();
    this.props.fetchProfileData();
  }

  handleFormSubmit() {
    console.log('dop');
    console.log('first name = ', this.props.values.firstName);
    console.log('last name = ', this.props.values.lastName);
    console.log('dob = ', this.props.values.dob);

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

  noFirstName() {
    const { handleSubmit, fields: { firstName, lastName, dob }} = this.props;
    if (!this.props.user.firstName) {
      return (
        <fieldset className='form-group'>
          <label>First Name:</label>
          <input className='form-control' { ...firstName } />
          { firstName.touched && firstName.error && <div className='error'>{ firstName.error }</div> }
        </fieldset>
      );
    }
  }

  noLastName() {
    const { handleSubmit, fields: { firstName, lastName, dob }} = this.props;
    if (!this.props.user.lastName) {
      return (
        <fieldset className='form-group'>
          <label>Last Name:</label>
          <input className='form-control' { ...lastName }/>
          { lastName.touched && lastName.error && <div className='error'>{ lastName.error }</div> }
        </fieldset>
      );
    }
  }

  noDob() {
    const { handleSubmit, fields: { firstName, lastName, dob }} = this.props;
    if (!this.props.user.dob) {
      return (
        <fieldset className='form-group'>
          <label>Date of Birth:</label>
          <input className='form-control' { ...dob }/>
          { dob.touched && dob.error && <div className='error'>{ dob.error }</div> }
        </fieldset>
      );
    }
  }

  renderWarnings() {
    if (!this.props.user) {
      return ( <div>LOADING</div> );
    }

    if (this.props.user.verification != 3) {
      const { handleSubmit, fields: { firstName, lastName, dob }} = this.props;
      return(
        <form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) }>
        {/* // <form onSubmit={this.handleFormSubmit} > */}
        { this.noFirstName() }
        { this.noLastName() }
        { this.noDob() }
        { this.renderAlert() }
        <button action='submit' className='btn btn-primary'>Save</button>
        </form>
      );
    }


  }

  render() {
    console.log("props inside render ", this.props);
    const { handleSubmit, fields: { firstName, lastName, dob }} = this.props;
    return (
      <div className='container'>
        <h2>Profile</h2>
        { this.renderWarnings() }
      </div>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.firstName) {
    errors.firstName = 'Please enter your first name.'
  }

  if (!formProps.lastName) {
    errors.lastName = 'Please enter your last name.'
  }

  if (!formProps.dob) {
    errors.dob = 'Please enter your date of birth.'
  }
  return errors;
}

function mapStateToProps(state) {
  console.log('state = ', state);
  return {
    message: state.auth.message,
    errorMessage: state.auth.error,
    user: state.auth.user
  };
}

// export default connect(mapStateToProps, actions)(ProfileFeed);

export default reduxForm({
  form: 'userDetails',
  fields: ['firstName', 'lastName', 'dob'],
  validate: validate
}, mapStateToProps, actions)(ProfileFeed);
