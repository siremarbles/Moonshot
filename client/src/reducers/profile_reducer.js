import {
  FETCH_PROFILE_DATA,
  REQUEST_FOLLOW_USER,
  UPDATE_FOLLOW_USER_REQUEST
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_PROFILE_DATA:
      return { ...state, profileUser: action.payload };
    case REQUEST_FOLLOW_USER:
      return { ...state, user: action.payload };
    case UPDATE_FOLLOW_USER_REQUEST:
      return { ...state, user: action.payload };
  }
  return state;
}
