<template>
    <view>
        <view v-if="isLoad === null" class="margin-top load notexist text-l text-darkgreen load-project"></view>
        <view v-if="isLoad === false" class="margin-top load loading text-l text-darkgreen load-project"></view>

        <block v-if="isLoad" v-for="(item, index) in fieldsClone" :key="index">
            <block v-if="doShow">
                <block v-if="item.type == 'slot'">
                    <slot :name="item.mark" />
                </block>
                <view v-else class="form-group padding-s form-group-show">
                    <view class="title">{{ item.title }}:</view>
                    <view v-if="item.type == 'image'" class="form-group-show-text">
                        <image
                            mode="aspectFill"
                            @tap="url"
                            data-type="image"
                            :data-url="itm"
                            :lazy-load="true"
                            :src="itm"
                            class="loading form-group-show-img"
                            :show-menu-by-longpress="true"
                            v-for="(itm, index1) in item.val"
                            :key="index1"
                        ></image>
                    </view>
                    <view v-else-if="item.type == 'switch'" class="form-group-show-text">{{ item.val === true ? '是' : '否' }}</view>
                    <view v-else-if="item.type == 'content'" class="form-group-show-text">[图文]</view>
                    <view v-else-if="item.type == 'file'" class="form-group-show-text">[文件]</view>
                    <view v-else-if="item.type == 'rows'" class="form-group-show-text">[多条目]</view>
                    <view v-else class="form-group-show-text">{{ item.val }}</view>
                </view>
            </block>

            <block v-else>
                <view v-if="item.type == 'line'" class="form-group-line">
                    <text>{{ item.title }}</text>
                </view>
                <block v-else-if="item.type == 'slot'">
                    <slot :name="item.mark" />
                </block>

                <block v-else-if="item.type == 'text'">
                    <view class="form-group" :item-id="'form' + item.mark">
                        <view :class="'title ' + (item.must ? 'must' : '')">{{ item.title }}:</view>
                        <input
                            :disabled="item.disabled"
                            :placeholder="item.desc || '请填写' + item.title"
                            placeholder-class="phc"
                            :maxlength="item.max"
                            @input="bindLineBlur"
                            :data-idx="index"
                            :value="item.val"
                            :focus="item.focus"
                        />
                    </view>
                    <view v-if="item.focus" class="hint-desc error">{{ item.focus }}</view>
                    <view v-if="item.ext.hint" class="hint-desc info">{{ item.ext.hint }}</view>
                </block>

                <block v-else-if="item.type == 'carnumber'">
                    <view class="form-group" :item-id="'form' + item.mark">
                        <view :class="'title ' + (item.must ? 'must' : '')">{{ item.title }}:</view>
                        <cmpt-car-number :defaultNum="item.val" :data-idx="index" @change="bindLineBlur($event, { idx: index })" />
                    </view>
                    <view v-if="item.focus" class="hint-desc error">{{ item.focus }}</view>
                    <view v-if="item.ext.hint" class="hint-desc info">{{ item.ext.hint }}</view>
                </block>

                <block v-else-if="item.type == 'int'">
                    <view class="form-group" :item-id="'form' + item.mark">
                        <view :class="'title ' + (item.must ? 'must' : '')">{{ item.title }}:</view>
                        <input
                            :disabled="item.disabled"
                            type="number"
                            :placeholder="item.desc || '请填写' + item.title"
                            placeholder-class="phc"
                            :maxlength="item.max"
                            @input="bindLineBlur"
                            :data-idx="index"
                            :value="item.val"
                            :focus="item.focus"
                        />
                    </view>
                    <view v-if="item.focus" class="hint-desc error">{{ item.focus }}</view>
                    <view v-if="item.ext.hint" class="hint-desc info">{{ item.ext.hint }}</view>
                </block>

                <block v-else-if="item.type == 'digit'">
                    <view class="form-group" :item-id="'form' + item.mark">
                        <view :class="'title ' + (item.must ? 'must' : '')">{{ item.title }}:</view>
                        <input
                            :disabled="item.disabled"
                            type="digit"
                            :placeholder="item.desc || '请填写' + item.title"
                            placeholder-class="phc"
                            :maxlength="item.max"
                            @input="bindLineBlur"
                            :data-idx="index"
                            :value="item.val"
                            :focus="item.focus"
                        />
                    </view>
                    <view v-if="item.focus" class="hint-desc error">{{ item.focus }}</view>
                    <view v-if="item.ext.hint" class="hint-desc info">{{ item.ext.hint }}</view>
                </block>

                <block v-else-if="item.type == 'select'">
                    <view class="form-group" :item-id="'form' + item.mark">
                        <view :class="'title ' + (item.must ? 'must' : '')">{{ item.title }}</view>
                        <cmpt-picker
                            :disabled="item.disabled"
                            style="flex: 1"
                            :sourceData="item.selectOptions"
                            :data-idx="index"
                            @select="bindSelectCmpt($event, { idx: index })"
                            :item="item.val"
                        />
                    </view>
                    <view class="hint-desc" v-if="item.desc">{{ item.desc }}</view>
                    <view v-if="item.focus" class="hint-desc error">{{ item.focus }}</view>
                    <view v-if="item.ext.hint" class="hint-desc info">{{ item.ext.hint }}</view>
                </block>

                <block v-else-if="item.type == 'checkbox'">
                    <view class="form-group" :item-id="'form' + item.mark">
                        <view class="action text-bold text-l">
                            <text class="text-red" v-if="item.must">*</text>
                            {{ item.title }}
                        </view>
                        <view class="action">至少选择{{ item.checkBoxLimit }}项</view>
                    </view>
                    <view class="form-group align-start" style="flex: 1; padding-left: 0; padding-right: 20rpx">
                        <cmpt-checkbox
                            :disabled="item.disabled"
                            :show="item.ext.show == 'row' ? 'row' : ''"
                            :sourceData="item.selectOptions"
                            :data-idx="index"
                            @select="bindCheckBoxCmpt($event, { idx: index })"
                            :itemMulti="item.val"
                            :multiModeLabelMark="item.ext.multiModeLabelMark || 'label'"
                            :multiModeValMark="item.ext.multiModeValMark || 'val'"
                            style="flex: 1"
                        />
                    </view>
                    <view v-if="item.focus" class="hint-desc error">{{ item.focus }}</view>
                    <view v-if="item.ext.hint" class="hint-desc info">{{ item.ext.hint }}</view>
                </block>

                <block v-else-if="item.type == 'radio'">
                    <view class="form-group" :item-id="'form' + item.mark">
                        <view class="action text-bold text-l">
                            <text class="text-red" v-if="item.must">*</text>
                            {{ item.title }}
                        </view>
                        <view class="action"></view>
                    </view>
                    <view class="form-group align-start" style="flex: 1; padding-left: 0; padding-right: 20rpx">
                        <cmpt-radio
                            :disabled="item.disabled"
                            :show="item.ext.show == 'row' ? 'row' : ''"
                            :sourceData="item.selectOptions"
                            :data-idx="index"
                            @select="bindRadioCmpt($event, { idx: index })"
                            :itemSelected="item.val"
                            style="flex: 1"
                        />
                    </view>
                    <view v-if="item.focus" class="hint-desc error">{{ item.focus }}</view>
                    <view v-if="item.ext.hint" class="hint-desc info">{{ item.ext.hint }}</view>
                </block>

                <block v-else-if="item.type == 'date'">
                    <view class="form-group arrow" :item-id="'form' + item.mark">
                        <view :class="'title ' + (item.must ? 'must' : '')">{{ item.title }}</view>
                        <picker :disabled="item.disabled" class="picker-base" :data-idx="index" mode="date" @change="bindDayChange" :value="item.val">
                            <view class="picker-select">
                                {{ item.val || '年,月,日' }}
                            </view>
                        </picker>
                    </view>
                    <view class="hint-desc info" v-if="item.desc">{{ item.desc }}</view>
                    <view v-if="item.focus" class="hint-desc error">{{ item.focus }}</view>
                </block>

                <block v-else-if="item.type == 'year'">
                    <view class="form-group arrow" :item-id="'form' + item.mark">
                        <view :class="'title ' + (item.must ? 'must' : '')">{{ item.title }}</view>
                        <picker :disabled="item.disabled" class="picker-base" :data-idx="index" mode="date" fields="year" @change="bindDayChange" :value="item.val">
                            <view class="picker-select">
                                {{ item.val || '请选择' }}
                            </view>
                        </picker>
                    </view>
                    <view class="hint-desc info" v-if="item.desc">{{ item.desc }}</view>
                    <view v-if="item.focus" class="hint-desc error">{{ item.focus }}</view>
                </block>

                <block v-else-if="item.type == 'month'">
                    <view class="form-group arrow" :item-id="'form' + item.mark">
                        <view :class="'title ' + (item.must ? 'must' : '')">{{ item.title }}</view>
                        <picker :disabled="item.disabled" class="picker-base" :data-idx="index" mode="date" fields="month" @change="bindDayChange" :value="item.val">
                            <view class="picker-select">
                                {{ item.val || '请选择' }}
                            </view>
                        </picker>
                    </view>
                    <view class="hint-desc info" v-if="item.desc">{{ item.desc }}</view>
                    <view v-if="item.focus" class="hint-desc error">{{ item.focus }}</view>
                </block>

                <block v-else-if="item.type == 'hourminute'">
                    <view class="form-group arrow" :item-id="'form' + item.mark">
                        <view :class="'title ' + (item.must ? 'must' : '')">{{ item.title }}</view>
                        <picker :disabled="item.disabled" class="picker-base" :data-idx="index" mode="time" @change="bindDayChange" :value="item.val">
                            <view class="picker-select">
                                {{ item.val || '请选择' }}
                            </view>
                        </picker>
                    </view>
                    <view class="hint-desc info" v-if="item.desc">{{ item.desc }}</view>
                    <view v-if="item.focus" class="hint-desc error">{{ item.focus }}</view>
                </block>

                <block v-else-if="item.type == 'area'">
                    <view class="form-group arrow" :item-id="'form' + item.mark">
                        <view :class="'title ' + (item.must ? 'must' : '')">{{ item.title }}</view>
                        <region-picker
                            :disabled="item.disabled"
                            v-if="item.ext.city"
                            level="city"
                            class="picker-base"
                            :data-idx="index"
                            @change="bindAreaChange($event, { idx: index })"
                            :value="item.val"
                        >
                            <view v-if="item.val" class="picker-select">
                                {{ item.val[1] }}
                            </view>

                            <view v-else class="picker-select">省,区,市</view>
                        </region-picker>
                        <region-picker
                            :disabled="item.disabled"
                            v-if="item.ext.province"
                            level="province"
                            class="picker-base"
                            :data-idx="index"
                            @change="bindAreaChange($event, { idx: index })"
                            :value="item.val"
                        >
                            <view v-if="item.val" class="picker-select">
                                {{ item.val }}
                            </view>

                            <view v-else class="picker-select">省份</view>
                        </region-picker>
                        <region-picker :disabled="item.disabled" v-else class="picker-base" :data-idx="index" @change="bindAreaChange($event, { idx: index })" :value="item.val">
                            <view v-if="item.val && item.val.length == 3" class="picker-select">
                                {{ item.val }}
                            </view>

                            <view v-else class="picker-select">省,区,市</view>
                        </region-picker>
                    </view>
                    <view class="hint-desc info" v-if="item.desc">{{ item.desc }}</view>
                    <view v-if="item.focus" class="hint-desc error">{{ item.focus }}</view>
                </block>

                <block v-else-if="item.type == 'switch'">
                    <view class="form-group" :item-id="'form' + item.mark">
                        <view :class="'title ' + (item.must ? 'must' : '')">{{ item.title }}</view>
                        <switch :disabled="item.disabled" v-if="item.val" @change="switchModel" :data-idx="index" class="green sm" :checked="true"></switch>
                        <switch :disabled="item.disabled" v-else-if="!item.val" @change="switchModel" :data-idx="index" class="green sm"></switch>
                    </view>
                    <view class="hint-desc info" v-if="item.desc">{{ item.desc }}</view>
                    <view v-if="item.focus" class="hint-desc error">{{ item.focus }}</view>
                </block>

                <block v-else-if="item.type == 'rows'">
                    <view class="form-group" :item-id="'form' + item.mark">
                        <view class="action text-bold text-l">
                            <text class="text-red" v-if="item.must">*</text>
                            {{ item.title }}
                        </view>
                        <view v-if="item.ext.maxCnt" class="action">{{ item.rowsCnt }}/{{ item.ext.maxCnt }}</view>
                    </view>
                    <view v-if="item.ext.memo" :class="'form-group memo ' + item.ext.memoColor">{{ item.ext.memo }}</view>
                    <view class="form-group" style="padding: 1rpx 10rpx">
                        <cmpt-rows
                            :item-id="'rows' + index"
                            :mark="'rows' + index"
                            :parentMark="mark"
                            style="width: 100%"
                            :ext="item.ext"
                            :list="item.val"
                            :data-idx="index"
                            @change="bindRowsCmpt($event, { idx: index, tagId: 'rows' + index })"
                        />
                    </view>
                    <view class="hint-desc info" v-if="item.desc">{{ item.desc }}</view>
                </block>

                <block v-else-if="item.type == 'textarea'">
                    <view class="form-group" :item-id="'form' + item.mark">
                        <view class="action text-bold text-l">
                            <text class="text-red" v-if="item.must">*</text>
                            {{ item.title }}
                        </view>
                        <view class="action">{{ item.val.length }}/{{ item.max }}</view>
                    </view>

                    <view class="form-group align-start">
                        <textarea
                            :disabled="item.disabled"
                            @input="bindMultiBlur"
                            :data-idx="index"
                            :value="item.val"
                            placeholder-class="phc"
                            :placeholder="item.desc || '请填写' + item.title"
                            :style="
                                'min-height:' +
                                (item.max < 300 ? '100' : '') +
                                (item.max >= 300 && item.max < 1000 ? (item.max / 100) * 40 : '') +
                                (item.max >= 1000 ? '400' : '') +
                                'rpx'
                            "
                            :auto-height="true"
                            :maxlength="item.max"
                            :focus="item.focus"
                            cursor-spacing="80"
                        ></textarea>
                    </view>
                    <view v-if="item.focus" class="hint-desc error">{{ item.focus }}</view>
                    <view v-if="item.ext.hint" class="hint-desc info">{{ item.ext.hint }}</view>
                </block>

                <block v-if="item.type == 'tag'">
                    <view class="form-group" :item-id="'form' + item.mark">
                        <view class="action text-bold text-l">
                            <text class="text-red" v-if="item.must">*</text>
                            {{ item.title }}
                        </view>
                        <view class="action"></view>
                    </view>

                    <view class="form-group align-start">
                        <textarea
                            :disabled="item.disabled"
                            @input="bindLineBlur"
                            :data-idx="index"
                            :value="item.val"
                            placeholder-class="phc"
                            :placeholder="item.desc || '请填写' + item.title"
                            style="min-height: 100rpx"
                            :auto-height="true"
                            :maxlength="item.max"
                            cursor-spacing="80"
                        ></textarea>
                    </view>
                    <view v-if="item.focus" class="hint-desc error">{{ item.focus }}</view>
                    <view v-if="item.ext.hint" class="hint-desc info">{{ item.ext.hint }}</view>
                    <view v-else class="hint-desc">
                        <text class="icon-tag"></text>
                        多个标签请用逗号分隔
                    </view>
                </block>

                <block v-else-if="item.type == 'idcard'">
                    <view class="form-group" :item-id="'form' + item.mark">
                        <view :class="'title ' + (item.must ? 'must' : '')">{{ item.title }}:</view>
                        <input
                            :disabled="item.disabled"
                            type="idcard"
                            :placeholder="item.desc || '请填写' + item.title"
                            placeholder-class="phc"
                            maxlength="18"
                            @input="bindLineBlur"
                            :data-idx="index"
                            :value="item.val"
                        />
                    </view>
                    <view v-if="item.focus" class="hint-desc error">{{ item.focus }}</view>
                    <view v-if="item.ext.hint" class="hint-desc info">{{ item.ext.hint }}</view>
                </block>

                <block v-else-if="item.type == 'content'">
                    <view
                        :item-id="'form' + item.mark"
                        class="form-group arrow"
                        @tap="url"
                        :data-url="'/cmpts/public/form/form_show/content/form_show_content?source=' + source + '&cmptitem-id=' + mark + '&cmptFormName=' + item.mark"
                    >
                        <view :class="'title ' + (item.must ? 'must' : '')">
                            {{ item.title }}:
                            <text class="text-grey text-normal margin-left-xs">{{ item.must ? '(必填)' : '' }}</text>
                        </view>
                        <view v-if="item.val.length == 0" class="form-text text-orange">「{{ item.title }}」未填写</view>
                        <view v-else class="form-text">{{ wxs.calContent(item.val) }}</view>
                    </view>
                    <view v-if="item.focus" class="hint-desc error">{{ item.focus }}</view>
                    <view v-if="item.ext.hint" class="hint-desc info">{{ item.ext.hint }}</view>
                </block>

                <block v-else-if="item.type == 'file'">
                    <cmpt-file-upload
                        :item-id="'form' + item.mark"
                        :data-idx="index"
                        :must="item.must"
                        :fileMax="item.max"
                        :title="item.title + '上传 ' + (item.must ? '(必填)' : '')"
                        :isCheck="false"
                        :uploadSize="100"
                        :fileList="item.val"
                        @upload="bindFileUploadCmpt($event, { idx: index, tagId: 'form' + item.mark })"
                    />
                    <view v-if="item.focus" class="hint-desc error">{{ item.focus }}</view>
                    <view v-if="item.ext.hint" class="hint-desc info">{{ item.ext.hint }}</view>
                </block>

                <block v-else-if="item.type == 'image'">
                    <cmpt-img-upload
                        :item-id="'form' + item.mark"
                        :data-idx="index"
                        :must="item.must"
                        :imgMax="item.max"
                        :title="item.title + '上传 ' + (item.must ? '(必填)' : '')"
                        :isCheck="false"
                        :imgUploadSize="10"
                        :imgList="item.val"
                        @upload="bindImgUploadCmpt($event, { idx: index, tagId: 'form' + item.mark })"
                    />
                    <view v-if="item.focus" class="hint-desc error">{{ item.focus }}</view>
                    <view v-if="item.ext.hint" class="hint-desc info">{{ item.ext.hint }}</view>
                </block>

                <block v-else-if="item.type == 'mobile' && mobileCheck">
                    <view class="form-group" :item-id="'form' + item.mark">
                        <view :class="'title ' + (item.must ? 'must' : '')">{{ item.title }}:</view>
                        <text class="phone-text">{{ item.val || '未填写' }}</text>
                        <button open-type="getPhoneNumber" @getphonenumber="bindGetPhoneNumber" class="btn phone-button" :data-idx="index">
                            {{ item.val ? '一键修改手机号' : '一键填写手机号' }}
                        </button>
                    </view>
                    <view v-if="item.focus" class="hint-desc error">{{ item.focus }}</view>
                    <view v-if="item.ext.hint" class="hint-desc info">{{ item.ext.hint }}</view>
                </block>

                <block v-else-if="item.type == 'mobile' && !mobileCheck">
                    <view class="form-group" :item-id="'form' + item.mark">
                        <view :class="'title ' + (item.must ? 'must' : '')">{{ item.title }}:</view>
                        <input
                            :disabled="item.disabled"
                            :placeholder="item.desc || '请填写' + item.title"
                            placeholder-class="phc"
                            maxlength="11"
                            @input="bindLineBlur"
                            :data-idx="index"
                            :value="item.val"
                        />
                    </view>
                    <view v-if="item.focus" class="hint-desc error">{{ item.focus }}</view>
                    <view v-if="item.ext.hint" class="hint-desc info">{{ item.ext.hint }}</view>
                </block>
            </block>
        </block>

        <cmpt-modal
            :show.sync="showCheckModal"
            type="longdialog"
            title="请核对填写的信息"
            @click="bindSubmitCmpt"
            class="modal-check-info"
            slot-class="slot-class"
            cancelText="返回修改"
            confirmText="确认提交"
        >
            <view class="item" v-for="(item, index) in formsClone" :key="index">
                <view class="title">{{ item.title }}：</view>

                <view class="content" v-if="item.val === true || item.val === false">{{ item.val ? '是' : '否' }}</view>

                <view class="content" v-else>{{ item.val }}</view>
            </view>
        </cmpt-modal>
    </view>
