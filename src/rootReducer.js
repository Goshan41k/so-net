import { combineReducers } from "redux";
import currentUserReducer from "./sagas/currentUserSaga/currentUserReducer";
import newsfeedReducer from "./sagas/newsfeedSaga/newsfeedReducer";
import { ownerPageReducer } from "./sagas/pageOwnerSaga/saga";

const rootReducer = combineReducers({
  currentUserReducer,
  newsfeedReducer,
  ownerPageReducer
});

export default rootReducer;
