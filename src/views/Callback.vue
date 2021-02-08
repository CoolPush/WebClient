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
                        <div class="card-header">
                            授权
                        </div>
                        <div class="card-body">
                            <div v-if="loading">
                                <b-spinner variant="primary" label="Spinning"></b-spinner>
                            </div>
                            <div v-else>
                                <div v-if="code === 500 || code === 501">
                                    <h4 class="card-title">建立请求失败</h4>
                                    <p class="card-text text-danger">{{ message }}</p>
                                    <a :href="this.callback" type="button" class="btn btn-primary">授权</a>
                                </div>
                                <div v-else-if="code === 502">
                                    <h4 class="card-title">授权登录失败</h4>
                                    <p class="card-text text-danger">{{ message }}</p>
                                    <a :href="this.callback" type="button" class="btn btn-primary">授权</a>
                                </div>
                                <div v-else-if="code === 503">
                                    <h4 class="card-title">禁止登录</h4>
                                    <p class="card-text text-danger">{{ message }}</p>
                                </div>
                            </div>
                        </div>
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
    name: 'Callback',
    data() {
        return {
            //是否在加载状态
            loading: true,
            code: 0,
            message: '',
        }
    },
    methods: {
        reload() {
            //先载入动画 后操作
            this.loading = true;
            let code = this.$route.query.code;
            let loginType = localStorage.getItem("loginType");
            if (code === undefined) {
                //非法回调
                this.$router.push({name: 'Home'})
            } else {
                if (loginType === undefined || loginType === null || loginType === "")
                    this.$router.push({name: 'Home'});
                //访问服务端
                this.$api.get(this.serverUrl + "/auth/" + loginType + "?code=" + code)
                    .then(response => {
                        let data = response.data;
                        if (data.code !== 200) {
                            this.loading = false;
                            this.message = data.msg;
                            this.code = data.code;
                        } else {
                            sessionStorage.setItem('user', data.data);
                            localStorage.setItem('token', data.message);
                            this.$router.push({name: 'Home'});
                        }
                    })
                    .catch(error => {
                        //停止加载
                        this.loading = false;
                    })
            }
        },
    },
    created() {
        //如果登录出问题
        let error = this.$route.query.error;
        if (error !== undefined) {
            this.loading = false;
            this.message = '由于网络原因,请求失败,请重试';
            this.code = 500;
            return
        }
        //否则载入请求
        this.reload();
    }
}
</script>

<style>
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
