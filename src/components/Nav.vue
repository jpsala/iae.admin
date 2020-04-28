<template>
<div class="icon-nav" v-if="Screen.lt.lg" @click="nav=!nav">
  <span class="icon-menu" />
</div>
<div id="Nav" class="show" @click="navClick">
  <nav class="nav">
  <span v-if="Screen.lt.lg" @click="togglePinned" class="pin" :class="{'icon-pin-outline':!pinned,'icon-pin':pinned}" />
      <div class="margin-lg margin-y title-set">
      <span>
        <h5 class="title">
        Cuota completa</h5>
        <span class="list__item__det">Usuarios que elijieron pagar la cuota completa</span>
      </span>
      <ul class="list list--unstyled list--nulled">
        <li class="list__item">
          <router-link to="usuariosDiferdo">Mediante App</router-link>
          <span class="list__item__det">Ellos mismos elijieron usando la App</span>
        </li>
        <li class="list__item">
          <router-link to="/test">Test route</router-link>
          <span class="list__item__det">Ruta solo para probar</span>
        </li>
        <li class="list__item">
          <router-link to="usuariosDiferdo">Solicitaron</router-link>
          <span class="list__item__det">Solocitaron pagar la cuota completa</span>
        </li>

      </ul>
    </div> <!-- /.title-set -->
    <hr>
    <div v-if="loggedIn" class="margin-xxs margin-y title-set">
      Conectado como {{$store.state.session.user.nombre}}
    </div>
    <button v-if="loggedIn" @click="logout()" class="button--clear button--outlined button button--primary button--sm margin-xxs margin-y title-set">
      Desconectar
    </button>
    <router-link to="/login" v-if="!loggedIn" class="button button--primary margin-xxs margin-y title-set">
     Ingresar
    </router-link>
  </nav>
</div>
<div v-if="overlay" id="overlay" @click="closeOverlay"></div>
</template>
<script>
/* eslint-disable max-len */
import { computed, watch, ref } from 'vue';
import useWindowResize from '../service/useWindowResize';
import store from '../store';

export default {
  setup() {
    const logout = () => store.dispatch('session/logout');
    const overlay = ref(false);
    const loggedIn = computed(() => store.getters['session/loggedIn']);
    const Screen = useWindowResize();
    const nav = ref();
    const pinned = ref(false);
    const closeOverlay = () => {
      overlay.value = false;
      if (Screen.value.xs) nav.value = false;
    };
    const navClick = (e) => {
      const esLink = ['A', 'BUTTON'].find((tag) => tag === e.target.tagName);
      if (esLink && Screen.value.lt.md && !pinned.value) {
        nav.value = false;
      }
    };
    const togglePinned = () => {
      pinned.value = !pinned.value;
    };
    const navChange = (_show) => {
      const navEl = document.querySelector('#Nav');
      if (_show) {
        navEl.classList.add('show');
        if (Screen.value.xs) overlay.value = true;
      } else {
        navEl.classList.remove('show');
        pinned.value = false;
      }
      if (!_show) overlay.value = false;
    };
    const breakpointChange = () => {
      if (pinned.value && Screen.value.xs) {
        pinned.value = false;
        nav.value = false;
      }
      if (pinned.value) return;
      if (Screen.value.gt.lg) {
        nav.value = true;
      } else if (Screen.value.xs) {
        nav.value = false;
      } else if (!pinned.value) nav.value = Screen.value.gt.sm;
    };
    // eslint-disable-next-line no-return-assign
    watch(Screen, breakpointChange, { deep: true });
    watch(nav, navChange);
    return {
      closeOverlay,
      overlay,
      logout,
      loggedIn,
      Screen,
      navClick,
      nav,
      togglePinned,
      pinned,
    };
  },
};
</script>
<style lang="scss">
  .icon-nav{
    cursor: pointer;
    position: absolute;
    top: 7px;
    left: 7px;
    font-size: 1.5rem;
    z-index: 5;
  }
  #Nav{
    z-index: 3;
    background-color: white;
    display: none;
    width: 250px;
    padding: 0px 0 0 1rem;
    max-width: 250px!important;
    @media (min-width: 768px) {
      max-width: 300px!important;
    }
    box-shadow: 1px 0 5px 1px #80808069;
    .pin{
      float: right;
      margin-top: -40px;
      margin-right: 10px;
      font-size: 24px;
      cursor: pointer;
    }
    .list__item__det{
      color: gray;
      margin-left: 12px;
      word-break: normal;
      max-width: 160px;
      display: block;
      width: 160px;
      font-size: 14px;
    }
  &.show{
      display: block;
  }
}
#overlay {
  position: fixed; /* Sit on top of the page content */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5); /* Black background with opacity */
  z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
  // cursor: pointer; /* Add a pointer on hover */
}
</style>
