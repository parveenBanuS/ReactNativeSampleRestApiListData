import * as constant from '../utils/Constants';

let ViewInitialValues = {
  viewDetails : {},
  viewLoad: false,
};

export var viewReducer = (state = ViewInitialValues, action) => {
  switch (action.type) {
   
    case constant.VIEWSERVICE:
      state = {
        ...state,
        viewLoad: true,
      };
      return state;
    case constant.VIEWSUCCESS:
      state = {
        ...state,
        viewDetails: action.viewDetails,
        viewLoad: false,
      };
      return state;
    case constant.VIEWFAILURE:
      state = {
        ...state,
        viewLoad: false,
      };
      return state;

    default:
      return state;
  }
};
