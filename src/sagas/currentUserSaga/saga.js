import axios from "axios";
import { put, call, takeEvery } from "redux-saga/effects";
import firebaseAPI from "../../firebase/firebase";
import { FETCH_CURRENT_USER } from "./constants";
import {
  currentUserRequest,
  currentUserResponse,
  currentUserError
} from "./actions";

function* currentUserWorker() {
  try {
    let currentUser = {};
    yield put(currentUserRequest());
    yield call(() => {
      return new Promise(resolve => {
        setTimeout(async () => {
          const uid = firebaseAPI.auth().currentUser.uid;
          const res = await axios.get(
            `${process.env.REACT_APP_DATABASE_URL}/users/${uid}.json`
          );
          Object.assign(currentUser, res.data);
          resolve();
        }, 1000);
      });
    });
    yield put(currentUserResponse(currentUser));
  } catch (error) {
    yield put(currentUserError());
  }
}

function* currentUserWatcher() {
  yield takeEvery(FETCH_CURRENT_USER, currentUserWorker);
}

export default currentUserWatcher;
