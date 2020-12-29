<template>
    <div class="home">
        <div class="jumbotron bg-dark text-white mb-0">
            <div class="container main-body">
                <h1 class="display-3 text-light">Cool Push</h1>
                <div class="lead mb-3">QQ消息推送服务.</div>
                <div class="mt-4">
                    <span v-if="!isLogin">
                        <b-button variant="primary" size="lg" class="my-2 mr-2" @click="login">登陆</b-button>
                    </span>
                    <router-link
                            :to="{ name: 'Docs' }"
                            class="btn btn-primary btn-lg my-2 mr-2"
                    >
                        <span>说明</span>
                    </router-link>
                    <span v-if="isLogin">
            <button @click="logout" class="btn btn-danger btn-lg my-2 mr-2">
              <span>注销</span>
            </button>
          </span>
                </div>
            </div>
        </div>

        <div v-if="dismissCountDown" class="container mt-4 docs">
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
                    <b-alert
                            :show="dismissCountDown"
                            dismissible
                            :variant="color"
                            @dismissed="dismissCountDown = 0"
                            @dismiss-count-down="countDownChanged"
                    >
                        {{ alertMessage }}
                    </b-alert>
                </b-col>
            </div>
        </div>

        <div v-if="isLogin">
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
                            <label>QQ号私人推送</label>
                            <b-form-input
                                    v-model="user.sendTo"
                                    type="text"
                                    class="form-control"
                                    placeholder="输入推送QQ地址"
                            ></b-form-input>
                            <small class="form-text text-muted"
                            ><code>请将该账号添加机器人QQ为好友</code></small
                            >
                        </div>

                        <b-form-radio-group
                            v-model="sendFrom"
                            :options="randomAccountList()"
                            class="mb-3"
                            value-field="value"
                            text-field="text"
                        ></b-form-radio-group>

                        <button type="button" class="btn btn-primary mt-2" @click="bind">
                            绑定
                        </button>

                        <hr>

                        <div class="form-group">
                            <label>QQ群推送</label>
                            <b-form-input
                                    v-model="user.groupTo"
                                    type="text"
                                    class="form-control"
                                    placeholder="输入需要绑定的QQ群号码"
                            ></b-form-input>
                            <small class="form-text text-muted"
                            ><code>请选择以下机器人并拉他们入群</code></small
                            >
                        </div>

                        <b-form-radio-group
                            v-model="groupFrom"
                            :options="randomGroupAccountList()"
                            class="mb-3"
                            value-field="value"
                            text-field="text"
                        ></b-form-radio-group>

                        <button type="button" class="btn btn-primary mt-2" @click="groupBind">
                            绑定
                        </button>

                        <hr>
                        <div class="form-group">
                            <label>QQ备忘墙</label>
                            <small class="form-text text-muted"
                            ><code>感谢以下QQ号的贡献，虽然被封禁了，但值得被铭记!</code></small
                            >
                            <br/>
                            <h5><b-badge variant="danger">1498598914</b-badge> <span> </span>
                                <b-badge variant="danger">964627404</b-badge> <span> </span>
                                <b-badge variant="danger">228346469</b-badge> <span> </span>
                                <b-badge variant="danger">723860385</b-badge> <span> </span>
                                <b-badge variant="danger">371365873</b-badge> <span> </span>
                            </h5>
                        </div>

                        <hr>
                        <div class="form-group">
                            <label>QQ勋章墙</label>
                            <small class="form-text text-muted"
                            ><code>感谢以下用户的QQ小号赞助!</code></small
                            >
                            <br/>
                            <h5><b-badge variant="danger">W4j1e</b-badge></h5>
                        </div>

                        <hr>

                        <div class="form-group">
                            <label>邮箱推送</label>
                            <b-form-input
                                v-model="user.email"
                                type="text"
                                class="form-control"
                                placeholder="输入需要绑定的邮箱地址"
                                disabled
                            ></b-form-input>
                            <small class="form-text text-muted"
                            ><code>注意，邮箱消息推送可能由于垃圾邮件而导致被退信 , 重构中...</code></small
                            >
                        </div>
                        <button type="button" class="btn btn-primary mt-2" @click="emailBind">
                            绑定
                        </button>

                        <hr>

                        <h3 class="text-primary">绑定微信推送</h3>
                        <div v-if="wxPusherUid === ''">
                            <b-form-checkbox v-model="openWxPusher" name="check-button" switch>
                                开启微信推送
                            </b-form-checkbox>
                            <div v-if="openWxPusher">
                                <button type="button" class="btn btn-primary mt-2" v-b-modal.modal-bindWxPusher @click="getWxPusherQrCode">
                                    开始绑定
                                </button>
                            </div>
                        </div>
                        <div v-else>
                            <b-button variant="primary mr-2">
                                已绑定 <b-badge variant="light">ok</b-badge>
                            </b-button>
                            <b-button variant="danger" v-b-popover.hover.top="'取消绑定后,酷推skey将与推送端微信公众号失去关联,你仍可通过扫码方式重新建立绑定关系'" title="说明" @click="cancelBindWxPusher">
                                取消绑定
                            </b-button>
                        </div>
                        <b-alert
                            v-if="wxPusherShowBindResult"
                            :show="dismissCountDown"
                            dismissible
                            :variant="color"
                            @dismissed="dismissCountDown = 0"
                            @dismiss-count-down="countDownChanged"
                        >
                            {{ alertMessage }}
                        </b-alert>

                        <hr>

                        <h3 class="text-primary">绑定企业微信推送</h3>
                        <b-alert show>实现中...拭目以待...</b-alert>
                    </b-col>
                </div>
            </div>

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
                        <h3 class="text-primary">在线测试</h3>
                        <b-form-textarea
                                id="textarea"
                                v-model="msg"
                                placeholder="消息内容,限制最长1500字母/500汉字;如需格式化消息,请使用POST按照raw格式提交"
                                rows="5"
                                max-rows="6"
                        ></b-form-textarea>
                        <button type="button" class="btn btn-primary mt-2 mr-2" @click="sendGetMsg">
                            发送消息
                        </button>
                        <button type="button" class="btn btn-primary mt-2" @click="sendPostMsg">
                            发送POST消息
                        </button>
                    </b-col>
                </div>
            </div>

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
                        <p>私聊推送消息非常简单，只需要向以下URL发一个GET或者POST请求：</p>
                        <b-form-input
                                v-model="this.serverUrl+ '/send/' + user.skey"
                                type="text"
                                class="form-control"
                                disabled
                        ></b-form-input>
                        <p class="mt-2">同样的, 如需群消息推送，只需要向以下URL发一个GET或者POST请求：</p>
                        <b-form-input
                                v-model="this.serverUrl+ '/group/' + user.skey"
                                type="text"
                                class="form-control"
                                disabled
                        ></b-form-input>
                        <p class="mt-2">如需微信消息推送，只需要向以下URL发一个GET或者POST请求：</p>
                        <b-form-input
                            v-model="this.serverUrl+ '/wx/' + user.skey"
                            type="text"
                            class="form-control"
                            disabled
                        ></b-form-input>
                        <p class="mt-2">他们都只接受一个参数 <code>c</code> 表示 <code>content</code>：</p>
                        <ul>
                            <li>c: 消息内容</li>
                        </ul>
                        <p>
                            最简单的消息发送方式是通过浏览器，在地址栏输入以下URL，回车后即可发送：
                        </p>
                        <b-form-input
                                v-model="this.serverUrl+ '/send/' + user.skey + '?c=你好呀'"
                                type="text"
                                class="form-control"
                                disabled
                        ></b-form-input>

                        <p class="mt-2">额外的，如需邮箱消息推送，只需要向以下URL发一个GET或者POST请求：</p>
                        <b-form-input
                            v-model="this.serverUrl+ '/email/' + user.skey"
                            type="text"
                            class="form-control"
                            disabled
                        ></b-form-input>
                        <p class="mt-2">邮箱消息推送接收两个参数，分别是 <code>t</code> 和 <code>c</code> 表示 <code>title 标题</code> 和 <code>content 内容</code></p>
                            <p>下面是一个简单的邮件推送演示，在地址栏输入以下URL，回车后即可发送：</p>
                        <b-form-input
                            v-model="this.serverUrl+ '/email/' + user.skey + '?t=这是推送邮件的标题&c=这是推送邮件的内容'"
                            type="text"
                            class="form-control"
                            disabled
                        ></b-form-input>
                    </b-col>
                </div>
            </div>

        </div>
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
                            <a href="#" @click="login">登陆</a>
                            按钮以尝试.
                        </p>
                    </b-col>
                </div>
            </div>
        </div>

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

        <footer class="footer mb-4 mt-4 text-center">
            <div class="footer-top">
                © {{fullYear}} <i class="fas fa-heart"></i>
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
        <b-modal id="modal-login" centered title="登陆方式" hide-footer>
            <b-button variant="info" class="mr-2" @click="loginBy('github')"><i class="fab fa-github fa-lg pr-1"></i>Github
            </b-button>
