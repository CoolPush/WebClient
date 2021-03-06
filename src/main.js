import Vue from 'vue'
import App from './App.vue'
import router from './router'

import VueSweetalert2 from 'vue-sweetalert2';

import Axios from "axios";
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'

import './assets/bootstrap4-business-tycoon.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueSweetalert2);

// axios挂载
Vue.prototype.$api = Axios;
//基地址
Vue.prototype.serverUrl = 'https://push.xuthus.cc';
Vue.prototype.clientUrl = 'https://cp.xuthus.cc';
//授权回调地址
Vue.prototype.github = 'https://github.com/login/oauth/authorize?client_id=cc74ff2d2f067e5671f1&redirect_uri=https://cp.xuthus.cc';
Vue.prototype.gitee = 'https://gitee.com/oauth/authorize?client_id=6c40ca5143961574faba6b8b9e49b5b6ecc9345ce8cc82eaa2b2d2a30b5f3c70&redirect_uri=https://cp.xuthus.cc&response_type=code&scope=user_info';
Vue.prototype.osc = 'https://www.oschina.net/action/oauth2/authorize?response_type=code&client_id=VVAVHVNBpANuC6PFuZhn&state=xuthus&redirect_uri=https://cp.xuthus.cc';
Vue.prototype.qq = 'https://graph.qq.com/oauth2.0/authorize?response_type=token&client_id=101936300&redirect_uri=https://cp.xuthus.cc/?&scope=get_user_info&state=coolpush'
Vue.prototype.dingTalk = 'https://oapi.dingtalk.com/connect/qrconnect?appid=dingoavfe0tqfbkvm1ccul&response_type=code&scope=snsapi_login&state=coolpush&redirect_uri=https://cp.xuthus.cc/?'
// 当前年份
Vue.prototype.fullYear = new Date().getFullYear();

Vue.config.productionTip = false

new Vue({
    router,
    render: function (h) {
        return h(App)
    }
}).$mount('#app')
