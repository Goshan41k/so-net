import {
  FETCH_CURRENT_USER,
  CURRENT_USER_REQUEST,
  CURRENT_USER_RESPONSE,
  CURRENT_USER_ERROR,
  CURRENT_USER_CLEAR
} from "./constants";

export const fetchCurrentUser = () => {
  return {
    type: FETCH_CURRENT_USER
  };
};

export const currentUserRequest = () => {
  return {
    type: CURRENT_USER_REQUEST
  };
};

export const currentUserResponse = data => {
  return {
    type: CURRENT_USER_RESPONSE,
    payload: data
  };
};

export const currentUserError = () => {
  return {
    type: CURRENT_USER_ERROR
  };
};

export const currentUserClear = () => {
  return {
    type: CURRENT_USER_CLEAR
  };
};
