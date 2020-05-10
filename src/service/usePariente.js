/* eslint-disable no-return-assign */
/* eslint-disable no-mixed-operators */
import {
    reactive, toRefs, readonly,
} from 'vue';
import axios from 'axios';


const state = reactive({
    loaded: false,
    loading: false,
    pariente: undefined,
    parientes: [],
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
        state.parientes = [];
    };
    const onFilterApplied = (fn) => onFilterAppliedFN = fn;
    const onDataLoaded = (fn) => onLoadedFN = fn;
    const grabaPariente = async (value) => {
        state.loading = true;
        await axios.post('/api/iae/pariente', value);
        state.loading = false;
        const idx = state.parientes.findIndex((_u) => _u.id === value.id);
        // state.pariente = value;
        if (idx >= 0) state.parientes[idx] = value;
    };
    const getParientes = async (term) => {
        if (!term) return;
        state.loading = true;
        const response = await axios({ url: '/api/iae/pariente/parientesByTerm', params: { term } });
        state.loading = false;
        state.parientes = response.data;
        state.loaded = true;
        onLoadedFN();
    };
    const setFilter = async (value) => {
        state.filter = value;
        if (!value) {
            state.parientes = [];
            return;
        }
        if (value.length < 3) return;
        await getParientes(value);
        onFilterAppliedFN();
    };
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
