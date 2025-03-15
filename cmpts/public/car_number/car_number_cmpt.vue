<template>
    <view>
        <view v-if="!popClone" @tap="bindShowPopTap" class="car-text">
            {{ utils.join(carNumArr).length > 0 ? utils.join(carNumArr) : '请填写' }}
            <text class="icon-right"></text>
        </view>

        <root-portal v-else-if="popClone" :enable="true">
            <view class="root-portal">
                <!-- 车牌号输入框 -->
                <view class="car-number custom-input-class">
                    <view :class="'item ' + (curInput === 0 ? 'active' : '')" @tap="bindShowProvinceTap">{{ carNumArr[0] }}</view>
                    <view :class="'item ' + (curInput === 1 ? 'active' : '')" @tap="bindShowAreaTap">{{ carNumArr[1] }}</view>
                    <view class="car-split">·</view>
                    <view :class="'item ' + (curInput === 2 ? 'active' : '')" @tap="bindShowNumberTap" :data-index="2">{{ carNumArr[2] }}</view>
                    <view :class="'item ' + (curInput === 3 ? 'active' : '')" @tap="bindShowNumberTap" :data-index="3">{{ carNumArr[3] }}</view>
                    <view :class="'item ' + (curInput === 4 ? 'active' : '')" @tap="bindShowNumberTap" :data-index="4">{{ carNumArr[4] }}</view>
                    <view :class="'item ' + (curInput === 5 ? 'active' : '')" @tap="bindShowNumberTap" :data-index="5">{{ carNumArr[5] }}</view>
                    <view :class="'item ' + (curInput === 6 ? 'active' : '')" @tap="bindShowNumberTap" :data-index="6">{{ carNumArr[6] }}</view>
                    <view v-if="!newEnergy" class="item new-energy" @tap="bindNewEnergyTap">
                        <text class="icon-add"></text>
                    </view>
                    <view v-else :class="'item ' + (curInput === 7 ? 'active' : '')" @tap="bindShowLastBoardTap">{{ carNumArr[7] }}</view>
                </view>

                <view v-if="confirm" @tap="bindConfirmTap" class="confirm-car-number"><text>确定</text></view>
                <view v-else class="confirm-car-number"><text class="distabled">确定</text></view>

                <view @tap="bindClearTap" class="confirm-car-number clear"><text>清空</text></view>

                <!-- 虚拟键盘 -->
                <view class="keyboard" v-if="keyboard">
                    <view class="keyboard-close">
                        <view class="keyboard-close-btn" @tap="bindCloseKeyboardTap">关闭</view>
                    </view>
                    <!-- 省份简写键盘 -->
                    <view class="keyboard-item" v-if="keyboardType === 1">
                        <view class="keyboard-line" v-for="(item, index) in provinces" :key="index">
                            <view class="keyboard-btn" :data-val="itemlist" @tap="bindChooseProvinceTap" v-for="(itemlist, index1) in item" :key="index1">
                                {{ itemlist }}
                            </view>
                        </view>
                        <view class="keyboard-del" @tap="bindDelProvinceTap">
                            <text>清除</text>
                        </view>
                    </view>
                    <!-- 地区简写键盘 -->
                    <view class="keyboard-item" v-if="keyboardType === 2">
                        <view class="keyboard-line" v-for="(item, index) in areas" :key="index">
                            <view class="keyboard-btn" :data-val="itemlist" @tap="bindChooseAreaTap" v-for="(itemlist, index1) in item" :key="index1">
                                {{ itemlist }}
                            </view>
                        </view>
                        <view class="keyboard-del" @tap="bindDelAreaTap">
                            <text>清除</text>
                        </view>
                    </view>
                    <!-- 普通类型键盘 -->
                    <view class="keyboard-item" v-if="keyboardType === 3">
                        <view class="keyboard-line" v-for="(item, index) in numbers" :key="index">
                            <view class="keyboard-btn" :data-val="itemlist" @tap="bindChooseNumberTap" v-for="(itemlist, index1) in item" :key="index1">
                                {{ itemlist }}
                            </view>
                        </view>
                        <view class="keyboard-del" @tap="bindDelNumberTap">
                            <text>清除</text>
                        </view>
                    </view>
                    <!-- 最后一位键盘 -->
                    <view class="keyboard-item" v-if="keyboardType === 4">
                        <view class="keyboard-line" v-for="(item, index) in last" :key="index">
                            <view class="keyboard-btn" :data-val="itemlist" @tap="bindChooseLastTap" v-for="(itemlist, index1) in item" :key="index1">
                                {{ itemlist }}
                            </view>
                        </view>
                        <view class="keyboard-del" @tap="bindDelLastTap">
                            <text>清除</text>
                        </view>
                    </view>
                </view>
            </view>
        </root-portal>
    </view>
