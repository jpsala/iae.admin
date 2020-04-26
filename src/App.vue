<template>
  <div id="app">
    <div class="container">
      <Header />
      <div class="app-container">
        <Nav class="nav docs-sidebar off-canvas-sidebar"/>
        <router-view class="router-view"/>
      </div>
    </div>
  </div>
</template>
<script>
import Nav from './components/Nav.vue';
import Header from './components/Header.vue';
import { onLoggedInChanged, tryToLogin } from './service/helpers';

export default {
  components: { Nav, Header },
  setup() {
    onLoggedInChanged(async (c) => {
      console.log('onLoggedInChanged', c);
      if (!c) await tryToLogin();
    });
  },
};
</script>
<style lang="scss">
.app-container{
  display: flex;
}
.router-view{

}
</style>
