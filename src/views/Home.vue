<template>
    <div class="home">
        <div class="jumbotron bg-dark text-white mb-0">
            <div class="container main-body">
                <h1 class="display-3 text-light">Cool Push</h1>
                <div class="lead mb-3">QQ消息推送服务.</div>
                <div class="mt-4">
                    <span v-if="!isLogin">
                        <router-link
                            :to="{ name: 'Login' }"
                            class="btn btn-primary btn-lg my-2 mr-2"
                        >
                        <span>登录</span>
                    </router-link>
                        <router-link
                            :to="{ name: 'Proxy' }"
                            class="btn btn-success btn-lg my-2 mr-2"
                        >
                        <span>代理</span>
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
                            :to="{ name: 'Feat' }"
                            class="btn btn-success btn-lg my-2 mr-2"
                        >
                        <span>增强</span>
                    </router-link>
                        <router-link
                            :to="{ name: 'Proxy' }"
                            class="btn btn-info btn-lg my-2 mr-2"
                        >
                        <span>代理</span>
                    </router-link>
                        <router-link
                            :to="{ name: 'Docs' }"
                            class="btn btn-primary btn-lg my-2 mr-2"
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

        <!-- 主内容 -->
        <div v-if="isLogin">
            <!-- 显示skey -->
            <div class="container py-5 docs">
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
                        <div class="call-key">
                            <h3 class="text-primary float-left">调用代码Skey</h3>
                            <b-button v-b-modal.modal-reset class="btn btn-danger float-right">重置</b-button>
                        </div>
                        <b-form-input
                            v-model="user.skey"
                            type="text"
                            class="form-control"
                            disabled
                        ></b-form-input>
                    </b-col>
                </div>
            </div>

            <!-- 绑定机器人 -->
            <div class="container py-3 docs">
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
                        <h3 class="text-primary">绑定机器人</h3>
                        <div class="form-group">
                            <label>QQ私聊推送</label>
                            <b-form-input
                                v-model="qqConfig.sendTo"
                                type="text"
                                class="form-control"
                                placeholder="输入推送QQ地址"
                            ></b-form-input>
                            <small class="form-text text-muted"
                            ><code>请将该账号添加机器人QQ为好友[已开启敏感词过滤规则,存在敏感词的推送将会被丢弃]</code></small
                            >
                        </div>

                        <b-form-radio-group
                            v-model="qqConfig.sendFrom"
                            :options="randomAccountList()"
                            class="mb-3"
                            value-field="value"
                            text-field="text"
                        ></b-form-radio-group>

                        <button type="button" class="btn btn-danger mt-2 mr-2" @click="validQQSingle">
                            校验
                        </button>
                        <button type="button" class="btn btn-primary mt-2" @click="bindQQSingle">
                            绑定
                        </button>

                        <hr>

                        <div class="form-group">
                            <label>QQ群推送</label>
                            <b-form-input
                                v-model="qqConfig.groupTo"
                                type="text"
                                class="form-control"
                                placeholder="输入需要绑定的QQ群号码"
                            ></b-form-input>
                            <small class="form-text text-muted"
                            ><code>请选择以下机器人并拉他们入群[已开启敏感词过滤规则,存在敏感词的推送将会被丢弃]</code></small
                            >
                        </div>

                        <b-form-radio-group
                            v-model="qqConfig.groupFrom"
                            :options="randomGroupAccountList()"
                            class="mb-3"
                            value-field="value"
                            text-field="text"
                        ></b-form-radio-group>

                        <button type="button" class="btn btn-danger mt-2 mr-2" @click="validQQGroup">
                            校验
                        </button>

                        <button type="button" class="btn btn-primary mt-2" @click="bindQQGroup">
                            绑定
                        </button>

                        <hr>

                        <div class="form-group private_deploy">
                            <label>私有化绑定 </label>
                            <router-link
                                :to="{ name: 'Deploy' }"
                                class="my-2 mr-2"
                            >
                                <span> 部署包(go-cqhttp定制版本)</span>
                            </router-link>
                            <b-form inline>
                                <b-form-input
                                    v-model="qqConfig.privatePath"
                                    type="text"
                                    class="form-control mr-2"
                                    placeholder="绑定URL地址,eg: http://8.8.8.8:5700"
                                ></b-form-input>
                                <b-form-input
                                    v-model="qqConfig.privateAccessToken"
                                    type="text"
                                    class="form-control"
                                    placeholder="若存在鉴权,请输入 access_token"
                                ></b-form-input>
                            </b-form>
                            <small class="form-text text-muted"><code>输入私有化部署后的可供访问的URL地址,并完成校验.
                                私有化部署不限制敏感词</code></small>
                        </div>

                        <button type="button" class="btn btn-danger mt-2 mr-2" @click="validQQPrivate">
                            校验
                        </button>

                        <button type="button" class="btn btn-primary mt-2" @click="bindQQPrivate">
                            绑定
                        </button>

                        <hr>
                        <div class="form-group">
                            <label>QQ备忘墙</label>
                            <small class="form-text text-muted"
                            ><code>感谢以下QQ号的贡献，虽然被封禁了，但值得被铭记!</code></small
                            >
                            <br/>
                            <h5>
                                <b-badge variant="danger" class="mr-2" v-for="num in accountOfflineList" :key="num">
                                    {{ num }}
                                </b-badge>
                                <span> </span>
                            </h5>
                        </div>

                        <hr>
                        <div class="form-group">
                            <label>QQ勋章墙</label>
                            <small class="form-text text-muted"
                            ><code>感谢以下用户的QQ小号赞助!</code></small
                            >
                            <br/>
                            <h5>
                                <b-badge class="mr-2" v-for="username in accountShareUserList" :key="username"
                                         variant="danger">{{ username }}
                                </b-badge>
                            </h5>
                        </div>

                        <hr>
                    </b-col>
                </div>
            </div>

            <!-- 简单介绍使用 -->
            <div class="container py-3 docs">
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
                        <h3 class="text-primary">推送说明</h3>
                        <p><code>QQ私聊推送</code>: 只需要向以下URL发一个GET或者POST请求:</p>
                        <b-form-input
                            v-model="this.serverUrl+ '/send/' + user.skey"
                            type="text"
                            class="form-control"
                            disabled
                        ></b-form-input>
                        <p class="mt-2"><code>QQ群消息推送</code>: 只需要向以下URL发一个GET或者POST请求:</p>
                        <b-form-input
                            v-model="this.serverUrl+ '/group/' + user.skey"
                            type="text"
                            class="form-control"
                            disabled
                        ></b-form-input>

                        <p class="mt-2"><code>一对多推送</code>: 针对需要 <code>一对多</code>推送的需求，目前也已经支持(包括私有化部署)，你可以使用 <code>sendList</code>
                            这个GET参数来自定义, 结果用 <code>英文逗号</code> 拼接, 目前最多支持一对多推送10个账号(一对一推送请不要使用该参数, 将导致该推送丢弃),
                            不支持混合群聊私聊推送, 填写错误将导致推送失败, 推送方式异步, 不立即告知结果, 实际执行效果以收到的消息为准, 悉知。下面是一个私聊一对多推送案例,</p>
                        <b-form-input
                            v-model="this.serverUrl+ '/send/' + user.skey + '?sendList=100001,100002'"
                            type="text"
                            class="form-control"
                            disabled
                        ></b-form-input>

                        <p class="mt-2"><code>QQ私有化私聊推送</code>:
                            如果你部署了私有化的QQ机器人，在绑定并验证后，只需要向以下URL发一个GET或者POST请求，即可完成 ，当然，<code>敏感词不受限制，并且增强功能均已开启</code>:
                        </p>
                        <b-form-input
                            v-model="this.serverUrl+ '/psend/' + user.skey"
                            type="text"
                            class="form-control"
                            disabled
                        ></b-form-input>

                        <p class="mt-2"><code>QQ私有化群聊推送</code>：</p>
                        <b-form-input
                            v-model="this.serverUrl+ '/pgroup/' + user.skey"
                            type="text"
                            class="form-control"
                            disabled
                        ></b-form-input>

                        <p class="mt-2">需要说明的是，如果你需要动态的指定推送消息给特定的qq号或者群，你可以使用 <code>userId/groupId</code>
                            这两个GET参数来自定义，其中userId表示要推送的QQ号(适应于 <code>send/psend</code>)，groupId表示要推送的群号码(适应于 <code>group/pgroup</code>)，添加了些许灵活性</p>
                        <b-form-input
                            v-model="this.serverUrl+ '/send/' + user.skey+ '?userId=13239686'"
                            type="text"
                            class="form-control"
                            disabled
                        ></b-form-input>
                    </b-col>
                </div>
            </div>

        </div>
        <!-- 未登录 -->
        <div v-else>
            <div class="container py-5 docs">
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
                        <h3 class="text-primary">说明</h3>
                        <p>
                            内容登录可见,点击
                            <router-link
                                :to="{ name: 'Login' }"
                                class="my-2 mr-2"
                            >
                                <span>登录</span>
                            </router-link>
                            按钮以尝试.
                        </p>
                    </b-col>
                </div>
            </div>
        </div>

        <!-- 评论 -->
        <div class="container py-5">
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
                    <div id="vcomments"></div>
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

        <!-- 重置skey模态 -->
        <b-modal id="modal-reset" centered hide-header ok-title="确定" cancel-title="取消" @ok="resetSkey">
            <p class="my-4">确定要重置Skey？之前所有调用该KEY的地方都需要做相应的修改哦？</p>
        </b-modal>
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
    name: "Home",
    data() {
        return {
            isLogin: false, //检测是否登录 false没有登陆

            accountOption: [
                {text: '997539145', value: '997539145'},
                {text: '2320552376', value: '2320552376'},
                {text: '1985824980', value: '1985824980'},
                {text: '2801124605', value: '2801124605'},
                {text: '2690674321', value: '2690674321'},
            ],
            accountGroupOption: [
                {text: '997539145', value: '997539145'},
                {text: '2320552376', value: '2320552376'},
                {text: '1985824980', value: '1985824980'},
                {text: '2801124605', value: '2801124605'},
                {text: '2690674321', value: '2690674321'},
            ],
            accountOfflineList: [
                '228346469', '964627404', '723860385', '1498598914', '2292066393', '3150058140',
                '1136423131', '2046118436', '371365873', '2277671372', '2046118436', '2658061109'
            ],
            accountShareUserList: [
                'W4j1e', '余生安好'
            ],

            // base 用户信息相关
            user: {},

            // qq推送相关
            qqConfig: {},

            //弹窗相关
            color: "warning",
            dismissSecs: 5,
            alertMessage: "",
            dismissCountDown: 0,

            //评论插件
            valine: null,
        };
    },
    methods: {
        randomAccountList() {
            return this.arrayShuffle(this.accountOption);
        },
        randomGroupAccountList() {
            return this.arrayShuffle(this.accountGroupOption);
        },
        arrayShuffle(arr) {
            let input = arr;
            for (let i = input.length - 1; i >= 0; i--) {
                let randomIndex = Math.floor(Math.random() * (i + 1));
                let itemAtIndex = input[randomIndex];
                input[randomIndex] = input[i];
                input[i] = itemAtIndex;
            }
            return input;
        },
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown;
        },
        resetSkey() {
            //存在token 先检验 token是否有效 再打开 isLogin 变量
            let token = localStorage.getItem("token");
            if (token !== null) {
                let header = {token: token};
                this.$api
                    .get(this.serverUrl + "/reset?id=" + this.user.id, {headers: header})
                    .then((response) => {
                        let data = response.data;
                        if (data.code === 200) {
                            this.$swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: '重置成功,刷新页面以获取最新Skey',
                                showConfirmButton: false,
                                timer: 5000
                            });
                        } else {
                            this.$swal.fire({
                                position: 'top-end',
                                icon: 'error',
                                title: "重置失败: " + data.message,
                                showConfirmButton: false,
                                timer: 5000
                            });
                        }
                    })
                    .catch((error) => {
                        this.$swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: "重置结果:" + error.msg,
                            showConfirmButton: false,
                            timer: 5000
                        });
                    });
            }
        },

        bindQQSingle() {
            let token = localStorage.getItem("token");
            let header = {token: token};
            this.$api
                .get(
                    this.serverUrl + "/bind/qqSingle?id=" +
                    this.user.id +
                    "&sendTo=" +
                    this.qqConfig.sendTo +
                    "&sendFrom=" +
                    this.qqConfig.sendFrom,
                    {headers: header}
                )
                .then((response) => {
                    let data = response.data;
                    if (response.data.code !== 200) {
                        this.$swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: "绑定失败: " + data.message,
                            showConfirmButton: false,
                            timer: 5000
                        });
                        return
                    }
                    this.$swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: "绑定成功",
                        showConfirmButton: false,
                        timer: 5000
                    });
                })
                .catch((error) => {
                    //绑定失败
                    this.$swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: "绑定失败: " + error.msg,
                        showConfirmButton: false,
                        timer: 5000
                    });
                });
        },
        bindQQGroup() {
            let token = localStorage.getItem("token");
            let header = {token: token};
            this.$api
                .get(
                    this.serverUrl + "/bind/qqGroup?id=" +
                    this.user.id +
                    "&groupTo=" +
                    this.qqConfig.groupTo +
                    "&groupFrom=" +
                    this.qqConfig.groupFrom,
                    {headers: header}
                )
                .then((response) => {
                    let data = response.data;
                    if (response.data.code !== 200) {
                        this.$swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: "绑定失败: " + data.message,
                            showConfirmButton: false,
                            timer: 5000
                        });
                        return
                    }
                    this.$swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: "绑定成功",
                        showConfirmButton: false,
                        timer: 5000
                    });
                })
                .catch((error) => {
                    //绑定失败
                    this.$swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: "绑定失败: " + error.msg,
                        showConfirmButton: false,
                        timer: 5000
                    });
                });
        },
        bindQQPrivate() {
            if (this.qqConfig.privatePath === "") {
                this.$swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: "请指定绑定地址",
                    showConfirmButton: false,
                    timer: 5000
                });
                return
            }

            let reg = new RegExp(/(\w+):\/\/([^/:]+)(:\d*)?/);
            let result = this.qqConfig.privatePath.match(reg)
            if (result === null || result[0] === "") {
                this.$swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: "格式不正确",
                    showConfirmButton: false,
                    timer: 5000
                });
                return
            }

            let removeLastPart = function (url) {
                let lastSlashIndex = url.lastIndexOf("/");
                if (lastSlashIndex > url.indexOf("/") + 1) {
                    return url.substr(0, lastSlashIndex);
                } else {
                    return url;
                }
            }

            this.qqConfig.privatePath = removeLastPart(this.qqConfig.privatePath);

            let token = localStorage.getItem("token");
            let header = {token: token};
            let payload = {
                "private_path": this.qqConfig.privatePath,
                "access_token": this.qqConfig.privateAccessToken,
            }
            this.$api
                .post(
                    this.serverUrl + "/bind/qqPrivate", payload, {headers: header}
                )
                .then((response) => {
                    let data = response.data;
                    if (response.data.code === 200) {
                        this.$swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: "操作成功!",
                            showConfirmButton: false,
                            timer: 5000
                        });
                    } else {
                        this.$swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: "操作失败: " + data.message,
                            showConfirmButton: false,
                            timer: 5000
                        });
                    }
                })
                .catch((error) => {
                    this.$swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: "操作失败: " + error.msg,
                        showConfirmButton: false,
                        timer: 5000
                    });
                });
        },

        validQQPrivate() {
            let token = localStorage.getItem("token");
            let header = {token: token};
            this.$api
                .get(
                    this.serverUrl + "/valid/qqPrivate",
                    {headers: header}
                )
                .then((response) => {
                    let data = response.data;
                    if (response.data.code === 200) {
                        this.$swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: "校验成功!",
                            showConfirmButton: false,
                            timer: 5000
                        });
                    } else {
                        this.$swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: "校验失败: " + data.message,
                            showConfirmButton: false,
                            timer: 5000
                        });
                    }
                })
                .catch((error) => {
                    this.$swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: "操作失败: " + error.msg,
                        showConfirmButton: false,
                        timer: 5000
                    });
                });
        },
        validQQSingle() {
            let content = 'hello world\n这是测试消息\n当你看到这条消息,说明校验已通过';
            this.$api
                .post(this.serverUrl + '/send/' + this.user.skey, content, {headers: {"Content-type": "application/json"}})
                .then((response) => {
                    let data = response.data;
                    if (response.data.code !== 200) {
                        this.$swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: "校验失败:" + data.message,
                            showConfirmButton: false,
                            timer: 5000
                        });
                        return
                    }
                    this.$swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: "校验成功",
                        showConfirmButton: false,
                        timer: 5000
                    });
                })
                .catch((error) => {
                    this.$swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: "校验失败:" + error.msg,
                        showConfirmButton: false,
                        timer: 5000
                    });
                });
        },
        validQQGroup() {
            let content = '这是测试消息\n当你看到这条消息,说明CoolPush的校验已通过';
            this.$api
                .post(this.serverUrl + '/group/' + this.user.skey, content, {headers: {"Content-type": "application/json"}})
                .then((response) => {
                    let data = response.data;
                    if (response.data.code !== 200) {
                        this.$swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: "校验失败:" + data.message,
                            showConfirmButton: false,
                            timer: 5000
                        });
                        return
                    }
                    this.$swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: "校验成功",
                        showConfirmButton: false,
                        timer: 5000
                    });
                })
                .catch((error) => {
                    this.$swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: "校验失败:" + error.msg,
                        showConfirmButton: false,
                        timer: 5000
                    });
                });
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
                        sessionStorage.setItem("isLogin", "true")
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

        //正常 获取配置列表
        if (token !== null) {
            let header = {token: token};

            let defaultValue = function (obj) {
                if (obj === null) return {};

                if (obj === undefined) return '';

                return obj;
            }

            this.$api
                .get(this.serverUrl + "/config", {headers: header})
                .then((response) => {
                    let data = response.data;
                    if (data.code === 200 && data.data !== null) {
                        this.user = defaultValue(data.data.user);
                        this.qqConfig = defaultValue(data.data.qq_config);
                    }
                })
                .catch((error) => {
                    //清空localStorage
                    this.$router.push({name: "Callback", query: {error: error}});
                });
        }
    },
    mounted() {
        let vm = this;
        vm.$nextTick(() => {
            vm.valine = new Valine({
                el: "#vcomments",
                appId: "yQWj6lVYUOEHCbUBpkbaSe9S-gzGzoHsz",
                appKey: "UkX1y2515bHOWb3JAPh0nWHY",
                avatar: "mp",
                path: vm.$route.path,
            });
        });
    },
    watch: {
        $route(to, from) {
            if (from.path !== to.path) {
                this.valine && this.valine.setPath(to.path);
            }
        },
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
