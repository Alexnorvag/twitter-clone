import { call, put, takeLatest } from "redux-saga/effects";
import { TagsApi } from "../../../services/api/tagsApi";
import { LoadingState } from "../tags/contracts/state";
import {
  setTags,
  setTagsLoadingState,
  TagsActionsType,
} from "./actionCreators";

export function* fetchTagsRequest() {
  try {
    const items = yield call(TagsApi.fetchTags);
    yield put(setTags(items));
  } catch (error) {
    yield put(setTagsLoadingState(LoadingState.ERROR));
  }
}

export function* tagsSaga() {
  yield takeLatest(TagsActionsType.FETCH_TAGS, fetchTagsRequest);
}
