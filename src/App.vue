<template>
  <div id="app">
    <div id="nav">
        <p v-if="$store.getters['session/loggedIn']">
          <button @click="logout">Desconectar a {{$store.state.session.user.nombre}}</button>
        </p>
        <p v-else>Desconectado</p>
    </div>
    <router-view/>
  </div>
</template>
<script>
import { onBeforeMount, watch } from 'vue';
import store from './store';
import { onLoggedInChanged, tryToLogin } from "./service/helpers";

export default {

  setup(_, ctx) {
    const logout = () => store.dispatch('session/logout');
    onLoggedInChanged(async (c)=>{
      try {
        if(!c) await tryToLogin()
      } catch (error) {
        console.log('catch error', error)
      }
    })
    return { logout }
  },
};
</script>
