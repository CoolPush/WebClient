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
                    <h3 class="text-primary">功能</h3>
                    <p>QQ消息推送服务: <code>添加推送机器人QQ号为好友</code>,调用接口即可通过推送机器人将指定消息体推送到你的QQ上</p>

                    <h3 class="text-primary">创作缘由</h3>
                    <p>辅助 <a href="https://func.xuthus.cc" target="_blank">func.xuthus.cc</a> 完成消息推送</p>

                    <h3 class="text-primary">使用步骤</h3>
                    <p>通过 Github 授权登录网站</p>
                    <p>自动获得 <code>Skey</code></p>
                    <p>绑定接收消息的QQ账号,并指派推送机器人</p>
                    <p>绑定的QQ账号添加机器人为好友</p>
                    <p>调用接口发送请求</p>

                    <h3 class="text-primary">推送失败/邀请机器人入群失败</h3>
                    <p><code>删除机器人为好友,并重新添加</code></p>
                    <p>由于早期机器人添加好友均为单项好友关系,目前机器人升级,导致添加好友和邀请好友入群失败.删除机器人好友,并重新添加即可,机器人将响应你的请求,并添加你为好友,建立双向好友关系.</p>

                    <h3 class="text-primary">企微推送
                        <b-badge variant="danger">New</b-badge>
                    </h3>
                    <p>目前企微推送支持四种消息格式，且只允许使用POST方式推送。推送格式如下：</p>
                    <p>(一)普通消息推送：</p>
                    <p>url: <code>https://push.xuthus.cc/ww/skey</code></p>
                    <p>body: <code>随便什么数据都可以，但是敏感词会过滤掉</code></p>

                    <p>(二)文本卡片：</p>
                    <p>url: <code>https://push.xuthus.cc/ww/skey?type=1</code></p>
                    <p>body: <code>{
                        "title": "你好测试",
                        "desc": "测试文本卡片",
                        "href": "https://cp.xuthus.cc",
                        "btntxt": "查看更多"
                        }</code></p>

                    <p>(三)图文消息：</p>
                    <p>url: <code>https://push.xuthus.cc/ww/skey?type=2</code></p>
                    <p>body: <code>{
                        "title": "你好测试",
                        "desc": "测试文本卡片",
                        "href": "https://cp.xuthus.cc",
                        "pic": "https://xuthus.cc/images/Photo_0411_1a.jpg"
                        }</code></p>

                    <p>(四)Markdown消息：</p>
                    <p>url: <code>https://push.xuthus.cc/ww/skey?type=3</code></p>
                    <p>body: <code>[这是一个链接](http://work.weixin.qq.com/api/doc)</code></p>

                    <p>如何绑定企业微信UserId？</p>
                    <p>自定义企业微信推送配置的，进入企业微信通讯录，查看个人信息-> <code>"帐号"</code></p>
                    <p>加入酷推企业的，在企业微信中，找到 <code>酷推</code> 应用，回复 "获取用户ID" 即可。</p>
                    <p>加入第三方企业的，咨询该企业管理员获取。</p>

                    <h3 class="text-primary">推送增强
                        <b-badge variant="danger">由于滥用,[图片推送][json][xml]通道已关闭</b-badge>
                    </h3>
                    <p>目前QQ机器人推送支持发送 <code>图片</code>、<code>群内@</code>、<code>表情</code>，使用方式：</p>
                    <p>发送图片：<code>@image=可访问的图片地址@</code> ,
                        例如：<code>@image=https://xuthus.cc/images/Photo_0411_1a.jpg@</code></p>
                    <p>发送表情：<code>@face=表情ID@</code> , 例如：<code>@face=176@</code> , 表情ID可从此处寻找：<a
                        href="https://github.com/richardchien/coolq-http-api/wiki/%E8%A1%A8%E6%83%85-CQ-%E7%A0%81-ID-%E8%A1%A8"
                        target="_blank">github</a></p>
                    <p>群消息@：<code>@at=群成员QQ号@</code> , 例如：<code>@at=13239686@</code>, 当需要@全体成员时 只需要
                        <code>@at=all@</code></p>
                    <p>自定义xml：<code>@xml=xml格式的数据@</code> , 例如：<br/><code>@xml=&lt;?xml version='1.0' encoding='UTF-8'
                        standalone='yes' ?&gt;&lt;msg serviceID="2" templateID="1" action="web" brief="&#91;分享&#93; 十年"
                        sourceMsgId="0" url="http://music.163.com/m/song/409650368" flag="0" adverSign="0"
                        multiMsgFlag="0" &gt;&lt;item layout="2"&gt;&lt;audio
                        cover="http://p2.music.126.net/g-Qgb9ibk9Wp_0HWra0xQQ==/16636710440565853.jpg?param=90y90"
                        src="https://music.163.com/song/media/outer/url?id=409650368.mp3" /&gt;&lt;title&gt;十年&lt;/title&gt;&lt;summary&gt;黄梦之&lt;/summary&gt;&lt;/item&gt;&lt;source
                        name="网易云音乐" icon="https://pic.rmb.bdstatic.com/911423bee2bef937975b29b265d737b3.png"
                        url="http://web.p.qq.com/qqmpmobile/aio/app.html?id=1101079856" action="app"
                        a_actionData="com.netease.cloudmusic" i_actionData="tencent100495085://" appid="100495085" /&gt;&lt;/msg&gt;@</code>
                    </p>
                    <p>自定义json：<code>@json=json格式的数据@</code> , 注意中间不能有换行符 , 例如：<br/> <code>@json={"app":"com.tencent.miniapp","desc":"","view":"notification","ver":"0.0.0.1","prompt":"[应用]","appID":"","sourceName":"","actionData":"","actionData_A":"","sourceUrl":"","meta":{"notification":{"appInfo":{"appName":"全国疫情数据统计","appType":4,"appid":1109659848,"iconUrl":"http:\/\/gchat.qpic.cn\/gchatpic_new\/719328335\/-2010394141-6383A777BEB79B70B31CE250142D740F\/0"},"data":[{"title":"确诊","value":"80932"},{"title":"今日确诊","value":"28"},{"title":"疑似","value":"72"},{"title":"今日疑似","value":"5"},{"title":"治愈","value":"60197"},{"title":"今日治愈","value":"1513"},{"title":"死亡","value":"3140"},{"title":"今**亡","value":"17"}],"title":"中国加油，武汉加油","button":[{"name":"病毒：SARS-CoV-2，其导致疾病命名
                        COVID-19","action":""},{"name":"传染源：新冠肺炎的患者。无症状感染者也可能成为传染源。","action":""}],"emphasis_keyword":""}},"text":"","sourceAd":""}@</code>
                    </p>
                    <p>音乐分享：<code>@music=[type=custom,url=点击时的跳转链接地址,audio=音频地址,title=音乐标题,image=分享封面图片地址]@</code>
                    </p>
                    <p>例如：<code>@music=[type=custom,title=测试,url=https://c.y.qq.com/base/fcgi-bin/u?__=CY6V4b,image=https://xuthus.cc/images/Photo_0411_1a.jpg]@</code>
                    </p>
                    <p>下图为音乐分享对应的参数说明</p>
                    <b-img src="https://images.xuthus.cc/images/a4ZE03A_音乐分享.png" fluid></b-img>

                    <h3 class="text-primary">配合valine进行推送</h3>
                    <div class="code">
<pre>
//拷贝如下代码，将其放置于加载valine组件的layout中

//检测推送 Skey替换
var pushLink = "https://push.xuthus.cc/send/Skey";
//推送的网站名称
var siteName = "";

var valineButton = document.getElementsByClassName("vsubmit vbtn")[0];
var title = siteName + "上又有新评论啦~!\n";

function send_valine() {
//获取元素信息
var pagename = document.title;
var pageurl = document.URL;
var pushtime = new Date();
var vnick = document.getElementsByClassName("vnick vinput")[0].value;
var vmail = document.getElementsByClassName("vmail vinput")[0].value;
var vlink = document.getElementsByClassName("vlink vinput")[0].value;
var veditor = document.getElementsByClassName("veditor vinput")[0].value;
content =
    title +
    "昵称：" + vnick +
    "\n邮箱：" + vmail +
    "\n网站地址：" + vlink +
    "\n文章标题：" + pagename +
    "\n评论内容：" + veditor +
    "\n文章链接：" + pageurl +
    "\n评论时间" + pushtime.toLocaleString() + "\n";
var httpRequest = new XMLHttpRequest(); //第一步：创建需要的对象
httpRequest.open("POST", pushLink, true); //第二步：打开连接
httpRequest.setRequestHeader(
    "Content-type",
    "application/json"
); //设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
httpRequest.send(content); //发送请求 将情头体写在send中
}

valineButton.onclick = send_valine;//点击事件
</pre>
                    </div>
                    <h3 class="text-primary">推送格式化数据</h3>
                    <div class="code">
<pre>
//js 发起请求
var httpRequest = new XMLHttpRequest(); //第一步：创建请求对象
httpRequest.open("POST", "https://push.xuthus.cc/send/Skey", true); //第二步：打开连接
httpRequest.setRequestHeader(
  "Content-type",
  "application/json"
); //设置请求头
httpRequest.send("标题 \n 内容:你好我是正文"); //发送请求

//python 发起请求
import requests
url = "https://push.xuthus.cc/send/Skey"
data = "标题 \n 内容:你好我是正文"
res = requests.post(url=url,data=data)

//php 发起请求
$url="https://push.xuthus.cc/send/Skey";
$content = "标题 \n 内容:你好我是正文";
$length = strlen($content);
$options = array(
'http' => array(
'method' => 'POST',
'header' =>
"Content-type: application/json; charset=utf-8" .
"Content-length: $length",
'content' => $content
)
);
echo file_get_contents($url, false, stream_context_create($options));

//Golang 发起请求
var content = "标题 \n 内容:你好我是正文"
client := &http.Client{}
req, _ := http.NewRequest("POST", "https://push.xuthus.cc/send/Skey", strings.NewReader(content))
_,_ = client.Do(req)

//接收到的数据
标题
内容:你好我是正文

//说明
使用 \n 进行换行
</pre>
                    </div>

                    <h3 class="text-primary">使用限制</h3>
                    <p>当前使用单日限制: <del>1万次</del> 无限制</p>

                    <h3 class="text-primary">推送涉违规?</h3>
                    <p>系统内置敏感词过滤库(可能误伤),推送被查出敏感词次数超过规定阈值,将封停账号,使用且珍惜,不要推送违规内容</p>

                    <h3 class="text-primary">同类作品</h3>
                    <p><a href="https://sc.ftqq.com/" target="_blank">Server酱</a> | <a href="https://qmsg.zendee.cn/"
                                                                                       target="_blank">Qmsg酱</a></p>

                    <h3 class="text-primary">反馈</h3>
                    <p><code
                    >交流QQ群:<a
                        target="_blank"
                        href="//shang.qq.com/wpa/qunwpa?idkey=2c22cb324dc36e260043185618cbe8763ed63dd5a985ee5e181e20ba2390e78a"
                    >824187964</a
                    ></code
                    ></p>
                    <h3 class="text-primary">费用</h3>
                    <p>免费使用,暂不接受打赏赞助</p>

                    <h3 class="text-primary">免责条款</h3>
                    <p>当您使用本网站服务时</p>
                    <ul>
                        <li><code>禁止</code>推送传播任何非法的、含有侮辱性的、具威胁性的任何法律禁止的信息。</li>
                        <li>使用本站服务即默认同意本网站平台机器人账号有通过平台API功能被动<code>向你发起消息推送的权利</code> 。</li>
                        <li>使用本站服务即默认同意本网站保留有对你在本网站账号的管理权利(包括回收账号)。</li>
                        <li>平台不会主动向你发起消息推送、你的一切活动均为主观操作、与平台无关。</li>
                        <li>包含敏感信息的推送将被上报采集、供取证使用。</li>
                    </ul>
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
    name: 'Docs',
    data() {
        return {}
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

footer .fa-heart {
    padding-left: 4px;
    padding-right: 4px;
    color: red;
}
</style>
