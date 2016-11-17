import {
  AUTH_USER,
  DEAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE,
  FETCH_PROFILE_DATA,
  USER_UPDATE_V1,
  USER_UPDATE_CC,
  CREATE_GROUP,
  FETCH_GROUP_DATA,
  FETCH_ALL_GROUPS
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case AUTH_USER:
      return { ...state, error: '', authenticated: true };
    case DEAUTH_USER:
      return { ...state, authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case FETCH_MESSAGE:
      return { ...state, message: action.payload };
    case FETCH_PROFILE_DATA:
      return { ...state, user: action.payload };
    case USER_UPDATE_V1:
      return { ...state, user: action.payload };
    case USER_UPDATE_CC:
      return { ...state, user: action.payload };
    case CREATE_GROUP:
      return { ...state, user: action.payload.user, group: action.payload.group };
    case FETCH_GROUP_DATA:
      return { ...state, group: action.payload };
    case FETCH_ALL_GROUPS:
      return { ...state, groups: action.payload };
  }
  return state;
}
