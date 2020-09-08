import {
  LOGIN,
  LOGIN_ERROR,
  REGISTER_SUCCESS,
} from '../constants'

const INITIAL_STATE = {
  isAuthenticated: false,
  error: '',
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      }
    case LOGIN:
      return {
        ...state,
        isLoading: true,
        error: '',
      }
    case LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    default: 
      return state;
  }
}