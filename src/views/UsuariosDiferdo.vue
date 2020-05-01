<template>
<div class="usuarios-diferido">
<div class="card card--raised " v-if="data && data.length > 0">
  <div class="title title--md">Usuarios que elijen el pago completo</div>
  <!-- <div class="card__content card--raised"></div> -->
  <hr>
    <table class="table table--stripped card__content">
      <thead class="table__head">
        <tr class="table__row table__row--heading">
          <th class="table__cell">Pariente</th>
          <th class="table__cell">Fecha</th>
        </tr>
      </thead>
      <tbody class="table__body">
        <tr class="table__row" v-for="row in data" :key="row.id">
          <td class="table__cell nombre-td">{{row.apellido}}, {{row.nombre}}</td>
          <td class="table__cell fecha-td">{{row.fecha}}</td>
        </tr>
      </tbody>
    </table>
</div>
  <div v-else>
    No hay datos
    {{error}}
  </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { onLoggedInChanged } from '../service/helpers';
import { diferidos } from '../service/socio';

export default {
  setup() {
    const state = reactive({
      data: [],
      error: undefined,
    });
    const getDiferidos = async () => {
      try {
        const resp = await diferidos();
        state.data = resp.data;
      } catch (error) {
        console.log('error', error);
        state.error = error;
      }
    };
    onLoggedInChanged((loggedIn) => {
      if (loggedIn) getDiferidos();
    });
    return { ...toRefs(state) };
  },
};
</script>

<style lang="scss">
.usuarios-diferido{
    margin: 20px auto 0 auto;
    margin-top: 20px;
    padding: 20px;
    .title{
      margin: 20px auto 0 auto;
    }
}
.nombre-td{width: 250px}
.fecha-td{width: 80px}
</style>
