<template>
    <view class="main">
        <form>
            <view class="form-box shadow">
                <view class="form-group">
                    <view class="title must">字段名称</view>
                    <input placeholder="请输入字段名称 (必填，60字以内)" maxlength="60" placeholder-class="phc" v-model="formTitle" />
                </view>
            </view>

            <view class="form-box shadow">
                <view class="form-group">
                    <view class="title must">
                        是否必填
                        <text class="title-info">(为空时不能提交)</text>
                    </view>
                    <switch v-if="formMust" @change="switchModel" data-item="formMust" class="green sm" :checked="true"></switch>
                    <switch v-else-if="!formMust" @change="switchModel" data-item="formMust" class="green sm"></switch>
                </view>

                <view class="form-group">
                    <view class="title must">字段填写类型</view>
                    <cmpt-picker style="flex: 1" :item.sync="formType" :sourceData="typeOptions" />
                </view>

                <block v-if="formType == 'text' || formType == 'textarea' || formType == 'int' || formType == 'digit'">
                    <view class="form-group">
                        <view class="title must">最小需填字数</view>
                        <cmpt-picker style="flex: 1" :item.sync="formMin" :sourceData="minOptions" />
                    </view>
                    <view class="form-group">
                        <view class="title must">最大可填字数</view>
                        <cmpt-picker style="flex: 1" :item.sync="formMax" :sourceData="maxOptions" />
                    </view>
                </block>

                <!-- select begin -->
                <block v-if="formType == 'select' || formType == 'checkbox'">
                    <view class="form-group">
                        <view class="title must" v-if="formType == 'select'">单项选择-选项配置</view>
                        <view class="title must" v-if="formType == 'checkbox'">多项选择-选项配置</view>
                    </view>

                    <view class="form-group" v-for="(item, index) in formSelectOptions" :key="index">
                        <input
                            @input="bindSelectOptionsBlur"
                            :data-idx="index"
                            :placeholder="'请输入选项' + (index + 1) + ' （30字以内)'"
                            maxlength="30"
                            placeholder-class="phc"
                            :value="item"
                        />

                        <text @tap="bindDelSelectOptionsTap" :data-idx="index" class="icon-roundclose margin-left-xs text-red select-close"></text>
                    </view>
                    <view class="form-group" @tap="bindAddSelectOptionsTap">
                        <view class="title text-blue" style="font-weight: normal; font-size: 30rpx">
                            <text class="icon-roundadd margin-right-s select-close" style="font-size: 35rpx"></text>
                            添加新选项
                        </view>
                    </view>
                </block>

                <view v-if="formType == 'checkbox'" class="form-group">
                    <view class="title must">多项选择-最少选中项数</view>
                    <cmpt-picker style="flex: 1" :item.sync="formCheckBoxLimit" :sourceData="checkBoxLimitOptions" />
                </view>
                <!-- select END -->
            </view>

            <view class="form-box shadow">
                <view class="form-group">
                    <view class="title">
                        填写说明
                        <text class="text-grey text-normal">(选填)</text>
                    </view>
                </view>
                <view class="form-group">
                    <input placeholder="提示用户该字段如何填写 (选填，30字以内)" maxlength="30" placeholder-class="phc" v-model="formDesc" />
                </view>
                <view v-if="formDescFocus" class="hint-desc error">{{ formDescFocus }}</view>
            </view>

            <view :class="'padding-bottom flex  ' + (index == -1 ? 'flex-direction' : 'oprt')">
                <button v-if="index > -1" @tap="bindDelTap" class="btn bg-red margin-top-s text-bold large">删除</button>
                <button @tap="bindSubmitTap" class="btn bg-blue text-white margin-top-s text-bold large">保存</button>
            </view>
        </form>
    </view>
</template>

