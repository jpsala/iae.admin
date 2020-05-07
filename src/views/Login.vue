<template>
<div class="login flex__item--center card card--raised">
  <form @submit.stop.prevent="submit" class="lead panel bg-color-lightest card__content">
      <div class="control">
        <label class="control__label">Usuario
          <input  v-model="login" class="control__input" type="text" placeholder="Usuario">
        </label>
    </div>
      <div class="field">
      <div class="control">
        <label class="control__label">Password
          <input v-model="password" class="control__input" type="password" placeholder="Password">
        </label>
      </div>
    </div>
  <div class="grid grid--justify-end">
    <button  type="submit" class="button button--filled button--primary">Ingresar</button>
  </div>
  </form>
</div>
</template>

<script>
import { reactive, onBeforeMount, toRefs } from 'vue';
import router from '../router';
import useSession from '../service/useSession';

export default {
    setup() {
        const state = reactive({
            login: 'jpsala',
            password: 'lani0363',
        });
        const { login: useLogin, loggedIn } = useSession();
        console.log('l', loggedIn);
        const submit = () => {
            useLogin({
                login: state.login,
                password: state.password,
            }).then(() => {
                router.push('/');
            }).catch((e) => {
                console.log('error', e);
                alert('revise los datos');
            });
        };
        onBeforeMount(() => {
            if (loggedIn.value) router.push('/');
        });
        return { ...toRefs(state), submit };
    },

};
</script>

<style lang="scss">
    .login{
      // background-color: lightblue;
      margin: 30px auto;
      padding: 25px 17px 0px 25px;
      // max-width: 500px;
      // margin: auto auto;
      // background-color: #00D1B2;
      border-radius: 5px;
      & .field.is-grouped{
        margin-top: 30px;
        justify-content: flex-end;
      }
    }
</style>
