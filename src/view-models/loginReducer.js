import * as constant from '../utils/Constants';

let LoginInitialValues = {
  loginDetails : {},
  loginLoad: false,
};

export var loginReducer = (state = LoginInitialValues, action) => {
  switch (action.type) {
    // ******* Social Login User Info link ********//
   
    case constant.LOGINSERVICE:
      state = {
        ...state,
        loginLoad: true,
      };
      return state;
    case constant.LOGINSUCCESS:
      state = {
        ...state,
        loginDetails: action.loginDetails,
        loginLoad: false,
      };
      return state;
    case constant.LOGINFAILURE:
      state = {
        ...state,
        loginLoad: false,
      };
      return state;

    default:
      return state;
  }
};