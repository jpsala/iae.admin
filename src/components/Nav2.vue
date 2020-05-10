<template>
  <div class="icon-nav" v-if="Screen.lt.lg" @click="nav=!nav">
    <span class="icon-menu" />
  </div>
  <div id="Nav" class="show" @click="navClick">
    <nav class="nav">
      <span v-if="Screen.lt.lg &&  Screen.gt.xs" @click="togglePinned" class="pin"
        :class="{'icon-pin-outline':!pinned,'icon-pin':pinned}" />
      <div class="margin-lg margin-y title-set">
        <ul class="list list--unstyled list--nulled">
          <li v-if="itemParent" class="list__item item-parent">
            <i class="item  icon-keyboard_backspace" @click="back" />
            <span class="active-title" v-if="itemActive">{{itemActive.title}}</span>
            <span class="active-det list__item__det" v-if="itemActive">{{itemActive.det}}</span>
            <hr style="margin: 5px 0 20px 0"/>
          </li>
          <template v-if="loggedIn">
            <button @click="back()">back</button>
          <li class="list__item" v-for="(i, idx) in items" :key="idx">
            <router-link v-if="!i.items" :to="i.to">{{i.title}}</router-link>
            <span class="item" v-else @click="menuClick(i)">{{i.title}}</span>
            <span class="list__item__det">{{i.det}}</span>
          </li>
          </template>
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
        </ul>
      </div> <!-- /.title-set -->
    </nav>
    {{itemsStack.length}}:{{itemsStack}}
  </div>
  <div v-if="overlay" id="overlay" @click="closeOverlay"></div>
  <!-- <div class="log">{{Screen.width +' '+ Screen.name}}</div> -->
</template>
<script>
/* eslint-disable max-len */
import {
    watch, ref, computed, onMounted,
} from 'vue';
import useWindowResize from '../service/useWindowResize';
import useSession from '../service/useSession';
import useGlobal from '../service/useGlobal';
import router from '../router';

export default {
    setup() {
        const { user, loggedIn, logout } = useSession();
        const { setMenuItem: setGlobalMenuItem } = useGlobal();
        const overlay = ref(false);
        const Screen = useWindowResize();
        const nav = ref();
        const itemActive = ref();
        const pinned = ref(false);
        const itemsStack = ref([]);
        const itemParent = computed({
            get: () => {
                console.log('get', itemsStack.value);
                return itemsStack.value.length > 0 ? itemsStack.value[itemsStack.value.length - 1] : undefined;
            },
            set: (item) => itemsStack.value.push(item),
        });
        const items = ref([]);
        const menuClick = (item) => {
            console.log('item', item);
            if (item.to) router.push(item.to);
        };
        const back = () => {
            const { matched } = router.currentRoute.value;
            if (matched) {
                console.log('matched', matched);
                if (matched.length < 2) router.push('/');
                else {
                    const parentRoute = matched[matched.length - 2];
                    router.push(parentRoute.path);
                }
            }
        };
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
        const findRoute = (r) => {
            if(r)
        }
        const getRouteData = () => {
            const currentRoute = router.currentRoute.value;
            let children;
            console.log('router.currentRoute', router.currentRoute);
            if (currentRoute.matched.length > 0 && currentRoute.matched[0].children.length > 0) return currentRoute.matched[0].children;
            return router.getRoutes();
        };
        router.afterEach(async (to, from) => {
            console.log('items', getRouteData(), router.currentRoute.value);
            console.log('fr', findRoute( router.currentRoute.value));
        });
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
            user,
            items,
            menuClick,
            itemParent,
            back,
            itemActive,
            itemsStack,
        };
    },
};
</script>
<style lang="scss">
.icon-nav {
    cursor: pointer;
    position: absolute;
    top: 7px;
    left: 7px;
    font-size: 1.5rem;
    z-index: 5;
}
#Nav {
    z-index: 3;
    background-color: white;
    display: none;
    width: 250px;
    padding: 0px 0 0 1rem;
    max-width: 250px !important;
    box-shadow: 1px 0 5px 1px #80808069;
    @media (min-width: 768px) {
        max-width: 300px !important;
    }
    .hr-session {
        margin: 1rem 0;
    }
    .pin {
        float: right;
        margin-top: -40px;
        margin-right: 10px;
        font-size: 24px;
        cursor: pointer;
    }
    .list__item__det {
        color: gray;
        margin-left: 12px;
        word-break: normal;
        max-width: 160px;
        display: block;
        width: 160px;
        font-size: 14px;
    }
    &.show {
        display: block;
    }
    .item {
        cursor: pointer;
        color: #0074d9;
    }
    .item-parent {
        margin-bottom: 10px;
        .icon-keyboard_backspace {
            font-size: 1.4rem;
        }
        .active-title {
            font-size: 1.3rem;
            margin-left: 10px;
        }
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
