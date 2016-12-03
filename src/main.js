import Vue from 'vue'
import Vuenderful from './Vuenderful.vue'

/*new Vue({
  el: '#app',
  render: h => h(Vuenderful)
})
*/
var MySelect = Vue.extend(Vuenderful);

var app = new Vue({
  el: '#app',
  data () {
    return {
      all: ['One', 'Two'],
      selected: ['Me']
    }
  },
  mounted () {
    var catSelect = new MySelect({propsData: {
      all: this.all,
      selected: this.selected
    }});
    catSelect.$mount('#catinput');
  },
  methods: {
    log () {
      console.log(this.selected);
    }
  }
})


/*var app = new Vue(Vuenderful).$mount('#app');
app.addTag('hihi');
console.log(app.$data.selected);*/

/*var MySelect = Vue.extend(Vuenderful);
var catSelect = new MySelect({propsData: {
  all: ['One', 'Two'],
  selected: []
}});
catSelect.$mount('#app');*/