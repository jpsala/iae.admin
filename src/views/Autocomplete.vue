<template>
  <div class='q-pa-lg flex flex__item bg-color-light'>
    <autocomplete autofocus="true" :value="usuario" @update="(e) => {usuario = e}"
      :options="users" option-value="id" option-label="nombreCompleto"></autocomplete>
    <hr />
    <div class='flex flex--center' style='justify-content: space-between'>
      <pre>Usuario:{{ usuario }}</pre>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs } from 'vue';
import autocomplete from '../components/Autocomplete.vue';
import { getParientes } from '../service/socio';

export default {
  components: { autocomplete },
  setup() {
    const state = reactive({
      usuario: { id: 0, nombre: 'Juan Pablo', nombreCompleto: 'Sala, Juan Pablo' },
      users: async (term) => getParientes(term),
    });

    return { ...toRefs(state) };
  },
};
</script>
