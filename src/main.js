import Vue from 'vue'
import Select from './Select.vue'

var MySelect = Vue.component('v-select', Select);

var app = new Vue({
  el: '#app',
  data () {
    return {
      options: ['One', 'Two'],
      selected: ['One']
    }
  },
  methods: {
    log () {
      console.log(this.selected);
    }
  }
})