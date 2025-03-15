<template>
    <view>
        <view v-if="isLoad === null" class="margin-top load notexist text-l load-project"></view>
        <view v-if="isLoad === false" class="margin-top load loading text-l load-project"></view>

        <block v-if="isLoad">
            <view class="main padding-project">
                <view class="article-box margin-top-xs">
                    <!-- article content begin -->
                    <view class="article card-project shadow-project">
                        <view class="title">
                            <text :user-select="true">{{ news.NEWS_TITLE }}</text>
                        </view>
                        <view class="time">{{ news.NEWS_ADD_TIME }} {{ news.NEWS_CATE_NAME }}</view>

                        <block v-for="(item, index) in news.NEWS_CONTENT" :key="index">
                            <view class="content" v-if="item.type == 'text'">
                                <text :user-select="true">{{ item.val }}</text>
                            </view>

                            <view class="pics" v-if="item.type == 'img'">
                                <image
                                    @tap="url"
                                    data-type="img"
                                    :data-url="item.val"
                                    :show-menu-by-longpress="true"
                                    class="loading"
                                    mode="widthFix"
                                    :lazy-load="true"
                                    :src="item.val"
                                ></image>
                            </view>
                        </block>
                        <!-- article content end -->
                    </view>
                    <!-- article content end -->
                </view>
            </view>

            <cmpt-detail
                mode="mode1"
                :topBtnShow="topBtnShow"
                :oid="news._id"
                :cate="news.NEWS_CATE_NAME"
                :title="news.NEWS_TITLE"
                :cover="news.NEWS_PIC[0]"
                :qr="news.NEWS_QR"
                desc="查看详情"
                :bg="skin.PROJECT_COLOR"
            ></cmpt-detail>
        </block>
    </view>
</template>

<script>
import cmptDetail from '@/cmpts/biz/detail/detail_cmpt';
const cloudHelper = require('../../../../../helper/cloud_helper.js');
const pageHelper = require('../../../../../helper/page_helper.js');
const ProjectBiz = require('../../../biz/project_biz.js');
export default {
    components: {
        cmptDetail
    },
    data() {
        return {
            isLoad: false,

            news: {
                NEWS_TITLE: '',
                NEWS_ADD_TIME: '',
                NEWS_CATE_NAME: '',
                NEWS_CONTENT: [],
                _id: '',
                NEWS_PIC: '',
                NEWS_QR: ''
            },

            topBtnShow: 0,

            skin: {
                PROJECT_COLOR: ''
            }
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        ProjectBiz.initPage(this);
        if (!pageHelper.getOptions(this, options)) {
            return;
        }
        this.loadDetailFun();
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: async function () {
        await this.loadDetailFun();
        uni.stopPullDownRefresh();
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},
    onPageScroll: function (e) {
        // 回页首按钮
        pageHelper.showTopBtn(e, this);
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (res) {
        return {
            title: this.news.NEWS_TITLE,
            imageUrl: this.news.NEWS_PIC[0]
        };
    },
    methods: {
        loadDetailFun: async function () {
            let id = this.id;
            if (!id) {
                return;
            }
            let params = {
                id
            };
            let opt = {
                title: 'bar'
            };
            let news = await cloudHelper.callCloudData('news/view', params, opt);
            if (!news) {
                this.setData({
                    isLoad: null
                });
                return;
            }
            this.setData({
                isLoad: true,
                news
            });
        },

        url: function (e) {
            pageHelper.url(e, this);
        }
    }
};
</script>
<style>
@import '../../../../../style/public/detail.css';
@import '../../../style/skin.css';
</style>