</template>
<script module="utils" lang="wxs">
function join(arr) {
	return arr.join('');
}

module.exports = {
	join: join,
};
</script>
<script>
export default {
    data() {
        return {
            carNumArr: [],
            curInput: '',
            keyboard: false,
            keyboardType: 1,
            newEnergy: false,
            confirm: false,

            // 是否确认

            // 省份输入
            provinces: [
                ['京', '沪', '粤', '津', '冀', '晋', '辽', '吉', '黑'],
                ['苏', '浙', '皖', '闽', '赣', '鲁', '豫', '鄂', '湘'],
                ['桂', '琼', '渝', '川', '贵', '云', '藏'],
                ['陕', '甘', '青', '宁', '新', '蒙']
            ],

            // 地区输入
            areas: [
                ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'],
                ['L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V'],
                ['W', 'X', 'Y', 'Z']
            ],

            // 车牌输入
            numbers: [
                ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
                ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'],
                ['L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V'],
                ['W', 'X', 'Y', 'Z']
            ],

            // 最后一位输入
            last: [
                ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
                ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L'],
                ['M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X'],
                ['Y', 'Z', '港', '澳', '学', '挂', '警']
            ],

            name: '',
            popClone: false
        };
    },
    options: {
        addGlobalClass: true
    },
    /**
     * 组件的属性列表
     */
    props: {
        defaultNum: {
            type: String,
            default: ''
        },
        pop: {
            type: Boolean,
            default: false
        },
        must: {
            //是否必填
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
            if (this.defaultNum) {
                // 存在默认车牌号
                let length = this.defaultNum.length;
                if (length === 8) {
                    // 新能源车牌号
                    this.setData({
                        newEnergy: true
                    });
                }
                let carNumArr = this.defaultNum.split('');
                this.setData(
                    {
                        carNumArr
                    },
                    () => {
                        this.setData({
                            confirm: this.numberValidateFun()
                        });
                    }
                );
            }
        },

        attached: function () {},

        /**
         * 关闭键盘
         */
        bindCloseKeyboardTap() {
            this.setData({
                keyboard: false
            });
        },

        /**
         * 显示省份键盘
         */
        bindShowProvinceTap() {
            this.setData({
                keyboard: true,
                curInput: 0,
                keyboardType: 1
            });
        },

        bindShowPopTap: function (e) {
            this.setData({
                popClone: true
            });
        },

        /**
         * 确定选择省份
         */
        bindChooseProvinceTap(e) {
            const { val } = e.currentTarget.dataset;
            this.setData({
                'carNumArr[0]': val,
                curInput: 1,
                keyboardType: 2
            });
            this.changeFun();
        },

        /**
         * 删除选定省份
         */
        bindDelProvinceTap() {
            this.setData({
                'carNumArr[0]': ''
            });
            this.changeFun();
        },

        /**
         * 显示地区键盘
         */
        bindShowAreaTap() {
            this.setData({
                keyboard: true,
                curInput: 1,
                keyboardType: 2
            });
        },

        /**
         * 选定地区
         */
        bindChooseAreaTap(e) {
            const { val } = e.currentTarget.dataset;
            this.setData({
                'carNumArr[1]': val,
                curInput: 2,
                keyboardType: 3
            });
            this.changeFun();
        },

        /**
         * 删除选定区域
         */
        bindDelAreaTap() {
            this.setData({
                'carNumArr[1]': '',
                curInput: 0,
                keyboardType: 1
            });
            this.changeFun();
        },

        /**
         * 显示普通键盘
         */
        bindShowNumberTap(e) {
            const { index } = e.currentTarget.dataset;
            const keyboardType = index === 6 && !this.newEnergy ? 4 : 3;
            this.setData({
                keyboard: true,
                curInput: index,
                keyboardType: keyboardType
            });
        },

        /**
         * 选定车牌
         */
        bindChooseNumberTap(e) {
            const { val } = e.currentTarget.dataset;
            const name = 'carNumArr[' + this.curInput + ']';
            this.setData({
                [name]: val,
                curInput: this.curInput + 1,
                keyboardType: 3
            });
            // 跳到最后一位时，键盘不一样
            if (this.curInput === 6 && !this.newEnergy) {
                this.setData({
                    keyboardType: 4
                });
            } else if (this.curInput === 7 && this.newEnergy) {
                this.setData({
                    keyboardType: 4
                });
            }
            this.changeFun();
        },

        /**
         * 删除车牌
         */
        bindDelNumberTap() {
            const name = 'carNumArr[' + this.curInput + ']';
            this.setData({
                [name]: '',
                curInput: this.curInput - 1,
                keyboardType: 3
            });
            // 如果删除到地区时，切换键盘类型
            if (this.curInput === 1) {
                this.setData({
                    keyboardType: 2
                });
            }
            this.changeFun();
        },

        /**
         * 显示最后一位键盘
         */
        bindShowLastBoardTap() {
            if (this.newEnergy) {
                // 新能源
                this.setData({
                    keyboard: true,
                    curInput: 7,
                    keyboardType: 4
                });
            } else {
                this.setData({
                    keyboard: true,
                    curInput: 6,
                    keyboardType: 4
                });
            }
        },

        /**
         * 选定最后一位
         */
        bindChooseLastTap(e) {
            const { val } = e.currentTarget.dataset;
            if (this.newEnergy) {
                // 新能源
                this.setData({
                    'carNumArr[7]': val,
                    curInput: this.curInput + 1,
                    keyboard: false
                });
            } else {
                this.setData({
                    'carNumArr[6]': val,
                    curInput: this.curInput + 1,
                    keyboard: false
                });
            }
            this.changeFun();
        },

        /**
         * 删除最后一位
         */
        bindDelLastTap() {
            if (this.newEnergy) {
                this.setData({
                    'carNumArr[7]': '',
                    curInput: this.curInput - 1,
                    keyboardType: 3,
                    newEnergy: false
                });
            } else {
                this.setData({
                    'carNumArr[6]': '',
                    curInput: this.curInput - 1,
                    keyboardType: 3
                });
            }
            this.changeFun();
        },

        /**
         * 切换输入新能源车牌号
         */
        bindNewEnergyTap() {
            this.setData({
                newEnergy: true
            });
            this.bindShowLastBoardTap();
        },

        changeFun: function () {
            this.setData({
                confirm: this.numberValidateFun()
            });
        },

        bindConfirmTap: function (e) {
            if (!this.numberValidateFun()) {
                return;
            }
            this.setData({
                popClone: false
            });

            // 每次都触发 change 事件，通知父组件
            this.$emit('change', {
                detail: {
                    value: this.carNumArr.join('')
                }
            });
        },

        bindClearTap: function (e) {
            this.setData(
                {
                    carNumArr: []
                },
                () => {
                    this.setData({
                        confirm: this.numberValidateFun()
                    });
                }
            );
        },

        numberValidateFun: function () {
            // 是否合法
            let carNumArr = this.carNumArr;
            let carNumStr = carNumArr.join('');
            if (carNumStr.length == 0 && !this.must) {
                return true;
            }
            if (carNumStr.length < 7 || carNumStr.length > 8) {
                return false;
            }
            if (carNumArr.length != carNumStr.length && carNumArr[carNumArr.length - 1]) {
                return false;
            } else {
                return true;
            }
        }
    },
    created: function () {},
    watch: {
        pop: {
            handler: function (newVal, oldVal) {
                this.popClone = newVal;
            },

            immediate: true
        }
    }
};
</script>
<style>
root-portal {
    display: flex;
    width: 100%;
    height: 100%;
}

