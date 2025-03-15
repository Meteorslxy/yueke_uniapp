<template>
    <view>
        <view class="form-box shadow-project card-project">
            <view class="form-group padding-top-s" v-if="userRegCheck && user.USER_STATUS == 8">
                <view v-if="!user.USER_CHECK_REASON" class="hint-desc text-red">
                    <text class="icon-notice"></text>
                    审核未通过：请修改资料后重新提交
                </view>
                <view v-else class="hint-desc text-red">
                    <text class="icon-notice"></text>
                    审核未通过：{{ user.USER_CHECK_REASON }}。请修改资料后重新提交
                </view>
            </view>
            <view class="form-group padding-top-s" v-else-if="userRegCheck && user.USER_STATUS == 0">
                <view class="hint-desc text-orange">
                    <text class="icon-notice"></text>
                    您的注册资料已经提交，请耐心等待审核~
                </view>
            </view>

            <view class="form-group">
                <view class="title must">昵称</view>
                <input type="nickname" placeholder="填写您的昵称" placeholder-class="phc" v-model="formName" maxlength="30" />
            </view>
            <view v-if="formNameFocus" class="hint-desc error">{{ formNameFocus }}</view>

            <view class="form-group">
                <view class="title must">手机</view>
                <input v-if="!mobileCheck" placeholder="填写您的手机号码" placeholder-class="phc" v-model="formMobile" maxlength="11" />

                <block v-else>
                    <view class="mobile">{{ formMobile || '未填写' }}</view>
                    <button open-type="getPhoneNumber" @getphonenumber="bindGetPhoneNumber" class="btn phone-button">
                        <text v-if="!formMobile">一键填写手机号</text>
                        <text v-else>一键修改手机号</text>
                    </button>
                </block>
            </view>
            <view v-if="formMobileFocus" class="hint-desc error">{{ formMobileFocus }}</view>
        </view>

        <view class="form-box shadow-project card-project margin-top-xs">
            <cmpt-form-show id="cmpt-form" mark="cmpt-form" :isCacheMatch="false" :fields="fields" :forms="formForms" :isDefMatch="isEdit ? false : true"></cmpt-form-show>
        </view>
    </view>
</template>

<script>
export default {
    props: ['data', 'compName'],
    computed: {
        userRegCheck() {
            return this.data.userRegCheck;
        },
        user() {
            return this.data.user;
        },
        formName() {
            return this.data.formName;
        },
        formNameFocus() {
            return this.data.formNameFocus;
        },
        mobileCheck() {
            return this.data.mobileCheck;
        },
        formMobile() {
            return this.data.formMobile;
        },
        formMobileFocus() {
            return this.data.formMobileFocus;
        },
        fields() {
            return this.data.fields;
        },
        formForms() {
            return this.data.formForms;
        },
        isEdit() {
            return this.data.isEdit;
        },
        bindGetPhoneNumber() {
            return this.data.bindGetPhoneNumber;
        }
    }
};
</script>
<style></style>
