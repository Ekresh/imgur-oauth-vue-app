import router from '../../router';

const state = {
    token: localStorage.getItem('access_token'),
    loading: false,
};

const getters = {
    token(state) {
        return state.token;
    },
    loading(state) {
        return state.loading;
    }
};

const actions = {
    login({ commit }) {
        window.location = `${process.env.VUE_APP_ROOT_URL}/oauth2/authorize?client_id=${process.env.VUE_APP_CLEINT_ID}&response_type=token`;
        commit('setloading', true);

    },
    fnalizeLogin({ commit }) {
        let link = window.location.href;
        if (link.match(/(#access_token=)/)) {
            const editedLink = link.split('#access_token=')[1];
            const access_token = editedLink.split('&expires_in')[0];
            localStorage.setItem('access_token', access_token);
            const token = localStorage.getItem('access_token');
            commit('setloading', false);
            if (token) {
                commit('setToken', token);
                router.push('gallary');
            }
        }

    },
    logout({ commit }) {
        localStorage.removeItem('access_token');
        commit('setToken', null);
        router.push('/');
    }
};

const mutations = {
    setToken(state, token) {
        state.token = token;
    },
    setloading(state, loading) {
        state.loading = loading;
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
}