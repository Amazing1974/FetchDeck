import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import usersReducer from '../reducers/usersReducer';
import productsReducer from '../reducers/productsReducer';

export default combineReducers({
  auth: usersReducer,
  products: productsReducer,
  form: formReducer
});