.root-portal {
    position: fixed;
    bottom: 0;
    top: 0;
    z-index: 9999999;
    width: 100vw;
    /* height: 200px; */
    background: #fff;
    opacity: 1;
    transform: scale3d(1, 1, 1);
    transition: all 0.2s ease-in;
    pointer-events: auto;
}

.car-number {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20rpx 0;
}

.car-text {
    flex: 1;
    text-align: right;
    height: 60rpx;
    line-height: 60rpx;
}

.car-split {
    font-weight: bold;
    font-size: 40rpx;
    color: #666;
}

.car-number .item {
    border: 2rpx solid #999;
    border-radius: 10%;
    padding: 10rpx 0;
    margin: 10rpx 6rpx;
    width: 70rpx;
    height: 70rpx;
    font-size: 28rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}

.car-number .item.new-energy {
    border: 2rpx dashed #8dc63f;
}

.car-number .item.new-energy > text {
    color: #8dc63f;
    font-weight: bold;
}

.car-number .item.active {
    border: 4rpx solid #4b71fc;
    color: #4b71fc;
}

.confirm-car-number {
    width: 100%;
    display: flex;
    justify-content: center;
}

.confirm-car-number > text {
    background-color: #4b71fc;
    color: #fff;
    width: 80%;
    text-align: center;
    font-size: 30rpx;
    padding: 16rpx 0;
    border-radius: 6rpx;
    margin-top: 50rpx;
}

