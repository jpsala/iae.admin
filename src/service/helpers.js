import { watch } from 'vue';
import store from '../store';
import router from '../router';

let loggedInChangedFN = () => {};
const onLoggedInChanged = (fn) => {
  loggedInChangedFN = fn;
  loggedInChangedFN(store.getters['session/loggedIn'], undefined);
};
watch(
  () => store.getters['session/loggedIn'],
  (v) => loggedInChangedFN(v),
  { immediate: true },
);
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
};
const debounce = (fn, delay) => {
  let timer = null;
  return function () {
    const context = this; const
      // eslint-disable-next-line prefer-rest-params
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
};
const throttle = (fn, threshhold, scope) => {
  threshhold || (threshhold = 250);
  let last;
  let deferTimer;
  return function () {
    const context = scope || this;

    const now = +new Date();
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(() => {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
};
const uniqueID = () => Date.now();
export {
  onLoggedInChanged, tryToLogin, debounce, throttle, uniqueID,
};
