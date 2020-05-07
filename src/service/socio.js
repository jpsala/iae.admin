/* eslint-disable import/prefer-default-export */
import axios from './axios';

// export const usuariosDiferido = (term) => {
//   console.log('term', term);
//   return [];
// };

export const diferidos = async () => {
    const resp = await axios.get('/socio/diferido');
    return resp;
};

export const getParientes = async (term) => {
    console.log('term', term);
    const resp = await axios.get(`/api/iae/socio/parientesByTerm?term=${term}`);
    return resp.data.map((u) => {
    // eslint-disable-next-line no-param-reassign
        u.nombreCompleto = `${u.apellido}, ${u.nombre}`;
        return u;
    });
};

export const getPariente = async (id) => {
    const resp = await axios.get(`/api/iae/socio/parienteByID?id=${id}`);
    console.log('resp', resp.data);
    if (resp.data) resp.data.nombreCompleto = `${resp.data.nombre}, ${resp.data.apellido}`;
    return resp.data;
};
