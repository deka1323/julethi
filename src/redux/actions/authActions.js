import apiService from '../../services/api';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const SET_LOADING = 'SET_AUTH_LOADING';

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error
});

export const logout = () => ({
  type: LOGOUT
});

export const setAuthLoading = (loading) => ({
  type: SET_LOADING,
  payload: loading
});

export const login = (username, password) => async (dispatch) => {
  dispatch(setAuthLoading(true));
  try {
    const response = await apiService.adminLogin(username, password);

    if (response.success) {
      dispatch(loginSuccess(response.data));
      dispatch(setAuthLoading(false));
      return { success: true };
    } else {
      dispatch(loginFailure(response.error));
      dispatch(setAuthLoading(false));
      return { success: false, message: response.error };
    }
  } catch (error) {
    dispatch(loginFailure(error.message));
    dispatch(setAuthLoading(false));
    return { success: false, message: error.message };
  }
};
