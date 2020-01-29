import { put, call, takeEvery } from "redux-saga/effects";
import axios from "axios";

const PAGE_OWNER_CLEAR = "PAGE_OWNER_CLEAR";
const FETCH_PAGE_OWNER = "FETCH_PAGE_OWNER";
const PAGE_OWNER_REQUEST = "PAGE_OWNER_REQUEST";
const PAGE_OWNER_RESPONSE = "PAGE_OWNER_RESPONSE";
const PAGE_OWNER_ERROR = "PAGE_OWNER_ERROR";

const pageOwnerClear = () => {
  return {
    type: PAGE_OWNER_CLEAR
  };
};

const fetchPageOwner = () => {
  return {
    type: FETCH_PAGE_OWNER
  };
};

const pageOwnerRequest = () => {
  return {
    type: PAGE_OWNER_REQUEST
  };
};

const pageOwnerResponse = data => {
  return {
    type: PAGE_OWNER_RESPONSE,
    payload: data
  };
};

const pageOwnerError = () => {
  return {
    type: PAGE_OWNER_ERROR
  };
};

const initialState = {
  pageOwnerIsLoading: false,
  pageOwnerIsLoaded: false,
  pageOwnerIsError: false,
  pageOwnerData: null
};

export const ownerPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAGE_OWNER_CLEAR:
      return {
        ...state,
        pageOwnerData: null
      };
    case FETCH_PAGE_OWNER:
      return {
        ...state
      };
    case PAGE_OWNER_REQUEST:
      return {
        ...state,
        pageOwnerIsLoading: true,
        pageOwnerIsLoaded: false,
        pageOwnerIsError: false
      };
    case PAGE_OWNER_RESPONSE:
      return {
        ...state,
        pageOwnerIsLoading: false,
        pageOwnerIsLoaded: true,
        pageOwnerIsError: false,
        pageOwnerData: action.payload
      };
    case PAGE_OWNER_ERROR:
      return {
        ...state,
        pageOwnerIsLoading: false,
        pageOwnerIsLoaded: false,
        pageOwnerIsError: true
      };
    default:
      return state;
  }
};

function* pageOwnerWorker() {
  try {
    let owner;
    yield put(pageOwnerRequest());
    yield call(() => {
      return new Promise(async resolve => {
        const res = await axios.get(
          `${process.env.REACT_APP_DATABASE_URL}/users.json`
        );
        console.log(res.data);
        resolve();
        const users = Object.values(res.data);
        const pathname = document.location.pathname.substring(3);
        owner = users.filter(
          user => user.id.toString() === pathname.toString()
        );
        resolve();
      });
    });
    yield put(pageOwnerResponse(owner[0]));
  } catch (error) {
    yield put(pageOwnerError());
  }
}

export function* pageOwnerWatcher() {
  yield takeEvery(FETCH_PAGE_OWNER, pageOwnerWorker);
}
