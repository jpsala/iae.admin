<template>
  <div class="app content flex">
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
