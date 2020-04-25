import router from '../router';
import axios from '../service/axios';

const moduleState = {
  apiToken: window.localStorage.getItem('iae.v2'),
  user: undefined,
};

const moduleGetters = {
  loggedIn(state) {
    return Boolean(state.user);
  },
};

const moduleActions = {
  async tryToLogin({ dispatch, state }) {
    if(!state.apiToken) return false;
    return dispatch('login', { token: state.apiToken })
      .catch((e) => {
        console.log('tryToLogin catch: ', e.message);
        return false;
      }).then((r) => {
        return r;
      });
  },
  async login(context, user) {
    if (context.getters.loggedIn) return true;
    context.dispatch('addLoading', { id: 'login' }, { root: true });
    return axios.post('login', user)
      .then((response) => {
        context.dispatch('removeLoading', 'login', { root: true });
        if (!response) throw Error('Error de conexión');
        if (response.status !== 200) return response;
        const { userData } = response.data;
        context.dispatch('setLoginData', userData);
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
  logout({ commit, dispatch }) {
    console.log('logout' )
    dispatch('setApiToken', undefined);
    dispatch('setLoginData', undefined);
    // router.push('/login');
    // dispatch('setHijoActivo', undefined);
  },
  setApiToken({ commit }, value) {
    commit('API_TOKEN', value);
  },
  setLoginData({ commit }, data) {
    commit('USER', data);
  },
  updateApiTokenFromInterceptor({ dispatch }, value) {
    dispatch('setApiToken', value);
  },
};

const moduleMutations = {
  USER(state, data) {
    state.user = data;
  },
  API_TOKEN(state, value) {
    window.localStorage.setItem('iae.v2', value);
    state.apiToken = value;
  },
};
export default {
  namespaced: true,
  getters: moduleGetters,
  mutations: moduleMutations,
  actions: moduleActions,
  state: moduleState,
};
