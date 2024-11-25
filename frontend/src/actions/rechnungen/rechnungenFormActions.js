import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'RECHNUNGEN_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'RECHNUNGEN_FORM_FIND_STARTED',
      });

      axios.get(`/rechnungen/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'RECHNUNGEN_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'RECHNUNGEN_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/rechnungen'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'RECHNUNGEN_FORM_CREATE_STARTED',
      });

      axios.post('/rechnungen', { data: values }).then((res) => {
        dispatch({
          type: 'RECHNUNGEN_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Rechnungen created' });
        dispatch(push('/admin/rechnungen'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'RECHNUNGEN_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'RECHNUNGEN_FORM_UPDATE_STARTED',
      });

      await axios.put(`/rechnungen/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'RECHNUNGEN_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Rechnungen updated' });
        dispatch(push('/admin/rechnungen'));
      }
    } catch (error) {
      Errors.handle(error);
      showSnackbar({ type: 'error', message: 'Rechnungen update error' });
      dispatch({
        type: 'RECHNUNGEN_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
