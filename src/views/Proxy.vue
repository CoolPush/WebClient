<template>
    <div class="proxy">
        <div class="jumbotron bg-dark text-white mb-0">
            <div class="container main-body">
                <h1 class="display-3 text-light">Cool Push</h1>
                <div class="lead mb-3">QQ消息推送服务.</div>
                <div class="mt-4">
                    <span v-if="!isLogin">
                        <router-link
                            :to="{ name: 'Home' }"
                            class="btn btn-success btn-lg my-2 mr-2"
                        >
                        <span>主页</span>
                    </router-link>
                        <router-link
                            :to="{ name: 'Login' }"
                            class="btn btn-primary btn-lg my-2 mr-2"
                        >
                        <span>登录</span>
                    </router-link>
                        <router-link
                            :to="{ name: 'Docs' }"
                            class="btn btn-info btn-lg my-2 mr-2"
                        >
                        <span>说明</span>
                    </router-link>
                    </span>
                    <span v-if="isLogin">
                        <router-link
                            :to="{ name: 'Home' }"
                            class="btn btn-primary btn-lg my-2 mr-2"
                        >
                        <span>主页</span>
                    </router-link>
                        <router-link
                            :to="{ name: 'Feat' }"
                            class="btn btn-success btn-lg my-2 mr-2"
                        >
                        <span>增强</span>
                    </router-link>
                        <router-link
                            :to="{ name: 'Docs' }"
                            class="btn btn-info btn-lg my-2 mr-2"
                        >
                        <span>说明</span>
                    </router-link>
            <button @click="logout" class="btn btn-danger btn-lg my-2 mr-2">
              <span>注销</span>
            </button>
          </span>
                </div>
            </div>
        </div>

        <!-- 代理服务 -->
        <div class="container py-3 docs mt-4">
            <div class="row">
                <b-col
                    sm="12"
                    md="8"
                    lg="8"
                    xl="8"
                    offset-md="2"
                    offset-lg="2"
                    offset-xl="2"
                >
                    <h3 class="text-primary">代理服务</h3>
                    <p class="mt-2"><code>Telegram代理</code>: 为了实现Telegram推送, CoolPush实现了相关的API代理服务。只需要向以下URL发一个 <code>POST</code> 请求即可, 其返回值为Telegram的原始返回值(请求不接受文件上传):</p>
                    <b-form-input
                        type="text"
                        class="form-control"
                        disabled
                        value="https://proxy.xuthus.cc/api/tg_proxy"
                    ></b-form-input>

                    <p class="mt-2">Telegram代理接口接收两个参数，分别是 <code>url</code> 和 <code>payload</code> 表示 <code>url 请求地址</code> 和
                        <code>payload 请求body</code></p>
                    <p>下面是一个简单的调用演示: </p>
                    <div class="code">
