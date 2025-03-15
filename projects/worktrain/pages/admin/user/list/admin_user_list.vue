<template>
    <view>
        <block v-if="isAdmin && isLoad">
            <cmpt-comm-list
                id="cmpt-comm-list"
                source="admin"
                type="admin-meet"
                :search="search || ''"
                :_menus="sortMenus"
                :_items="sortItems"
                route="admin/user_list"
                sortMenusDefaultIndex="0"
                topBottom="50"
                placeholder="搜索"
                @list="bindCommListCmpt($event, { tagId: 'cmpt-comm-list' })"
            >
                <view slot="searchEnd">
                    <button @tap="url" :data-url="'../export/admin_user_export?condition=' + dataList.condition" class="btn mid radius bg-admin text-white margin-right-s">
                        <text class="icon-down margin-right-xxs"></text>
                        导出用户资料
                    </button>
                </view>

                <!-- List Begin -->
                <view class="admin-comm-list">
                    <view v-if="dataList && dataList.total" class="load text-grey">共有{{ dataList.total }}条符合条件记录</view>

                    <view class="item" v-for="(item, index) in dataList.list" :key="index">
                        <view class="no">{{ index + 1 }}</view>

                        <view class="header">
                            <view class="left text-cut">{{ item.USER_NAME }}</view>
                            <view class="right">
                                <text v-if="item.USER_STATUS == 1" class="text-black">「正常」</text>
                                <text v-else-if="item.USER_STATUS == 0" class="text-orange">「待审核」</text>
                                <text v-else-if="item.USER_STATUS == 8" class="text-red">「审核未过」</text>
                                <text v-else-if="item.USER_STATUS == 9" class="text-purple">「禁用」</text>
                            </view>
                        </view>

                        <view class="info">
                            <view v-if="item.USER_STATUS == 8" class="info-item">
                                <view class="title">审核理由</view>
                                <view class="mao">：</view>
                                <view class="content">{{ item.USER_CHECK_REASON || '未填写' }}</view>
                            </view>
                            <view class="info-item" @tap="url" data-type="phone" :data-url="item.USER_MOBILE">
                                <view class="title">手机</view>
                                <view class="mao">：</view>
                                <view class="content">
                                    {{ item.USER_MOBILE || '未填写' }}
                                    <text v-if="item.USER_MOBILE" class="icon-phone margin-left-s"></text>
                                </view>
                            </view>

                            <view class="info-item">
                                <view class="title">注册</view>
                                <view class="mao">：</view>
                                <view class="content">{{ item.USER_ADD_TIME }}</view>
                            </view>

                            <view class="info-item" @tap="url" :data-url="'../detail/admin_user_detail?id=' + item.USER_MINI_OPENID">
                                <view class="title">详情</view>
                                <view class="mao">：</view>
                                <view class="content text-blue">查看更多用户资料...</view>
                            </view>

                            <view class="oprt">
                                <block v-if="userRegCheck">
                                    <view v-if="item.USER_STATUS == 0" @tap="bindStatusTap" data-status="1" :data-idx="index" class="btn margin-right-s text-green">审核通过</view>

                                    <view v-if="item.USER_STATUS == 0" @tap="bindCheckTap" data-status="8" :data-idx="index" class="btn margin-right-s text-red">审核不过</view>
                                </block>

                                <view v-if="item.USER_STATUS == 9" @tap="bindStatusTap" data-status="1" :data-idx="index" class="btn margin-right-s">
                                    <text class="icon-check margin-right-xxs text-green"></text>
                                    恢复正常
                                </view>

                                <view v-if="item.USER_STATUS != 9" @tap="bindStatusTap" data-status="9" :data-idx="index" class="btn margin-right-s">
                                    <text class="icon-close margin-right-xxs text-purple"></text>
                                    禁用
                                </view>

                                <view @tap="bindDelTap" :data-id="item.USER_MINI_OPENID" class="btn margin-right-s">
                                    <text class="icon-delete margin-right-xxs text-orange"></text>
                                    删除
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
                <!-- List END -->

                <!-- load begin -->

                <listLoadTpl compName="listLoadTpl" :data="{ skin: 'text-grey', dataList }"></listLoadTpl>
                <!-- load end -->
            </cmpt-comm-list>

            <cmpt-modal
                v-if="checkModalShow"
                :show.sync="checkModalShow"
                type="dialog"
                title="审核不过"
                @click="bindCheckCmpt"
                class="modal-form"
                cancelText="返回"
                confirmText="确定"
            >
                <view class="form-group" style="padding: 0 10rpx">
                    <view class="title">
                        审核不过理由
                        <text class="text-grey text-mid">(选填)</text>
                        ：
                    </view>
                    <view @tap="bindClearReasonTap" style="width: 150rpx; text-align: right" class="text-grey">
                        <text class="icon-roundclose"></text>
                        清空
                    </view>
                </view>

                <view class="form-group cancel-area">
                    <textarea placeholder-class="phc" placeholder="请输入审核不过理由 (非必填)" style="height: 110rpx" v-model="formReason" maxlength="100"></textarea>
                </view>
            </cmpt-modal>
        </block>
    </view>
