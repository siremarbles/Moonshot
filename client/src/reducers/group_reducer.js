import {
  CREATE_GROUP,
  FETCH_GROUP_DATA,
  FETCH_ALL_GROUPS
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case CREATE_GROUP:
      return { ...state, user: action.payload.user, group: action.payload.group };
    case FETCH_GROUP_DATA:
      return { ...state, group: action.payload };
    case FETCH_ALL_GROUPS:
      return { ...state, groups: action.payload };
  }
  return state;
}
