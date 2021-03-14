<template>
    <div class="home">
        <div class="jumbotron bg-dark text-white mb-0">
            <div class="container main-body">
                <h1 class="display-3 text-light">Cool Push</h1>
                <div class="lead mb-3">QQ消息推送服务.</div>
                <div class="mt-4">
                    <router-link :to="{name:'Home'}"
                                 class="btn btn-primary btn-lg my-2 mr-2">
                        <span>主页</span>
                    </router-link>
                </div>
            </div>
        </div>

        <div class="container py-5 docs">
            <div class="row">
                <b-col sm="12" md="8" lg="8" xl="8" offset-md="2" offset-lg="2" offset-xl="2">
                    <div class="card text-center">
                        <b-card no-body>
                            <b-tabs pills card>
                                <b-tab title="登录" active>
                                    <b-container fluid>
                                        <b-row>
                                            <b-col sm="0" md="2" lg="2" xl="2"></b-col>
                                            <b-col>
<!--                                                <b-form>-->
<!--                                                    <div class="form-group">-->
<!--                                                        <label for="loginEmail">邮箱地址</label>-->
<!--                                                        <input type="email" class="form-control" id="loginEmail" placeholder="输入登录邮箱地址">-->
<!--                                                    </div>-->

<!--                                                    <div class="form-group">-->
<!--                                                        <label for="loginPassword">登录密码</label>-->
<!--                                                        <input type="password" class="form-control" id="loginPassword" placeholder="输入登录密码">-->
<!--                                                    </div>-->
<!--                                                    <b-button variant="primary" @click="" disabled>登录</b-button>-->
<!--                                                </b-form>-->

                                                <hr>

                                                <p>更多登录方式</p>

<!--                                                <b-button variant="outline-danger" size="lg" class="mr-2 mb-2" @click="loginBy('qq')">-->
<!--                                                    <img src='../assets/qq_new.png' class="icon-size-std pr-2" alt="">QQ账号登录-->
<!--                                                </b-button>-->
<!--                                                <br>-->
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
                                            </b-col>
                                            <b-col sm="0" md="2" lg="2" xl="2"></b-col>
                                        </b-row>
                                    </b-container>
                                </b-tab>
                                <b-tab title="注册" disabled>
                                    <b-container fluid>
                                        <b-row>
                                            <b-col sm="0" md="2" lg="2" xl="2"></b-col>
                                            <b-col>
                                                <b-form>
                                                    <div class="form-group">
                                                        <label for="regEmail">注册邮箱地址</label>
                                                        <input type="email" class="form-control" id="regEmail" placeholder="输入注册邮箱地址">
                                                    </div>

                                                    <div class="form-group">
                                                        <label for="regPassword">登录密码</label>
                                                        <input type="password" class="form-control" id="regPassword" placeholder="输入登录密码">
                                                    </div>

                                                    <div class="form-group">
                                                        <label for="rePassword">再次确认</label>
                                                        <input type="password" class="form-control" id="rePassword" placeholder="输入登录密码">
                                                    </div>
                                                    <b-button variant="primary" @click="">注册</b-button>
                                                </b-form>

                                                <hr>

                                                <p>更多登录方式</p>

                                                <b-button variant="outline-danger" size="lg" class="mr-2 mb-2" @click="loginBy('qq')">
                                                    <img src='../assets/qq_new.png' class="icon-size-std pr-2" alt="">QQ账号登录
                                                </b-button>
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

                                            </b-col>
                                            <b-col sm="0" md="2" lg="2" xl="2"></b-col>
                                        </b-row>
                                    </b-container>
                                </b-tab>
                            </b-tabs>
                        </b-card>
                    </div>
                </b-col>
            </div>
        </div>

        <footer class="footer mb-4 mt-4 text-center">
            <div class="footer-top">
                © {{ fullYear }} <i class="fas fa-heart"></i>
                <a href="https://xuthus.cc" target="_blank">&nbsp;&nbsp;xuthus</a>
            </div>

            <div class="footer-bottom">
                CDN 由
                <a href="https://www.upyun.com/products/cdn" target="_blank">
                    又拍云
                </a>
                赞助
            </div>
        </footer>

    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
        }
    },
    methods: {
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

    }
}
</script>

<style>
.icon-size-std {
    /*width: 22px;*/
    height: 30px;
}

.bg-dark {
    background-color: #0b1a31 !important;
}

.btn {
    border-radius: 0.3rem !important;
}

.main-body {
    text-align: center;
}

.docs p {
    font-size: 1.2rem;
}

footer .fa-heart {
    padding-left: 4px;
    padding-right: 4px;
    color: red;
}
</style>
