import {
  CREATE_GROUP,
  FETCH_GROUP_DATA
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case CREATE_GROUP:
      return { ...state, user: action.payload.user, group: action.payload.group };
    case FETCH_GROUP_DATA:
      return { ...state, group: action.payload };
  }
  return state;
}
