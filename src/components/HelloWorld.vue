<script setup>
import { useGift } from '../hook/gift/useGift.js';

const url = 'wss://webcast5-ws-web-hl.douyin.com/webcast/im/push/v2/?app_name=douyin_web&version_code=180800&webcast_sdk_version=1.0.12&update_version_code=1.0.12&compress=gzip&device_platform=web&cookie_enabled=true&screen_width=1680&screen_height=1050&browser_language=zh-CN&browser_platform=MacIntel&browser_name=Mozilla&browser_version=5.0%20(Macintosh;%20Intel%20Mac%20OS%20X%2010_15_7)%20AppleWebKit/537.36%20(KHTML,%20like%20Gecko)%20Chrome/124.0.0.0%20Safari/537.36&browser_online=true&tz_name=Asia/Shanghai&cursor=fh-7368825821161772082_t-1715688478579_r-1_d-1_u-1&internal_ext=internal_src:dim|wss_push_room_id:7368814518014593842|wss_push_did:7276853574540740137|first_req_ms:1715688478486|fetch_time:1715688478579|seq:1|wss_info:0-1715688478579-0-0|wrds_v:7368825894544088305&host=https://live.douyin.com&aid=6383&live_id=1&did_rule=3&endpoint=live_pc&support_wrds=1&user_unique_id=7276853574540740137&im_path=/webcast/im/fetch/&identity=audience&need_persist_msg_count=15&insert_task_id=&live_reason=&room_id=7368814518014593842&heartbeatDuration=0&signature=fKPh4XcKQgMmIBfT'

const {  giftList } = useGift(url);







</script>

<template>
    <ul>
        <li v-for="(item,index) in giftList" :key="item.giftName" :cmp-text="index">{{ item }}</li>
    </ul>
</template>

<style scoped>

</style>
