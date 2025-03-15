<template>
    <view>
        <block v-for="(item, index) in listClone" :key="index">
            <view class="form-group form-rows-item" style="padding-right: 0rpx; padding-left: 5rpx">
                <view :class="'line1 ' + (titleMode == 'textarea' ? 'line2' : '')">
                    <view v-if="hasPic" @tap="bindPicTap" :data-idx="index" class="pic">
                        <image v-if="item.pic" mode="aspectFill" class="loading" :src="item.pic" />
                        <text v-else class="icon-cameraadd"></text>
                    </view>

                    <text v-if="hasVal" class="text-bold">{{ titleName }}{{ index + 1 }}标题：</text>
                    <input
                        v-if="titleMode == 'input'"
                        @input="bindTitleBlur"
                        @blur="bindTitleBlur"
                        :data-idx="index"
                        :placeholder="'请输入' + titleName + (index + 1) + (hasVal ? '标题' : '')"
                        :disabled="!item.edit"
                        maxlength="200"
                        :focus="item.focus"
                        placeholder-class="phc"
                        :value="item.title"
                    />
                    <textarea
                        v-if="titleMode == 'textarea'"
                        @input="bindTitleBlur"
                        @blur="bindTitleBlur"
                        :data-idx="index"
                        :placeholder="'请输入' + titleName + (index + 1) + (hasVal ? '标题' : '')"
                        :disabled="!item.edit"
                        style="min-height: 200rpx; padding: 20rpx 0"
                        maxlength="500"
                        :auto-height="true"
                        :focus="item.focus"
                        placeholder-class="phc"
                        :value="item.title"
                    ></textarea>

                    <view
                        v-if="hasDetail"
                        @tap="url"
                        :data-url="
                            '/cmpts/public/form/form_show/content/form_show_content?from=rows&cmptId=' +
                            mark +
                            '&cmptFormName=' +
                            index +
                            '&cmptParentId=' +
                            parentMark +
                            '&upDirectDir=' +
                            upDirectDirClone
                        "
                        class="detail-set text-blue"
                    >
                        <text class="icon-edit"></text>
                        <text :class="item.detail.length == 0 ? 'text-orange' : ''">{{ detailName }}{{ item.detail.length == 0 ? '未填' : '' }}</text>
                    </view>
                    <view v-if="item.edit" @tap="bindDelTap" :data-idx="index" class="icon-roundclose margin-left-xs text-red select-close"></view>
                </view>
                <block v-if="hasVal">
                    <view class="line1 line2" v-if="valMode == 'input'">
                        <text class="tit">{{ valName }}：</text>
                        <input
                            @input="bindValBlur"
                            @blur="bindValBlur"
                            :data-idx="index"
                            :placeholder="'请输入' + valName + (index + 1) + ' '"
                            maxlength="200"
                            :focus="item.focus"
                            placeholder-class="phc"
                            :value="item.val"
                        />
                    </view>
                    <view class="line1 line3" v-if="valMode == 'textarea'">
                        <view class="tit">{{ valName }}：</view>
                        <textarea
                            @input="bindValBlur"
                            @blur="bindValBlur"
                            :data-idx="index"
                            :placeholder="'请输入' + valName + (index + 1)"
                            style="min-height: 120rpx"
                            :auto-height="true"
                            :focus="item.focus"
                            placeholder-class="phc"
                            :value="item.val"
                        ></textarea>
                        <view class="no">{{ index + 1 }}</view>
                    </view>
                </block>
            </view>

            <view v-if="item.focus" class="hint-desc error">{{ item.focus }}</view>
        </block>

        <view class="form-group form-rows-add" @tap="bindAddTap">
            <view>
                <text class="icon-roundaddfill margin-right-xs"></text>
                添加新{{ titleName }}
            </view>
        </view>
    </view>
</template>