<script>
import cmptPickerMulti from '@/cmpts/public/picker_multi/picker_multi_cmpt';
const pageHelper = require('../../../../../helper/page_helper.js');
const dataHelper = require('../../../../../helper/data_helper.js');
const helper = require('../../../../../helper/helper.js');
const formSetHelper = require('../../form_set_helper.js');
let _parentFormSet = null;
export default {
    components: {
        cmptPickerMulti
    },
    data() {
        return {
            index: -1,

            // 父页面索引 -1则为新加

            typeOptions: formSetHelper.getTypeOptions(),

            onlySetOptions: formSetHelper.getOnlySetOptions(),
            maxOptions: dataHelper.getSelectOptions(
                '0=0个字,1=1个字,2=2个字,3=3个字,4=4个字,5=5个字,6=6个字,7=7个字,8=8个字,9=9个字,10=10个字,11=11个字,12=12个字,13=13个字,14=14个字,15=15个字,15=15个字,16=16个字,17=17个字,18=18个字,19=19个字,20=20个字,25=25个字,30=30个字,40=40个字,50=50个字,100=100个字,200=200个字,500=500个字,1000=1000个字,2000=2000个字'
            ),
            minOptions: dataHelper.getSelectOptions(
                '0=0个字,1=1个字,2=2个字,3=3个字,4=4个字,5=5个字,6=6个字,7=7个字,8=8个字,9=9个字,10=10个字,11=11个字,12=12个字,13=13个字,14=14个字,15=15个字,15=15个字,16=16个字,17=17个字,18=18个字,19=19个字,20=20个字,25=25个字,30=30个字,40=40个字,50=50个字,100=100个字,200=200个字,500=500个字'
            ),
            checkBoxLimitOptions: dataHelper.getSelectOptions(
                '0=0项,1=1项,2=2项,3=3项,4=4项,5=5项,6=6项,7=7项,8=8项,9=9项,10=10项,11=11项,12=12项,13=13项,14=14项,15=15项,16=16项,17=17项,18=18项,19=19项,20=20项'
            ),
            onlySetDesc: '',

            // 基本属性
            formMark: '',

            formType: 'text',
            formTitle: '',
            formDesc: '',
            formMust: true,
            formMax: 50,
            formMin: 0,

            formOnlySet: {
                mode: 'all',
                cnt: -1
            },

            // type=select
            formSelectOptions: ['', ''],

            // type=checkbox
            formCheckBoxLimit: 2,

            formDescFocus: []
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            formMark: formSetHelper.mark(),
            onlySetDesc: formSetHelper.getOnlySetDesc(this.formOnlySet)
        });
        let parent = pageHelper.getPrevPage(2);
        if (!parent) {
            return;
        }
        _parentFormSet = parent.zpSelectComponent('#form-set');
        if (options && helper.isDefined(options.idx)) {
            let index = options.idx;
            let fields = _parentFormSet.get();
            let node = fields[index];
            if (!node.mark) {
                node.mark = formSetHelper.mark();
            }
            this.setData({
                index,
                formMark: node.mark,
                formType: node.type,
                formTitle: node.title,
                formDesc: node.desc,
                formMust: node.must,
                formMax: node.max,
                formMin: node.min,
                formOnlySet: node.onlySet,
                formSelectOptions: node.selectOptions,
                formCheckBoxLimit: node.checkBoxLimit,
                onlySetDesc: formSetHelper.getOnlySetDesc(node.onlySet)
            });
            uni.setNavigationBarTitle({
                title: '字段编辑'
            });
        }
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
        // 重复次数
        bindOnlySetCmpt: function (e) {
            let formOnlySet = {};
            formOnlySet.mode = e.detail[0];
            formOnlySet.cnt = e.detail[1];
            this.setData({
                formOnlySet,
                onlySetDesc: formSetHelper.getOnlySetDesc(formOnlySet)
            });
        },

        bindDelTap: function (e) {
            if (this.index == -1) {
                return;
            }
            let callback = () => {
                let fields = _parentFormSet.get();
                fields.splice(this.index, 1);
                _parentFormSet.set(fields);
                uni.navigateBack();
            };
            pageHelper.showConfirm('确定要删除当前字段吗？', callback);
        },

        bindSubmitTap: function (e) {
            if (this.formTitle.length < 1) {
                return pageHelper.showModal('字段名称必填哦');
            }
            if (this.formTitle.length > 60) {
                return pageHelper.showModal('字段名称必不能超过60个字');
            }
            if (this.formDesc.length > 30) {
                return pageHelper.showModal('填写说明不能超过30个字');
            }
            if (this.formType.length < 1) {
                return pageHelper.showModal('字段填写类型必须选择哦');
            }
            let formType = this.formType;
            if (formType == 'select' || formType == 'checkbox') {
                // 下拉框
                let formSelectOptions = this.formSelectOptions;
                for (let k = 0; k < formSelectOptions.length; k++) {
                    if (formSelectOptions[k].length < 1) {
                        return pageHelper.showModal('选项' + (Number(k) + 1) + '还没填哦');
                    }
                    if (formSelectOptions[k].length > 30) {
                        return pageHelper.showModal('选项' + (Number(k) + 1) + '不能超过30个字，精简一点!');
                    }
                }
                this.formMax = 50;
                this.formMin = 0;
                if (formType == 'select') {
                    this.formCheckBoxLimit = 2;
                }
            } else if (formType == 'mobile') {
                //非本类型的排除
                this.formSelectOptions = ['', ''];
                this.formCheckBoxLimit = 2;
                this.formMax = 11;
                this.formMin = 11;
            } else {
                //非本类型的排除
                this.formSelectOptions = ['', ''];
                this.formCheckBoxLimit = 2;
                if (formType != 'text' && formType != 'textarea' && formType != 'int' && formType != 'digit') {
                    this.formMax = 50;
                    this.formMin = 0;
                }
            }
            let parent = pageHelper.getPrevPage(2);
            if (!parent) {
                return;
            }
            let fields = _parentFormSet.get();
            let node = {
                mark: this.formMark,
                title: this.formTitle,
                desc: this.formDesc,
                type: this.formType,
                must: this.formMust,
                max: Number(this.formMax),
                min: Number(this.formMin),
                onlySet: this.formOnlySet,
                selectOptions: this.formSelectOptions,
                checkBoxLimit: Number(this.formCheckBoxLimit)
            };
            node = formSetHelper.initFieldOne(node);
            if (this.index == -1) {
                fields.push(node); //新的
            } else {
                fields[this.index] = node; //修改的
            }

            _parentFormSet.set(fields);
            uni.navigateBack();
        },

        switchModel: function (e) {
            pageHelper.switchModel(this, e, 'bool');
        },

        bindSelectOptionsBlur: function (e) {
            // 多选项目的输入
            let idx = pageHelper.dataset(e, 'idx');
            let val = e.detail.value.trim();
            let formSelectOptions = this.formSelectOptions;
            formSelectOptions[idx] = val;
            /*
      this.setData({
          formSelectOptions
      });*/
        },

        bindDelSelectOptionsTap: function (e) {
            let formSelectOptions = this.formSelectOptions;
            if (formSelectOptions.length <= 2) {
                return pageHelper.showModal('至少2个选项');
            }
            let callback = () => {
                let idx = pageHelper.dataset(e, 'idx');
                formSelectOptions.splice(idx, 1);
                this.setData({
                    formSelectOptions
                });
            };
            pageHelper.showConfirm('确定删除该项吗？', callback);
        },

        bindAddSelectOptionsTap: function (e) {
            let formSelectOptions = this.formSelectOptions;
            if (formSelectOptions.length >= 20) {
                return pageHelper.showModal('最多可以添加20个选项');
            }
            formSelectOptions.push('');
            this.setData({
                formSelectOptions
            });
        }
    }
};
</script>
<style>
.main {
    margin-bottom: 150rpx;
}

.oprt {
    display: flex;
    width: 100%;
    justify-content: space-around;
}

.oprt button {
    width: 45%;
}

.select-close {
    width: 60rpx;
    font-size: 40rpx !important;
    font-weight: bold;
    text-align: right;
}

.title-desc {
    padding-left: 24rpx;
    color: #aaa;
    padding-bottom: 30rpx;
    border-bottom: 1rpx solid #eee;
}

.title-info {
    margin-left: 4rpx;
    color: #aaa;
    font-weight: normal;
    font-size: 24rpx;
}
</style>