<!--            <b-button variant="info" class="mr-2" @click="loginBy('qq')"><img src='../assets/qq.png' class="icon-size-tpl pr-1"></img>QQ</b-button>-->
            <b-button variant="info" class="mr-2" @click="loginBy('gitee')"><img src='../assets/gitee.svg' class="icon-size-tpl pr-1"></img>Gitee</b-button>
            <b-button variant="info" class="mr-2" @click="loginBy('osc')"><img src='../assets/oschina.svg' class="icon-size-osc pr-1"></img>OSC</b-button>
        </b-modal>
        <b-modal id="modal-bindWxPusher" centered hide-header ok-title="确定" cancel-title="取消" @ok="bindWxPusher">
            <b-img :src="wxPusherImg" fluid alt="Responsive image"></b-img>
            <p>扫码后，关注公众号并点击确定以进行绑定检查。</p>
        </b-modal>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                accountOption: [
                    { text: '2292066393', value: '2292066393' },
                    { text: '2277671372', value: '2277671372' },
                ],
                accountGroupOption: [
                    { text: '2292066393', value: '2292066393' },
                    { text: '2277671372', value: '2277671372' },
                ],
                user: {
                    skey: "",
                    sendTo: "",
                    groupTo: "",
                    email: "",
                }, //用户信息
                msg: "", //在线测试的消息体
                isLogin: false, //检测是否登录 false没有登陆
                sendFrom: "", //发送者 默认值
                groupFrom: "",//群发者 默认值
                openWxPusher: false,//是否开启微信推送
                wxPusherUid: '',
                wxPusherImg: "",//获得二维码地址
                wxPusherShowBindResult: false,

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
                return this.accountOption.shuffle()
            },
            randomGroupAccountList() {
                return this.accountGroupOption.shuffle()
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
                                this.alertMessage = "重置成功,刷新页面以获取最新Skey";
                                this.color = "success";
                                this.dismissCountDown = this.dismissSecs;
                            } else {
                                this.alertMessage = "重置失败:" + data.msg;
                                this.color = "danger";
                                this.dismissCountDown = this.dismissSecs;
                            }
                        })
                        .catch((error) => {
                            console.log("重置结果", error);
                            //清空localStorage
                            // localStorage.clear();
                        });
                }
            },
            sendGetMsg() {
                if (this.msg !== "") {
                    this.$api
                        .get(this.serverUrl + '/send/' + this.user.skey + "?c=" + this.msg)
                        .then((response) => {
                            if (response.data.code !== 200) {
                                this.alertMessage = "发送失败:" + error.msg;
                                this.color = "danger";
                                this.dismissCountDown = this.dismissSecs;
                                return
                            }
                            this.alertMessage = "发送成功";
                            this.color = "success";
                            this.dismissCountDown = this.dismissSecs;
                        })
                        .catch((error) => {
                            this.alertMessage = "发送失败:" + error.msg;
                            this.color = "danger";
                            this.dismissCountDown = this.dismissSecs;
                        });
                }
            },
            sendPostMsg() {
                if (this.msg !== "") {
                    this.$api
                        .post(this.serverUrl + '/send/' + this.user.skey, this.msg, {headers: {"Content-type": "application/json"}})
                        .then((response) => {
                            if (response.data.code === 400) {
                                this.alertMessage = "发送失败:" + error.msg;
                                this.color = "danger";
                                this.dismissCountDown = this.dismissSecs;
                                return
                            }
                            this.alertMessage = "发送成功";
                            this.color = "success";
                            this.dismissCountDown = this.dismissSecs;
                        })
                        .catch((error) => {
                            this.alertMessage = "发送失败:" + error.msg;
                            this.color = "danger";
                            this.dismissCountDown = this.dismissSecs;
                        });
                }
            },
            bind() {
                let token = localStorage.getItem("token");
                let header = {token: token};
                this.$api
                    .get(
                        this.serverUrl + "/bind?id=" +
                        this.user.id +
                        "&sendTo=" +
                        this.user.sendTo +
                        "&sendFrom=" +
                        this.sendFrom,
                        {headers: header}
                    )
                    .then((response) => {
                        //绑定成功
                        this.alertMessage = "绑定成功";
                        this.color = "success";
                        this.dismissCountDown = this.dismissSecs;
                    })
                    .catch((error) => {
                        //绑定失败
                        this.alertMessage = "绑定失败";
                        this.color = "danger";
                        this.dismissCountDown = this.dismissSecs;
                    });
            },
            groupBind() {
                let token = localStorage.getItem("token");
                let header = {token: token};
                this.$api
                    .get(
                        this.serverUrl + "/group_bind?id=" +
                        this.user.id +
                        "&groupTo=" +
                        this.user.groupTo +
                        "&groupFrom=" +
                        this.groupFrom,
                        {headers: header}
                    )
                    .then((response) => {
                        //绑定成功
                        this.alertMessage = "绑定成功";
                        this.color = "success";
                        this.dismissCountDown = this.dismissSecs;
                    })
                    .catch((error) => {
                        //绑定失败
                        this.alertMessage = "绑定失败";
                        this.color = "danger";
                        this.dismissCountDown = this.dismissSecs;
                    });
            },
            emailBind() {
                let token = localStorage.getItem("token");
                let header = {token: token};
                this.$api
                    .get(
                        this.serverUrl + "/email_bind?id=" +
                        this.user.id +
                        "&email=" +
                        this.user.email,
                        {headers: header}
                    )
                    .then((response) => {
                        //绑定成功
                        this.alertMessage = "绑定成功";
                        this.color = "success";
                        this.dismissCountDown = this.dismissSecs;
                    })
                    .catch((error) => {
                        //绑定失败
                        this.alertMessage = "绑定失败";
                        this.color = "danger";
                        this.dismissCountDown = this.dismissSecs;
                    });
            },
            bindWxPusher() {
                let token = localStorage.getItem("token");
                if (token !== null) {
                    let header = {token: token};
                    this.$api
                        .get(this.serverUrl + "/check", {headers: header})
                        .then((response) => {
                            let data = response.data;
                            if (data.code === 200) {
                                if (data.wxPusherUid === '') {
                                    this.wxPusherShowBindResult = true;
                                    this.alertMessage = "绑定失败,请重试!";
                                    this.color = "danger";
                                    this.dismissCountDown = this.dismissSecs;
                                }else{
                                    this.wxPusherShowBindResult = true;
                                    this.alertMessage = "绑定成功!";
                                    this.color = "success";
                                    this.dismissCountDown = this.dismissSecs;
                                }
                            }
                        })
                        .catch((error) => {
                            //清空localStorage
                            this.isLogin = false;
                            localStorage.clear();
                        });
                }
            },
            getWxPusherQrCode() {
                //存在token 先检验 token是否有效 再打开 isLogin 变量
                let token = localStorage.getItem("token");
                if (token !== null) {
                    let header = {token: token};
                    this.$api
                        .get(this.serverUrl + "/qr_code", {headers: header})
                        .then((response) => {
                            let data = response.data;
                            if (data.code === 200) {
                                this.wxPusherImg = data.data;
                                this.$bvModal.show('modal-bindWxPusher')
                            } else {
                                this.alertMessage = "重置失败:" + data.msg;
                                this.color = "danger";
                                this.dismissCountDown = this.dismissSecs;
                            }
                        })
                        .catch((error) => {
                            console.log("重置结果", error);
                            //清空localStorage
                            // localStorage.clear();
                        });
                }
            },
            cancelBindWxPusher() {
                let token = localStorage.getItem("token");
                let header = {token: token};
                this.$api
                    .get(
                        this.serverUrl + "/cancel_wx_pusher?id=" +
                        this.user.id,
                        {headers: header}
                    )
                    .then((response) => {
                        //绑定成功
                        this.wxPusherUid = '';
                        this.alertMessage = "取消绑定成功";
                        this.color = "success";
                        this.dismissCountDown = this.dismissSecs;
                    })
                    .catch((error) => {
                        //绑定失败
                        this.alertMessage = "取消绑定失败";
                        this.color = "danger";
                        this.dismissCountDown = this.dismissSecs;
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
                if (method === "github") {
                    localStorage.setItem("loginType", "github");
                    window.location.href = this.github;
                } else if (method === "gitee") {
                    localStorage.setItem("loginType", "gitee");
                    window.location.href = this.gitee;
                } else if (method === "osc") {
                    localStorage.setItem("loginType", "osc");
                    window.location.href = this.osc;
                } else if (method === "qq") {
                    localStorage.setItem("loginType", "qq");
                    window.location.href = this.qq;
                }
            }
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
                            this.user = response.data.data;
                            this.sendFrom = this.user.sendFrom;
                            this.groupFrom = this.user.groupFrom;
                            this.user.email = data.data.email;
                            this.wxPusherUid = data.data.wxPusherUid;
                        } else {
                            //清空localStorage
                            this.isLogin = false;
                            localStorage.clear();
                        }
                    })
                    .catch((error) => {
                        //清空localStorage
                        this.isLogin = false;
                        localStorage.clear();
                    });
            }

            // code 检测
            let code = this.$route.query.code;
            if (code !== undefined) {
                //推送到专门页面处理
                this.$router.push({name: "Callback", query: {code: code}});
            }
            // 登录出错
            let error = this.$route.query.error;
            if (error !== undefined) {
                //推送到专门页面处理
                this.$router.push({name: "Callback", query: {error: error}});
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
                if (from.path != to.path) {
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

    .btn-info {
        color: #ffffff;
    }

    .btn-primary {
        background-color: #007bff !important;
    }

    .icon-size-tpl {
        width: 22px;
        height: 22px;
    }

    .icon-size-osc {
        width: 25px;
        height: 25px;
        vertical-align: bottom;
    }

    .main-body {
        text-align: center;
    }

    .call-key h3 {
        width: 50%;
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
