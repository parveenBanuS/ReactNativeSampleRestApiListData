import * as constant from '../utils/Constants';
import { httpRequest } from '../NetworkConfig/Config';


//############################## CreateApi ##############################//
export function onCreateApiCall(header, requestUrl, method, inputs) {
  return (dispatch) => {
    dispatch(getCreateService());
    return httpRequest({
      method: method,
      url: requestUrl,
      headers: header,
      data: inputs,
    }).then((JsonResponse) => {
      if (JsonResponse != undefined) {
        console.log("Create Error",JsonResponse)
        if (JsonResponse.status == 200 || JsonResponse.status == 203) {
          console.log('*********CreateSuccess*********',JsonResponse)
          dispatch(getCreateSuccess(JsonResponse.message));
        } else {
          dispatch(getCreateFailure());
        }
        return JsonResponse;
      } else {
        dispatch(getCreateFailure());
      }
    });
  };
}

export function getCreateService() {``
  return {
    type: constant.CREATESERVICE,
  };
}

export function getCreateSuccess(createdetails) {
  return {
    type: constant.CREATESUCCESS,
    createdetails,
  };
}

export function getCreateFailure() {
  return {
    type: constant.CREATEFAILURE,
  };
}


//############################## ListApi ##############################//

export function onListApiCall(header, requestUrl, method, inputs) {
  return (dispatch) => {
    dispatch(getListService());
    return httpRequest({
      method: method,
      url: requestUrl,
      headers: header,
      data: inputs,
    }).then((JsonResponse) => {
      if (JsonResponse != undefined) {
        if (JsonResponse.status == 200 || JsonResponse.status == 203) {
          console.log('*********LISTSUCESS*********',JsonResponse)
          dispatch(getListSuccess(JsonResponse.message));
        } else {
          dispatch(getListFailure());
        }
        return JsonResponse;
      } else {
        dispatch(getListFailure());
      }
    });
  };
}

export function getListService() {
  return {
    type: constant.LISTSERVICE,
  };
}

export function getListSuccess(listdetails) {
  return {
    type: constant.LISTSUCCESS,
    listdetails,
  };
}

export function getListFailure() {
  return {
    type: constant.LISTFAILURE,
  };
}

//############################## LoginApi ##############################//

export function onLoginApiCall(header, requestUrl, method, inputs) {
  return (dispatch) => {
    dispatch(getLoginService());
    return httpRequest({
      method: method,
      url: requestUrl,
      headers: header,
      data: inputs,
    }).then((JsonResponse) => {
      if (JsonResponse != undefined) {
        if (JsonResponse.status == 200 || JsonResponse.status == 203) {
          console.log('*********LOGINSUCESS*********',JsonResponse)
          dispatch(getLoginSuccess(JsonResponse));
        } else {
         
          dispatch(getLoginFailure());
        }
        return JsonResponse;
      } else {
        dispatch(getLoginFailure());
      }
    });
  };
}

export function getLoginService() {
  return {
    type: constant.LOGINSERVICE,
  };
}

export function getLoginSuccess(loginDetails) {
  return {
    type: constant.LOGINSUCCESS,
    loginDetails,
  };
}

export function getLoginFailure() {
  return {
    type: constant.LOGINFAILURE,
  };
}

//############################## LogOutApi ##############################//


export function onLogoutApiCall(header, requestUrl, method, inputs) {
  return (dispatch) => {
    dispatch(getLogoutService());
    return httpRequest({
      method: method,
      url: requestUrl,
      headers: header,
      data: inputs,
    }).then((JsonResponse) => {
      if (JsonResponse != undefined) {
        if (JsonResponse.status == 200 || JsonResponse.status == 203) {
          console.log('*********LOGOUTSUCESS*********',JsonResponse)
          dispatch(getLogoutSuccess(JsonResponse));
        } else {
          console.log('sdjvkv')
          dispatch(getLogoutFailure());
        }
        return JsonResponse;
      } else {
        dispatch(getLogoutFailure());
      }
    });
  };
}

export function getLogoutService() {
  return {
    type: constant.LOGOUTSERVICE,
  };
}

export function getLogoutSuccess(logoutDetails) {
  return {
    type: constant.LOGOUTSUCCESS,
    logoutDetails,
  };
}

export function getLogoutFailure() {
  return {
    type: constant.LOGOUTFAILURE,
  };
}

//############################## ViewApi ##############################//


export function onViewApiCall(header, requestUrl, method, inputs) {
  return (dispatch) => {
    dispatch(getViewService());
    return httpRequest({
      method: method,
      url: requestUrl,
      headers: header,
      data: inputs,
    }).then((JsonResponse) => {
      if (JsonResponse != undefined) {
        if (JsonResponse.status == 200 || JsonResponse.status == 203) {
          console.log('*********VIEWSUCESS*********',JsonResponse)
          dispatch(getViewSuccess(JsonResponse.message));
        } else {
          dispatch(getViewFailure());
        }
        return JsonResponse;
      } else {
        dispatch(getViewFailure());
      }
    });
  };
}

export function getViewService() {
  return {
    type: constant.VIEWSERVICE,
  };
}

export function getViewSuccess(createdetails) {
  return {
    type: constant.VIEWSUCCESS,
    createdetails,
  };
}

export function getViewFailure() {
  return {
    type: constant.VIEWFAILURE,
  };
}


//############################## UpdateApi ##############################//


export function onUpdateApiCall(header, requestUrl, method, inputs) {
  return (dispatch) => {
    dispatch(getUpdateService());
    return httpRequest({
      method: method,
      url: requestUrl,
      headers: header,
      data: inputs,
    }).then((JsonResponse) => {
      if (JsonResponse != undefined) {
        if (JsonResponse.status == 200 || JsonResponse.status == 203) {
          console.log('*********UPDATESUCESS*********',JsonResponse)
          dispatch(getUpdateSuccess(JsonResponse.message));
        } else {
          dispatch(getUpdateFailure());
        }
        return JsonResponse;
      } else {
        dispatch(getUpdateFailure());
      }
    });
  };
}

export function getUpdateService() {``
  return {
    type: constant.UPDATESERVICE,
  };
}

export function getUpdateSuccess(updatedetails) {
  return {
    type: constant.UPDATESUCCESS,
    updatedetails,
  };
}

export function getUpdateFailure() {
  return {
    type: constant.UPDATEFAILURE,
  };
}

export function clearAllStoreData() {
  return {
    type: constant.CLEARDATA,
  };
}
