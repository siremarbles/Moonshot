import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class UserVerifyThree extends Component {

  handleFormSubmit(formProps) {
    this.props.userCCDetails(formProps);
  }

  render() {
    const { handleSubmit, fields: { ccName, ccN, ccE, ccV }} = this.props;

    if (!this.props.user) {
      return (<div>Loading...</div>);
    } else if (this.props.user.verification <= 2) {
      return(
        <div className='container'>
          <h3>This is the verification 2 field</h3>
          <p>To get to verification stage 3 you must add a credit card and phone number</p>
          <p>Add a credit card at your own will ... i will use it ... jk :D </p>
          <form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) } className='container'>
            <fieldset className='form-group'>
              <label>Name on the Credit Card:</label>
              <input className='form-control' { ...ccName } />
              { ccName.touched && ccName.error && <div className='error'>{ ccName.error }</div> }
            </fieldset>
            <fieldset className='form-group'>
              <label>Credit Card Number:</label>
              <input className='form-control' { ...ccN } />
              { ccN.touched && ccN.error && <div className='error'>{ ccN.error }</div> }
            </fieldset>
            <fieldset className='form-group'>
              <label>Expiration Date:</label>
              <input className='form-control' { ...ccE } />
              { ccE.touched && ccE.error && <div className='error'>{ ccE.error }</div> }
            </fieldset>
            <fieldset className='form-group'>
              <label>Credit Card Verification Number "on back of Card":</label>
              <input className='form-control' { ...ccV } />
              { ccV.touched && ccV.error && <div className='error'>{ ccV.error }</div> }
            </fieldset>
            <button action='submit' className='btn btn-primary'>Link/Save</button>
          </form>
        </div>
      );
    } else {
      return null;
    }
  }
}

function validate(formProps) {
  const errors = {};
  if (!formProps.ccName) {
    errors.ccName = 'Please fill out the name as it appears on the card.'
  }
  if (!formProps.ccN) {
    errors.ccN = 'Pleaes fill out your Credit Card Number.'
  }
  if (!formProps.ccE) {
    errors.ccE = 'Please fill out the expiration date on the card.'
  }
  if (!formProps.ccV) {
    errors.ccV = 'Please fill out the CVV code located on the back of your Credit Card.'
  }
  return errors;
}

function mapStateToProps(state) {
  return {
    message: state.auth.message,
    errorMessage: state.auth.error,
    user: state.user.user
  };
}

export default reduxForm({
  form: 'userCCInfo',
  fields: ['ccName', 'ccN', 'ccE', 'ccV'],
  validate: validate
}, mapStateToProps, actions)(UserVerifyThree);
