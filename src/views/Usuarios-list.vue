<template>
<div>
    <hr style="margin: 1px">
    <div class='q-pa-sm flex--justify-start' style="max-width: 800px">
      <div v-if="usuarioLocal" class='flex flex--center card card--card--raised q-pa-xs flex--stretch'
        style='justify-content: space-betwdeen'>
        <form>
          <div class="grid">
            <div class="grid__column grid__column--12 grid__column--6--md">
              <div class="control control--block">
                <label class="control__label">Nombre</label>
                <input class="control__input" type="text" placeholder=""
                  v-model="usuarioLocal.nombre">
              </div>
            </div>
            <div class="grid__column grid__column--12 grid__column--6--md">
              <div class="control control--block">
                <label class="control__label">Apellido</label>
                <input class="control__input" type="text" placeholder=""
                  v-model="usuarioLocal.apellido">
              </div>
            </div>
          </div>
          <div class="grid">
            <div class="grid__column grid__column--12 grid__column--6--md">
              <div class="control control--block">
                <label class="control__label">Login</label>
                <input class="control__input" type="text" placeholder="" v-model="usuarioLocal.login">
              </div>
            </div>
            <div class="grid__column grid__column--12 grid__column--6--md">
              <div class="control control--block">
                <label class="control__label">Password</label>
                <input class="control__input" type="text" placeholder=""
                  v-model="usuarioLocal.password">
              </div>
            </div>
          </div>
          <div class="grid">
            <div class="grid__column grid__column--12 grid__column--6--md">
              <div class="control control--block">
                <label class="control__label">Correo</label>
                <input class="control__input" type="email" placeholder=""
                  v-model="usuarioLocal.email">
              </div>
            </div>
            <div class="grid__column grid__column--12 grid__column--6--md">
              <div class="control control--block">
                <label class="control__label">Legajo</label>
                <input class="control__input" type="email" placeholder=""
                  v-model="usuarioLocal.legajo">
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
      <div v-if="!usuarioLocal" class="control control--inline">
        <label for="filtro" class="control__label">Filtro &nbsp;</label>
        <input id="filtro" class="control__input" autofocus type="text" v-model="filter" />
      </div>
      <!-- Form -->
      <div v-if="usuariosFiltered.length > 0  && !usuarioLocal">
        <table class="table table--stripped">
          <thead class="table__head">
            <tr class="table__row table__row--heading">
              <th class="table__cell">Nombre</th>
              <th class="table__cell">Apellido</th>
              <th class="table__cell">Login</th>
              <th>Legajo</th>
              <th>Password</th>
              <th>EMail</th>
              <th>Documento</th>
              <!-- <th class="table__cell">Email</th> -->
            </tr>
          </thead>
          <tbody class="table__body">
            <tr @click="setUsuarioLocal(u)" class="table__row" v-for="(u, index) in usuariosFiltered"
              :key="index">
              <td class="table__cell">{{u.nombre}}</td>
              <td class="table__cell">{{u.apellido}}</td>
              <td class="table__cell">{{u.login}}</td>
              <td class="table__cell">{{u.legajo}}</td>
              <td class="table__cell">{{u.password}}</td>
              <td class="table__cell">{{u.email}}</td>
              <td class="table__cell">{{u.documento}}</td>
            </tr>
          </tbody>
        </table>
        <!-- <div v-for="(u, index) in usuarios" :key="index">{{u.id}}</div> -->
      </div>
    </div>
  </div>
</template>
<script>
import { ref, watch, computed } from 'vue';
import useUser from '../service/useUser';


export default {
    setup() {
        const filter = ref('');
        const usuarioLocal = ref();
        const {
            loading, usuario, usuariosFiltered, setFilter, setUsuario, onFilterApplied, onDataLoaded, grabaUsuario,
        } = useUser();
        const setUsuarioLocal = (u) => {
            setUsuario(u);
            usuarioLocal.value = u ? ({ ...u }) : undefined;
        };
        const graba = async () => {
            // reset();
            // filter.value = '';
            await grabaUsuario(usuarioLocal.value);
            setUsuarioLocal(undefined);
        };
        const cancela = () => {
            setUsuarioLocal(undefined);
        };
        onDataLoaded(() => {
            // filter.value = 'sala';
            // setFilter('sala');
        });
        onFilterApplied(() => {
            setUsuario(usuariosFiltered.value[0]);
        });
        const modificado = computed(() => false);
        watch(filter, () => setFilter(filter.value), { immediate: false });
        return {
            loading, usuario, usuariosFiltered, filter, setUsuario, graba, cancela, setUsuarioLocal, usuarioLocal, modificado,
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
