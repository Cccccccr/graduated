import { combineReducers } from 'redux';
import user from './user';
import admin from './admin';

const rootReducer = combineReducers({
  user,
  admin,
});

export default rootReducer;
