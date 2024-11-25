import auth from 'reducers/auth';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import users from 'reducers/users/usersReducers';

import kunde from 'reducers/kunde/kundeReducers';

import projekt from 'reducers/projekt/projektReducers';

import rechnungen from 'reducers/rechnungen/rechnungenReducers';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,

    users,

    kunde,

    projekt,

    rechnungen,
  });
