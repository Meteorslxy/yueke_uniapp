<template>
    <view>
        <template v-if="compName === 'adminFormsDetailTpl'">
            <view class="admin-comm-list" v-if="forms.length > 0">
                <view class="item">
                    <view class="info">
                        <view class="info-item info-item-solid" v-if="item.type != 'line'" v-for="(item, index) in forms" :key="index">
                            <view class="title">{{ item.title }}</view>

                            <view class="mao">：</view>

                            <view v-if="item.type == 'image'" class="content">
                                <image
                                    @tap="url"
                                    data-type="image"
                                    :data-url="itm"
                                    :src="itm"
                                    mode="aspectFill"
                                    class="loading"
                                    :show-menu-by-longpress="true"
                                    v-for="(itm, index1) in item.val"
                                    :key="index1"
                                ></image>
                            </view>

                            <view v-else-if="item.type == 'rows'" class="content" style="flex-direction: column">
                                <text v-for="(itm, index1) in item.val" :key="index1">
                                    <text>{{ itm.title }}</text>

                                    <text v-if="itm.val">- {{ itm.val }}</text>
                                </text>
                            </view>

                            <view v-else-if="item.type == 'switch'" class="content">{{ item.val === true ? '是' : '否' }}</view>

                            <view @tap="url" data-type="copy" :data-url="item.val" v-else class="content">{{ item.val }}</view>
                        </view>
                    </view>
                </view>
            </view>
        </template>
    </view>
</template>

<script>
export default {
    props: ['data', 'compName'],
    computed: {
        forms() {
            return this.data.forms;
        },
        item() {
            return this.data.item;
        },
        index() {
            return this.data.index;
        },
        itm() {
            return this.data.itm;
        },
        index1() {
            return this.data.index1;
        },
        url() {
            return this.data.url;
        }
    }
};
</script>
<style></style>
