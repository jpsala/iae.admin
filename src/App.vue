<template>
  <div class="app content flex">
    <Nav />
    <router-view class="router-view"/>
  </div>
</template>

<script>
import { onBeforeMount } from 'vue';
import Nav from './components/Nav.vue';
import useSession from './service/useSession';
import router from './router';

export default {
    components: { Nav },
    setup() {
        const { tryToLogin, user } = useSession();
        onBeforeMount(async () => {
            try {
                const loggedIn = await tryToLogin();
                if (!loggedIn) router.push('/login');
            } catch (error) {
                console.log('error!!! trying to login in app.vue', error);
            }
        });
        return { user };
    },
};
</script>
<style lang="scss">
// @import './scss/app';
.router-view {
  // padding: 20px 0;
}
.content {
  height: 100vh;
}
.app {
  position: relative;
  .log{
    background-color: lightgreen;
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 10px;
    opacity: .5;
    border-radius: 5px;
    color: black;
  }
  table th, table td {
    text-align: left;
  }
}

</style>
