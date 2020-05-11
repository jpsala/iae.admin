<template>
  <div>
    <hr style="margin: 1px">
    <div class='q-pa-sm flex--justify-start' style="max-width: 800px">
      <div v-if="parienteLocal" class='flex flex--center card card--card--raised q-pa-xs flex--stretch'
        style='justify-content: space-betwdeen'>
        <form>
          <div class="grid">
            <div class="grid__column grid__column--12 grid__column--6--md">
              <div class="control control--block">
                <label class="control__label">Nombre</label>
                <input class="control__input" type="text" placeholder=""
                  v-model="parienteLocal.nombre">
              </div>
            </div>
            <div class="grid__column grid__column--12 grid__column--6--md">
              <div class="control control--block">
                <label class="control__label">Apellido</label>
                <input class="control__input" type="text" placeholder=""
                  v-model="parienteLocal.apellido">
              </div>
            </div>
            <div class="grid__column grid__column--12 grid__column--6--md">
              <div class="control control--block">
                <label class="control__label">Password</label>
                <input class="control__input" type="text" placeholder=""
                  v-model="parienteLocal.password">
              </div>
            </div>
          </div>
          <div class="grid">
            <div class="grid__column grid__column--12 grid__column--6--md">
              <div class="control control--block">
                <label class="control__label">Correo</label>
                <input class="control__input" type="email" placeholder=""
                  v-model="parienteLocal.email">
              </div>
            </div>
            <div class="grid__column grid__column--12 grid__column--6--md">
              <div class="control control--block">
                <label class="control__label">Documento</label>
                <input class="control__input" type="email" placeholder=""
                  v-model="parienteLocal.numero_documento">
              </div>
            </div>
          </div>
          <div class="flex flex--justify-end">
              <div class="control">
                <input @click="cancela"
                  class="control__button button button--filled button--tertiary" type="button"
                  value="Cancela">
            </div>
              <div class="control q-ml-xxs">
                <input @click="graba"
                  class="control__button button button--filled button--secondary" type="button"
                  value="Graba">
            </div>
          </div>
        </form>
      </div>
      <div v-if="!parienteLocal" class="control control--inline">
        <label for="filtro" class="control__label">Filtro &nbsp;</label>
        <input id="filtro" class="control__input" autofocus type="text" v-model="filter" />
      </div>
      <!-- Form -->
      <div v-if="parientes.length > 0  && !parienteLocal">
        <table class="table table--stripped">
          <thead class="table__head">
            <tr class="table__row table__row--heading">
              <th class="table__cell">Nombre</th>
              <th class="table__cell">Apellido</th>
              <th>Password</th>
              <th>EMail</th>
              <th>Documento</th>
              <!-- <th class="table__cell">Email</th> -->
            </tr>
          </thead>
          <tbody class="table__body">
            <tr @click="setParienteLocal(u)" class="table__row" v-for="(u, index) in parientes"
              :key="index">
              <td class="table__cell">{{u.nombre}}</td>
              <td class="table__cell">{{u.apellido}}</td>
              <td class="table__cell">{{u.password}}</td>
              <td class="table__cell">{{u.email}}</td>
              <td>{{u.numero_documento}}</td>
            </tr>
          </tbody>
        </table>
        <!-- <div v-for="(u, index) in parientes" :key="index">{{u.id}}</div> -->
      </div>
      <div v-if="loading">Cargando...</div>
      <router-view />
    </div>
  </div>
</template>
<script>
import { ref, watch, computed } from 'vue';
import usePariente from '../service/usePariente';
import { debounce } from '../service/helpers';

export default {
    setup() {
        const filter = ref('');
        const parienteLocal = ref();
        const {
            loading, pariente, parientes, setFilter, setPariente, onFilterApplied,
            onDataLoaded, grabaPariente,
        } = usePariente();
        const setParienteLocal = (u) => {
            setPariente(u);
            parienteLocal.value = u ? ({ ...u }) : undefined;
        };
        const graba = async () => {
            // reset();
            // filter.value = '';
            await grabaPariente(parienteLocal.value);
            setParienteLocal(undefined);
        };
        const cancela = () => {
            setParienteLocal(undefined);
        };
        onDataLoaded(() => {
            // filter.value = 'sala';
            // setFilter('sala');
        });
        onFilterApplied(() => {
            setPariente(parientes.value[0]);
        });
        const modificado = computed(() => false);
        watch(filter, debounce((f) => { setFilter(f); }, 500), { immediate: false });
        return {
            loading, pariente, parientes, filter, setPariente, graba, cancela, setParienteLocal, parienteLocal, modificado,
        };
    },
};
</script>
<style lang="scss">
table tbody tr {
    & {
        cursor: pointer;
    }
    td {
        // &:nth-child(1) {
        width: 1em !important;
        //    max-width: 200px;
        // }
        // width: 20px;
    }
}
table {
    table-layout: fixed;
}
td {
    width: 1px;
    white-space: nowrap;
}
</style>
