import {
  FETCH_USER_FEED_DATA,
  USER_UPDATE_V1,
  USER_UPDATE_CC,
  FETCH_ALL_USERS,
  FETCH_PROFILE_DATA,
  REQUEST_FOLLOW_USER,
  UPDATE_FOLLOW_USER_REQUEST,
  INVITE_TO_GROUP,
  FETCH_ACTIVITY_DATA
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

    case INVITE_TO_GROUP:
      return { ...state, profileUser: action.payload };

    case FETCH_PROFILE_DATA:
      return { ...state, user: action.payload.user, profileUser: action.payload.viewUser };
    case REQUEST_FOLLOW_USER:
      return { ...state, user: action.payload.user, profileUser: action.payload.viewUser };
    case UPDATE_FOLLOW_USER_REQUEST:
      return { ...state, user: action.payload };
      case FETCH_ACTIVITY_DATA:
        return { ...state, user: action.payload, profileUser: action.payload.viewUser };
  }
  return state;
}
