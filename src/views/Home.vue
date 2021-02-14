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

                        <h3 class="text-primary">邮箱推送</h3>
                        <div class="form-group">
                            <label>邮箱推送地址</label>
                            <b-form-input
                                v-model="emailConfig.to"
                                type="text"
                                class="form-control"
                                placeholder="输入需要绑定的邮箱地址"
                            ></b-form-input>
                            <small class="form-text text-muted"
                            ><code>注意，邮箱消息推送可能由于垃圾邮件而导致被退信</code></small
                            >
                        </div>
                        <b-form inline>
                            <b-form-input
                                v-model="emailConfig.host"
                                class="mb-2 mr-sm-2 mb-sm-0"
                                placeholder="服务地址:smtp.qq.com"
                            ></b-form-input>

                            <b-input-group prepend=":" class="mb-2 mr-sm-2 mb-sm-0">
                                <b-form-input placeholder="端口:465" v-model="emailConfig.port"></b-form-input>
                            </b-input-group>
                        </b-form>
                        <br>
                        <b-form inline>
                            <b-form-input
                                v-model="emailConfig.username"
                                class="mb-2 mr-sm-2 mb-sm-0"
                                placeholder="登录账号:test@qq.com"
                            ></b-form-input>

                            <b-form-input
                                v-model="emailConfig.from"
                                class="mb-2 mr-sm-2 mb-sm-0"
                                placeholder="发件昵称:酷推"
                            ></b-form-input>

                            <b-form-input
                                v-model="emailConfig.password"
                                class="mb-2 mr-sm-2 mb-sm-0"
                                placeholder="登录密码"
                            ></b-form-input>
                        </b-form>

                        <button type="button" class="btn btn-danger mt-2 mr-2" @click="validEmail">
                            校验
                        </button>

                        <button type="button" class="btn btn-primary mt-2" @click="bindEmail">
                            绑定
                        </button>

                        <hr>

                        <h3 class="text-primary">绑定微信推送</h3>
                        <div v-if="wxPusherUid === ''">
                            <b-form-checkbox v-model="openWxPusher" name="check-button" switch>
                                开启微信推送
                            </b-form-checkbox>
                            <div v-if="openWxPusher">
                                <button type="button" class="btn btn-primary mt-2" v-b-modal.modal-bindWxPusher
                                        @click="getWxPusherQrCode">
                                    开始绑定
                                </button>
                            </div>
                        </div>
                        <div v-else>
                            <b-button variant="primary mr-2">
                                已绑定
                                <b-badge variant="light">ok</b-badge>
                            </b-button>
                            <b-button variant="danger"
                                      v-b-popover.hover.top="'取消绑定后,酷推skey将与推送端微信公众号失去关联,你仍可通过扫码方式重新建立绑定关系'" title="说明"
                                      @click="cancelBindWxPusher">
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
                        <b-card no-body>
                            <b-tabs pills card>
                                <b-tab title="加入企业" active>
                                    <b-card-text>选择一个企业，通过企业邀请链接加入其中，并回填你在该企业的用户ID</b-card-text>

                                    <b-form inline class="mt-4">
                                        <b-form-select v-model="corpSelected" :options="corpListOptions"
                                                       class="mb-4 mr-4"></b-form-select>

                                        <b-input-group prepend="用户ID" class="mb-4 mr-2">
                                            <b-form-input placeholder="UserID"
                                                          v-model="wwBindConfig.user.user_id"></b-form-input>
                                        </b-input-group>

                                        <b-button variant="primary" class="mb-4" @click="wwJoinSubmit">保存</b-button>
                                    </b-form>

                                    <div v-if="corpSelected && getJoinLink(corpSelected)" class="mt-4">
                                        企业邀请链接：<a
                                        :href="getJoinLink(corpSelected).link">{{ getJoinLink(corpSelected).link }}</a>
                                    </div>

                                    <b-button variant="danger" class="mb-2 mt-2" @click="validWework">校验</b-button>
                                </b-tab>
                                <b-tab title="自定义企业">
                                    <b-card-text>如果你希望自定义企业推送，可以在这里配置。</b-card-text>

                                    <b-form inline class="mt-4">

                                        <b-input-group prepend="企业名称" class="mb-2 mr-sm-2 mb-sm-0">
                                            <b-form-input v-model="wwBindConfig.app.corp_name"
                                                          placeholder="eg: 酷推"></b-form-input>
                                        </b-input-group>

                                        <b-input-group prepend="企业CorpId" class="mb-2 mr-sm-2 mb-sm-0">
                                            <b-form-input v-model="wwBindConfig.app.corp_id"
                                                          placeholder="eg: wwbc847..."></b-form-input>
                                        </b-input-group>

                                    </b-form>

                                    <b-form inline class="mt-4">

                                        <b-input-group prepend="应用AgentID" class="mb-2 mr-sm-2 mb-sm-0">
                                            <b-form-input v-model="wwBindConfig.app.agent_id"
                                                          placeholder="eg: 1000002"></b-form-input>
                                        </b-input-group>

                                        <b-input-group prepend="应用Secret" class="mb-2 mr-sm-2 mb-sm-0">
                                            <b-form-input v-model="wwBindConfig.app.secret"
                                                          placeholder="eg: z2Ea3uj17UNYO..."></b-form-input>
                                        </b-input-group>

                                    </b-form>

                                    <b-form-checkbox switch size="lg" v-model="wwBindConfig.app.is_share"
                                                     class="mr-2 mt-4">是否公开企业邀请
                                    </b-form-checkbox>

                                    <div v-if="wwBindConfig.app.is_share" class="mt-4">
                                        <b-input-group prepend="企业邀请链接" class="mb-2 mr-sm-2 mb-sm-0">
                                            <b-form-input v-model="wwBindConfig.app.join_link"
                                                          placeholder="eg: https://work.weixin.qq.com/join/..."></b-form-input>
                                        </b-input-group>
                                    </div>

                                    <b-input-group prepend="绑定UserID" class="mb-2 mt-4">
                                        <b-form-input v-model="wwBindConfig.user.user_id"
                                                      placeholder="eg: XiaoMing"></b-form-input>
                                    </b-input-group>

                                    <b-button variant="danger" class="mt-4 mr-2" @click="validWework">校验</b-button>
                                    <b-button variant="primary" class="mt-4" @click="wwBindSubmit">保存</b-button>
                                </b-tab>
                            </b-tabs>
                        </b-card>

                        <hr>

                        <h3 class="text-primary">绑定Telegram推送</h3>
                        <b-form inline>
                            <b-form-input
                                v-model="tgConfig.token"
                                class="mb-2 mr-2"
                                placeholder="机器人BotToken"
                            ></b-form-input>

                            <b-form-input
                                v-model="tgConfig.chat_id"
                                class="mb-2"
                                placeholder="用户ChatID: eg. 717869201"
                            ></b-form-input>

                        </b-form>

                        <small class="form-text text-muted"><code>用途:协助需要使用TG发送消息但服务器网络无法翻墙访问TG.</code></small>
                        <small class="form-text text-muted"><code>如何获取BotToken:添加 <strong>@BotFather</strong> 为好友. 获取机器人
                            <strong>token</strong> 机器人token格式类似: 123456:AAEQ7MEf9WoUS0dMgb</code></small>
                        <small class="form-text text-muted"><code>如何获取推送用户ID:添加上一步中生成的机器人为好友. 给机器人发送一条消息, 访问
                            https://api.telegram.org/bot{BotToken}/getUpdates 获取 chatId 即可(替换 {BotToken}
                            为机器人的token,)</code></small>

                        <button type="button" class="btn btn-danger mt-2 mr-2" @click="validTelegram">
                            校验
                        </button>

                        <button type="button" class="btn btn-primary mt-2" @click="bindTelegram">
                            绑定
                        </button>

                        <hr>

                        <h3 class="text-primary">绑定钉钉推送</h3>
                        <b-form inline>
                            <b-form-input
                                v-model="dingConfig.web_hook"
                                class="mb-2 mr-2"
                                placeholder="机器人Webhook地址"
                            ></b-form-input>

                            <b-form-input
                                v-model="dingConfig.sign"
                                class="mb-2"
                                placeholder="加签密钥"
                            ></b-form-input>

                        </b-form>

                        <small class="form-text text-muted"><code>目前已实现了加签方式的推送, 建议开启加签</code></small>

                        <button type="button" class="btn btn-danger mt-2 mr-2" @click="validDingTalk">
                            校验
                        </button>

                        <button type="button" class="btn btn-primary mt-2" @click="bindDingTalk">
                            绑定
                        </button>

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
                            这两个GET参数来自定义，其中userId表示要推送的QQ号，groupId表示要推送的群号码，添加了些许灵活性</p>
                        <b-form-input
                            v-model="this.serverUrl+ '/send/' + user.skey+ '?userId=13239686'"
                            type="text"
                            class="form-control"
                            disabled
                        ></b-form-input>

                        <p class="mt-2"><code>微信消息推送</code>，只需要向以下URL发一个GET或者POST请求：</p>
                        <b-form-input
                            v-model="this.serverUrl+ '/wx/' + user.skey"
                            type="text"
                            class="form-control"
                            disabled
                        ></b-form-input>

                        <p class="mt-2"><code>Telegram推送</code>: 向以下地址发送一个GET或者POST请求: </p>
                        <b-form-input
                            v-model="this.serverUrl+ '/tg/' + user.skey"
                            type="text"
                            class="form-control"
                            disabled
                        ></b-form-input>

                        <p class="mt-2">他们都只接受一个参数 <code>c</code> 表示 <code>content 内容</code>：</p>
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

                        <p class="mt-2"><code>企业微信消息推送</code>: 你需要向以下URL地址发送POST请求(<code>仅接受POST请求</code>)：</p>
                        <b-form-input
                            v-model="this.serverUrl+ '/ww/' + user.skey"
                            type="text"
                            class="form-control"
                            disabled
                        ></b-form-input>
                        <p class="mt-2 text-danger">企业微信推送的请求参数可参考<strong>
                            <router-link :to="{'name': 'Docs'}">说明文档</router-link>
                        </strong></p>

                        <p class="mt-2"><code>钉钉群消息推送</code>: 你需要向以下URL地址发送POST请求(<code>仅接受POST请求</code>)：</p>
                        <b-form-input
                            v-model="this.serverUrl+ '/ding/' + user.skey"
                            type="text"
                            class="form-control"
                            disabled
                        ></b-form-input>
                        <p class="mt-2 text-danger">钉钉群消息推送的请求参数可参考<strong>
                            <router-link :to="{'name': 'Docs'}">说明文档</router-link>
                        </strong></p>


                        <p class="mt-2"><code>邮箱消息推送</code>: 需要向以下URL发一个GET或者POST请求：</p>
                        <b-form-input
                            v-model="this.serverUrl+ '/email/' + user.skey"
                            type="text"
                            class="form-control"
                            disabled
                        ></b-form-input>
                        <p class="mt-2">邮箱消息推送接收两个参数，分别是 <code>t</code> 和 <code>c</code> 表示 <code>title 标题</code> 和
                            <code>content 内容</code></p>
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
                            <a href="#" @click="login">登陆</a>
                            按钮以尝试.
                        </p>

                        <p>
                            <b-button variant="outline-danger" size="lg" class="mr-2 mb-2" @click="loginBy('qq')">
                                <img src='../assets/qq_new.png' class="icon-size-std pr-2" alt="">QQ账号登录
                            </b-button>
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
        <b-modal id="modal-login" centered title="请选择登陆方式" hide-footer>
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
            isLogin: false, //检测是否登录 false没有登陆

            accountOption: [
                {text: '2277671372', value: '2277671372'},
                {text: '997539145', value: '997539145'},
                {text: '2320552376', value: '2320552376'},
                {text: '1985824980', value: '1985824980'},
                {text: '2658061109', value: '2658061109'},
                {text: '2801124605', value: '2801124605'},
                {text: '2690674321', value: '2690674321'},
            ],
            accountGroupOption: [
                {text: '2277671372', value: '2277671372'},
                {text: '997539145', value: '997539145'},
                {text: '2320552376', value: '2320552376'},
                {text: '1985824980', value: '1985824980'},
                {text: '2658061109', value: '2658061109'},
                {text: '2801124605', value: '2801124605'},
                {text: '2690674321', value: '2690674321'},
            ],
            accountOfflineList: [
                '228346469', '964627404', '723860385', '1498598914', '2292066393', '3150058140',
                '1136423131', '2046118436', '371365873'
            ],
            accountShareUserList: [
                'W4j1e', '余生安好'
            ],

            // 企业微信相关
            corpSelected: 0,
            corpListOptions: [],
            wwBindConfig: {
                user: {},
                app: {}
            },

            // 微信推送相关
            openWxPusher: false,//是否开启微信推送
            wxPusherImg: "",//获得二维码地址
            wxPusherShowBindResult: false,
            wxPusherUid: "",

            // base 用户信息相关
            user: {},

            //邮箱推送相关
            emailConfig: {
                host: "",
                port: "",
                username: "",
                password: "",
                from: "",
                to: ""
            },

            // tg推送相关
            tgConfig: {},

            // qq推送相关
            qqConfig: {},

            // 钉钉推送相关
            dingConfig: {},

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
        bindEmail() {
            let token = localStorage.getItem("token");
            let header = {token: token};
            this.emailConfig.port = parseInt(this.emailConfig.port)
            this.$api
                .post(
                    this.serverUrl + "/bind/email", this.emailConfig, {headers: header}
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
                                this.$swal.fire({
                                    position: 'top-end',
                                    icon: 'error',
                                    title: "绑定失败,请重试: " + data.message,
                                    showConfirmButton: false,
                                    timer: 5000
                                });
                            } else {
                                this.wxPusherShowBindResult = true;
                                this.$swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: "绑定成功!",
                                    showConfirmButton: false,
                                    timer: 5000
                                });
                            }
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
                        //清空localStorage
                        console.log(error);
                        this.isLogin = false;
                        localStorage.clear();
                    });
            }
        },
        bindTelegram() {
            let token = localStorage.getItem("token");
            let header = {token: token};
            this.tgConfig.chat_id = parseInt(this.tgConfig.chat_id);
            this.$api
                .post(
                    this.serverUrl + "/bind/telegram", this.tgConfig, {headers: header}
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
        bindDingTalk() {
            let token = localStorage.getItem("token");
            let header = {token: token};
            this.$api
                .post(
                    this.serverUrl + "/bind/dingtalk", this.dingConfig, {headers: header}
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
        validEmail() {
            let token = localStorage.getItem("token");
            let header = {token: token};
            this.$api
                .get(
                    this.serverUrl + "/valid/email", {headers: header}
                )
                .then((response) => {
                    let data = response.data;
                    if (response.data.code !== 200) {
                        this.$swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: "校验失败: " + data.message,
                            showConfirmButton: false,
                            timer: 5000
                        });
                        return
                    }
                    this.$swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: "校验成功，请查收递投测试邮件",
                        showConfirmButton: false,
                        timer: 5000
                    });
                })
                .catch((error) => {
                    //绑定失败
                    this.$swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: "校验失败: " + error.msg,
                        showConfirmButton: false,
                        timer: 5000
                    });
                });
        },
        validWework() {
            let content = {
                "title": "测试消息",
                "desc": "当你看到这条消息,说明CoolPush校验已通过",
                "href": "https://cp.xuthus.cc",
                "btntxt": "了解更多"
            };
            this.$api
                .post(this.serverUrl + '/ww/' + this.user.skey + '?type=1', content, {headers: {"Content-type": "application/json"}})
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
        validTelegram() {
            let token = localStorage.getItem("token");
            let header = {token: token};
            this.$api
                .get(this.serverUrl + '/valid/telegram', {headers: header})
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
        validDingTalk() {
            let token = localStorage.getItem("token");
            let header = {token: token};
            this.$api
                .get(this.serverUrl + '/valid/dingtalk', {headers: header})
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
                            this.$swal.fire({
                                position: 'top-end',
                                icon: 'error',
                                title: "获取二维码失败: " + data.message,
                                showConfirmButton: false,
                                timer: 5000
                            });
                        }
                    })
                    .catch((error) => {
                        console.log("重置结果", error);
                        this.$swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: "获取二维码失败: " + error.msg,
                            showConfirmButton: false,
                            timer: 5000
                        });
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
                    let data = response.data;
                    if (data.code === 200) {
                        this.wxPusherUid = '';
                        this.$swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: "取消绑定成功!",
                            showConfirmButton: false,
                            timer: 5000
                        });
                    } else {
                        this.$swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: "取消绑定失败: " + data.message,
                            showConfirmButton: false,
                            timer: 5000
                        });
                    }
                })
                .catch((error) => {
                    this.$swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: "取消绑定失败: " + error.msg,
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
        wwJoinSubmit() {
            if (this.wwBindConfig.user.user_id.toLowerCase() === "@all") {
                this.$swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: "非法参数 @all",
                    showConfirmButton: false,
                    timer: 5000
                });
                return
            }

            let token = localStorage.getItem("token");
            let header = {token: token};
            this.$api
                .get(
                    this.serverUrl + "/wework/join?appId=" +
                    this.corpSelected + "&userId=" +
                    this.wwBindConfig.user.user_id,
                    {headers: header}
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
        wwBindSubmit() {
            if (this.wwBindConfig.user.user_id.toLowerCase() === "@all") {
                this.$swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: "非法参数: @all",
                    showConfirmButton: false,
                    timer: 5000
                });
                return;
            }

            let token = localStorage.getItem("token");
            this.wwBindConfig.app.agent_id = parseInt(this.wwBindConfig.app.agent_id)
            this.$api
                .post(this.serverUrl + '/wework/bind?userId=' + this.wwBindConfig.user.user_id, this.wwBindConfig.app,
                    {headers: {"Content-type": "application/json", token: token}})
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
        getJoinLink(id) {
            for (let i = 0; i < this.corpListOptions.length; i++) {
                if (this.corpListOptions[i].value === id) {
                    return this.corpListOptions[i]
                }
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
                        this.wxPusherUid = defaultValue(data.data.wechat_config).wxPusherUid;
                        this.emailConfig = defaultValue(data.data.email_config);

                        this.wwBindConfig.user = defaultValue(data.data.wework_user_config);
                        this.wwBindConfig.app = defaultValue(data.data.wework_app_config);
                        this.corpSelected = defaultValue(data.data.wework_user_config).app_id;
                        this.tgConfig = defaultValue(data.data.telegram_config);
                        this.dingConfig = defaultValue(data.data.ding_talk_config);
                    }
                })
                .catch((error) => {
                    //清空localStorage
                    this.$router.push({name: "Callback", query: {error: error}});
                });

            this.$api
                .get(this.serverUrl + "/wework/list", {headers: header})
                .then((response) => {
                    let data = response.data;
                    if (data.code === 200) {
                        for (let i = 0; i < data.data.length; i++) {
                            this.corpListOptions.push({
                                value: data.data[i].id,
                                text: data.data[i].corp_name,
                                link: data.data[i].join_link
                            })
                        }
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

.icon-color-spec-qq {
    background-color: #45BCF8;
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