</template>

<script>
import listLoadTpl from '../../../../../../tpls/public/list_load_tpl';
const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const cacheHelper = require('../../../../../../helper/cache_helper.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
const projectSetting = require('../../../../public/project_setting.js');
const CACHE_USER_CHECK_REASON = 'CACHE_USER_CHECK_REASON';
export default {
    components: {
        listLoadTpl
    },
    data() {
        return {
            userRegCheck: projectSetting.USER_REG_CHECK,
            checkModalShow: false,
            formReason: '',
            curIdx: -1,

            dataList: {
                condition: '',
                total: '',
                list: []
            },

            data1Name: '',
            data2Name: '',
            search: '',
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

        bindCommListCmpt: function (e, _dataset) {
            /* ---处理dataset begin--- */
            this.handleDataset(e, _dataset);
            /* ---处理dataset end--- */
            pageHelper.commListListener(this, e);
        },

        bindDelTap: async function (e) {
            if (!AdminBiz.isAdmin(this)) {
                return;
            }
            let id = pageHelper.dataset(e, 'id');
            let params = {
                id
            };
            let callback = async () => {
                try {
                    let opts = {
                        title: '删除中'
                    };
                    await cloudHelper.callCloudSumbit('admin/user_del', params, opts).then((res) => {
                        pageHelper.delListNode(id, this.dataList.list, 'USER_MINI_OPENID');
                        this.dataList.total--;
                        this.setData({
                            dataList: this.dataList
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

        bindClearReasonTap: function (e) {
            this.setData({
                formReason: ''
            });
        },

        bindCheckTap: function (e) {
            let curIdx = pageHelper.dataset(e, 'idx');
            this.setData({
                formReason: cacheHelper.get(CACHE_USER_CHECK_REASON) || '',
                curIdx,
                checkModalShow: true
            });
        },

        bindCheckCmpt: async function () {
            let e = {
                currentTarget: {
                    dataset: {
                        status: 8,
                        idx: this.curIdx
                    }
                }
            };
            cacheHelper.set(CACHE_USER_CHECK_REASON, this.formReason, 31536000);
            await this.bindStatusTap(e);
        },

        bindStatusTap: async function (e) {
            if (!AdminBiz.isAdmin(this)) {
                return;
            }
            let status = pageHelper.dataset(e, 'status');
            let idx = Number(pageHelper.dataset(e, 'idx'));
            let dataList = this.dataList;
            let id = dataList.list[idx].USER_MINI_OPENID;
            let params = {
                id,
                status,
                reason: this.formReason
            };
            let cb = async () => {
                try {
                    await cloudHelper.callCloudSumbit('admin/user_status', params).then((res) => {
                        let sortIndex = this.zpSelectComponent('#cmpt-comm-list').getSortIndex();
                        if (sortIndex != -1 && sortIndex != 5 && !this.search) {
                            // 全部或者检索的结果
                            dataList.list.splice(idx, 1);
                            dataList.total--;
                            this.setData({
                                dataList: this.dataList
                            });
                        } else {
                            let data1Name = 'dataList.list[' + idx + '].USER_CHECK_REASON';
                            let data2Name = 'dataList.list[' + idx + '].USER_STATUS';
                            this.setData({
                                [data1Name]: this.formReason,
                                [data2Name]: status
                            });
                        }
                        this.setData({
                            checkModalShow: false,
                            formReason: '',
                            curIdx: -1
                        });
                        pageHelper.showSuccToast('操作成功');
                    });
                } catch (e) {
                    console.log('CatchClause', e);
                    console.log('CatchClause', e);
                    console.log(e);
                }
            };
            if (status == 8) {
                pageHelper.showConfirm('该用户审核不通过，用户修改资料后可重新提交审核', cb);
            } else {
                pageHelper.showConfirm('确认执行此操作?', cb);
            }
        },

        getSearchMenuFun: async function () {
            let sortItems1 = [
                {
                    label: '注册时间',
                    type: '',
                    value: ''
                },
                {
                    label: '注册时间从早到晚',
                    type: 'sort',
                    value: 'USER_ADD_TIME|asc'
                },
                {
                    label: '注册时间从晚到早',
                    type: 'sort',
                    value: 'USER_ADD_TIME|desc'
                }
            ];
            let sortMenus = [
                {
                    label: '全部',
                    type: '',
                    value: ''
                },
                {
                    label: '正常',
                    type: 'status',
                    value: 1
                },
                {
                    label: '禁用',
                    type: 'status',
                    value: 9
                }
            ];
            if (projectSetting.USER_REG_CHECK) {
                sortMenus = sortMenus.concat([
                    {
                        label: '待审核',
                        type: 'status',
                        value: 0
                    },
                    {
                        label: '审核未过',
                        type: 'status',
                        value: 8
                    }
                ]);
            }
            this.setData({
                search: '',
                sortItems: [sortItems1],
                sortMenus,
                isLoad: true
            });
        }
    }
};
</script>
<style>
@import '../../../../../../style/public/admin.css';

page {
    background-color: #f8f8f8;
}

.admin-comm-list .item .info .oprt {
    padding: 0rpx 0rpx;
}
</style>
