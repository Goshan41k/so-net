import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./rootReducer";
import postsWatcher from "./sagas/newsfeedSaga/saga";
import currentUserWatcher from "./sagas/currentUserSaga/saga";
import { pageOwnerWatcher } from "./sagas/pageOwnerSaga/saga";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(postsWatcher);
sagaMiddleware.run(currentUserWatcher);
sagaMiddleware.run(pageOwnerWatcher);

export default store;
