<template>
  <div class="icon-nav" v-if="Screen.lt.lg" @click="nav=!nav">
    <span class="icon-menu" />
  </div>
  <div id="Nav" class="show" @click="navClick">
    <nav class="nav">
      <span v-if="Screen.lt.lg &&  Screen.gt.xs" @click="togglePinned" class="pin"
        :class="{'icon-pin-outline':!pinned,'icon-pin':pinned}" />
      <navmenu />
      <div class="nav-bottom">
        <hr class="hr-session" />
        <div v-if="loggedIn" class="margin-xxs margin-y title-set">
          Conectado como {{user.nombre}}
        </div>
        <li class="list__item" v-if="!loggedIn">
          <router-link to="login">Ingresar</router-link>
          <span class="list__item__det">Ingresar las credenciales</span>
        </li>
        <li class="list__item" v-if="loggedIn">
          <router-link @click="logout()" to="#">Desconectar</router-link>
          <span class="list__item__det">Desconectar la app</span>
        </li>
      </div>
    </nav>
    <!-- {{itemActive}} -->
  </div>
  <div v-if="overlay" id="overlay" @click="closeOverlay"></div>
</template>
<script>
import { watch, ref } from 'vue';
import useWindowResize from '../service/useWindowResize';
import useSession from '../service/useSession';
// import useGlobal from '../service/useGlobal';
import navmenu from './Navmenu.vue';

export default {
    components: { navmenu },
    setup() {
        const { user, loggedIn, logout } = useSession();
        // const { setMenuItem: setGlobalMenuItem } = useGlobal();
        const overlay = ref(false);
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
        const navOnToggle = (_show) => {
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
        watch(Screen, breakpointChange, { deep: true });
        watch(nav, navOnToggle);
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
            user,
        };
    },
};
</script>
<style lang="scss">
.icon-nav {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    position: absolute;
    top: 7px;
    left: 7px;
    font-size: 1.5rem;
    z-index: 5;
}
#Nav {
    display: flex;
    flex-direction: col;
    z-index: 3;
    background-color: white;
    display: none;
    width: 250px;
    padding: 0 0 0 1rem;
    max-width: 250px !important;
    box-shadow: 1px 0 5px 1px #80808069;
    min-width: 220px;
    @media (min-width: 768px) {
        max-width: 300px !important;
    }
    .hr-session {
        margin: 1rem 0;
    }
    .pin {
        align-self: flex-end;
        font-size: 24px;
        cursor: pointer;
    }
    .nav {
        flex-direction: column;
        flex-grow: 1;
    }
    &.show .nav {
        display: flex;
    }
    &.show {
        display: flex;
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
    background-color: rgba(0, 0, 0, 0.5); /* Black background with opacity */
    z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
    // cursor: pointer; /* Add a pointer on hover */
}
</style>
