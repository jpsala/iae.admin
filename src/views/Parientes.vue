<template>
  <div class="container container--fluid margin-xs margin-y">
    <div class="flex--stretch subtitle--xl q-ml-xxl ">
        Parientes
    <hr style="margin: 1px">
    </div>
    <div class='q-pa-sm flex--justify-start' style="max-width: 800px">
    <router-view />
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
// import router from '../router';

export default {
    setup(a, b, c) {
        console.log('a,b,c', a, c, b);
        onMounted((a, b, c) => {
            // router.push('/parientes/parientes-list');
            console.log('ok', 'ok');
            console.log('a,b,c', a, b, c);
        });
    },
};
</script>

<style>

</style>
