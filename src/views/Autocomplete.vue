/* View */
<template>
  <div class='margin-md flex flex__item bg-color-light'>
    <autocomplete :value="usuario" @update="(e) => {usuario = e}"></autocomplete>
    <hr />
    <div class='title--md'>Set usuario View</div>
    <hr />
    <button @click='usuario = {id:1, nombre: new Date().getSeconds()}' class='button'>usuario = 1</button>
    <div class='flex flex--center' style='justify-content: space-between'>
      <pre>Usuario:{{ usuario }}</pre>
      <pre>attrs:{{$attrs}}</pre>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs } from 'vue';
import autocomplete from '../components/Autocomplete.vue';

export default {
  components: { autocomplete },
  setup() {
    const state = reactive({
      usuario: { id: 0, nombre: 'Juan Pablo' },
    });
    return { ...toRefs(state) };
  },
};
</script>
