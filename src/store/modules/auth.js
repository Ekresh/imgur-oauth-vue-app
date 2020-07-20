import router from '../../router';

const ROOT_URL = 'https://api.imgur.com';
const client_id = '8559189c6f2970a';

const state = {
    token: localStorage.getItem('access_token'),
    loginLoding: false,
};

const getters = {
    token(state) {
        return !!state.token;
    },
    loginLoading(state) {
        let link = window.location.href;
        if (link.match(/(#access_token=)/)) {
            state.loginLoading = true;
            return state.loginLoading;
        }
        return state.loginLoading;
    }
};

const actions = {
    login() {
        window.location = `${ROOT_URL}/oauth2/authorize?client_id=${client_id}&response_type=token`;

    },
    fnalizeLogin({ commit }) {
        let link = window.location.href;
        if (link.match(/(#access_token=)/)) {
            let editedLink = link.split('#access_token=')[1];
            const finalLink = link.split('#access_token=')[0];
            const access_token = editedLink.split('&expires_in')[0];
            window.location = finalLink;
            localStorage.setItem('access_token', access_token);
            commit('setToken', localStorage.getItem('access_token'));
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
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}