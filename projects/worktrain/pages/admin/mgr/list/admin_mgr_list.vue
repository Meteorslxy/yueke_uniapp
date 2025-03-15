<template>
    <view>
        <block v-if="isAdmin && isLoad">
            <cmpt-comm-list
                source="admin"
                type="admin-mgr"
                :search="search || ''"
                :_menus="sortMenus"
                :_items="sortItems"
                route="admin/mgr_list"
                sortMenusDefaultIndex="0"
                topBottom="50"
                placeholder="搜索账号，姓名，手机"
                @list="bindCommListCmpt"
            >
                <view slot="searchEnd">
                    <button @tap="url" data-url="../add/admin_mgr_add" class="btn radius bg-admin text-white margin-right-s">
                        <text class="icon-roundadd margin-right-xxs"></text>
                        添加管理员
                    </button>
                </view>

                <!-- List Begin -->
                <view class="admin-comm-list">
                    <view v-if="dataList && dataList.total" class="load text-grey">共有{{ dataList.total }}条符合条件记录</view>

                    <view class="item" v-for="(item, index) in dataList.list" :key="index">
                        <view class="no">{{ index + 1 }}</view>

                        <view class="header">
                            <view class="left text-cut">{{ item.ADMIN_NAME }}</view>
                            <view class="right">
                                <text class="text-green" v-if="item.ADMIN_STATUS == 1">正常</text>
                                <text class="text-red" v-if="item.ADMIN_STATUS == 0">停用</text>
                            </view>
                        </view>

                        <view class="info title-mid">
                            <view class="info-item">
                                <view class="title">管理员身份</view>
                                <view class="mao">：</view>
                                <view v-if="item.ADMIN_TYPE == 1" class="content text-bold text-red">超级管理员</view>
                                <view v-else class="content">普通管理员</view>
                            </view>

                            <view class="info-item">
                                <view class="title">登录账号</view>
                                <view class="mao">：</view>
                                <view class="content">{{ item.ADMIN_NAME }}</view>
                            </view>

                            <view class="info-item">
                                <view class="title">姓名</view>
                                <view class="mao">：</view>
                                <view class="content">{{ item.ADMIN_DESC || '未填写' }}</view>
                            </view>

                            <view class="info-item">
                                <view class="title">手机</view>
                                <view class="mao">：</view>
                                <view class="content">{{ item.ADMIN_PHONE }}</view>
                            </view>

                            <view class="info-item">
                                <view class="title">最近登录</view>
                                <view class="mao">：</view>
                                <view class="content">{{ item.ADMIN_LOGIN_CNT }}次 / {{ item.ADMIN_LOGIN_TIME }}</view>
                            </view>

                            <view class="oprt">
                                <view @tap="url" :data-url="'../edit/admin_mgr_edit?id=' + item._id" class="btn margin-right-s">
                                    <text class="icon-edit margin-right-xxs"></text>
                                    编辑
                                </view>

                                <block v-if="item.ADMIN_TYPE != 1">
                                    <view v-if="item.ADMIN_STATUS == 0" class="btn text-green margin-right-s" @tap="bindStatusTap" :data-id="item._id" data-status="1">
                                        <text class="icon-delete margin-right-xxs"></text>
                                        启用
                                    </view>

                                    <view
                                        v-if="item.ADMIN_STATUS == 1"
                                        class="btn margin-left-s text-orange margin-right-s"
                                        @tap="bindStatusTap"
                                        :data-id="item._id"
                                        data-status="0"
                                    >
                                        <text class="icon-roundclose margin-right-xxs text-red"></text>
                                        停用
                                    </view>

                                    <view @tap="bindDelTap" :data-id="item._id" class="btn margin-right-s">
                                        <text class="icon-delete margin-right-xxs text-orange"></text>
                                        删除
                                    </view>
                                </block>
                            </view>
                        </view>
                    </view>
                </view>
                <!-- List END -->

                <!-- load begin -->

                <listLoadTpl compName="listLoadTpl" :data="{ dataList, skin: 'text-grey' }"></listLoadTpl>
                <!-- load end -->
            </cmpt-comm-list>
        </block>
    </view>
</template>

<script>
import listLoadTpl from '../../../../../../tpls/public/list_load_tpl';
const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
export default {
    components: {
        listLoadTpl
    },
    data() {
        return {
            isSuperAdmin: false,

            dataList: {
                list: [],
                total: ''
            },

            isAdmin: '',
            isLoad: '',
            search: '',
            sortMenus: '',
            sortItems: ''
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        if (!AdminBiz.isAdmin(this, true)) {
            return;
        }

        //设置搜索菜单
        this.setData(this.getSearchMenuFun());
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
    methods: {
        bindStatusTap: async function (e) {
            if (!AdminBiz.isAdmin(this, true)) {
                return;
            }
            let id = pageHelper.dataset(e, 'id');
            let status = pageHelper.dataset(e, 'status');
            if (!id || !status) {
                return;
            }
            status = Number(status);
            let params = {
                id,
                status
            };
            let that = this;
            try {
                await cloudHelper.callCloudSumbit('admin/mgr_status', params).then((res) => {
                    pageHelper.modifyListNode(id, that.dataList.list, 'ADMIN_STATUS', status, '_id');
                    that.setData({
                        dataList: that.dataList
                    });
                    pageHelper.showSuccToast('设置成功');
                });
            } catch (e) {
                console.log('CatchClause', e);
                console.log('CatchClause', e);
                console.log(e);
            }
        },

        bindDelTap: async function (e) {
            if (!AdminBiz.isAdmin(this, true)) {
                return;
            }
            let id = e.currentTarget.dataset.id;
            if (!id) {
                return;
            }
            let params = {
                id
            };
            let callback = async () => {
                try {
                    await cloudHelper.callCloudSumbit('admin/mgr_del', params).then((res) => {
                        pageHelper.delListNode(id, this.dataList.list, '_id');
                        this.dataList.total--;
                        this.setData({
                            dataList: this.dataList
                        });
                        pageHelper.showSuccToast('删除成功', 2000);
                    });
                } catch (e) {
                    console.log('CatchClause', e);
                    console.log('CatchClause', e);
                    console.log(e);
                }
            };
            pageHelper.showConfirm('确认删除？删除不可恢复', callback);
        },

        bindCommListCmpt: function (e) {
            if (!AdminBiz.isAdmin(this, true)) {
                return;
            }
            pageHelper.commListListener(this, e);
        },

        url: function (e) {
            pageHelper.url(e, this);
        },

        getSearchMenuFun: function () {
            let sortItems = [];
            let sortMenus = [
                {
                    label: '全部',
                    type: '',
                    value: ''
                },
                {
                    label: '超管',
                    type: 'type',
                    value: 1
                },
                {
                    label: '普通',
                    type: 'type',
                    value: 0
                },
                {
                    label: '正常',
                    type: 'status',
                    value: 1
                },
                {
                    label: '停用',
                    type: 'type',
                    value: 0
                }
            ];
            return {
                search: '',
                sortItems,
                sortMenus,
                isLoad: true
            };
        }
    }
};
</script>
<style>
@import '../../../../../../style/public/admin.css';
</style>
