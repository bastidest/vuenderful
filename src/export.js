import Select from './Vuenderful.vue'

const Vuenderful = {
    Select,

    install (Vue) {
        Vue.component('v-select', Select);
    }
}

module.exports = Vuenderful;