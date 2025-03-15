<template>
    <view>
        <view v-if="isLoad === null" class="margin-top load notexist text-l load-project"></view>
        <view v-if="isLoad === false" class="margin-top load loading text-l load-project"></view>

        <view v-if="isLoad" class="main padding-project">
            <view class="article-box">
                <view class="form-box card-project shadow-project">
                    <view class="form-group">
                        <view class="title text-cut">{{ meet.MEET_TITLE }}</view>
                    </view>
                    <view class="form-group" @tap="url" data-type="back">
                        <view class="title text-cut" style="padding-right: 0">
                            <text class="icon-calendar margin-right-xxs"></text>
                            {{ meet.dayDesc }}
                            <text class="tag mid bg-orange light round margin-right">更改时段</text>
                        </view>
                    </view>
                </view>
            </view>

            <view class="article-box">
                <!-- form content begin -->
                <view class="form-box card-project shadow-project margin-top">
                    <view class="form-group">
                        <view class="line-desc">
                            请您填写资料，带
                            <text class="text-red text-bold">*</text>
                            号为必填项
                        </view>
                    </view>
                    <cmpt-form-show
                        :isConfirm="true"
                        id="form-show"
                        mark="form-show-join"
                        :forms="meet.myForms"
                        :isCacheMatch="true"
                        :fields="meet.MEET_JOIN_FORMS"
                        @submit="bindSubmitCmpt($event, { tagId: 'form-show' })"
                    />
                </view>
                <!-- form content END. -->
            </view>

            <button @tap="bindCheckTap" class="btn-base btn-project" style="margin-bottom: 100rpx">提交预约</button>
        </view>
    </view>
</template>

<script>
import cmptFormShow from '@/cmpts/public/form/form_show/form_show_cmpt';
const cloudHelper = require('../../../../../helper/cloud_helper.js');
const pageHelper = require('../../../../../helper/page_helper.js');
const MeetBiz = require('../../../biz/meet_biz.js');
const ProjectBiz = require('../../../biz/project_biz.js');
const setting = require('../../../../../setting/setting.js');
const PassportBiz = require('../../../../../comm/biz/passport_biz.js');
export default {
    components: {
        cmptFormShow
    },
    data() {
        return {
            isLoad: false,
            formsList: [],

            meet: {
                MEET_TITLE: '',
                myForms: '',
                MEET_JOIN_FORMS: ''
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
        if (!pageHelper.getOptions(this, options, 'timeMark')) {
            return;
        }
        if (!(await PassportBiz.loginMustBackWin(this))) {
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
    onPageScroll: function (e) {
        // 回页首按钮
        pageHelper.showTopBtn(e, this);
    },
    methods: {
        loadDetailFun: async function () {
            let id = this.id;
            if (!id) {
                return;
            }
            let timeMark = this.timeMark;
            if (!timeMark) {
                return;
            }
            let params = {
                meetId: id,
                timeMark
            };
            let opt = {
                title: 'bar'
            };
            let meet = await cloudHelper.callCloudData('meet/detail_for_join', params, opt);
            if (!meet) {
                this.setData({
                    isLoad: null
                });
                return;
            }
            this.setData({
                isLoad: true,
                meet
            });
        },

        url: function (e) {
            pageHelper.url(e, this);
        },

        bindDel: function (e) {
            let idx = pageHelper.dataset(e, 'idx');
            let cb = () => {
                let formsList = this.formsList;
                formsList.splice(idx, 1);
                this.setData({
                    formsList
                });
            };
            pageHelper.showConfirm('确认删除该预约人信息?', cb);
        },

        bindSubmitCmpt: async function (e, _dataset) {
            /* ---处理dataset begin--- */
            this.handleDataset(e, _dataset);
            /* ---处理dataset end--- */
            let formsList = [];
            formsList = [e.detail];
            if (formsList.length == 0) {
                return pageHelper.showModal('请先填写资料');
            }
            let callback = async () => {
                try {
                    let opts = {
                        title: '提交中'
                    };
                    let params = {
                        meetId: this.id,
                        timeMark: this.timeMark,
                        formsList
                    };
                    await cloudHelper.callCloudSumbit('meet/join', params, opts).then((res) => {
                        let content = '预约成功！';
                        uni.showModal({
                            title: '温馨提示',
                            showCancel: false,
                            content,
                            success() {
                                let ck = () => {
                                    if (setting.IS_SUB) {
                                        uni.redirectTo({
                                            url: pageHelper.fmtURLByPID('/pages/meet/my_join_list/meet_my_join_list')
                                        });
                                    } else {
                                        uni.reLaunch({
                                            url: pageHelper.fmtURLByPID('/pages/meet/my_join_list/meet_my_join_list')
                                        });
                                    }
                                };
                                ck();
                            }
                        });
                    });
                } catch (err) {
                    console.log('CatchClause', err);
                    console.log('CatchClause', err);
                    console.log(err);
                }
            };
            callback();
        },

        bindCheckTap: async function (e) {
            this.zpSelectComponent('#form-show').checkForms();
        }
    }
};
</script>
<style>
@import '../../../../../style/public/detail.css';
@import '../../../style/skin.css';

.form-group .line-desc {
    font-size: 28rpx;
    text-align: center;
    width: 100%;
    color: #666;
}

.submit-line {
    width: 100%;
}

.user-list {
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 2rpx dashed #ddd;
}

.user-list .left {
    width: 280rpx;
    font-size: 28rpx;
}

.user-list .right {
    display: flex;
    width: 190rpx;
    justify-content: flex-end;
}

.user-list .right > view {
    font-size: 24rpx;
    padding: 8rpx 15rpx;
    border-radius: 10rpx;
}

.add-line {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 40rpx 60rpx;
}

.add-line .line {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 15rpx;
    font-size: 30rpx;
    font-weight: bold;
    border-radius: 50rpx;
    border: 2rpx dashed #ccc;
    color: #666;
    background-color: #f8f8f8;
}
</style>
