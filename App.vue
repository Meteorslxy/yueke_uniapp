<script>
const setting = require('./setting/setting.js');
// export default {
//     data() {
//         return {};
//     },
//     onLaunch: function (options) {
//         if (!wx.cloud) {
//             console.error('请使用 2.2.3 或以上的基础库以使用云能力');
//         } else {
//             wx.cloud.init({
//                 // env 参数说明：
//                 //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
//                 //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
//                 //   如不填则使用默认环境（第一个创建的环境）
//                 // env: 'my-env-id',
//                 env: setting.CLOUD_ID,
//                 traceUser: true
//             });
//         }
//         this.globalData = {};

//         // 用于自定义导航栏
//         uni.getSystemInfo({
//             success: (e) => {
//                 this.globalData.statusBarHeight = e.statusBarHeight;
//                 let capsule = uni.getMenuButtonBoundingClientRect();
//                 if (capsule) {
//                     this.globalData.customBarHeight = capsule.bottom + capsule.top - e.statusBarHeight;
//                     this.globalData.capsule = capsule;
//                 } else {
//                     this.globalData.customBarHeight = e.statusBarHeight + 50;
//                 }
//             }
//         });
//     },
//     globalData: {}
// };

export default {
    data() {
        return {};
    },
    onLaunch: function (options) {
        // 初始化 uniCloud
        if (!uniCloud) {
            console.error('请使用支持 uniCloud 的 HBuilderX 版本');
        } else {
            uniCloud.init({
                provider: 'aliyun', // 或 'tencent'
                spaceId: setting.CLOUD_ID, // 替换为你的云环境ID
                clientSecret: 'your-client-secret', // 如果需要
                traceUser: true
            });
        }

        // 初始化全局数据
        this.globalData = {};

        // 获取系统信息（用于自定义导航栏）
        this.initSystemInfo();
    },
    methods: {
        initSystemInfo() {
            uni.getSystemInfo({
                success: (e) => {
                    this.globalData.statusBarHeight = e.statusBarHeight;

                    // 获取胶囊按钮信息（仅微信小程序支持）
                    // #ifdef MP-WEIXIN
                    let capsule = uni.getMenuButtonBoundingClientRect();
                    if (capsule) {
                        this.globalData.customBarHeight = capsule.bottom + capsule.top - e.statusBarHeight;
                        this.globalData.capsule = capsule;
                    } else {
                        this.globalData.customBarHeight = e.statusBarHeight + 50;
                    }
                    // #endif

                    // 其他平台处理
                    // #ifndef MP-WEIXIN
                    this.globalData.customBarHeight = e.statusBarHeight + 44; // 默认导航栏高度
                    // #endif
                }
            });
        }
    },
    globalData: {}
};

</script>
<style>
@import './style/base/comm.css';
@import './style/public/project.css';
</style>
