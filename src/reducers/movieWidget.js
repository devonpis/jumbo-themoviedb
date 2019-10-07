import { parseError } from 'modules/client';
import { handleActions } from 'modules/helpers';

import { ActionTypes, STATUS } from 'constants/index';

export const movieWidgetState = {
  movieDetails: [],
  status: STATUS.IDLE,
  message: '',
};

export default {
  movieWidget: handleActions(
    {
      [ActionTypes.MOVIE_WIDGET_GET_MOVIE]: draft => {
        draft.movieDetails = draft.movieDetails ? draft.movieDetails : [];
        draft.message = '';
        draft.status = STATUS.RUNNING;
      },
      [ActionTypes.MOVIE_WIDGET_GET_MOVIE_SUCCESS]: (draft, { payload }) => {
        if (payload) {
          draft.movieDetails[payload.id] = { ...payload };
        }
        draft.status = STATUS.SUCCESS;
      },
      [ActionTypes.MOVIE_WIDGET_GET_MOVIE_FAILURE]: (draft, { payload }) => {
        draft.message = parseError(payload.status_message);
        draft.status = STATUS.ERROR;
      },
    },
    movieWidgetState,
  ),
};
