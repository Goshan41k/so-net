import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./rootReducer";

import postsWatcher from "./sagas/newsfeedSaga/saga";
import currentUserWatcher from "./sagas/currentUserSaga/saga";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(postsWatcher);
sagaMiddleware.run(currentUserWatcher);

export default store;
