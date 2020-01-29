import { call, put, takeEvery } from "redux-saga/effects";
import firebaseAPI from "../../firebase/firebase";
import { FETCH_POSTS } from "./constants";
import { postsRequest, postsResponse, postsError } from "./actions";

function* postsWorker() {
  try {
    let postsArray = [];
    yield put(postsRequest());
    yield call(() => {
      return new Promise(resolve => {
        firebaseAPI
          .database()
          .ref("posts")
          .on("child_added", snapshot => {
            postsArray.push(snapshot.val());
            resolve();
          });
      });
    });
    yield put(postsResponse(postsArray));
  } catch (error) {
    yield put(postsError(error));
  }
}

function* postsWatcher() {
  yield takeEvery(FETCH_POSTS, postsWorker);
}

export default postsWatcher;