</template>
<script module="wxs" lang="wxs">
function calContent(content) {
	var imgCnt = 0;
	var textCnt = 0;
	for (var k = 0; k < content.length; k++) {
		if (content[k].type == 'img') imgCnt++;
		if (content[k].type == 'text') textCnt++;
	}
	if (imgCnt || textCnt) {
		return textCnt + '段文字，' + imgCnt + '张图片';
	}
	else
		return '未填写';
}

module.exports = {
	calContent: calContent,
};
</script>
<script>
import cmptCarNumber from '@/cmpts/public/car_number/car_number_cmpt';
import cmptCheckbox from '@/cmpts/public/checkbox/checkbox_cmpt';
import cmptRadio from '@/cmpts/public/radio/radio_cmpt';
import cmptRows from '@/cmpts/public/rows/rows_cmpt';
import cmptImgUpload from '@/cmpts/public/img/img_upload_cmpt';
import cmptFileUpload from '@/cmpts/public/file/file_upload_cmpt';
const pageHelper = require('../../../../helper/page_helper.js');
const helper = require('../../../../helper/helper.js');
const cloudHelper = require('../../../../helper/cloud_helper.js');
const cacheHelper = require('../../../../helper/cache_helper.js');
const dataHelper = require('../../../../helper/data_helper.js');
const formSetHelper = require('../form_set_helper.js');
const rowsSetHelper = require('../../rows/rows_set_helper.js');
const validate = require('../../../../helper/validate.js');
const setting = require('../../../../setting/setting.js');
const CACHE_FORM_SHOW_KEY = 'FORM_SHOW_CMPT';
const CACHE_FORM_SHOW_TIME = 31536000;
export default {
    components: {
        cmptCarNumber,
        cmptCheckbox,
        cmptRadio,
        cmptRows,
        cmptImgUpload,
        cmptFileUpload
    },
    data() {
        return {
            cacheName: '',
            isLoad: false,
            showCheckModal: false,
            mobileCheck: setting.MOBILE_CHECK,
            formsName: '',
            fieldsName: '',
            itm: '',
            formsClone: '',
            fieldsClone: ''
        };
    },
    options: {
        addGlobalClass: true,
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    /**
     * 组件的属性列表
     */
    props: {
        mark: {
            // 组件标识，用于区分缓存
            type: String,
            default: ''
        },
        source: {
            // 来源 admin /user
            type: String,
            default: 'user'
        },
        fields: {
            // 表单字段属性{mark,val,type,must,selectOptions,desc,title}
            type: Array,
            default: () => []
        },
        forms: {
            // 表单值
            type: Array,
            default: () => [] // {mark,title,val,type}
        },

        doShow: {
            //仅仅显示
            type: Boolean,
            default: false
        },
        isConfirm: {
            //是否显示核对信息modal
            type: Boolean,
            default: true
        },
        isCacheMatch: {
            //是否开启缓存匹配
            type: Boolean,
            default: true
        },
        isDefMatch: {
            //是否开启缺省值匹配
            type: Boolean,
            default: true
        }
    },
    mounted() {
        // 处理小程序 attached 生命周期
        this.attached();
        // 处理小程序 ready 生命周期
        this.$nextTick(() => this.ready());
    },
    destroyed: function () {
        // 在组件实例被从页面节点树移除时执行
    },
    /**
     * 组件的方法列表
     */
    methods: {
        ready: function () {
            if (this.isCacheMatch) {
                let cacheName = CACHE_FORM_SHOW_KEY + '_' + this.mark;
                this.setData({
                    cacheName
                });
            }
            this.initFun();
        },

        attached: function () {},

        reload: function () {
            // 重新加载，如果没有设置扩展字段，则全部form属性清空
            this.initFun();
        },

        initFun: function () {
            let fields = formSetHelper.initFields(this.fields);
            let newForms = [];
            for (let k = 0; k < fields.length; k++) {
                let node = {};
                node.mark = fields[k].mark;
                node.title = fields[k].title;
                node.type = fields[k].type;

                // 判断是否有表单值（依次从表单值，缓存，默认值）
                let val = this.getOneValFormFun(fields[k].mark, fields[k].title, fields[k].type);
                if (val === null) {
                    val = '';
                }

                // 数据类型修正
                val = this.fixTypeFun(fields[k].type, val);
                node.val = val;
                fields[k].val = val;

                // rows类型
                if (node.type == 'rows') {
                    //如果不足最低，则补足
                    if (!helper.isDefined(fields[k].ext.minCnt)) {
                        fields[k].ext.minCnt = 2;
                    }
                    if (val.length < fields[k].ext.minCnt) {
                        let step = fields[k].ext.minCnt - val.length;
                        for (let n = 1; n <= step; n++) {
                            val.push(dataHelper.deepClone(rowsSetHelper.BASE_ROW));
                        }
                    }
                    node.val = val;
                    fields[k].val = val;

                    // 增加一个条目数量（不用数据去渲染，仅渲染条目数量）
                    fields[k].rowsCnt = val.length;
                }
                newForms.push(node);
            }
            this.setData({
                formsClone: newForms,
                fieldsClone: fields,
                isLoad: true
            });
            //this.triggerEvent('forms', newForms);
        },

        // 根据mark和type获取上次值或者缓存值或者缺省值
        getOneValFormFun: function (mark, title, type) {
            if (type == 'line') {
                return title;
            }
            if (type == 'slot') {
                return '';
            }
            let ret = null;

            // **** 对传入的默认值匹配
            let forms = this.forms;
            if (!forms || !Array.isArray(forms)) {
                forms = [];
            }
            for (let k = 0; k < forms.length; k++) {
                if (forms[k].mark == mark && forms[k].type == type) {
                    // 优先匹配mark
                    ret = forms[k].val;
                    break;
                }
                if (forms[k].title == title && forms[k].type == type) {
                    // 再则匹配名称
                    ret = forms[k].val;
                    break;
                }
                if (type == 'mobile' && forms[k].type == 'mobile') {
                    ret = forms[k].val;
                    break;
                }
                if (type == 'idcard' && forms[k].type == 'idcard') {
                    ret = forms[k].val;
                    break;
                }
            }
            if (ret === undefined) {
                ret = null;
            }

            // **** 对缓存匹配 图片和富文本,文件和多条目不读取缓存
            if (ret === null && this.isCacheMatch && type != 'image' && type != 'content' && type != 'file' && type != 'rows') {
                let caches = cacheHelper.get(this.cacheName);
                if (caches && Array.isArray(caches)) {
                    for (let k = 0; k < caches.length; k++) {
                        if (caches[k].mark == mark && caches[k].type == type) {
                            // 优先匹配mark
                            ret = caches[k].val;
                            break;
                        }
                        if (caches[k].title == title && caches[k].type == type) {
                            // 再则匹配名称
                            ret = caches[k].val;
                            break;
                        }
                        if (type == 'mobile' && caches[k].type == 'mobile') {
                            ret = caches[k].val;
                            break;
                        }
                        if (type == 'idcard' && caches[k].type == 'idcard') {
                            ret = caches[k].val;
                            break;
                        }
                    }
                }
            }
            if (ret === undefined) {
                ret = null;
            }

            // 缺省值匹配
            if (ret === null && this.isDefMatch) {
                let fields = this.fields;
                for (let k = 0; k < fields.length; k++) {
                    if (
                        fields[k].mark == mark &&
                        helper.isDefined(fields[k].def) &&
                        fields[k].def != null // 默认值为空
                    ) {
                        ret = fields[k].def;
                        break;
                    }
                }
            }
            return ret;
        },

        // 原始form没有对应值, 给予默认值; 或者类型不对，修正
        fixTypeFun: function (type, val) {
            if (type == 'line' || type == 'slot') {
                return val;
            }
            if (type != 'switch' && type != 'checkbox' && type != 'area' && type != 'content' && type != 'file' && type != 'image' && type != 'rows') {
                // switch(bool),checkbox(array), area(array), content(array), file(array) 不处理，其他做类型处理

                if (typeof val === 'object' && !Array.isArray(val)) {
                    // 对象要被处理为空串，数组做trim不处理(typeof数组也是object)
                    val = '';
                } else if (val === undefined) {
                    // 当form里没有值的情况
                    val = '';
                } else {
                    val = String(val).trim();
                } // 前后去空格
            }

            // 原始form 有对应值，但是类型不正确
            switch (type) {
                case 'image': {
                    // 不支持字符串缺省值
                    if (!Array.isArray(val)) {
                        return [];
                    }
                    break;
                }
                case 'content': {
                    // 支持字符串缺省值
                    if (typeof val === 'string') {
                        if (val) {
                            return [
                                {
                                    type: 'text',
                                    val: val.trim()
                                }
                            ];
                        } else {
                            return [];
                        }
                    }
                    if (!Array.isArray(val)) {
                        return [];
                    }
                    break;
                }
                case 'file': {
                    // 支持字符串缺省值
                    if (typeof val === 'string') {
                        return [];
                    }
                    if (!Array.isArray(val)) {
                        return [];
                    }
                    break;
                }
                case 'rows': {
                    // 多条目默认一条
                    if (!Array.isArray(val)) {
                        return [dataHelper.deepClone(rowsSetHelper.BASE_ROW)];
                    }
                    break;
                }
                case 'area': {
                    if (!Array.isArray(val) || val.length == 0) {
                        return '';
                    } //TODO?
                    break;
                }
                case 'switch': {
                    if (typeof val != 'boolean') {
                        return true;
                    }
                    break;
                }
                case 'checkbox': {
                    if (!Array.isArray(val)) {
                        return [String(val).trim()];
                    } //尝试转为数组来匹配
                    break;
                }
                case 'year': {
                    if (!val || validate.checkYear(val)) {
                        return '';
                    }
                    break;
                }
                case 'month': {
                    if (!val || validate.checkYearMonth(val)) {
                        return '';
                    }
                    break;
                }
                case 'date': {
                    if (!val || validate.checkDate(val)) {
                        return '';
                    }
                    break;
                }
                case 'hourminute': {
                    if (!val || validate.checkHourMinute(val)) {
                        return '';
                    }
                    break;
                }
                case 'int': {
                    // 整数(字符形式)
                    if (!val || validate.checkInt(val)) {
                        return '';
                    }
                    break;
                }
                case 'digit': {
                    // 小数(字符形式)
                    if (!val || validate.checkDigit(val)) {
                        return '';
                    }
                    break;
                }
                default: {
                }
            }
            return val;
        },

        setFormFun: function (idx, val, isSetData = true) {
            let forms = this.forms;
            let fields = this.fields;
            fields[idx].val = val;
            forms[idx].val = val;

            // TODO是否需要，影响性能
            let typeArr = ['rows', 'text', 'textarea', 'carnumber', 'digit', 'idcard', 'int', 'tag'];

            // 去掉focus
            for (let k = 0; k < fields.length; k++) {
                if (helper.isDefined(fields[k].focus)) {
                    delete fields[k].focus;
                }
            }

            // 提高性能
            let formsName = 'forms[' + idx + '].val';
            let fieldsName = 'fields[' + idx + '].val';

            // 是否渲染到页面
            if (isSetData) {
                this.setData({
                    [formsName]: val,
                    [fieldsName]: val
                });
            } else {
                // rows的输入不渲染，但增加一个条目数量
                if (this.forms[idx].type == 'rows') {
                    this.setData({
                        ['fields[' + idx + '].rowsCnt']: val.length
                    });
                } else {
                    // 不需要在界面上set数据 eg.rows的输入不渲染
                    this[formsName] = val;
                    this[fieldsName] = val;
                }
            }

            //this.triggerEvent('forms', forms);
        },

        bindImgUploadCmpt: function (e, _dataset) {
            /* ---处理dataset begin--- */
            this.handleDataset(e, _dataset);
            /* ---处理dataset end--- */
            let idx = pageHelper.dataset(e, 'idx');
            let val = e.detail;
            this.setFormFun(idx, val);
        },

        bindFileUploadCmpt: function (e, _dataset) {
            /* ---处理dataset begin--- */
            this.handleDataset(e, _dataset);
            /* ---处理dataset end--- */
            let idx = pageHelper.dataset(e, 'idx');
            let val = e.detail;
            this.setFormFun(idx, val);
        },

        bindLineBlur: function (e, _dataset) {
            /* ---处理dataset begin--- */
            this.handleDataset(e, _dataset);
            /* ---处理dataset end--- */
            let idx = pageHelper.dataset(e, 'idx');
            let val = e.detail.value.trim();
            this.setFormFun(idx, val);
        },

        bindMultiBlur: function (e) {
            let idx = pageHelper.dataset(e, 'idx');
            let val = e.detail.value;
            this.setFormFun(idx, val);
        },

        bindDayChange: function (e) {
            let idx = pageHelper.dataset(e, 'idx');
            let val = e.detail.value.trim();
            this.setFormFun(idx, val);
        },

        bindAreaChange: function (e, _dataset) {
            /* ---处理dataset begin--- */
            this.handleDataset(e, _dataset);
            /* ---处理dataset end--- */
            let idx = pageHelper.dataset(e, 'idx');
            let val = e.detail.value;
            this.setFormFun(idx, val);
        },

        bindSelectCmpt: function (e, _dataset) {
            /* ---处理dataset begin--- */
            this.handleDataset(e, _dataset);
            /* ---处理dataset end--- */
            let idx = pageHelper.dataset(e, 'idx');
            let val = e.detail.trim();
            this.setFormFun(idx, val);
        },

        bindCheckBoxCmpt: function (e, _dataset) {
            /* ---处理dataset begin--- */
            this.handleDataset(e, _dataset);
            /* ---处理dataset end--- */
            let idx = pageHelper.dataset(e, 'idx');
            let val = e.detail;
            this.setFormFun(idx, val);
        },

        bindRadioCmpt: function (e, _dataset) {
            /* ---处理dataset begin--- */
            this.handleDataset(e, _dataset);
            /* ---处理dataset end--- */
            let idx = pageHelper.dataset(e, 'idx');
            let val = e.detail;
            this.setFormFun(idx, val);
        },

        bindRowsCmpt: function (e, _dataset) {
            /* ---处理dataset begin--- */
            this.handleDataset(e, _dataset);
            /* ---处理dataset end--- */
            let idx = pageHelper.dataset(e, 'idx');
            let val = e.detail;
            this.setFormFun(idx, val, false); //rows为独立控件，不需要在界面上set数据
        },

        switchModel: function (e) {
            let idx = pageHelper.dataset(e, 'idx');
            let val = e.detail.value;
            this.setFormFun(idx, val);
        },

        bindGetPhoneNumber: async function (e) {
            if (e.detail.errMsg == 'getPhoneNumber:ok') {
                let cloudID = e.detail.cloudID;
                let params = {
                    cloudID
                };
                let opt = {
                    title: '手机验证中'
                };
                await cloudHelper.callCloudSumbit('passport/phone', params, opt).then((res) => {
                    let phone = res.data;
                    if (!phone || phone.length < 11) {
                        uni.showToast({
                            title: '手机号码获取失败，请重新绑定手机号码',
                            icon: 'none',
                            duration: 2000
                        });
                    } else {
                        let idx = pageHelper.dataset(e, 'idx');
                        this.setFormFun(idx, phone);
                    }
                });
            } else {
                uni.showToast({
                    title: '手机号码获取失败，请重新绑定手机号码',
                    icon: 'none'
                });
            }
        },

        checkForms: function () {
            // 写缓存
            if (this.isCacheMatch) {
                cacheHelper.set(this.cacheName, this.forms, CACHE_FORM_SHOW_TIME);
            }
            let ret = formSetHelper.checkForm(this.fields, this.forms, this);
            this.setData({
                fieldsClone: this.fields
            });
            if (!ret) {
                return;
            }
            if (this.isConfirm) {
                //是否显示确认信息
                this.setData({
                    showCheckModal: true
                });
            } else {
                cacheHelper.remove(this.cacheName);
                this.$emit('submit', {
                    detail: this.forms
                });
            }
        },

        bindSubmitCmpt: function () {
            this.setData({
                showCheckModal: false
            });
            cacheHelper.remove(this.cacheName);
            this.$emit('submit', {
                detail: this.forms
            });
        },

        url: function (e) {
            pageHelper.url(e, this);
        },

        getForms: function (isCheckForm = false) {
            if (isCheckForm) {
                // 是否数据校验
                let ret = formSetHelper.checkForm(this.fields, this.forms, this);
                this.setData({
                    fieldsClone: this.fields
                });
                if (!ret) {
                    return false;
                }
            }

            // 写缓存
            if (this.isCacheMatch) {
                cacheHelper.set(this.cacheName, this.forms, CACHE_FORM_SHOW_TIME);
            }
            return this.forms;
        },

        getOneFormVal(formName) {
            // 取某个表单值
            let forms = this.forms;
            for (let k = 0; k < forms.length; k++) {
                if (formName == forms[k].mark) {
                    return forms[k].val;
                }
            }
            return null;
        },

        setOneFormVal(formName, val) {
            // 设定某个表单值
            let forms = this.forms;
            let fields = this.fields;
            for (let k = 0; k < forms.length; k++) {
                if (formName == forms[k].mark) {
                    forms[k].val = val;
                    fields[k].val = val;
                    break;
                }
            }
            this.setData({
                fieldsClone: fields,
                formsClone: forms
            });
        }
    },
    created: function () {},
    watch: {
        forms: {
            handler: function (newVal, oldVal) {
                this.formsClone = newVal;
            },

            immediate: true,
            deep: true
        },

        fields: {
            handler: function (newVal, oldVal) {
                this.fieldsClone = newVal;
            },

            immediate: true,
            deep: true
        }
    }
};
</script>
<style>
.form-group .picker-base {
    flex: 1;
    text-align: right;
    height: 60rpx;
    line-height: 60rpx;
}

.form-group .picker-select {
    padding-right: 40rpx;
    overflow: hidden;
    position: relative;
}

.form-group .phone-text {
    font-size: 30rpx;
    color: #555;
    flex: 1;
    text-align: left;
}

.form-group .title {
    height: unset !important;
    min-height: 60rpx;
}

.form-group.memo {
    min-height: unset;
    padding: 15rpx 30rpx;
    font-size: 24rpx;
    color: #777;
}

.form-group-line {
    width: 100%;
    padding: 1rpx 30rpx;
    display: flex;
    align-items: center;
    min-height: 100rpx;
    justify-content: center;
    position: relative;
    color: #888;
    font-size: 28rpx;
    margin-top: 10rpx;
}

/* 展示型 */
.form-group-show {
    display: flex;
    align-items: flex-start;
}

.form-group-show .form-group-show-text {
    flex: 1;
    padding: 0rpx 0rpx;
    text-align: left;
    display: flex;
    flex-wrap: wrap;
    min-height: 60rpx;
    align-items: center;
}

.form-group-show .form-group-show-img {
    width: 100rpx;
    height: 100rpx;
    margin-right: 10rpx;
    margin-bottom: 10rpx;
    border-radius: 5rpx;
}

/* 核对信息窗口 */
.modal-check-info {
    width: 100%;
}

.slot-class {
    padding: 0 20rpx 30rpx;
}

.modal-check-info .item {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    line-height: 1.8;
    font-size: 30rpx;
    border-bottom: 1rpx dotted #ddd;
    color: #000;
    padding: 10rpx 10rpx;
}

.modal-check-info .item:nth-child(odd) {
    background-color: #f8f8f8;
}

.modal-check-info .item:last-child {
    border-bottom: 0rpx;
}

.modal-check-info .item .title {
    font-weight: bold;
    max-width: 150rpx;
    margin-right: 20rpx;
    text-align: left;
}

.modal-check-info .item .content {
    flex: 1;
    color: #333;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: left;
}
</style>
