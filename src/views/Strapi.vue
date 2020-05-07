<template>
    <div class="q-ma-sm">
        <div class="title--lg">strapi</div>
        <button @click="login" class="button button--outlined bg-color-light button--sm">login</button>
        <button @click="test" class="button button--outlined bg-color-light button--sm">test</button>
        <div v-if="loggedIn" class="card card--outlined card--raised q-pa-xxxs">
            {{ user.nombre }}
        </div>
    </div>
</template>
<script>
import axios from '../service/axios';
import useSession from '../service/useSession';

export default {
    setup() {
        const {
            user, login: sessionLogin, logout, loggedIn,
        } = useSession();
        const login = async () => {
            try {
                const resp = await sessionLogin({
                    identifier: 'jpsala@gmail.com',
                    password: 'lani0363',
                });
                console.log('resp', resp);
            } catch (error) {
                console.log(error);
            }
        };
        const test = async () => {
            console.log('test');
            try {
                const resp = await axios.get('/hello');
                console.log('resp', resp);
            } catch (error) {
                console.log(error);
            }
        };
        return {
            login, test, user, loggedIn, logout,
        };
    },
};
</script>
<style lang="scss">
.card{
    min-width: 300px;
    flex-grow: 1;
    height: 96%;
}
</style>
