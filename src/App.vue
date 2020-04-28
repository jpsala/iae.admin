<template>
  <div class="content flex">
    <Nav />
    <router-view class="router-view"/>
  </div>
</template>
<script>
import Nav from './components/Nav.vue';
import { onLoggedInChanged, tryToLogin } from './service/helpers';

export default {
  components: { Nav },
  setup() {
    onLoggedInChanged(async (c) => {
      if (!c) await tryToLogin();
    });
  },
};
</script>
<style lang="scss">
.router-view {
  // padding: 20px 0;
}
.content {
  height: 100vh;
}

</style>
