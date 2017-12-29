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

  var path

  if(window.innerWidth > 1024){
    path = './static/web/data.json'
  }
  else{
    path = './static/data.json?v=1'
  }

  var draw = bodymovin.loadAnimation({
    container: document.getElementById('draw-1'),
    renderer: 'svg',
    loop: false,
    autoplay: true,
    path: path
  })

  $('.title-button').click(function(){
    $('html, body').animate({scrollTop : window.innerHeight}, 1000, function(){console.log(123)});
  })
  
})
