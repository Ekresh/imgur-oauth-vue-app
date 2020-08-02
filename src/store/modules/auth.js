import router from '../../router';

const state = {
    token: localStorage.getItem('access_token'),
    loginLoading: false,
};

const getters = {
    token(state) {
        return !!state.token;
    },
    loginLoading(state) {
        return state.loginLoading;
    }
};

const actions = {
    login({ commit }) {
        window.location = `${process.env.VUE_APP_ROOT_URL}/oauth2/authorize?client_id=${process.env.VUE_APP_CLEINT_ID}&response_type=token`;
        commit('setLoginLoading', true);

    },
    fnalizeLogin({ commit }) {
        let link = window.location.href;
        if (link.match(/(#access_token=)/)) {
            const editedLink = link.split('#access_token=')[1];
            const access_token = editedLink.split('&expires_in')[0];
            localStorage.setItem('access_token', access_token);
            commit('setToken', localStorage.getItem('access_token'));
            router.push('gallary');
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
    setLoginLoading(state, loginLoading) {
        state.loginLoading = loginLoading;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}