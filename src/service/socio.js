/* eslint-disable import/prefer-default-export */
// import store from '../store';
import axios from './axios';

// export const usuariosDiferido = (term) => {
//   console.log('term', term);
//   return [];
// };

export const diferidos = async () => {
  const resp = await axios.get('/socio/diferido');
  return resp;
};

export const getParientes = (term) => {
  console.log('term', term);
  return axios.get(`/socio/parientesByTerm?term=${term}`);
};
