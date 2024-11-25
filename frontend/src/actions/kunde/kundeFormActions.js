import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'KUNDE_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'KUNDE_FORM_FIND_STARTED',
      });

      axios.get(`/kunde/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'KUNDE_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'KUNDE_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/kunde'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'KUNDE_FORM_CREATE_STARTED',
      });

      axios.post('/kunde', { data: values }).then((res) => {
        dispatch({
          type: 'KUNDE_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Kunde created' });
        dispatch(push('/admin/kunde'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'KUNDE_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'KUNDE_FORM_UPDATE_STARTED',
      });

      await axios.put(`/kunde/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'KUNDE_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Kunde updated' });
        dispatch(push('/admin/kunde'));
      }
    } catch (error) {
      Errors.handle(error);
      showSnackbar({ type: 'error', message: 'Kunde update error' });
      dispatch({
        type: 'KUNDE_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
