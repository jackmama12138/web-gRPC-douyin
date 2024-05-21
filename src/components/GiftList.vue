<script setup>
import { useGift } from "../hook/gift/useGift.js";
import { onBeforeUnmount } from "vue";



const roomid = '7369636208487566089'

const url = `wss://webcast3-ws-web-lq.douyin.com/webcast/im/push/v2/?app_name=douyin_web&version_code=180800&webcast_sdk_version=1.3.0&update_version_code=1.3.0&compress=gzip&internal_ext=internal_src:dim|wss_push_room_id:${roomid}|wss_push_did:${roomid}|dim_log_id:202302171547011A160A7BAA76660E13ED|fetch_time:1676620021641|seq:1|wss_info:0-1676620021641-0-0|wrds_kvs:WebcastRoomStatsMessage-1676620020691146024_WebcastRoomRankMessage-1676619972726895075_AudienceGiftSyncData-1676619980834317696_HighlightContainerSyncData-2&cursor=t-1676620021641_r-1_d-1_u-1_h-1&host=https://live.douyin.com&aid=6383&live_id=1&did_rule=3&debug=false&endpoint=live_pc&support_wrds=1&im_path=/webcast/im/fetch/&user_unique_id=${roomid}&device_platform=web&cookie_enabled=true&screen_width=1440&screen_height=900&browser_language=zh&browser_platform=MacIntel&browser_name=Mozilla&browser_version=5.0%20(Macintosh;%20Intel%20Mac%20OS%20X%2010_15_7)%20AppleWebKit/537.36%20(KHTML,%20like%20Gecko)%20Chrome/110.0.0.0%20Safari/537.36&browser_online=true&tz_name=Asia/Shanghai&identity=audience&room_id=${roomid}&heartbeatDuration=0&signature=00000000`

const { giftLists, totalGifts, disconnect } = useGift(url);





onBeforeUnmount(() => {
	  giftLists.value.length = 0;
    disconnect();
});
</script>

<template>
    <div class="container-box">
        <div class="gift-total">音浪收入合计:{{totalGifts}}</div>
        <a-list :bordered="false" max-height="1000px" :split="false" class="gift-list">
            <a-list-item v-for="(item, index) in giftLists" :key="item.giftName + index">
                <div class="gift-item">
                    <a-list-item-meta
                        :description="`${item.giftName} x ${item.giftCount.toString()}`"
                        :title="item.nickName"
                    >
                        <template #avatar>
                            <a-avatar shape="circle">
                                <img :src="'http://p6-webcast.douyinpic.com/img/' + item.giftImgurl + '~tplv-obj.image'"/>
                            </a-avatar>
                        </template>
                    </a-list-item-meta>
                    <span>{{ item.giftValue.toString() }}</span>
                </div>
            </a-list-item>
        </a-list>
    </div>
</template>

<style scoped>
.container-box {
}

.gift-total {
    display: flex;
    flex-direction: row-reverse;
    padding-right: 20px;
}

.gift-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.gift-list {
    position: relative;
    width: 100%;
}
</style>
