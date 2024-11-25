import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'PROJEKT_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'PROJEKT_FORM_FIND_STARTED',
      });

      axios.get(`/projekt/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'PROJEKT_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'PROJEKT_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/projekt'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'PROJEKT_FORM_CREATE_STARTED',
      });

      axios.post('/projekt', { data: values }).then((res) => {
        dispatch({
          type: 'PROJEKT_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Projekt created' });
        dispatch(push('/admin/projekt'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'PROJEKT_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'PROJEKT_FORM_UPDATE_STARTED',
      });

      await axios.put(`/projekt/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'PROJEKT_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Projekt updated' });
        dispatch(push('/admin/projekt'));
      }
    } catch (error) {
      Errors.handle(error);
      showSnackbar({ type: 'error', message: 'Projekt update error' });
      dispatch({
        type: 'PROJEKT_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
