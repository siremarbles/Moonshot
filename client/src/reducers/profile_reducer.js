import {
  FETCH_PROFILE_DATA
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_PROFILE_DATA:
      return { ...state, profileUser: action.payload };
  }
  return state;
}
