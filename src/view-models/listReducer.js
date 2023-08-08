import * as constant from '../utils/Constants';

let listValues = {
  listDetails : {},
  listLoad: false,
};

export var listReducer = (state = listValues, action) => {
  switch (action.type) {
    // ******* Social Login User Info link ********//
   
    case constant.LISTSERVICE:
      state = {
        ...state,
        listLoad: true,
      };
      return state;
    case constant.LISTSUCCESS:
      state = {
        ...state,
        listDetails: action.listDetails,
        listLoad: false,
      };
      return state;
    case constant.LISTFAILURE:
      state = {
        ...state,
        listLoad: false,
      };
      return state;
    default:
      return state;
  }
};