.confirm-car-number > text.distabled {
    background-color: #f2f2f2;
    color: #999;
}

.confirm-car-number.clear > text {
    background-color: #cce6ff;
    color: #347dff;
}

.keyboard {
    position: fixed;
    bottom: 0;
    /* height: 45vh; */
    background-color: #d1d5d9;
    width: 100%;
    left: 0;
    z-index: 9999;
    /*苹果手机安全区域*/
    padding-bottom: calc(constant(safe-area-inset-bottom) + 120rpx);
    padding-bottom: calc(env(safe-area-inset-bottom) + 120rpx);
}

/* 关闭虚拟键盘 */
.keyboard-close {
    height: 80rpx;
    line-height: 80rpx;
    background-color: #f7f7f7;
    overflow: hidden;
}

.keyboard-close-btn {
    float: right;
    line-height: 66rpx;
    font-size: 30rpx;
    padding-right: 30rpx;
}

.keyboard-item {
    padding: 20rpx 0rpx;
    position: relative;
}

.keyboard-line {
    display: flex;
    justify-content: center;
    padding: 6rpx 2rpx;
}

/* 虚拟键盘-单个按钮 */
.keyboard-btn {
    font-size: 34rpx;
    line-height: 40rpx;
    color: #333333;
    background: #fff;
    display: inline-block;
    padding: 16rpx;
    text-align: center;
    box-shadow: 0 2rpx 0 0 #999999;
    border-radius: 10rpx;
    margin: 6rpx;
}

/* 虚拟键盘-删除按钮 */
.keyboard-del {
    font-size: 34rpx;
    line-height: 40rpx;
    color: #333333;
    background: #a7b0bc;
    display: inline-block;
    padding: 16rpx 12rpx;
    box-shadow: 0 2rpx 0 0 #999999;
    border-radius: 10rpx;
    position: absolute;
    bottom: 30rpx;
    right: 18rpx;
}
</style>
