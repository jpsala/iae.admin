<template>
  <div class="margin-md flex flex__item">
    <Autocomplete :option="parseOption" autofocus @select="usuario = $event" :options="users"
        clave="nombre" :placeholder="(option) => option.apellido + ', ' + option.nombre"/>
    <div style="background-color:lightblue">
      <div class="">hola</div>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-shadow */
import { ref } from 'vue';
import Autocomplete from '../components/Autocomplete.vue';
import { getParientes } from '../service/socio';

export default {
  components: { Autocomplete },
  setup() {
    const usuario = ref('Usuario');
    const parseOption = (_option) => {
      let option = `${_option.nombre}, ${_option.apellido}`;
      option = `${option}${_option.usando_app === '1' ? ' (App)' : ''}`;
      option = `${option}${_option.email ? `,  ${_option.email}` : ''}`;
      option = `${option}${_option.diferido ? ' diferido' : ''}`;
      option = `${option}${_option.usando_app ? ' usando app' : ''}`;
      return option;
    };
    const users = async (term) => (await getParientes(term)).data;
    return { usuario, users, parseOption };
  },
};
</script>

<style>

</style>
