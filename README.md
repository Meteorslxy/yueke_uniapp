转换成微信小程序存在以下问题：

[ projects/worktrain/pages/default/index/default_index.json 文件内容错误] projects/worktrain/pages/default/index/default_index.json: ["usingComponents"]["menuTpl"]: "../../tpls/menu_tpl.vue"，在 C:/Users/liuxingyu/Desktop/TurboTrainning-main/TurboTrainning-main_uni/unpackage/dist/dev/mp-weixin/projects/worktrain/pages/tpls/menu_tpl.vue 路径下未找到组件



解决方法：打开在微信开发工具打开搜索
将     .vue"  替换成  " 即可



随后会遇到 xsml的问题
./projects/worktrain/pages/admin/index/login/admin_login.wxml
unexpected character `"`

> 1 | <view class="main-admin bg-admin"><view class="login shadow"><view class="pic""><text class="icon-settingsfill text-orange"></text></view><view class="hint">后台管理系统</view><view class="form-group margin-top"><view class="title">账号：</view><input placeholder="请输入管理员账号" maxlength="30" placeholder-class="phc" data-event-opts="{{[['input',[['__set_model',['','name','$event',[]]]]]]}}" value="{{name}}" bindinput="__e"/></view><view class="form-group"><view class="title">密码：</view><input placeholder="请输入管理员密码" maxlength="30" type="password" placeholder-class="phc" data-event-opts="{{[['input',[['__set_model',['','pwd','$event',[]]]]]]}}" value="{{pwd}}" bindinput="__e"/></view><view data-event-opts="{{[['tap',[['bindRememberTap',['$event']]]]]}}" class="form-group-pwd" bindtap="__e"><text class="{{[remember?'icon-squarecheckfill text-blue':'icon-square']}}"></text>记住密码</view><button data-event-opts="{{[['tap',[['bindLoginTap',['$event']]]]]}}" class="btn bg-admin margin-bottom" bindtap="__e">点击登录</button><view class="return text-grey">本系统仅限于系统管理员登录</view><view data-event-opts="{{[['tap',[['bindBackTap',['$event']]]]]}}" class="return text-grey" bindtap="__e"><text class="icon-back"></text>返回用户端</view></view><view class="foot-bottom"><cmpt-foot vue-id="23198a8c-1" data-com-type="wx" bind:__l="__l"></cmpt-foot></view></view>


按照要求将admin_login.wxml 和 work_login.wxml的  <view class="pic"">   多余的“ 删除 即可看到页面
