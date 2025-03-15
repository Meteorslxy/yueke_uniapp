<template>
    <view>
        <view class="form-box shadow">
            <view class="form-group">
                <view class="title must">老师名称</view>
                <input placeholder="请输入老师的名称" placeholder-class="phc" v-model="formTitle" :focus="formTitleFocus" maxlength="50" />
            </view>
            <view v-if="formTitleFocus" class="hint-desc error">{{ formTitleFocus }}</view>

            <view v-if="cateIdOptions.length > 1 && isAdmin" class="form-group arrow" id="formCateId">
                <view class="title must">分类</view>
                <cmpt-picker id="cate-picker" :sourceData="cateIdOptions" @select="url" data-type="picker" data-item="formCateId" :item="formCateId"></cmpt-picker>
            </view>
            <view v-if="formCateIdFocus" class="hint-desc error">{{ formCateIdFocus }}</view>

            <view class="form-group" v-if="isAdmin">
                <view class="title must">
                    排序号
                    <text class="text-grey text-normal margin-left-xs">(小的先显示)</text>
                </view>
                <input placeholder="排序号，小的先显示" type="number" placeholder-class="phc" v-model="formOrder" :focus="formOrderFocus" maxlength="4" />
            </view>
            <view v-if="formOrderFocus" class="hint-desc error">{{ formOrderFocus }}</view>

            <view class="form-group" id="formCancelSet">
                <view class="title must">取消设置</view>
                <cmpt-picker mark="cancelSet" style="flex: 1" :item.sync="formCancelSet" sourceDataStr="0=不可取消,1=随时可取消,2=仅开始前可取消" />
            </view>
            <view v-if="formCancelSetFocus" class="hint-desc error">{{ formCancelSetFocus }}</view>
        </view>

        <view id="formDaysSet" class="form-box shadow" style="background-color: #fef2ce">
            <view @tap="url" :data-url="'../time/' + (isAdmin ? 'admin' : 'work') + '_meet_time'" class="form-group arrow">
                <view class="title must">预约时段排期设置</view>
                <view v-if="formDaysSet.length" class="form-text text-red text-bold">{{ formDaysSet.length }}天可约</view>
                <view v-else class="form-text text-orange">请配置可预约时段</view>
            </view>
            <view v-if="formDaysSetFocus" class="hint-desc error">{{ formDaysSetFocus }}</view>
        </view>

        <view id="formPhone" class="form-box shadow">
            <view class="form-group">
                <view class="title must">老师登录手机</view>
                <input maxlength="11" type="number" placeholder="请填写登录手机号码" v-model="formPhone" :focus="formPhoneFocus" />
            </view>
            <view v-if="formPhoneFocus" class="hint-desc error">{{ formPhoneFocus }}</view>

            <view class="form-group text-orange" v-if="isAdmin && isEdit">
                <text class="icon-info" style="font-size: 24rpx">不修改密码则保持以下为空</text>
            </view>
            <view class="form-group">
                <view class="title must">老师登录密码</view>
                <input maxlength="30" placeholder="请填写登录密码" v-model="formPassword" :focus="formPasswordFocus" />
            </view>
            <view v-if="formPasswordFocus" class="hint-desc error">{{ formPasswordFocus }}</view>
        </view>

        <view class="form-box shadow margin-top-xs">
            <cmpt-form-show
                id="cmpt-form"
                mark="cmpt-form"
                source="admin"
                :isCacheMatch="false"
                :fields="fields"
                :forms="formForms"
                :isDefMatch="id ? false : true"
            ></cmpt-form-show>
        </view>

        <view class="form-box shadow" v-if="isAdmin">
            <view class="form-group">
                <view class="title must">
                    预约用户填写数据项目
                    <text class="text-grey text-normal">(共{{ formJoinForms.length }}个字段)</text>
                </view>
            </view>
            <cmpt-form-set id="form-set" @formset="bindJoinFormsCmpt" :fields="formJoinForms" />
        </view>
    </view>
</template>

<script>
export default {
    props: ['data', 'compName'],
    computed: {
        formTitle() {
            return this.data.formTitle;
        },
        formTitleFocus() {
            return this.data.formTitleFocus;
        },
        cateIdOptions() {
            return this.data.cateIdOptions;
        },
        isAdmin() {
            return this.data.isAdmin;
        },
        formCateId() {
            return this.data.formCateId;
        },
        formCateIdFocus() {
            return this.data.formCateIdFocus;
        },
        formOrder() {
            return this.data.formOrder;
        },
        formOrderFocus() {
            return this.data.formOrderFocus;
        },
        formCancelSet() {
            return this.data.formCancelSet;
        },
        formCancelSetFocus() {
            return this.data.formCancelSetFocus;
        },
        formDaysSet() {
            return this.data.formDaysSet;
        },
        formDaysSetFocus() {
            return this.data.formDaysSetFocus;
        },
        formPhone() {
            return this.data.formPhone;
        },
        formPhoneFocus() {
            return this.data.formPhoneFocus;
        },
        isEdit() {
            return this.data.isEdit;
        },
        formPassword() {
            return this.data.formPassword;
        },
        formPasswordFocus() {
            return this.data.formPasswordFocus;
        },
        fields() {
            return this.data.fields;
        },
        formForms() {
            return this.data.formForms;
        },
        id() {
            return this.data.id;
        },
        formJoinForms() {
            return this.data.formJoinForms;
        },
        url() {
            return this.data.url;
        },
        bindJoinFormsCmpt() {
            return this.data.bindJoinFormsCmpt;
        }
    }
};
</script>
<style></style>
