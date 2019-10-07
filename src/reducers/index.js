import app from './app';
import github from './github';
import moviesWidget from './moviesWidget';
import movieWidget from './movieWidget';
import user from './user';

export default {
  ...app,
  ...github,
  ...moviesWidget,
  ...movieWidget,
  ...user,
};
