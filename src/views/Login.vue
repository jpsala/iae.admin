<template>
<div class="login flex__item--center card card--raised">
  <form @submit.stop.prevent="submit" class="lead panel bg-color-lightest card__content">
      <div class="control">
        <label class="control__label">Usuario
          <input  v-model="login" class="control__input" type="text" placeholder="Usuario">
        </label>
    </div>
      <div class="field">
      <div class="control">
        <label class="control__label">Password
          <input v-model="password" class="control__input" type="password" placeholder="Password">
        </label>
      </div>
    </div>
  <div class="grid grid--justify-end">
    <button  type="submit" class="button button--filled button--primary">Ingresar</button>
  </div>
  </form>
</div>
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
    .login{
      // background-color: lightblue;
      margin: 30px auto;
      padding: 25px 17px 0px 25px;
      // max-width: 500px;
      // margin: auto auto;
      // background-color: #00D1B2;
      border-radius: 5px;
      & .field.is-grouped{
        margin-top: 30px;
        justify-content: flex-end;
      }
    }
</style>
