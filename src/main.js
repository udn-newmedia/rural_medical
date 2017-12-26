// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})

$(document).ready(function(){

  var draw = bodymovin.loadAnimation({
    container: document.getElementById('draw-1'),
    renderer: 'svg',
    loop: false,
    autoplay: true,
    path: './static/data.json'
  })
  
})
