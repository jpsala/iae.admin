import { reactive, computed } from 'vue';
import axios from 'axios';

const useSocio = () => {
    const state = reactive({
        loading: false,
    });
    const fetch = async () => {
        try {
            state.loading = true;
            const resp = await axios.get('/socios');
            state.posts = resp.data;
        } catch (error) {
            console.log('error en  useSocio', error);
            state.loading = false;
            throw Error(error);
        } finally {
            state.loading = false;
        }
    };
    return {
        posts: computed(() => state.posts),
        fetch,
    };
};
export default useSocio;
