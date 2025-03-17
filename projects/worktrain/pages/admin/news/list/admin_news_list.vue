<template>
    <view>
        <block v-if="isAdmin && isLoad">
            <cmpt-comm-list
                source="admin"
                type="admin-news-list"
                :search="search || ''"
                :_menus="sortMenus"
                :_items="sortItems"
                route="admin/news_list"
                sortMenusDefaultIndex="0"
                topBottom="50"
                placeholder="搜索标题"
                @list="bindCommListCmpt"
            >
                <view slot="searchEnd">
                    <button @tap="url" data-url="../add/admin_news_add" class="btn radius bg-admin text-white margin-right-s">
                        <text class="icon-roundadd margin-right-xxs"></text>
                        添加{{ NEWS_NAME }}
                    </button>
                </view>
                <!-- List Begin -->
                <view class="admin-comm-list">
					  <!-- 加载状态提示 -->
					<view v-if="!dataList.list" class="load text-grey">加载中...</view>
					
                    <view v-if="dataList && dataList.total" class="load text-grey">共有{{ dataList.total }}条符合条件记录</view>

                    <!-- <view class="item" v-for="(item, index) in dataList.list" :key="index"> -->
					<view class="item" v-for="(item, index) in (dataList.list || [])" :key="index">
                        <view class="no">{{ index + 1 }}</view>

                        <view class="header">
                            <view class="left text-cut">
                                <text v-if="item.NEWS_ORDER == 0" class="text-black margin-right-xxs" style="font-weight: normal; font-size: 24rpx">[置顶]</text>
                                <text v-if="item.NEWS_VOUCH == 1" class="text-black margin-right-xxs" style="font-weight: normal; font-size: 24rpx">[首页推荐]</text>
                                {{ item.NEWS_TITLE }}
                            </view>
                            <view class="right">
                                <text v-if="item.NEWS_STATUS == 1" class="text-black">「正常」</text>
                                <text v-else-if="item.NEWS_STATUS == 0" class="text-orange">「停用」</text>
                            </view>
                        </view>

                        <view class="info">
                            <view v-if="cateIdOptions.length > 1" class="info-item">
                                <view class="title">分类</view>
                                <view class="mao">：</view>
                                <view class="content">『{{ item.NEWS_CATE_NAME }}』</view>
                            </view>

                            <view class="info-item">
                                <view class="title">排序号</view>
                                <view class="mao">：</view>
                                <view class="content">
                                    {{ item.NEWS_ORDER }}
                                    <text class="margin-left-xxs text-grey">(小的先显示)</text>
                                </view>
                            </view>

                            <view class="info-item">
                                <view class="title">创建</view>
                                <view class="mao">：</view>
                                <view class="content">{{ item.NEWS_ADD_TIME }}</view>
                            </view>

                            <view class="oprt">
                                <view @tap="url" :data-url="'../edit/admin_news_edit?id=' + item._id" class="btn round margin-right-s">
                                    <text class="icon-edit margin-right-xxs"></text>
                                    编辑
                                </view>

                                <view @tap="bindStatusMoreTap" :data-id="item._id" class="btn margin-right-s">状态管理</view>

                                <view :data-idx="index" @tap="bindMoreTap" :data-id="item._id" :data-qr="item.NEWS_QR" :data-title="item.NEWS_TITLE" class="btn margin-right-s">
                                    更多操作
                                </view>

                                <view @tap="url" :data-url="'../../../news/detail/news_detail?id=' + item._id" class="btn margin-right-s">预览</view>
                            </view>
                        </view>
                    </view>
                </view>
                <!-- List END -->

                <!-- load begin -->

                <listLoadTpl compName="listLoadTpl" :data="{ dataList, skin: 'text-grey' }"></listLoadTpl>
                <!-- load end -->
				<!-- 空数据提示 -->
				<view v-if="dataList.list && dataList.list.length === 0" class="load text-grey">
				    暂无数据
				</view>
            </cmpt-comm-list>
        </block>
    </view>
</template>

