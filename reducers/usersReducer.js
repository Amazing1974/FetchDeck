import {
  LOGIN,
  LOGIN_ERROR,
  REGISTER_SUCCESS,
  PROFILE_UPDATE_ON_INIT,
  ADD_ADDRESS,
  ADD_ADDRESS_ERROR,
  ADD_ADDRESS_SUCCESS
} from '../constants'

const INITIAL_STATE = {
  isAuthenticated: false,
  error: '',
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case PROFILE_UPDATE_ON_INIT:
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
    case ADD_ADDRESS:
      return {
        ...state,
        isLoading: true,
      }
    case ADD_ADDRESS_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case ADD_ADDRESS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    default: 
      return state;
  }
}