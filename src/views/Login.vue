<template>
    <form @submit.stop.prevent="submit">
    <div>
        <label>
            Usuario
            <input v-model="login" placeholder="Usuario" />
        </label>
    </div>
    <div>
        <label>
            Password
            <input type="password" v-model="password" placeholder="Password" />
        </label>
    </div>
    <div><input type="submit" /></div>
  </form>
</template>

<script>
import { ref, onBeforeMount } from 'vue';
import store from '../store'
import router from '../router';

export default {
  setup() {
    const login = ref('');
    const password = ref('');
    const submit = () => {
        store.dispatch('session/login',{
            login:login.value,
            password: password.value,
            saveCredentials: false
        }).then( r => {
            router.push('/')
        }).catch( e => {
            console.log('error', e)
            alert('revise los datos')
        })
    }
    onBeforeMount(()=>{
        if(store.getters['session/loggedIn']) router.push('/')
    })
    return { login, password , submit};
  },

};
</script>

<style>

</style>
