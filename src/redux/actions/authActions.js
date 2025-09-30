export const loginSuccess = (user) => ({
  type: 'LOGIN_SUCCESS',
  payload: user
});

export const logout = () => ({
  type: 'LOGOUT'
});

export const login = (username, password) => {
  return (dispatch) => {
    if (username === 'admin' && password === 'admin123') {
      const user = {
        username: 'admin',
        isAdmin: true,
        name: 'Admin User'
      };
      dispatch(loginSuccess(user));
      return { success: true };
    } else {
      return { success: false, message: 'Invalid credentials' };
    }
  };
};
