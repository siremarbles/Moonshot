import {
  FETCH_USER_FEED_DATA,
  USER_UPDATE_V1,
  USER_UPDATE_CC,
  FETCH_ALL_USERS
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_USER_FEED_DATA:
      return { ...state, user: action.payload };
    case USER_UPDATE_V1:
      return { ...state, user: action.payload };
    case USER_UPDATE_CC:
      return { ...state, user: action.payload };
    case FETCH_ALL_USERS:
      return { ...state, allUsers: action.payload };
  }
  return state;
}
