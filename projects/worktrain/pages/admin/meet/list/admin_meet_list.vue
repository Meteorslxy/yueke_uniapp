<template>
    <view>
        <block v-if="isAdmin && isLoad">
            <cmpt-comm-list
                source="admin"
                :pulldownType="['modal', 'modal', 'modal']"
                type="admin-meet"
                :search="search || ''"
                :_menus="sortMenus"
                :_items="sortItems"
                route="admin/meet_list"
                sortMenusDefaultIndex="0"
                topBottom="50"
                placeholder="搜索标题"
                @list="bindCommListCmpt"
            >
                <view slot="searchEnd">
                    <button @tap="url" data-url="../add/admin_meet_add" class="btn radius bg-admin text-white margin-right-s">
                        <text class="icon-roundadd margin-right-xxs"></text>
                        创建老师&预约
                    </button>
                </view>

                <!-- List Begin -->
                <view class="admin-comm-list">
                    <view v-if="dataList && dataList.total" class="load text-grey">共有{{ dataList.total }}条符合条件记录</view>

                    <view class="item" v-for="(item, index) in dataList.list" :key="index">
                        <view class="no">{{ index + 1 }}</view>

                        <view class="header">
                            <view class="left text-cut">
                                <text v-if="item.MEET_ORDER == 0" class="text-black" style="font-weight: normal; font-size: 24rpx">[置顶]</text>
                                <text v-if="item.MEET_VOUCH == 1" class="text-black margin-right-xxs" style="font-weight: normal; font-size: 24rpx">[首页推荐]</text>
                                {{ item.MEET_TITLE }}
                            </view>
                            <view class="right" @tap="bindScanTap" :data-id="item._id" :data-title="item.MEET_TITLE">
                                <text class="icon-scan"></text>
                            </view>
                        </view>

                        <view class="info">
                            <view class="info-item">
                                <view class="title">状态</view>
                                <view class="mao">：</view>
                                <view class="content">
                                    <text v-if="item.MEET_STATUS == 0" class="text-grey">未启用</text>
                                    <text v-else-if="item.MEET_STATUS == 1" class="text-green">使用中</text>
                                    <text v-else-if="item.MEET_STATUS == 9" class="text-orange">停止 (用户可见)</text>
                                    <text v-else-if="item.MEET_STATUS == 10" class="text-red">已关闭 (用户不可见)</text>
                                </view>
                            </view>

                            <view v-if="cateIdOptions.length > 1" class="info-item">
                                <view class="title">分类</view>
                                <view class="mao">：</view>
                                <view class="content">【{{ item.MEET_CATE_NAME }}】</view>
                            </view>

                            <view class="info-item">
                                <view class="title">排序号</view>
                                <view class="mao">：</view>
                                <view class="content">
                                    {{ item.MEET_ORDER }}
                                    <text class="margin-left-xxs text-grey">(小的先显示)</text>
                                </view>
                            </view>

                            <view class="info-item">
                                <view class="title">排期</view>
                                <view class="mao">：</view>
                                <view :class="'content ' + (item.leaveDay == 0 ? 'text-grey' : '')">{{ item.leaveDay }}天可预约</view>
                            </view>

                            <view class="info-item">
                                <view class="title">修改</view>
                                <view class="mao">：</view>
                                <view class="content">{{ item.MEET_EDIT_TIME }}</view>
                            </view>

                            <view class="oprt">
                                <view @tap="url" :data-url="'../edit/admin_meet_edit?id=' + item._id" class="btn margin-right-s">
                                    <text class="icon-settings margin-right-xxs text-blue"></text>
                                    设置
                                </view>

                                <view @tap="bindRecordSelectTap" :data-id="item._id" :data-title="item.MEET_TITLE" class="btn margin-right-s">名单与核销</view>

                                <view @tap="bindStatusSelectTap" :data-id="item._id" class="btn margin-right-s">
                                    <text class="icon-cascades margin-right-xxs text-orange"></text>
                                    状态
                                </view>

                                <view @tap="bindMoreSelectTap" :data-id="item._id" :data-idx="index" :data-qr="item.MEET_QR" :data-title="item.MEET_TITLE" class="btn">更多..</view>
                            </view>
                        </view>
                    </view>
                </view>
                <!-- List END -->

                <!-- load begin -->

                <listLoadTpl compName="listLoadTpl" :data="{ skin: 'text-grey', dataList }"></listLoadTpl>
                <!-- load end -->
            </cmpt-comm-list>
        </block>
    </view>
</template>

