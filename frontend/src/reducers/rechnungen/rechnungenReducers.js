import list from 'reducers/rechnungen/rechnungenListReducers';
import form from 'reducers/rechnungen/rechnungenFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
