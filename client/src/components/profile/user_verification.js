import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class UserVerification extends Component {

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

  v3FormSubmit() {
    console.log('chee chaw')
  }

//V1 is the email verification this will just be a warning
  verificationOne() {
    return(
      <div>
        <h3>Verification 1</h3>
        <p>Please check your email for a confimation email and click the link to confirm you're a real person.</p>
      </div>
    );
  }

  verificationTwo() {
    const { handleSubmit, fields: { firstName, lastName, dob, userType }} = this.props;
    if (!this.props.user) {
      return(<div>Loading</div>);
    } else if (!this.props.user.firstName) {
      return (
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
          </select>
          <br /><br />
          <button action='submit' className='btn btn-primary'>Submit</button>
        </form>
      );
    }
  }

  verificationThree() {
    const { handleSubmit, fields: { ccName, ccN, ccE, ccV }} = this.props;
    return(
      <div className='container'>
        <h3>This is the verification 2 field</h3>
        <p>To get to verification stage 3 you must add a credit card and phone number</p>
        <p>Add a credit card at your own will ... i will use it ... jk :D </p>
        <form onSubmit={ handleSubmit(this.v3FormSubmit.bind(this)) } className='container'>
          <fieldset className='form-group'>
            <label>Name on the Credit Card:</label>
            <input className='form-control' { ...ccName } />
            {/* { ccName.touched && ccName.error && <div className='error'>{ ccName.error }</div> } */}
          </fieldset>
          <fieldset className='form-group'>
            <label>Credit Card Number:</label>
            <input className='form-control' { ...ccN } />
            {/* { ccN.touched && ccN.error && <div className='error'>{ ccN.error }</div> } */}
          </fieldset>
          <fieldset className='form-group'>
            <label>Expiration Date:</label>
            <input className='form-control' { ...ccE } />
            {/* { ccE.touched && ccE.error && <div className='error'>{ ccE.error }</div> } */}
          </fieldset>
          <fieldset className='form-group'>
            <label>Credit Card Verification Number "on back of Card":</label>
            <input className='form-control' { ...ccV } />
            {/* { ccV.touched && ccV.error && <div className='error'>{ ccV.error }</div> } */}
          </fieldset>
          <button action='submit' className='btn btn-primary'>Link/Save</button>
        </form>
      </div>
    );
  }

  render() {
    if (!this.props.user) {
      return (
        <div>Loading</div>
      );
    } else if (this.props.user.verification == 0) {
      return (
        <div>
          { this.verificationOne() }
        </div>
      );
    } else if (this.props.user.verification == 1) {
      return (
        <div>
          { this.verificationTwo() }
        </div>
      );
    } else if (this.props.user.verification == 2) {
      return (
        <div>
          { this.verificationThree() }
        </div>
      );
    }
  }

}

function validate(formProps) {
  // console.log('formProps = ', formProps);
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

  // if (!formProps.ccName) {
  //   errors.ccName = 'Please fill out the name as it appears on the card.'
  // }
  // if (!formProps.ccN) {
  //   errors.ccN = 'Pleaes fill out your Credit Card Number.'
  // }
  // if (!formProps.ccE) {
  //   errors.ccE = 'Please fill out the expiration date on the card.'
  // }
  // if (!formProps.ccV) {
  //   errors.ccV = 'Please fill out the CVV code located on the back of your Credit Card.'
  // }
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
  // fields: ['firstName', 'lastName', 'dob', 'userType', 'ccName', 'ccN', 'ccE', 'ccV'],
  fields: ['firstName', 'lastName', 'dob', 'userType'],
  validate: validate
}, mapStateToProps, actions)(UserVerification);


/*
  we need to make v1 visible at all times until the user confirms their email
      at the same time we need to display v2 so they can start filling that out
      when the user verifies their email we need to check to see if they have a first and last name as well as a dob filled out
        if they do have those fields ... when they verify their email ... the server should change their verificatin to 2 which means they need to add payment info


    not sure how i want to handle the multiple forms ...
      considering mutliple things...
        -break document into multiple js files ... 1 for each verification feed
        -re-write the validate() and export() so it can take different parameters and not just the static like it is now
        -http://redux-form.com/6.0.0-alpha.6/examples/wizard/
*/
