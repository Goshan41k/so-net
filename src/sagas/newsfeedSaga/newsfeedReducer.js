import {
  FETCH_POSTS,
  POSTS_REQUEST,
  POSTS_RESPONSE,
  POSTS_ERROR
} from "./constants";

const initialState = {
  postsIsLoading: false,
  postsIsLoaded: false,
  postsIsError: false,
  postsData: []
};

const newsfeedReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state
      };
    case POSTS_REQUEST:
      return {
        ...state,
        postsIsLoading: true,
        postsIsLoaded: false,
        postsIsError: false
      };
    case POSTS_RESPONSE:
      return {
        ...state,
        postsIsLoading: false,
        postsIsLoaded: true,
        postsIsError: false,
        postsData: action.payload
      };
    case POSTS_ERROR:
      return {
        ...state,
        postsIsLoading: false,
        postsIsLoaded: false,
        postsIsError: true
      };
    default:
      return state;
  }
};

export default newsfeedReducer;
