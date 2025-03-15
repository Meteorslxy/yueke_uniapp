<template>
    <view>
        <view class="form-box shadow">
            <view class="form-group" v-if="isAdmin">
                <view class="title text-cut">{{ title }}</view>
            </view>
        </view>

        <view class="form-box shadow margin-top-xs">
            <view class="checkin" @tap="bindScanTap">
                <view class="notice">
                    <text class="icon-scan margin-right-s text-bold"></text>
                    扫码核销
                </view>
                <view class="desc" v-if="isAdmin">管理员扫描用户预约码进行核销</view>
                <view class="desc" v-if="isWork">扫描用户预约码进行核销</view>
                <view class="oprt">立即核销</view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    props: ['data', 'compName'],
    computed: {
        isAdmin() {
            return this.data.isAdmin;
        },
        title() {
            return this.data.title;
        },
        isWork() {
            return this.data.isWork;
        },
        bindScanTap() {
            return this.data.bindScanTap;
        }
    }
};
</script>
<style></style>
