import Vue from 'vue'
import Vuenderful from './Vuenderful.vue'

var MySelect = Vue.component('v-select', Vuenderful);

var app = new Vue({
  el: '#app',
  data () {
    return {
      all: ['One', 'Two'],
      selected: ['Me']
    }
  },
  methods: {
    log () {
      console.log(this.selected);
    }
  }
})