<script>
import listLoadTpl from '../../../../../../tpls/public/list_load_tpl';
const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const MeetBiz = require('../../../../biz/meet_biz.js');
const AdminMeetBiz = require('../../../../biz/admin_meet_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
const projectSetting = require('../../../../public/project_setting.js');
export default {
    components: {
        listLoadTpl
    },
    data() {
        return {
            MEET_NAME: '',

            dataList: {
                total: '',
                list: []
            },

            search: '',
            cateIdOptions: '',
            sortItems: '',
            sortMenus: '',
            isLoad: false,
            isAdmin: ''
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        if (!AdminBiz.isAdmin(this)) {
            return;
        }
        uni.setNavigationBarTitle({
            title: projectSetting.MEET_NAME + '-管理'
        });
        this.setData({
            MEET_NAME: projectSetting.MEET_NAME
        });

        //设置搜索菜单
        await this.getSearchMenuFun();
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: async function () {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {},
    methods: {
        url: async function (e) {
            pageHelper.url(e, this);
        },

        bindCommListCmpt: function (e) {
            pageHelper.commListListener(this, e);
        },

        bindScanTap: function (e) {
            let meetId = pageHelper.dataset(e, 'id');
            let title = encodeURIComponent(pageHelper.dataset(e, 'title'));
            uni.navigateTo({
                url: '../scan/admin_meet_scan?meetId=' + meetId + '&title=' + title
            });
        },

        bindRecordSelectTap: async function (e) {
            let itemList = ['预约名单', '导出名单Excel文件', '管理员核销预约码'];
            let meetId = pageHelper.dataset(e, 'id');
            let title = encodeURIComponent(pageHelper.dataset(e, 'title'));
            uni.showActionSheet({
                itemList,
                success: async (res) => {
                    switch (res.tapIndex) {
                        case 0: {
                            //预约名单
                            uni.navigateTo({
                                url: '../record/admin_meet_record?meetId=' + meetId + '&title=' + title
                            });
                            break;
                        }
                        case 1: {
                            //导出
                            uni.navigateTo({
                                url: '../export/admin_join_export?meetId=' + meetId + '&title=' + title
                            });
                            break;
                        }
                        case 2: {
                            //核验
                            this.bindScanTap(e);
                            break;
                        }
                    }
                },
                fail: function (res) {}
            });
        },

        setSortFun: async function (e) {
            if (!AdminBiz.isAdmin(this)) {
                return;
            }
            let meetId = pageHelper.dataset(e, 'id');
            let sort = pageHelper.dataset(e, 'sort');
            if (!meetId) {
                return;
            }
            let params = {
                meetId,
                sort
            };
            try {
                await cloudHelper.callCloudSumbit('admin/meet_sort', params).then((res) => {
                    pageHelper.modifyListNode(meetId, this.dataList.list, 'MEET_ORDER', sort);
                    this.setData({
                        dataList: this.dataList
                    });
                    pageHelper.showSuccToast('设置成功');
                });
            } catch (err) {
                console.log('CatchClause', err);
                console.log('CatchClause', err);
                console.log(err);
            }
        },

        setVouchFun: async function (e) {
            if (!AdminBiz.isAdmin(this)) {
                return;
            }
            let id = pageHelper.dataset(e, 'id');
            let vouch = pageHelper.dataset(e, 'vouch');
            if (!id) {
                return;
            }
            let params = {
                id,
                vouch
            };
            try {
                await cloudHelper.callCloudSumbit('admin/meet_vouch', params).then((res) => {
                    pageHelper.modifyListNode(id, this.dataList.list, 'MEET_VOUCH', vouch);
                    this.setData({
                        dataList: this.dataList
                    });
                    pageHelper.showSuccToast('设置成功');
                });
            } catch (err) {
                console.log('CatchClause', err);
                console.log('CatchClause', err);
                console.log(err);
            }
        },

        bindMoreSelectTap: async function (e) {
            if (!AdminBiz.isAdmin(this)) {
                return;
            }
            let idx = pageHelper.dataset(e, 'idx');
            let order = this.dataList.list[idx].MEET_ORDER;
            let orderDesc = order == 0 ? '取消置顶' : '置顶';
            let vouch = this.dataList.list[idx].MEET_VOUCH;
            let vouchDesc = vouch == 0 ? '推荐到首页' : '取消首页推荐';
            let itemList = ['预览', orderDesc, vouchDesc, '生成专属二维码'];
            uni.showActionSheet({
                itemList,
                success: async (res) => {
                    switch (res.tapIndex) {
                        case 0: {
                            //预览
                            let meetId = pageHelper.dataset(e, 'id');
                            uni.navigateTo({
                                url: pageHelper.fmtURLByPID('/pages/meet/detail/meet_detail?id=' + meetId)
                            });
                            break;
                        }
                        case 1: {
                            //置顶
                            let sort = order == 0 ? 9999 : 0;
                            e.currentTarget.dataset['sort'] = sort;
                            await this.setSortFun(e);
                            break;
                        }
                        case 2: {
                            //上首页
                            vouch = vouch == 0 ? 1 : 0;
                            e.currentTarget.dataset['vouch'] = vouch;
                            await this.setVouchFun(e);
                            break;
                        }
                        case 3: {
                            //二维码
                            let title = encodeURIComponent(pageHelper.dataset(e, 'title'));
                            let qr = encodeURIComponent(pageHelper.dataset(e, 'qr'));
                            uni.navigateTo({
                                url: `../../setup/qr/admin_setup_qr?title=${title}&qr=${qr}`
                            });
                            break;
                        }
                    }
                },
                fail: function (res) {}
            });
        },

        bindStatusSelectTap: async function (e) {
            let itemList = ['启用', '停止预约 (用户可见)', '关闭 (用户不可见)', '删除'];
            let meetId = pageHelper.dataset(e, 'id');
            uni.showActionSheet({
                itemList,
                success: async (res) => {
                    switch (res.tapIndex) {
                        case 0: {
                            //启用
                            await this.setStatusFun(this, meetId, 1);
                            break;
                        }
                        case 1: {
                            //停止预约
                            await this.setStatusFun(this, meetId, 9);
                            break;
                        }
                        case 2: {
                            //关闭
                            await this.setStatusFun(this, meetId, 10);
                            break;
                        }
                        case 3: {
                            //删除
                            await this.delFun(this, meetId);
                            break;
                        }
                    }
                },
                fail: function (res) {}
            });
        },

        delFun: async function (that, meetId) {
            if (!AdminBiz.isAdmin(this)) {
                return;
            }
            if (!meetId) {
                return;
            }
            let params = {
                meetId
            };
            let callback = async function () {
                try {
                    let opts = {
                        title: '删除中'
                    };
                    await cloudHelper.callCloudSumbit('admin/meet_del', params, opts).then((res) => {
                        pageHelper.delListNode(meetId, that.data.dataList.list, '_id');
                        that.data.dataList.total--;
                        that.setData({
                            dataList: that.data.dataList
                        });
                        pageHelper.showSuccToast('删除成功');
                    });
                } catch (e) {
                    console.log('CatchClause', e);
                    console.log('CatchClause', e);
                    console.log(e);
                }
            };
            pageHelper.showConfirm('确认删除？删除不可恢复', callback);
        },

        setStatusFun: async function (that, meetId, status) {
            if (!AdminBiz.isAdmin(this)) {
                return;
            }
            if (!meetId) {
                return;
            }
            let params = {
                meetId,
                status
            };
            try {
                await cloudHelper.callCloudSumbit('admin/meet_status', params).then((res) => {
                    pageHelper.modifyListNode(meetId, that.data.dataList.list, 'MEET_STATUS', status, '_id');
                    that.setData({
                        dataList: that.data.dataList
                    });
                    pageHelper.showSuccToast('设置成功');
                });
            } catch (e) {
                console.log('CatchClause', e);
                console.log('CatchClause', e);
                console.log(e);
            }
        },

        getSearchMenuFun: async function () {
            let cateIdOptions = MeetBiz.getCateList();
            let sortItem1 = [
                {
                    label: '分类',
                    type: '',
                    value: ''
                }
            ];
            sortItem1 = sortItem1.concat(MeetBiz.getCateList());
            let sortItems = [sortItem1];
            if (sortItem1.length <= 2) {
                sortItems = [];
            }
            let sortMenus = [
                {
                    label: '全部',
                    type: '',
                    value: ''
                },
                {
                    label: '使用中',
                    type: 'status',
                    value: 1
                },
                {
                    label: '已停止',
                    type: 'status',
                    value: 9
                },
                {
                    label: '已关闭',
                    type: 'status',
                    value: 10
                },
                {
                    label: '首页推荐',
                    type: 'vouch',
                    value: 'vouch'
                },
                {
                    label: '置顶',
                    type: 'top',
                    value: 'top'
                }
            ];
            this.setData({
                search: '',
                cateIdOptions,
                sortItems,
                sortMenus,
                isLoad: true
            });
        }
    }
};
</script>
<style>
@import '../../../../../../style/public/admin.css';
@import '../../../../../../style/project/admin_list_style.css';

page {
    background-color: #f8f8f8;
}
</style>
