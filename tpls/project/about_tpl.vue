<template>
    <view>
        <view v-if="isLoad === null" class="margin-top load notexist text-l load-project"></view>
        <view v-if="isLoad === false" class="margin-top load loading text-l load-project"></view>

        <view v-if="isLoad" class="main padding-project">
            <view class="article-box margin-top-xs">
                <!-- article content begin -->
                <view class="article card-project shadow-project">
                    <block v-for="(item, index) in about" :key="index">
                        <view class="content" v-if="item.type == 'text'">
                            <text user-select>{{ item.val }}</text>
                        </view>

                        <view class="pics" v-if="item.type == 'img'">
                            <image
                                @tap="url"
                                data-type="img"
                                :data-url="item.val"
                                :show-menu-by-longpress="true"
                                class="loading"
                                mode="widthFix"
                                :lazy-load="true"
                                :src="item.val"
                            ></image>
                        </view>
                    </block>
                    <!-- article content end -->
                </view>
                <!-- article content end -->
            </view>

            <view v-if="accountInfo" class="text-center text-xs text-grey margin-top">v{{ accountInfo.miniProgram.version }} {{ accountInfo.miniProgram.envVersion }}</view>
        </view>
    </view>
</template>

<script>
export default {
    props: ['data', 'compName'],
    computed: {
        isLoad() {
            return this.data.isLoad;
        },
        about() {
            return this.data.about;
        },
        index() {
            return this.data.index;
        },
        item() {
            return this.data.item;
        },
        accountInfo() {
            return this.data.accountInfo;
        },
        url() {
            return this.data.url;
        }
    }
};
</script>
<style></style>
