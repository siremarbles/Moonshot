import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import userReducer from './user_reducer';
import groupReducer from './group_reducer';
import profileReducer from './profile_reducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  user: userReducer,
  group: groupReducer,
  profile: profileReducer
});

export default rootReducer;


/*
  Break up all reducers into multiple reducers so everything is not under auth


*/
