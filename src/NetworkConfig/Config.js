import { View, Text, NetInfo, ToastAndroid } from 'react-native';
import Axios from 'axios';
import { Url } from './ApiURLConstants';
import * as constant from '../utils/Constants';

const client = Axios.create({
  baseURL: '',
  responseType: 'json',
  timeout: 50000,
});
/**
 * Request Wrapper with default success/error actions
 */
client.interceptors.response.use(
  function (response) {
    // Do something with response data

    return response;
  },
  function (error) {
    // Do something with response error

    const status = error.status || error.response.status;
    if (status === 400) {
      constant.toastAlert('400', ToastAndroid.LONG);
      // dispatch(autoLogout());
    }
    return Promise.reject(error);
  },
);

const httpRequest = function (options) {
  console.log('REQUEST', options);

  const onSuccess = function (response) {
     console.debug('Request Successful!', response);

    return response;
  };

  const onError = function (error) {
    if (error.response) {
      console.debug('Request Error!', error);
    } else if (error.request) {
    } else {
      // Something else happened while setting up the request
      // triggered the error
    }

    return error.response;
  };

  return client(options).then(onSuccess).catch(onError);
};
export { httpRequest };
