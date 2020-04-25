import { watch } from 'vue';
import store from '../store';
import router from '../router';
let loggedInChangedFN = () => {}
const onLoggedInChanged = (fn) => {
    loggedInChangedFN = fn
    loggedInChangedFN(store.getters['session/loggedIn'], undefined)
}
watch(
    () => store.getters['session/loggedIn'],
    (v) => loggedInChangedFN(v),
    {immediate: true}
)
const tryToLogin = () => {
    store.dispatch('session/tryToLogin')
  .then((resp) => {
    if (!resp || resp.status !== 200) {
      router.push('/login');
    }
  })
  .catch((e) => {
    router.push('/login');
  });
}
export { onLoggedInChanged, tryToLogin }