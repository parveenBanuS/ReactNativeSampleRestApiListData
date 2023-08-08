import * as constant from '../utils/Constants';
import { httpRequest } from '../NetworkConfig/Config';



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
          console.log('sdjvkv',JsonResponse)
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

export function clearAllStoreData() {
  return {
    type: constant.CLEARDATA,
  };
}
