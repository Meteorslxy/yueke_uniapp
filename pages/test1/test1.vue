<template>
    <view>
        <cmpt-picker-multi />
        <cmpt-table />
        <cmpt-poster />
        <cmpt-wxa />
    </view>
</template>

<script>
import cmptCarNumber from '@/cmpts/public/car_number/car_number_cmpt';
import cmptCustomerNav from '@/cmpts/public/custom_nav/custom_nav_cmpt';
import cmptSwiper from '@/cmpts/public/swiper/swiper_cmpt';
import cmptDateSelect from '@/cmpts/public/calendar/date_select/date_select_cmpt';
import cmptTimeSelect from '@/cmpts/public/calendar/time_select/time_select_cmpt';
import cmptPickerTime from '@/cmpts/public/picker_time/picker_time_cmpt';
import cmptPoster from '@/cmpts/public/poster/poster_cmpt';
// import cmptPicker from "@/cmpts/public/picker/picker_cmpt"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
import cmptCheckbox from '@/cmpts/public/checkbox/checkbox_cmpt';
import cmptEditor from '@/cmpts/public/editor/editor_cmpt';
import cmptTable from '@/cmpts/public/table/table_cmpt';
import cmptFileUpload from '@/cmpts/public/file/file_upload_cmpt';
import cmptExForm from '@/cmpts/public/form/form_show/form_show_cmpt';
import cmptPickerMulti from '@/cmpts/public/picker_multi/picker_multi_cmpt';
const myFavBh = require('../../comm/behavior/my_fav_bh.js');
const myFootBh = require('../../comm/behavior/my_foot_bh.js');
const newsIndexBh = require('../../comm/behavior/news_index_bh.js');
const searchBh = require('../../comm/behavior/search_bh.js');
const favBiz = require('../../comm/biz/fav_biz.js');
const fileHelper = require('../../helper/file_helper.js');
const qr = require('../../lib/tools/qrcode_lib.js');
const base64 = require('../../lib/tools/base64_lib.js');
const miniHelper = require('../../helper/mini_helper.js');
const formHelper = require('../../helper/form_helper.js');
export default {
    components: {
        cmptCarNumber,
        cmptCustomerNav,
        cmptSwiper,
        cmptDateSelect,
        cmptTimeSelect,
        cmptPickerTime,
        cmptPoster,
        cmptCheckbox,
        cmptEditor,
        cmptTable,
        cmptFileUpload,
        cmptExForm,
        cmptPickerMulti
    },
    data() {
        return {};
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {},
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {},
    methods: {}
};
</script>
<style></style>
