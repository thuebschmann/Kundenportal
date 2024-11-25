import list from 'reducers/kunde/kundeListReducers';
import form from 'reducers/kunde/kundeFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
