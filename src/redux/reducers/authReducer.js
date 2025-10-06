const initialState = {
  isAuthenticated: false,
  user: null,
  isAdmin: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        isAdmin: action.payload.isAdmin
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        isAdmin: false
      };
    default:
      return state;
  }
};

export default authReducer;
