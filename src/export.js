import Select from './Select.vue'

const Vuenderful = {
    Select,

    install (Vue) {
        Vue.component('v-select', Select);
    }
}

module.exports = Vuenderful;