import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class UserVerifyTwo extends Component {

  handleFormSubmit() {
    if (this.props.values.userType == undefined) {
      const userType = 'regular';
      const { firstName, lastName, dob } = this.props.values;
      this.props.userV1Details({ firstName, lastName, dob, userType });
    } else {
      const { firstName, lastName, dob, userType } = this.props.values;
      this.props.userV1Details({ firstName, lastName, dob, userType });
    }
    this.props.fetchProfileData();
  }

  render() {
    const { handleSubmit, fields: { firstName, lastName, dob, userType }} = this.props;
    if (!this.props.user) {
      return (<div>Loading.o.o.</div>);
    } else if (this.props.user.verification <= 1) {
      return(
        <form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) } className='container'>
          <fieldset className='form-group'>
            <label>First Name:</label>
            <input className='form-control' { ...firstName } />
            { firstName.touched && firstName.error && <div className='error'>{ firstName.error }</div> }
          </fieldset>
          <fieldset className='form-group'>
            <label>Last Name:</label>
            <input className='form-control' { ...lastName }/>
            { lastName.touched && lastName.error && <div className='error'>{ lastName.error }</div> }
          </fieldset>
          <fieldset className='form-group'>
            <label>Date of Birth:</label>
            <input className='form-control' { ...dob }/>
            { dob.touched && dob.error && <div className='error'>{ dob.error }</div> }
          </fieldset>
          <label>What kind of user will you be?</label>
          <select { ...userType }>
            <option value="regular">Regular</option>
            <option value="mentor">Mentor</option>
            <option value="investor">Investor</option>
            <option value="adult">Adult</option>
          </select>
          <br /><br />
          <button action='submit' className='btn btn-primary'>Submit</button>
        </form>
      );
    } else {
      return null;
    }
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
  return {
    message: state.auth.message,
    errorMessage: state.auth.error,
    user: state.auth.user
  };
}

export default reduxForm({
  form: 'userDetails',
  fields: ['firstName', 'lastName', 'dob', 'userType'],
  validate: validate
}, mapStateToProps, actions)(UserVerifyTwo);


/*
  we need to make v1 visible at all times until the user confirms their email
      at the same time we need to display v2 so they can start filling that out
      when the user verifies their email we need to check to see if they have a first and last name as well as a dob filled out
        if they do have those fields ... when they verify their email ... the server should change their verificatin to 2 which means they need to add payment info

        -http://redux-form.com/6.0.0-alpha.6/examples/wizard/


        for the drop down for userType we need to change adult to something like "authorizor" ...
*/
