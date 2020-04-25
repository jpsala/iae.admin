/* eslint-disable no-underscore-dangle */
import axios from 'axios';

let store;
const local = document.location.hostname === 'localhost';
// console.log('document.location.hostname', document.location.hostname);
const getAxios = () => {
  console.log('Axios, solo una vez!');
  axios.defaults.baseURL = local ? 'http://localhost:8888/api/iae' : 'https://root.iae.com.ar/iae/index.php?r=apiApp/';
  axios.interceptors.response.use((response) => {
    const endPoint = response.config.url.substring(response.config.url.lastIndexOf('/') + 1);
    console.log('endpoint %O %O response.data %O', endPoint, response, response.data);
    if (response.data && response.headers.token) {
      store.dispatch('session/updateApiTokenFromInterceptor', response.headers.token);
    }
    return response;
  }, (error) => {
    console.log('Error en axios.interceptors.response: ', error.message || error)
    return  Promise.reject(error);
  });

  axios.interceptors.request.use(
    async (config) => {
    // eslint-disable-next-line no-param-reassign
      config.headers.token = store.state.session.apiToken;
      return config;
    },
    (error) => Promise.reject(error),
  );

  axios.defaults.method = 'POST';
  return axios;
};
const _axios = getAxios();
export const setStore = (_store) => { store = _store; };
export default _axios;
