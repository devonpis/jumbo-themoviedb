/**
 * @module Sagas/MoviesWidget
 * @desc MoviesWidget
 */

import { all, call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'modules/client';

import { ActionTypes } from 'constants/index';

/**
 * Get Movies
 *
 * @param {Object} action
 *
 */
export function* getMovies({ payload }) {
  try {
    const url = payload.query
      ? `https://api.themoviedb.org/3/search/movie?api_key=6ed12e064b90ae1290fa326ce9e790ff&language=en-US&query=${payload.query}&page=${payload.page}&include_adult=false`
      : `https://api.themoviedb.org/3/discover/movie?api_key=6ed12e064b90ae1290fa326ce9e790ff&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${payload.page}`;
    const response = yield call(
      request,
      url,
    );
    yield put({
      type: ActionTypes.MOVIES_WIDGET_GET_MOVIES_SUCCESS,
      payload: {
        ...response,
      },
    });
  } catch (err) {
    yield put({
      type: ActionTypes.MOVIES_WIDGET_GET_MOVIES_FAILURE,
      payload: err,
    });
  }
}

/**
 * MoviesWidget Sagas
 */
export default function* root() {
  yield all([takeLatest(ActionTypes.MOVIES_WIDGET_GET_MOVIES, getMovies)]);
}
