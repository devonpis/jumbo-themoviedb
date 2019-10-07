/**
 * @module Sagas/MovieWidget
 * @desc MovieWidget
 */

import { all, call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'modules/client';

import { ActionTypes } from 'constants/index';

/**
 * Get Movie
 *
 * @param {Object} action
 *
 */
export function* getMovie({ payload }) {
  try {
    const url = `https://api.themoviedb.org/3/movie/${payload.movieId}?api_key=6ed12e064b90ae1290fa326ce9e790ff&language=en-US`
    const response = yield call(
      request,
      url,
    );
    yield put({
      type: ActionTypes.MOVIE_WIDGET_GET_MOVIE_SUCCESS,
      payload: {
        ...response,
      },
    });
  } catch (err) {
    yield put({
      type: ActionTypes.MOVIE_WIDGET_GET_MOVIE_FAILURE,
      payload: err,
    });
  }
}

/**
 * MovieWidget Sagas
 */
export default function* root() {
  yield all([takeLatest(ActionTypes.MOVIE_WIDGET_GET_MOVIE, getMovie)]);
}
