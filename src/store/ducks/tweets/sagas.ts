import { call, put, takeLatest } from "redux-saga/effects";
import { TweetsApi } from "../../../services/api/tweetsApi";
import {
  addTweet,
  setAddFormState,
  setTweets,
  setTweetsLoadingState,
} from "./actionCreators";
import { FetchAddTweetActionInterface, TweetsActionsType } from "./contracts/actionTypes";
import { AddFormState, LoadingState, Tweet } from "./contracts/state";

export function* fetchTweetsRequest() {
  try {
    const items = yield call(TweetsApi.fetchTweets);
    yield put(setTweets(items));
  } catch (error) {
    yield put(setTweetsLoadingState(LoadingState.ERROR));
  }
}

export function* fetchAddTweetRequest({ payload }: FetchAddTweetActionInterface) {
  try {
    const data: Tweet = {
      _id: Math.random().toString(36).substr(2),
      text: payload,
      user: {
        fullname: "Alex Norvag",
        username: "nxrvlg",
        avatarUrl:
          "https://sun9-70.userapi.com/c625831/v625831627/b6d5/dlw-cJw2PTk.jpg",
      },
    };
    const item = yield call(TweetsApi.addTweet, data);
    yield put(addTweet(item));
  } catch (error) {
    yield put(setAddFormState(AddFormState.ERROR));
  }
}

export function* tweetsSaga() {
  yield takeLatest(TweetsActionsType.FETCH_TWEETS, fetchTweetsRequest);
  yield takeLatest(TweetsActionsType.FETCH_ADD_TWEET, fetchAddTweetRequest);
}
