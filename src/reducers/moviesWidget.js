import { parseError } from 'modules/client';
import { handleActions } from 'modules/helpers';

import { ActionTypes, STATUS } from 'constants/index';

export const moviesWidgetState = {
  movies: [],
  query: '',
  status: STATUS.IDLE,
  message: '',
  page: 1,
  total_page: 0,
  page_size: 20,
};

export default {
  moviesWidget: handleActions(
    {
      [ActionTypes.MOVIES_WIDGET_GET_MOVIES]: (draft, { payload }) => {
        if (payload.page === 1) {
          draft.movies = [];
        } else {
          draft.movies = draft.movies ? draft.movies : [];
        }
        draft.message = '';
        draft.query = payload.query;
        draft.status = STATUS.RUNNING;
      },
      [ActionTypes.MOVIES_WIDGET_GET_MOVIES_SUCCESS]: (draft, { payload }) => {
        if (payload.results) {
          const ids = new Set(draft.movies.map(d => d.id));
          draft.movies = [...draft.movies, ...payload.results.filter(d => !ids.has(d.id))];
        }
        draft.total_pages = payload.total_pages || 0;
        draft.page = payload.page || 0;
        draft.status = STATUS.SUCCESS;
      },
      [ActionTypes.MOVIES_WIDGET_GET_MOVIES_FAILURE]: (draft, { payload }) => {
        draft.message = parseError(payload.status_message);
        draft.status = STATUS.ERROR;
      },
    },
    moviesWidgetState,
  ),
};
