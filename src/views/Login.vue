<template>
    <form @submit.stop.prevent="submit">
      <div class="field">
        <label class="label">Usuario</label>
      <div class="control">
        <input v-model="login" class="input" type="text" placeholder="Usuario">
      </div>
    </div>
      <div class="field">
        <label class="label">Password</label>
      <div class="control">
        <input v-model="password" class="input" type="password" placeholder="Password">
      </div>
    </div>
<div class="field is-grouped">
  <div class="control">
    <button  type="submit" class="button is-link">Ingresar</button>
  </div>
</div>
  </form>
</template>

<script>
import { ref, onBeforeMount } from 'vue';
import store from '../store';
import router from '../router';

export default {
  setup() {
    const login = ref('');
    const password = ref('');
    const submit = () => {
      store.dispatch('session/login', {
        login: login.value,
        password: password.value,
        saveCredentials: false,
      }).then(() => {
        router.push('/');
      }).catch((e) => {
        console.log('error', e);
        alert('revise los datos');
      });
    };
    onBeforeMount(() => {
      if (store.getters['session/loggedIn']) router.push('/');
    });
    return { login, password, submit };
  },

};
</script>

<style lang="scss">
    form{
        max-width: 500px;
        margin: 20px auto 0;
    }
</style>
