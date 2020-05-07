/* eslint-disable no-return-assign */
/* eslint-disable no-mixed-operators */
import { reactive, toRefs, readonly } from 'vue';
import axios from 'axios';

const state = reactive({
    loaded: false,
    loading: false,
    usuario: undefined,
    usuarios: [],
    usuariosFiltered: [],
    filter: '',
});
let onFilterAppliedFN = () => {};
let onLoadedFN = () => {};
export default () => {
    const setUsuario = (value) => {
        state.usuario = value;
    };
    const reset = () => {
        state.filter = '';
        state.usuariosFiltered = [];
        state.usuario = undefined;
    };
    const onFilterApplied = (fn) => onFilterAppliedFN = fn;
    const onDataLoaded = (fn) => onLoadedFN = fn;
    const setFilter = (value) => {
        state.filter = value;
        if (!value) {
            state.usuariosFiltered = [];
            return;
        }
        if (value.length < 3) return;
        state.usuariosFiltered = state.usuarios.filter((u) => {
            if (u.nombre && u.nombre.toUpperCase().includes(value.toUpperCase())
            || (u.apellido && u.apellido.toUpperCase().includes(value.toUpperCase()))
            || (u.email && u.email.toUpperCase().includes(value.toUpperCase()))
            || (u.documento && u.documento.toUpperCase().includes(value.toUpperCase()))
            || (u.login && u.login.toUpperCase().includes(value.toUpperCase()))) { return true; }
            return false;
        });
        onFilterAppliedFN();
    };
    const grabaUsuario = async (value) => {
        await axios.post('/api/iae/user', value);
        const idx = state.usuarios.findIndex((_u) => _u.id === value.id);
        // state.usuario = value;
        if (idx >= 0) state.usuarios[idx] = value;
        setFilter(state.filter);
    };
    const fetch = async () => {
        if (state.usuarios.length) return;
        const response = await axios({ url: '/api/iae/user/users' });
        if (!response) throw Error('Error de conexión');
        state.usuarios = response.data;
        state.loaded = true;
        onLoadedFN();
    };
    fetch();
    return {
        ...toRefs(readonly(state)),
        reset,
        setUsuario,
        setFilter,
        onFilterApplied,
        onDataLoaded,
        grabaUsuario,
    };
};
