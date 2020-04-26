<!-- eslint-disable max-len -->
<template>
<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">
      <img src="logo.png" width="70" height="28" style="min-height: 58px">
    </a>

  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
<!--
      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          More
        </a>

        <div class="navbar-dropdown">
          <a class="navbar-item">
            About
          </a>
          <a class="navbar-item">
            Jobs
          </a>
          <a class="navbar-item">
            Contact
          </a>
          <hr class="navbar-divider">
          <a class="navbar-item">
            Report an issue
          </a>
        </div>
      </div> -->
    </div>

    <div class="navbar-end">
      <div v-if="loggedIn" class="navbar-item">
          <a class="is-light" @click="logout">
            Salir
          </a>
      </div>
      <div v-if="!loggedIn" class="navbar-item">
          <router-link class="is-light" to="/login">Ingresar</router-link>
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
</style>