<script>
import listLoadTpl from '../../../../../../tpls/public/list_load_tpl.vue';
const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const NewsBiz = require('../../../../biz/news_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
const projectSetting = require('../../../../public/project_setting.js');
export default {
    components: {
        listLoadTpl
    },
    data() {
        return {
            NEWS_NAME: '',

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
            title: projectSetting.NEWS_NAME + '-管理'
        });
        this.setData({
            NEWS_NAME: projectSetting.NEWS_NAME
        });

        //设置搜索菜单
        this.getSearchMenuFun();
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

        setSortFun: async function (e) {
            if (!AdminBiz.isAdmin(this)) {
                return;
            }
            let id = e.currentTarget.dataset.id;
            let sort = e.currentTarget.dataset.sort;
            if (!id) {
                return;
            }
            let params = {
                id,
                sort
            };
            try {
                await cloudHelper.callCloudSumbit('admin/news_sort', params).then((res) => {
                    pageHelper.modifyListNode(id, this.dataList.list, 'NEWS_ORDER', sort);
                    this.setData({
                        dataList: this.dataList
                    });
                    pageHelper.showSuccToast('设置成功');
                });
            } catch (e) {
                console.log('CatchClause', e);
                console.log('CatchClause', e);
                console.log(e);
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
                await cloudHelper.callCloudSumbit('admin/news_vouch', params).then((res) => {
                    pageHelper.modifyListNode(id, this.dataList.list, 'NEWS_VOUCH', vouch);
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

        delFun: async function (e) {
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
                    await cloudHelper.callCloudSumbit('admin/news_del', params, opts).then((res) => {
                        pageHelper.delListNode(id, this.dataList.list, '_id');
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

        bindMoreTap: async function (e) {
            if (!AdminBiz.isAdmin(this)) {
                return;
            }
            let idx = pageHelper.dataset(e, 'idx');
            let order = this.dataList.list[idx].NEWS_ORDER;
            let orderDesc = order == 0 ? '取消置顶' : '置顶';
            let vouch = this.dataList.list[idx].NEWS_VOUCH;
            let vouchDesc = vouch == 0 ? '推荐到首页' : '取消首页推荐';
            let itemList = ['预览', orderDesc, vouchDesc, '生成专属二维码'];
            uni.showActionSheet({
                itemList,
                success: async (res) => {
                    switch (res.tapIndex) {
                        case 0: {
                            //预览
                            let id = pageHelper.dataset(e, 'id');
                            uni.navigateTo({
                                url: '../../../news/detail/news_detail?id=' + id
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

        bindStatusMoreTap: async function (e) {
            if (!AdminBiz.isAdmin(this)) {
                return;
            }
            let itemList = ['启用', '停用 (不可见)', '删除'];
            uni.showActionSheet({
                itemList,
                success: async (res) => {
                    switch (res.tapIndex) {
                        case 0: {
                            //启用
                            e.currentTarget.dataset['status'] = 1;
                            await this.setStatusFun(e);
                            break;
                        }
                        case 1: {
                            //停止
                            e.currentTarget.dataset['status'] = 0;
                            await this.setStatusFun(e);
                            break;
                        }
                        case 2: {
                            //删除
                            await this.delFun(e);
                            break;
                        }
                    }
                },
                fail: function (res) {}
            });
        },

        setStatusFun: async function (e) {
            if (!AdminBiz.isAdmin(this)) {
                return;
            }
            let id = pageHelper.dataset(e, 'id');
            let status = Number(pageHelper.dataset(e, 'status'));
            let params = {
                id,
                status
            };
            try {
                await cloudHelper.callCloudSumbit('admin/news_status', params).then((res) => {
                    pageHelper.modifyListNode(id, this.dataList.list, 'NEWS_STATUS', status, '_id');
                    this.setData({
                        dataList: this.dataList
                    });
                    pageHelper.showSuccToast('设置成功');
                });
            } catch (e) {
                console.log('CatchClause', e);
                console.log('CatchClause', e);
                console.log(e);
            }
        },

        getSearchMenuFun: function () {
            let cateIdOptions = NewsBiz.getCateList();
            let sortItem1 = [
                {
                    label: '分类',
                    type: '',
                    value: 0
                }
            ];
            sortItem1 = sortItem1.concat(NewsBiz.getCateList());
            let sortItems = [sortItem1];
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
                    label: '停用',
                    type: 'status',
                    value: 0
                },
                {
                    label: '最新',
                    type: 'sort',
                    value: 'new'
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
