import {
  FETCH_PROFILE_DATA,
  USER_UPDATE_V1,
  USER_UPDATE_CC
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_PROFILE_DATA:
      return { ...state, user: action.payload };
    case USER_UPDATE_V1:
      return { ...state, user: action.payload };
    case USER_UPDATE_CC:
      return { ...state, user: action.payload };
  }
  return state;
}
