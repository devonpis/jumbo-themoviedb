// @flow
/**
 * @module Actions/MoviesWidget
 * @desc MoviesWidget Actions
 */
import { createActions } from 'redux-actions';

import { ActionTypes } from 'constants/index';

export const { moviesWidgetGetMovies: getMovies } = createActions({
  [ActionTypes.MOVIES_WIDGET_GET_MOVIES]: (query: string, page: number) => ({ query, page }),
});
