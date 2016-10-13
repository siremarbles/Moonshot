import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  DEAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE
} from './types'

const ROOT_URL = 'http://localhost:3090';

export function signupUser({ email, password }) {
  // console.log('checkcheck check');
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/profile');
      })
      .catch(error => dispatch(authError(error.response.data.error)));
  }
}

export function loginUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/login`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/profile');
      })
      .catch(() => {
        dispatch(authError('Bad Login Info'));
      });
  }
}

export function signoutUser() {
  localStorage.removeItem('token');
  return { type: DEAUTH_USER };
}


export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
      headers: { authoriation: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        })
      })
  }
}
