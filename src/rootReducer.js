import { combineReducers } from "redux";
import currentUserReducer from "./sagas/currentUserSaga/currentUserReducer";
import newsfeedReducer from "./sagas/newsfeedSaga/newsfeedReducer";
// import postAuthorReducer from "./sagas/postAuthorSaga/postAuthorReducer";

const rootReducer = combineReducers({
  currentUserReducer,
  newsfeedReducer
  // postAuthorReducer
});

export default rootReducer;
