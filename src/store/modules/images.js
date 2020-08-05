import axios from './axios-interceptor';
import router from '../../router'
import { Promise } from 'core-js';

const state = {
    uploadLoading: false,
    responseOrErrorSnack: '',
    uploadPercentCompleted: ''
};

const getters = {
    uploadLoading(state) {
        return state.uploadLoading
    },
    responseOrErrorSnack(state) {
        return state.responseOrErrorSnack
    },
    uploadPercentCompleted(state) {
        return state.uploadPercentCompleted
    }
};

const actions = {
    async postImages({ commit }, postedImages) {
        commit('setUploadLoading', true);
        const uploadPromises = Array.from(postedImages).map(imageFile => {
            const config = {
                onUploadProgress(progressEvent) {
                    let loadingNumbers = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    do {
                        commit('setUploadPercentCompleted', loadingNumbers)
                    } while (loadingNumbers.length == 3);

                }
            }

            const uploadededImages = new FormData();
            uploadededImages.append("image", imageFile);
            return axios.post(`${process.env.VUE_APP_ROOT_URL}/3/image`, uploadededImages, config)
        });

        await Promise.all(uploadPromises)
            .then(res => {
                if (res) {
                    router.push('/gallary');
                    commit('setResponseOrErrorSnack', 'images uploaded successfully.')
                }
            })
            .catch(err => {
                if (err) {
                    commit('setResponseOrErrorSnack', 'Error, Something went wrong!')
                }
            });
        commit('setUploadLoading', false)
    }
};

const mutations = {
    setUploadLoading(state, uploadLoading) {
        state.uploadLoading = uploadLoading;
    },
    setResponseOrErrorSnack(state, responseOrErrorSnack) {
        state.responseOrErrorSnack = responseOrErrorSnack;
        setTimeout(() => {
            state.responseOrErrorSnack = '';
        }, 5000)
    },
    setUploadPercentCompleted(state, uploadPercentCompleted) {
        state.uploadPercentCompleted = uploadPercentCompleted;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}