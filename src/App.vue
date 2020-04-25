<template>
  <div id="app">
    <div id="nav">
        <pre>{{$store.state.session.user}}</pre>
    </div>
    <router-view/>
  </div>
</template>
<script>
import { onBeforeMount, watch } from 'vue';
import router from './router';
import store from './store';

export default {
  setup(_, ctx) {
    console.log('reouter', router);
    onBeforeMount(async () => {
      console.log('ctx', ctx);
      store.dispatch('session/tryToLogin')
        .then((resp) => {
          if (!resp || resp.status !== 200) {
            router.push('/login');
          }
        })
        .catch((e) => {
          console.log('catch', e);
          router.push('/login');
          // store.dispatch('session/login', { login: 'jpsala', password: 'masterPassword', saveCredentials: false });
        });
      // if (loggedIn.resp !== 'OK') await store.dispatch('session/login');
      // store.dispatch('session/login', { login: 'jpsala', password: 'masterPassword', saveCredentials: false });
    });
    watch(() => store.getters['session/loggedIn'], async (l) => {
      console.log('watch loggedIn', l);
    });
  },
};
</script>
