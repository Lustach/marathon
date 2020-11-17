import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/styles.scss'
import 'reset-css';
import '@/plugins/vue_select'
import "vue-select/src/scss/vue-select.scss";
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
