import * as constant from '../utils/Constants';
import { httpRequest } from '../NetworkConfig/Config';



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
          console.log('sdjvkv',JsonResponse)
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
    type: constant.SERVICE,
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
