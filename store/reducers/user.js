import {AUTHENTICATE, LOGOUT} from '../actions/user';

const initialState = {
  userId: 'ZYFrVo930EYYtk4SwgNrbOhi6D12',
  token: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      console.log(action.userId);
      //console.log(action.token);
      return {
        token: action.token,
        userId: action.userId,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
