import { call, put, takeLatest } from "redux-saga/effects";
import { TweetsApi } from "../../../services/api/tweetsApi";
import {
  FetchAddTweetActionInterface,
  setTweets,
  setTweetsLoadingState,
  TweetsActionsType,
} from "./actionCreators";
import { LoadingState } from "./contracts/state";

export function* fetchTweetsRequest() {
  try {
    const items = yield call(TweetsApi.fetchTweets);
    yield put(setTweets(items));
  } catch (error) {
    yield put(setTweetsLoadingState(LoadingState.ERROR));
  }
}

export function* addTweetRequest({ payload }: FetchAddTweetActionInterface) {
  try {
    const data = {
      _id: Math.random().toString(36).substr(2),
      text: payload,
      user: {
        fullname: "Великое колено† ЕГЭ",
        username: "great_knee",
        avatarUrl:
          "https://pbs.twimg.com/profile_images/1295595986744737793/BIrFOfE7_bigger.jpg",
      },
    };
    const item = yield call(TweetsApi.addTweet, data);
    yield put(setTweets(item));
  } catch (error) {
    yield put(setTweetsLoadingState(LoadingState.ERROR));
  }
}

export function* tweetsSaga() {
  yield takeLatest(TweetsActionsType.FETCH_TWEETS, fetchTweetsRequest);
  yield takeLatest(TweetsActionsType.FETCH_ADD_TWEET, addTweetRequest);
}
