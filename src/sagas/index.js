import { all, fork } from 'redux-saga/effects';

import app from './app';
import github from './github';
import moviesWidget from './moviesWidget';
import movieWidget from './movieWidget';
import user from './user';

/**
 * rootSaga
 */
export default function* root() {
  yield all([fork(app), fork(github), fork(moviesWidget), fork(movieWidget), fork(user)]);
}
