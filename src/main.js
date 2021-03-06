// 兼容 IE
// https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md#babelpolyfill
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
// 设置 js中可以访问 $cdn
import { $cdn } from '@/config'
Vue.prototype.$cdn = $cdn
    // 全局引入按需引入UI库 vant
import '@/plugins/vant'
// 引入全局样式
import '@/assets/css/index.scss'
import '@/assets/css/common.scss'
// 移动端适配
import 'lib-flexible/flexible.js'
// swiper 引入
import VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper-bundle.css'
Vue.use(VueAwesomeSwiper)
    // filters
import './filters'
Vue.config.productionTip = false
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})