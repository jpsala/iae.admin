<!-- eslint-disable max-len -->
<template>
<nav class="navbar"  role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
      <router-link to="/" class="navbar-item">
    APP Admin IAE
      <!-- <img src="logo.png" width="40" height="28" style="min-height: 40px"> -->
      </router-link>

  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
    </div>

    <div class="navbar-end">
      <div v-if="loggedIn" class="navbar-item">
          <a  @click="logout">
            Salir
          </a>
      </div>
      <div v-if="!loggedIn" class="navbar-item">
          <router-link to="/login">Ingresar</router-link>
      </div>
    </div>
  </div>
</nav>
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
.navbar{
  // background-color: hsl(188, 56%, 23%)!important;
  &.item {
    // color: white;font-weight: bold;font-size: 16px;
  }
}
</style>
