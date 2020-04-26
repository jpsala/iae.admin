<template>
<aside class="menu">
  <!-- <p class="menu-label">
    General
  </p> -->
  <!-- <ul class="menu-list">
    <li><a>Usuarios</a></li>
    <li>
      <a class="is-active">Manage Your Team</a>
      <ul>
        <li><a>Members</a></li>
        <li><a>Plugins</a></li>
        <li><a>Add a member</a></li>
      </ul>
    </li>
    <li><a>Invitations</a></li>
    <li><a>Cloud Storage Environment Settings</a></li>
    <li><a>Authentication</a></li>
  </ul> -->
  <p v-if="loggedIn" class="menu-label">
    {{$store.state.session.user.nombre}}
  </p>
  <ul class="menu-list">
    <li><router-link to="/test">Test</router-link></li>
    <li v-if="!loggedIn"><router-link to="/login">Ingresar</router-link></li>
    <li v-if="loggedIn"><a href="#" @click="logout">Salir</a></li>
  </ul>
</aside>
</template>

<script>
import { computed } from 'vue';
import store from '../store';

export default {
  setup() {
    const logout = () => store.dispatch('session/logout');
    const loggedIn = computed(() => store.getters['session/loggedIn']);
    return { logout, loggedIn };
  },
};
</script>
<style lang="scss">
    .menu {
      margin-left: 20px;
       width: 160px;
       height: 84.5vh;
      //  box-shadow: 4px 0 2px 2px #80808069;
      // box-shadow: 1px 0 10px 1px #80808069;
      border-right: 1px solid #DDD;
       margin-right: 15px;
    }
</style>
