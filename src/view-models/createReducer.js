import * as constant from '../utils/Constants';

let createValues = {
  createDetails : {},
  updatedetails:{},
  createLoad: false,
};

export var createReducer = (state = createValues, action) => {
  switch (action.type) {
    // ******* Social Login User Info link ********//
   
    case constant.CREATESERVICE:
      state = {
        ...state,
        createLoad: true,
      };
      return state;
    case constant.CREATESUCCESS:
      state = {
        ...state,
        createDetails: action.createDetails,
        createLoad: false,
      };
      return state;
    case constant.CREATEFAILURE:
      state = {
        ...state,
        createLoad: false,
      };
      return state;

      case constant.UPDATESERVICE:
        state = {
          ...state,
          createLoad: true,
        };
        return state;
      case constant.UPDATESUCCESS:
        state = {
          ...state,
          updatedetails: action.updatedetails,
          createLoad: false,
        };
        return state;
      case constant.UPDATEFAILURE:
        state = {
          ...state,
          createLoad: false,
        };
        return state;
    default:
      return state;
  }
};
