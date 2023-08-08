import * as constant from '../utils/Constants';
import { httpRequest } from '../NetworkConfig/Config';



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
          console.log('sdjvkv',JsonResponse)
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

export function clearAllStoreData() {
  return {
    type: constant.CLEARDATA,
  };
}