<script>
const pageHelper = require('../../../helper/page_helper.js');
const dataHelper = require('../../../helper/data_helper.js');
const helper = require('../../../helper/helper.js');
const cloudHelper = require('../../../helper/cloud_helper.js');
const rowsSetHelper = require('./rows_set_helper.js');
export default {
    data() {
        return {
            listClone: '',
            upDirectDirClone: '',
            isDemoClone: false
        };
    },
    options: {
        addGlobalClass: true
    },
    /**
     * 组件的属性列表
     */
    props: {
        list: {
            type: Array,
            default: () => []
        },
        ext: {
            //对于所有参数的集中传入
            type: Object,
            default: () => ({})
        },
        hasPic: {
            //是否带题图
            type: Boolean,
            default: false
        },
        hasDetail: {
            //是否带详情
            type: Boolean,
            default: false
        },
        hasVal: {
            //是否同时填值
            type: Boolean,
            default: false
        },
        checkDetail: {
            //详情是否校验
            type: Boolean,
            default: false
        },
        checkPic: {
            //图片是否校验
            type: Boolean,
            default: false
        },
        maxCnt: {
            //最大数量
            type: Number,
            default: 100
        },
        minCnt: {
            //最小数量
            type: Number,
            default: 2
        },
        titleName: {
            //标题
            type: String,
            default: '条目'
        },
        valName: {
            //内容名
            type: String,
            default: '内容'
        },
        picName: {
            //题图名
            type: String,
            default: '图片'
        },
        detailName: {
            //详情名
            type: String,
            default: '详情'
        },
        isDemo: {
            //是否演示
            type: Boolean,
            default: true
        },
        titleMode: {
            type: String,
            default: 'input'
        },
        valMode: {
            //hasVal==true下填值模式 input textarea
            type: String,
            default: 'input'
        },
        mark: {
            //id标识
            type: String,
            default: 'rows'
        },
        parentMark: {
            //引用其的父组件id标识 一般为editor
            type: String,
            default: ''
        },
        upDirectDir: {
            //不为空：则在非测试模式下直接上传
            type: String,
            default: 'rows/' //editor/
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
            this.initFun();
        },

        attached: function () {},

        initFun: function () {
            let list = rowsSetHelper.fmtRows(this.list);
            this.$emit('change', {
                detail: list
            });
            this.setData({
                listClone: list
            });

            // ext集中参数传入
            let entries = Object.entries(this.ext);
            for (let k = 0; k < entries.length; k++) {
                this.setData({
                    [entries[k][0]]: entries[k][1]
                });
            }

            // 是否真实上传
            const setting = require('../../../setting/setting.js');
            if (setting.IS_DEMO) {
                this.setData({
                    upDirectDirClone: '',
                    isDemoClone: true
                });
            } else {
                this.setData({
                    isDemoClone: false
                });
            }

            // 如果不为空，则上传
            if (this.upDirectDir) {
                let upDirectDir = pageHelper.getPID() + '/' + this.upDirectDir;
                this.setData({
                    upDirectDirClone: upDirectDir
                });
            }
        },

        bindAddTap: function (e) {
            let list = this.list;
            //	if (list.length >= this.data.maxCnt) return pageHelper.showModal('最多可以添加' + this.data.maxCnt + '个' + this.data.titleName);

            let node = dataHelper.deepClone(rowsSetHelper.BASE_ROW);
            node.mark = rowsSetHelper.mark();
            list.push(node);
            this.setData({
                listClone: list
            });
            this.$emit('change', {
                detail: list
            });
        },

        bindDelTap: function (e) {
            let list = this.list;
            //	if (list.length <= this.data.minCnt) return pageHelper.showModal('至少填写' + this.data.minCnt + '个' + this.data.titleName);

            let callback = () => {
                let idx = pageHelper.dataset(e, 'idx');
                if (list[idx].edit === false) {
                    return pageHelper.showModal('本项不能删除');
                }
                list.splice(idx, 1);
                this.setData({
                    listClone: list
                });
                this.$emit('change', {
                    detail: list
                });
            };
            pageHelper.showConfirm('确定删除该项吗？', callback);
        },

        bindTitleBlur: function (e) {
            let idx = pageHelper.dataset(e, 'idx');
            let val = e.detail.value.trim();
            let list = this.list;
            if (list[idx].edit === false) {
                return pageHelper.showModal('本项不能修改');
            }
            list[idx].title = val;

            /*
    this.setData({
      list
    });*/

            this.$emit('change', {
                detail: list
            });
        },

        bindValBlur: function (e) {
            let idx = pageHelper.dataset(e, 'idx');
            let val = e.detail.value.trim();
            let list = this.list;
            list[idx].val = val;

            /*
    this.setData({
      list
    });*/

            this.$emit('change', {
                detail: list
            });
        },

        bindPicTap: function (e) {
            let idx = pageHelper.dataset(e, 'idx');
            let cb = () => {
                uni.chooseMedia({
                    count: 1,
                    mediaType: ['image'],
                    sourceType: ['album', 'camera'],
                    success: async (res) => {
                        let pic = res.tempFiles[0].tempFilePath;
                        let list = this.list;
                        if (!this.isDemo) {
                            uni.showLoading({
                                title: '上传中'
                            });
                            list[idx].pic = await cloudHelper.transTempPicOne(pic, 'rows/', '', false);
                            uni.hideLoading();
                        } else {
                            list[idx].pic = pic;
                        }
                        this.setData({
                            listClone: list
                        });
                        this.$emit('change', {
                            detail: list
                        });
                    }
                });
            };
            if (this.list[idx].pic) {
                uni.showActionSheet({
                    itemList: ['更换' + this.picName, '删除' + this.picName],
                    success: async (res) => {
                        switch (res.tapIndex) {
                            case 0: {
                                cb();
                                break;
                            }
                            case 1: {
                                let callback = () => {
                                    let list = this.list;
                                    list[idx].pic = '';
                                    this.setData({
                                        listClone: list
                                    });
                                    this.$emit('change', {
                                        detail: list
                                    });
                                };
                                pageHelper.showConfirm('确认删除?', callback);
                                break;
                            }
                        }
                    },
                    fail: function (res) {}
                });
            } else {
                cb();
            }
        },

        getOneFormVal: function (idx) {
            //提供给父节点读取 对应的富文本值
            return this.list[idx].detail;
        },

        setOneFormVal: function (idx, detail) //提供给父节点设定 对应的富文本值
        {
            let list = this.list;
            this.list[idx].detail = detail;
            this.setData({
                listClone: list
            });
            this.$emit('change', {
                detail: list
            });
        },

        checkForms: function (e) {
            //数据校验

            let list = this.list;
            for (let k = 0; k < list.length; k++) {
                delete list[k].focus;
                this.setData({
                    listClone: list
                });
            }
            let name = this.titleName;
            if (list.length > this.maxCnt) {
                return pageHelper.showModal(name + '最大可以填写' + this.maxCnt + '项，请删减之后再提交', '温馨提示');
            }
            if (list.length < this.minCnt) {
                return pageHelper.showModal(name + '至少需要填写' + this.minCnt + '项，请增加之后再提交', '温馨提示');
            }
            for (let k = 0; k < list.length; k++) {
                let no = k + 1;
                let node = list[k];
                let focus = '';

                //标题
                if (node.title.length == 0) {
                    if (this.hasVal) {
                        focus = name + no + '标题不能为空';
                    } else {
                        focus = name + no + '不能为空';
                    }
                }

                //填值
                else if (this.hasVal && node.val.length == 0) {
                    focus = name + no + this.valName + '不能为空';
                }

                // 图片
                else if (this.hasPic && this.checkPic && node.pic.length == 0) {
                    focus = '请上传' + name + no + this.picName;
                }

                // 详情
                else if (this.hasDetail && this.checkDetail && node.detail.length == 0) {
                    focus = '请填写' + name + no + this.detailName;
                }
                if (focus) {
                    node.focus = focus;
                    this.setData({
                        listClone: list
                    });
                    return pageHelper.showModal(focus, '温馨提示');
                }
            }
            return true;
        },

        url: function (e) {
            pageHelper.url(e, this);
        }
    },
    created: function () {},
    watch: {
        list: {
            handler: function (newVal, oldVal) {
                this.listClone = newVal;
            },

            immediate: true,
            deep: true
        },

        upDirectDir: {
            handler: function (newVal, oldVal) {
                this.upDirectDirClone = newVal;
            },

            immediate: true
        },

        isDemo: {
            handler: function (newVal, oldVal) {
                this.isDemoClone = newVal;
            },

            immediate: true
        }
    }
};
</script>
<style>
.form-rows-item {
    display: flex;
    flex-direction: column;
}

