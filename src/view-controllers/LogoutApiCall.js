import * as constant from '../utils/Constants';
import { httpRequest } from '../NetworkConfig/Config';



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
          console.log('sdjvkv',JsonResponse)
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

export function clearAllStoreData() {
  return {
    type: constant.CLEARDATA,
  };
}