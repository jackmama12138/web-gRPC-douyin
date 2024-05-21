<template>
    <a-card class="general-card" title="直播预览">
        <template #extra>
<!--            <icon-more />-->
        </template>
        <div class="studio-wrapper">
<!--            <img :src="preview" class="studio-preview" alt=""/>-->
            <TreeChart :data="anchorGiftLists"></TreeChart>
            <div class="studio-bar">
                <div>
                    <a-space :size="12"><a-avatar :size="24"><img :src="avatar" /></a-avatar>
                        <a-typography-text>
                            admin 直播间
                        </a-typography-text>
                    </a-space>
                </div>
                <a-typography-text type="secondary">
                    36,000 在看
                </a-typography-text>
            </div>
        </div>
        <div class="studio-detail-Data">
            <div class="studio-gift-count">
                <a-typography-text type="secondary">音浪收入</a-typography-text>
                <a-typography-text type="secondary">
                    <a-statistic :value-style="{fontSize: '16px',color:'#4E5969'}" show-group-separator :value="totalGifts"/>
                </a-typography-text>
            </div>
            <div class="studio-gift-count">
                <a-typography-text type="secondary">累计观看</a-typography-text>
                <a-typography-text type="secondary">
                    <a-statistic :value-style="{fontSize: '16px',color:'#4E5969'}" show-group-separator :value="totalUv"/>
                </a-typography-text>
            </div>
            <div class="studio-gift-count">
                <a-typography-text type="secondary">在线峰值</a-typography-text>
                <a-typography-text type="secondary">
                    <a-statistic :value-style="{fontSize: '16px', color: '#4E5969'}" show-group-separator :value="onlinePeak">
                    </a-statistic>
                </a-typography-text>
            </div>
            <div class="studio-gift-count">
                <a-typography-text type="secondary">当前在线</a-typography-text>
                <a-typography-text type="secondary">
                    <a-statistic
                        :value-style="{fontSize: '16px', color: up ? 'red' : 'green'}"
                        show-group-separator
                        :value="totalOnline"
                        :start="true"
                        :value-from="0"
                        animation
                    >
                        <template v-if="up" #suffix>
                            <icon-arrow-rise style="color: red" />
                        </template>
                        <template v-else #suffix>
                            <icon-arrow-fall style="color: green"/>
                        </template>
                    </a-statistic>
                </a-typography-text>
            </div>
            <div class="studio-gift-count">
                <a-typography-text type="secondary">进入人数</a-typography-text>
                <a-typography-text type="secondary">
                    <a-statistic :value-style="{fontSize: '16px',color:'#4E5969'}" show-group-separator :value="totalMember"/>
                </a-typography-text>
            </div>
            <div class="studio-gift-count">
                <a-typography-text type="secondary">弹幕数</a-typography-text>
                <a-typography-text type="secondary">
                    <a-statistic :value-style="{fontSize: '16px',color:'#4E5969'}" show-group-separator :value="totalChat"/>
                </a-typography-text>
            </div>
        </div>
    </a-card>

</template>

<script setup>
import { useGift } from "../hook/gift/useGift.js";
import {onBeforeUnmount, ref, watch} from "vue";
import {IconArrowRise,IconArrowFall} from '@arco-design/web-vue/es/icon'
import TreeChart from "./TreeChart.vue";

const avatar = 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp';





const roomid = '7370523914436414220'

const url = `wss://webcast3-ws-web-lq.douyin.com/webcast/im/push/v2/?app_name=douyin_web&version_code=180800&webcast_sdk_version=1.3.0&update_version_code=1.3.0&compress=gzip&internal_ext=internal_src:dim|wss_push_room_id:${roomid}|wss_push_did:${roomid}|dim_log_id:202302171547011A160A7BAA76660E13ED|fetch_time:1676620021641|seq:1|wss_info:0-1676620021641-0-0|wrds_kvs:WebcastRoomStatsMessage-1676620020691146024_WebcastRoomRankMessage-1676619972726895075_AudienceGiftSyncData-1676619980834317696_HighlightContainerSyncData-2&cursor=t-1676620021641_r-1_d-1_u-1_h-1&host=https://live.douyin.com&aid=6383&live_id=1&did_rule=3&debug=false&endpoint=live_pc&support_wrds=1&im_path=/webcast/im/fetch/&user_unique_id=${roomid}&device_platform=web&cookie_enabled=true&screen_width=1440&screen_height=900&browser_language=zh&browser_platform=MacIntel&browser_name=Mozilla&browser_version=5.0%20(Macintosh;%20Intel%20Mac%20OS%20X%2010_15_7)%20AppleWebKit/537.36%20(KHTML,%20like%20Gecko)%20Chrome/110.0.0.0%20Safari/537.36&browser_online=true&tz_name=Asia/Shanghai&identity=audience&room_id=${roomid}&heartbeatDuration=0&signature=00000000`


const { totalGifts, disconnect,totalOnline,totalChat,totalMember,totalSocial,totalUv,anchorGiftLists } = useGift(url);


const up = ref(true)

const onlinePeak = ref(0)

watch(totalOnline, (newValue, oldValue) => {
    up.value = newValue <= oldValue;
    if (newValue > onlinePeak.value){
        onlinePeak.value = newValue
    }
})

onBeforeUnmount(() => {
    disconnect();
})

</script>

<style scoped>



.setfont-size{
    font-size: 14px!important;
}

.studio-detail-Data{
    display: flex;
    justify-content: flex-start;
    width: 100%;
    /*height: 120px;*/
    margin-top: 16px;
    align-items: center;
    flex-wrap: wrap;
    box-sizing: border-box;
}
.studio-gift-count{
    /*background: linear-gradient(180deg, #A4F100 0%, #00F190 100%);*/
    /*flex: 1;*/
    background-color: #f8f9fb;
    margin: 0 25px 10px 0;
    border-radius: 12px;
    width: calc((100% - 10px) / 3);
    flex-direction: column;
    height: 120px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    max-width: calc((100% - 50px) / 3);
    min-width: calc((100% - 50px) / 3);
    box-sizing: border-box;
}
.studio-gift-count:nth-child(3n){
    margin-right: 0;
    margin-bottom: 0;
}
.studio-gift-count >*{
    /*display: block;*/
}

.studio-preview {
    display: block;
    max-width: 600px;
    margin: 0 auto;
    width: 100%;
}
.studio-bar {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
}
</style>