.form-rows-item .line1 {
    width: 100%;
    display: flex;
    align-items: center;
    height: 100rpx;
    padding-left: 0rpx;
}

.form-rows-item .line2 {
    width: 100%;
    display: flex;
    align-items: center;
    height: unset;
    padding-left: 0rpx;
}
.form-rows-item .line2 textarea {
    margin: 0 5rpx 0;
}

.form-rows-item .line1 .pic {
    width: 90rpx;
    height: calc(100% - 10rpx);
    background-color: #f2f2f2;
    margin-right: 10rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 50rpx;
    color: #999;
}

.form-rows-item .line1 image {
    width: 70rpx;
    height: 70rpx;
}

.form-rows-item .line1 input {
    flex: 1;
}

.form-rows-item .line1 .select-close {
    width: 80rpx;
    font-size: 40rpx !important;
    font-weight: bold;
    text-align: center;
    height: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
}

.form-rows-item .line1 .detail-set {
    min-width: 80rpx;
    font-size: 26rpx !important;
    text-align: center;
    height: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
}

.form-rows-item .line2 {
    display: flex;
}

.form-rows-item .line3 {
    display: flex;
    height: unset;
    align-items: flex-start;
    border-top: 1rpx dashed #f2f2f2;
    padding-top: 15rpx;
    position: relative;
}

.form-rows-item .line3 textarea {
    margin: unset;
    line-height: 1.4 !important;
    z-index: 99;
}

.form-rows-item .line3 .no {
    position: absolute;
    right: 15rpx;
    bottom: 5rpx;
    color: #eee;
    font-size: 40rpx;
    font-weight: bold;
}

.form-rows-item .line1 .tit {
    font-weight: bold;
    line-height: 1.4 !important;
}

.form-rows-add {
    display: flex;
    align-items: center;
    color: var(--blue);
    font-weight: normal;
    font-size: 28rpx;
}
</style>
