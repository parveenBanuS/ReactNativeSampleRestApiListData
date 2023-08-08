import { combineReducers } from 'redux';
import * as constant from '../utils/Constants';
import { loginReducer } from '../view-models/loginReducer';
import { createReducer  } from '../view-models/createReducer';
import {listReducer} from '../view-models/listReducer';
import {viewReducer} from '../view-models/viewReducer';

// import { allMasterListReducer } from '../Reducers/allMasterListReducer';
// import { allMasterViewReducer } from '../Reducers/allMasterViewReducer';
// import { allMasterCreateReducer } from '../Reducers/allMasterCreateReducer';
// import { allMasterEditReducer } from '../Reducers/allMasterEditReducer';
// import { allMasterStateReducer } from '../Reducers/allMasterStateReducer';
// import { cmsMasterReducer } from '../Reducers/cmsMasters';


var RootReducer = combineReducers({
   loginReducer,
   createReducer,
   listReducer,
   viewReducer
//   allMasterListReducer,
//   allMasterViewReducer,
//   allMasterCreateReducer,
//   allMasterEditReducer,
//   allMasterStateReducer,
//   cmsMasterReducer
});

const appReducer = (state, action) => {
//   if (action.type === constant.CLEARDATA) {
//     state = undefined;
//   }
  return RootReducer(state, action);
};



export default appReducer;