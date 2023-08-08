import * as constant from '../utils/Constants';
import { httpRequest } from '../NetworkConfig/Config';



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
          console.log('sdjvkv',JsonResponse)
          dispatch(getLoginSuccess(JsonResponse));
        } else {
          console.log('sdjvkv')
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

export function clearAllStoreData() {
  return {
    type: constant.CLEARDATA,
  };
}