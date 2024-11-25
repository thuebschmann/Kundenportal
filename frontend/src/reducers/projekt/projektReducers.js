import list from 'reducers/projekt/projektListReducers';
import form from 'reducers/projekt/projektFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
