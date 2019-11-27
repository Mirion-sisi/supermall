import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload,{
  loading:require('./assets/img/common/placeholder.png')
})

import toast from './components/common/toast/index'
Vue.use(toast)

Vue.config.productionTip = false

// 解决移动端300ms延迟
FastClick.attach(document.body)

// 添加事件总线对象，给$bus方法赋值
Vue.prototype.$bus=new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
