<template>
  <div class="margin-md flex flex__item">
    <autocomplete autofocus  :options="users"
        @onchange="onchange" :value="usuario"
        :show-on-success="(option)=>option.apellido + ', ' + option.nombre">
        <template v-slot:option="{option}">{{formatOption(option)}}</template>
    </autocomplete>
    <pre v-if="usuarioSeleccionado">{{usuarioSeleccionado}}</pre>
  </div>
</template>
<script>
/* eslint-disable no-shadow */
import { ref } from 'vue';
import autocomplete from '../components/Autocomplete.vue';
import { getParientes, getPariente } from '../service/socio';

export default {
  components: { autocomplete },
  setup() {
    const usuario = ref({ id: 1, nombre: 'juan', apellido: 'sala' });
    const usuarioSeleccionado = ref();
    const formatOption = (_option) => `${_option.nombre}, ${_option.apellido} ${_option.email ? `,  ${_option.email}` : ''}`;
    const users = async (term) => (await getParientes(term)).data;
    const onchange = async (_usuario) => {
      const user = (await getPariente(_usuario.id)).data;
      console.log('usr', user);
      usuarioSeleccionado.value = user;
    };
    return {
      usuario, users, formatOption, onchange, usuarioSeleccionado,
    };
  },
};
</script>
