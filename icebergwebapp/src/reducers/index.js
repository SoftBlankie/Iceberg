import isLoggedInReducer from './isLoggedIn';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  loggedIn: isLoggedInReducer,
});

export default rootReducer;
