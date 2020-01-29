import {
  FETCH_POSTS,
  POSTS_REQUEST,
  POSTS_RESPONSE,
  POSTS_ERROR
} from "./constants";

export const fetchPosts = () => {
  return {
    type: FETCH_POSTS
  };
};

export const postsRequest = () => {
  return {
    type: POSTS_REQUEST
  };
};

export const postsResponse = responseData => {
  return {
    type: POSTS_RESPONSE,
    payload: responseData
  };
};

export const postsError = () => {
  return {
    type: POSTS_ERROR
  };
};
