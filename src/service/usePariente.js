/* eslint-disable no-return-assign */
/* eslint-disable no-mixed-operators */
import { reactive, toRefs, readonly } from 'vue';
import axios from 'axios';

const state = reactive({
    loaded: false,
    loading: false,
    pariente: undefined,
    parientes: [],
    parientesFiltered: [],
    filter: '',
});
let onFilterAppliedFN = () => {};
let onLoadedFN = () => {};
export default () => {
    const setPariente = (value) => {
        state.pariente = value;
    };
    const reset = () => {
        state.filter = '';
        state.parientesFiltered = [];
        state.pariente = undefined;
    };
    const onFilterApplied = (fn) => onFilterAppliedFN = fn;
    const onDataLoaded = (fn) => onLoadedFN = fn;
    const setFilter = (value) => {
        state.filter = value;
        if (!value) {
            state.parientesFiltered = [];
            return;
        }
        if (value.length < 3) return;
        state.parientesFiltered = state.parientes.filter((u) => {
            if (u.nombre && u.nombre.toUpperCase().includes(value.toUpperCase())
            || (u.apellido && u.apellido.toUpperCase().includes(value.toUpperCase()))
            || (u.email && u.email.toUpperCase().includes(value.toUpperCase()))
            || (u.documento && u.documento.toUpperCase().includes(value.toUpperCase()))
            || (u.login && u.login.toUpperCase().includes(value.toUpperCase()))) { return true; }
            return false;
        });
        onFilterAppliedFN();
    };
    const grabaPariente = async (value) => {
        await axios.post('/api/iae/pariente', value);
        const idx = state.parientes.findIndex((_u) => _u.id === value.id);
        // state.pariente = value;
        if (idx >= 0) state.parientes[idx] = value;
        setFilter(state.filter);
    };
    const fetch = async () => {
        if (state.parientes.length) return;
        const response = await axios({ url: '/api/iae/pariente/parientes' });
        if (!response) throw Error('Error de conexión');
        state.parientes = response.data;
        state.loaded = true;
        onLoadedFN();
    };
    fetch();
    return {
        ...toRefs(readonly(state)),
        reset,
        setPariente,
        setFilter,
        onFilterApplied,
        onDataLoaded,
        grabaPariente,
    };
};
