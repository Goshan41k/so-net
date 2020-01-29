import {
  FETCH_CURRENT_USER,
  CURRENT_USER_REQUEST,
  CURRENT_USER_RESPONSE,
  CURRENT_USER_ERROR,
  CURRENT_USER_CLEAR
} from "./constants";

const initialState = {
  currentUser: null,
  currentUserIsLoading: false,
  currentUserIsLoaded: false,
  currentUserError: false
};

const currentUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CURRENT_USER:
      return {
        ...state
      };
    case CURRENT_USER_REQUEST:
      return {
        ...state,
        currentUserIsLoading: true,
        currentUserIsLoaded: false,
        currentUserError: false
      };
    case CURRENT_USER_RESPONSE:
      return {
        ...state,
        currentUserIsLoading: false,
        currentUserIsLoaded: true,
        currentUserError: false,
        currentUser: action.payload
      };
    case CURRENT_USER_ERROR:
      return {
        ...state,
        currentUserIsLoading: false,
        currentUserIsLoaded: false,
        currentUserError: true
      };
    case CURRENT_USER_CLEAR: {
      return {
        ...state,
        currentUser: null
      };
    }
    default:
      return state;
  }
};

export default currentUserReducer;
