import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'
import 'element-ui/lib/theme-chalk/index.css'
// 导入字体图标，来自阿里巴巴矢量库
import './assets/font/iconfont.css'
import './assets/font_menu/iconfont.css'
import axios from 'axios'
// 配置请求的root路径
axios.defaults.baseURL = 'http://www.ysqorz.top:8888/api/private/v1/'
// 设置axios拦截器，使得正常API通过令牌能访问数据
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  console.log(config)
  return config
})
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