<pre>
//python 发起请求
import requests
url = "https://proxy.xuthus.cc/api/tg_proxy"
data = {
    "url": "https://api.telegram.org/bot123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11/sendMessage",
    "payload": {
        "chat_id": 123456,
        "text": "hello world"
    }
}
res = requests.post(url=url,data=data)
</pre>
                    </div>
                </b-col>
            </div>
        </div>

        <!-- 底部 -->
        <footer class="footer mb-4 mt-4 text-center">
            <div class="footer-top">
                © {{ fullYear }} <i class="fas fa-heart"></i>
                <a href="https://xuthus.cc" target="_blank">&nbsp;&nbsp;xuthus</a>

                <p>
                    <code>管理员QQ:<a href="http://wpa.qq.com/msgrd?v=3&uin=13239686&site=qq&menu=yes" target="_blank">13239686</a></code>
                </p>
            </div>

            <div class="footer-bottom">
        <span class="site-uv">
          <i class="fa fa-user"></i> 访问人数
          <span class="busuanzi-value" id="busuanzi_value_site_uv"></span>
        </span>
                <span class="site-pv">
          <i class="fa fa-eye"></i> 访问总量
          <span class="busuanzi-value" id="busuanzi_value_site_pv"></span>
        </span>
                <br/>
                CDN 由
                <a href="https://www.upyun.com/products/cdn" target="_blank">
                    又拍云
                </a>
                赞助
            </div>
        </footer>

        <!-- 登陆方式模态 -->
        <b-modal id="modal-login" centered title="请选择登录方式" hide-footer>
            <b-button variant="outline-danger" size="lg" class="mr-2 mb-2" @click="loginBy('qq')">
                <img src='../assets/qq_new.png' class="icon-size-std pr-2" alt="">QQ账号登录
            </b-button>
            <!--            <a @click="loginBy('qq')"><img src='../assets/Connect_logo_5.png' class="icon-size-std pr-2" alt=""></a>-->
            <br>
            <br>
            <b-button variant="info" size="lg" class="mr-2 mb-2" @click="loginBy('github')">
                <img src='../assets/github.svg' class="icon-size-std pr-1" alt="">Github
            </b-button>
            <b-button variant="info" size="lg" class="mr-2 mb-2" @click="loginBy('osc')">
                <img src='../assets/oschina.svg' class="icon-size-osc pr-1" alt="">开源中国
            </b-button>
            <b-button variant="info" size="lg" class="mr-2 mb-2" @click="loginBy('gitee')">
                <img src='../assets/gitee.svg' class="icon-size-std pr-1" alt="">码云
            </b-button>
            <b-button variant="info" size="lg" class="mr-2 mb-2" @click="loginBy('dingtalk')">
                <img src='../assets/dingtalk.svg' class="icon-size-std pr-1" alt="">钉钉
            </b-button>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: "Proxy",
    data() {
        return {
            isLogin: false, //检测是否登录 false没有登陆

            //弹窗相关
            color: "warning",
            dismissSecs: 5,
            alertMessage: "",
            dismissCountDown: 0,
        };
    },
    methods: {
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown;
        },
        logout() {
            this.isLogin = false;
            sessionStorage.clear();
            localStorage.clear();
        },
        login() {
            this.$bvModal.show("modal-login")
        },
        loginBy(method) {
            method = method.toLowerCase();
            if (method === "github") {
                localStorage.setItem("loginType", "github");
                window.location.href = this.github;
            } else if (method === "dingtalk") {
                localStorage.setItem("loginType", "dingTalk");
                window.location.href = this.dingTalk;
            } else if (method === "qq") {
                localStorage.setItem("loginType", "qq");
                window.location.href = this.qq;
            } else if (method === "gitee") {
                localStorage.setItem("loginType", "gitee");
                window.location.href = this.gitee;
            } else if (method === "osc") {
                localStorage.setItem("loginType", "osc");
                window.location.href = this.osc;
            }
        },
    },
    created() {
        //存在token 先检验 token是否有效 再打开 isLogin 变量
        let token = localStorage.getItem("token");
        if (token !== null) {
            let header = {token: token};
            this.$api
                .get(this.serverUrl + "/check", {headers: header})
                .then((response) => {
                    let data = response.data;
                    if (data.code === 200) {
                        this.isLogin = true;
                        this.user = data.data;
                    } else {
                        //清空localStorage
                        this.isLogin = false;
                        localStorage.clear();
                    }
                })
                .catch((error) => {
                    //清空localStorage
                    console.log(error);
                    this.isLogin = false;
                    localStorage.clear();
                });
        }

        // code 检测 || access_token 检测
        let code = this.$route.query.code;
        let accessToken = this.$route.query.access_token;
        if (code !== undefined) {
            //推送到专门页面处理
            this.$router.push({name: "Callback", query: {code: code}});
        } else if (accessToken !== undefined) {
            //推送到专门页面处理
            this.$router.push({name: "Callback", query: {code: accessToken}});
        }

        // 登录出错
        let error = this.$route.query.error;
        if (error !== undefined) {
            //推送到专门页面处理
            this.$router.push({name: "Callback", query: {error: error}});
        }

        let isLogin = sessionStorage.getItem("isLogin");
        if (isLogin === "true") this.isLogin = true;
    },
};
</script>

<style>
.btn {
    border-radius: 0.3rem !important;
}

.bg-dark {
    background-color: #0b1a31 !important;
}

.btn-primary {
    background-color: #007bff !important;
}

.icon-size-std {
    /*width: 22px;*/
    height: 30px;
}

.main-body {
    text-align: center;
}

.code {
    background-color: #f5f5f5;
    font-family: Courier New, serif !important;
    font-size: 12px !important;
    border: 1px solid #ccc;
    padding: 5px;
    overflow: auto;
    margin: 5px 0;
    color: #000;
}

.call-key h3 {
    width: 50%;
}

.private_deploy .form-inline .form-control {
    width: 48% !important;
}

footer {
    line-height: 1.725;
}

footer .footer-top .fa-heart {
    padding-left: 4px;
    padding-right: 4px;
    color: red;
}

footer .footer-top a {
    font-size: 1.2rem;
}

footer .footer-bottom {
    margin: 0.3rem 0 1rem 0;
    width: 100%;
    text-align: center;
}

.site-uv {
    margin-right: 0.5rem;
}

.site-uv::after {
    content: "|";
    padding-left: 0.5rem;
}

footer .fa-heart {
    padding-left: 4px;
    padding-right: 4px;
    color: red;
}
</style>
