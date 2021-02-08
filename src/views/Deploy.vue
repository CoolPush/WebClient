<template>
	<div class="Deploy">
		<div class="jumbotron bg-dark text-white mb-0 text-center">
			<div class="container main-body">
				<h1 class="display-3 text-light">Cool Push</h1>
				<div class="lead mb-3">QQ消息推送机器人私有化部署.</div>
				<div class="mt-4">
					<b-button variant="primary" class="mr-2" href="https://images.xuthus.cc/coolpush/coolpush_windows_amd64.exe">Windows_amd64</b-button>
					<b-button variant="primary" class="mr-2" href="https://images.xuthus.cc/coolpush/coolpush_linux_amd64">Linux_amd64</b-button>
					<b-button variant="primary" class="mr-2" href="https://images.xuthus.cc/coolpush/coolpush_arm64">Arm64</b-button>
				</div>
				<p class="mt-4">说明: 机器人修改自 <a href="https://github.com/Mrs4s/go-cqhttp">go-cqhttp</a> , 已魔改机器人可自动通过好友申请 , 自动通过入群申请</p>

                <p>如何使用: 下载本程序,第一次执行时,会生成配置文件,修改配置文件,填写好QQ号码和密码,配置HTTP请求的参数.<br />运行后,<strong class="text-danger">防火墙/服务器安全组</strong>放行配置好的端口,默认是5700</p>
				<p>更详细的教程可以参考 <a href="https://docs.go-cqhttp.org/guide/quick_start.html#%E5%9F%BA%E7%A1%80%E6%95%99%E7%A8%8B">go-cqhttp</a> 使用教程.</p>
			</div>

			<b-button variant="primary" class="mt-4"><router-link :to="{name: 'Home'}" class="text-white">返回首页</router-link></b-button>
		</div>
	</div>
</template>

<style>
html,body,#app,.Deploy,.jumbotron{

	height: 100%;

}
</style>