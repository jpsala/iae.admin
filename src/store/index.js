import Vuex from 'vuex';
import session from './sessionModule';

export default Vuex.createStore({
  state: {
    loading: {},
  },
  mutations: {
    ADD_LOADING(state, { label, id }) {
      state.loading[id] = label;
    },
    REMOVE_LOADING(state, id) {
      delete state.loading[id];
    },
  },
  actions: {
    addLoading({ commit }, _data) {
      let data = { label: '', id: undefined };
      if (_data && typeof (_data) === 'string') {
        data = { id: _data, label: undefined };
      }
      commit('ADD_LOADING', data);
    },
    removeLoading({ commit }, id) {
      commit('REMOVE_LOADING', id);
    },
  },
  modules: {
    session,
  },
});
