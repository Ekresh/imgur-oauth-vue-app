import axios from 'axios';
import router from '../../router';
import { getToken } from './config'

const state = {
    images: [],
    imagesLoading: false,
    responseOrErrorSnack: '',
    uploadPercentCompleted: {
        loadingNumbers: 0,
        i: 0
    },
};

const getters = {
    imagesLoading(state) {
        return state.imagesLoading
    },
    responseOrErrorSnack(state) {
        return state.responseOrErrorSnack
    },
    uploadPercentCompleted(state) {
        return state.uploadPercentCompleted
    },
    images(state) {
        return state.images
    }
};

const actions = {
    async postImages({ commit }, postedImages) {
        commit('setImagesLoading', true);
        let i = 0;
        let loadingNumbers = 0;
        const token = getToken();
        const progress = {
            onUploadProgress(progressEvent) {
                loadingNumbers = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                do {
                    commit('setUploadPercentCompleted', { loadingNumbers, i });
                } while (loadingNumbers.length == 3);
                if (loadingNumbers == 100) {
                    i++;
                    loadingNumbers = 0;
                }
            }
        }
        const config = Object.assign(progress, token)
        const uploadPromises = Array.from(postedImages).map(imageFile => {
            const uploadededImages = new FormData();
            uploadededImages.append("image", imageFile);
            return axios.post(`${process.env.VUE_APP_ROOT_URL}/3/image`, uploadededImages, config)
        });
        await Promise.all(uploadPromises)
            .then(res => {
                if (res) {
                    commit('setResponseOrErrorSnack', 'images uploaded successfully.')
                }
            })
            .catch(err => {
                if (err) {
                    commit('setResponseOrErrorSnack', 'Error, Something went wrong!')
                }
            });
        router.push('/gallary');
        commit('setUploadPercentCompleted', { loadingNumbers: 0, i: 0 })
        commit('setImagesLoading', false);
    },
    async fetchImages({ commit, state }) {
        commit('setImagesLoading', true);
        await axios.get(`${process.env.VUE_APP_ROOT_URL}/3/account/me/images`, getToken())
            .then(res => {
                const { data } = res;
                if (data.status === 200) {
                    commit('setImages', data.data);
                }
            })
            .catch(err => {
                commit('setResponseOrErrorSnack', 'Error, Something went wrong!')
            });
        commit('setImagesLoading', false);
    },
    async deleteImage({ commit, state }, imageDeleteHash) {
        await axios.delete(`${process.env.VUE_APP_ROOT_URL}/3/image/${imageDeleteHash}`, getToken())
            .then(res => {
                const imagesAfterDeleteOne = state.images.filter(img => img.deletehash !== imageDeleteHash);
                if (res.status === 200) {
                    commit('setImages', imagesAfterDeleteOne)
                }
            })
            .catch(err => {
                commit('setResponseOrErrorSnack', 'Error, Something went wrong!')
            })
    }
};

const mutations = {
    setImagesLoading(state, imagesLoading) {
        state.imagesLoading = imagesLoading;
    },
    setResponseOrErrorSnack(state, responseOrErrorSnack) {
        state.responseOrErrorSnack = responseOrErrorSnack;
        setTimeout(() => {
            state.responseOrErrorSnack = '';
        }, 5000)
    },
    setUploadPercentCompleted(state, uploadPercentCompleted) {
        state.uploadPercentCompleted = uploadPercentCompleted;
    },
    setImages(state, images) {
        state.images = images;
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
}