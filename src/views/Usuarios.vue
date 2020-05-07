<template>
  <div class='container q-pa-sm  flex flex__item' style="max-width: 800px">
    <autocomplete autofocus="true" :value="usuario" @update="usuarioChange" :options="users"
      option-value="id" option-label="nombreCompleto"></autocomplete>
    <hr />
    <div v-if="usuario" class='flex flex--center card card--card--raised q-pa-xs flex--stretch'
      style='justify-content: space-betwdeen'>
      <form>
        <div class="grid">
          <div class="grid__column grid__column--12 grid__column--6--md">
            <div class="control control--block">
              <label class="control__label">Nombre</label>
              <input class="control__input" type="text" placeholder="" v-model="usuario.nombre">
            </div>
          </div>
          <div class="grid__column grid__column--12 grid__column--6--md">
            <div class="control control--block">
              <label class="control__label">Apellido</label>
              <input class="control__input" type="text" placeholder=""
                v-model="usuario.apellido">
            </div>
          </div>
        </div>
        <div class="grid">
           <div class="grid__column grid__column--12 grid__column--6--md">
              <div class="control control--block">
                <label class="control__label">Login</label>
                <input class="control__input" type="text" placeholder="" v-model="usuario.login">
              </div>
            </div>
            <div class="grid__column grid__column--12 grid__column--6--md">
              <div class="control control--block">
                <label class="control__label">Password</label>
                <input class="control__input" type="text" placeholder=""
                  v-model="usuario.password">
              </div>
          </div>
        </div>
        <div class="grid">
          <div class="grid__column grid__column--12 grid__column--6--md">
            <div class="control control--block">
              <label class="control__label">Correo</label>
              <input class="control__input" type="email" placeholder="" v-model="usuario.email">
            </div>
          </div>
        </div>
        <!-- <div class="grid">
          <div class="grid__column">
            <div class="control control--block">
              <label class="control__label" for="exampleMessage">Message</label>
              <textarea class="control__textarea control__textarea--md"
                placeholder="Type your message here..." id="exampleMessage"></textarea>
            </div>
          </div>
        </div> -->
        <!-- <div class="grid">
          <div class="grid__column">

            <div class="control control--checkbox">
              <label class="control__label checkbox">
                <input class="control__checkbox" type="checkbox">
                A checkbox
              </label>
            </div>
            <div class="control control--radio">
              <label class="control__label">
                <input class="control__radio" type="radio" name="question">
                One radio example
              </label>
              <label class="control__label">
                <input class="control__radio" type="radio" name="question">
                Second radio example
              </label>
            </div>

          </div>
        </div> -->
        <div class="grid">
          <div class="grid__column type-right">
            <div class="control control--block">
              <input class="control__button button button--filled button--primary" type="submit"
                value="Graba">
            </div>
          </div>
        </div>
      </form>
      <!-- <pre>{{usuario}}</pre> -->
    </div>
    <div v-else>Seleccione un Usuario</div>
  </div>
</template>
<script>
import { reactive, toRefs } from 'vue';
import autocomplete from '../components/Autocomplete.vue';
import { getUsers, getUser } from '../service/user';


export default {
    components: { autocomplete },
    setup() {
        const state = reactive({
            usuario: undefined,
            users: async (term) => getUsers(term),
        });
        const usuarioChange = async (u) => {
            try {
                state.usuario = await getUser(u.id);
            } catch (error) {
                alert(error);
            }
        };
        return { ...toRefs(state), usuarioChange };
    },
};
</script>
