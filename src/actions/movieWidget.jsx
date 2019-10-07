// @flow
/**
 * @module Actions/MovieWidget
 * @desc MovieWidget Actions
 */
import { createActions } from 'redux-actions';

import { ActionTypes } from 'constants/index';

export const { movieWidgetGetMovie: getMovie } = createActions({
  [ActionTypes.MOVIE_WIDGET_GET_MOVIE]: (movieId: number) => ({ movieId }),
});
