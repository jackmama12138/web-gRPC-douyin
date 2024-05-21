<script setup>
import {hotranks} from "../mock/hot.js";
import {scores} from "../mock/scores.js";
import {ref} from "vue";
import {IconUserGroup} from '@arco-design/web-vue/es/icon'
import {io} from 'socket.io-client'
// const socket = io('http://127.0.0.1:3000')

let hotLists = ref([])
let scoreLists = ref([])

// socket.on('updateData', (message) => {
// 	hotLists.value = message
// })
//
// socket.on('rankList', (message) => {
// 	scoreLists.value = message
// })





hotLists.value = hotranks
scoreLists.value = scores
</script>

<template>
  <div class="container-box">
    <div class="-item-content-box">
      <a-list max-height="1050px" class="live-rank-list" :bordered="false" :split="false">
        <a-list-item v-for="(idx,key) in hotLists" :key="idx" style="padding: 1px 0px 0px 1px">
          <div class="live-rank-list-item">
            <div class="live-rank-list-item-title">
              <div class="live-rank-list-item-title-rank">{{ idx.rank }}</div>
              <div class="live-rank-list-item-title-topic"  :class="{'img-status':idx.own_room?.room_ids}">
                <img class="topic"
                     :src="idx.avatar_thumb"
                >
                <img class="topic-state" v-if="idx.own_room?.room_ids"
                     src="https://lf-cdn-tos.bytescm.com/obj/static/webcast/douyin_live/media/living_bounce.99d6239258d6c700.webp"
                >
                <div v-else></div>

              </div>
              <div class="live-rank-list-item-content">
                <div class="content-top">
                  <div class="nickname">{{ idx.nickname || "获取失败"}}</div>
                  <div class="online" >
                    <icon-user-group/>:
                    <div >{{ scoreLists[key]?.user_count || "获取失败" }}</div>
                  </div>
                </div>
                <div class="content-down">
                  {{ idx.fansclub_name || "获取失败"}}
                  <div class="content-split"></div>
                  {{ idx.contributor_text || "获取失败"}}
                </div>
              </div>
            </div>
            <div class="content-prpularity">{{ scoreLists[key]?.score || "获取失败" }}</div>
          </div>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>


<style scoped>


.options-true{
  width: 0px;
  opacity: 0;
  margin-left: 0px;
  margin-right: 0px;
}
.options-false{
  width: 375px;
  opacity: 1;
  margin-left: 0px;
  margin-right: 0px;
}
.container-box{
  height: 100%;
  width: 100%;
  bottom: 0;
  right: 0;
}
.-item-content-box{
  /*position: absolute;*/
  z-index: 100;
  right: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.container-icon:hover{
  color: blue;
}
.container-icon {
  z-index: 500;
  box-shadow: 2px 10px 17px 0px rgba(0, 0, 0, 0.75);
  font-size: 30px;
  border-radius: 50%;
  background-color: #ffffff;
  flex-direction: column;
  align-items: flex-end;
  display: flex;
  position: absolute;
  bottom: 50%;
  left: -15px;
  color: darkorchid;
}

.top {
  background-color: #ffffff;
  width: 100%;
  height: 48px;
  border-radius: 4px 0 0;
  align-items: center;
  font-family: PingFang SC, DFPKingGothicGB-Regular, sans-serif;
  font-weight: 400;
  display: flex;
  position: relative;
}

.top-online {
  color: rgba(22, 24, 35, .75);
  text-align: right;
  font-size: 12px;
  font-weight: 500;
  line-height: 13px;
  display: flex;
}

.top-l {
  height: 100%;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border-radius: 4px 0 0;
  font-family: PingFang SC, DFPKingGothicGB-Regular, sans-serif;
  font-weight: 400;
  display: inline-block;
  position: relative;
}

.top-l-hot {
  height: 100%;
  color: #161823;
  opacity: .5;
  cursor: pointer;
  margin: 0 16px;
  font-size: 14px;
  line-height: 24px;
  display: inline-block;
  position: relative;
}

.top-l-hot-checked {
  width: 30px;
  height: 2px;
  text-align: center;
  background-color: #ff2c55;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
}

.top-m {
  color: #161823;
  align-items: center;
  font-family: PingFang SC, DFPKingGothicGB-Regular, sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 48px;
  display: flex;
  position: absolute;
  left: 80px;
}

.top-r {
  cursor: pointer;
  position: absolute;
  right: 16px;
}

.live-rank-list {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  position: relative;
  /*top: 200px;*/
}

.live-rank-list-item {
  height: 64px;
  cursor: pointer;
  flex-shrink: 0;
  justify-content: space-between;
  align-items: center;
  padding-right: 16px;
  display: flex
}

.live-rank-list-item-title {
  align-items: center;
  display: flex
}

.live-rank-list-item-title-rank {
  color: rgba(22, 24, 35, .34);
  width: 45px;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  line-height: 20px;
}

.live-rank-list-item-title-topic {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  flex-shrink: 0;
  padding: 3px;
  position: relative;
}
.live-rank-list-item-title-topic.img-status{
  background-color: #fff;
  background-image: url(data:image/png;base64,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);
  background-repeat: no-repeat;
  background-size: contain;
}

.topic {
  width: 100%;
  height: 100%;
  border-radius: 50%
}

.topic-state {
  width: 16px;
  height: 16px;
  position: absolute;
  bottom: -1px;
  right: -1px
}

.live-rank-list-item-content {
  flex-direction: column;
  margin-left: 12px;
  display: flex;
}

.content-top {
  color: #161823;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
  display: flex;
}

.content-down {
  color: rgba(22, 24, 35, .5);
  align-items: center;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  display: flex;
}

.nickname {
  max-width: 100px;
  min-width: 100px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.online {
  color: rgba(22, 24, 35, .5);
  align-items: center;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  display: flex;
  margin-left: 8px;
}

.content-split {
  width: 1px;
  height: 10px;
  background-color: rgba(22, 24, 35, .3);
  margin: 0 4px;
}

.content-prpularity {
  color: rgba(22, 24, 35, .75);
  text-align: right;
  font-size: 12px;
  font-weight: 500;
  line-height: 13px;
}

.banner {
  background-color: #ffffff;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 -.5px 30px #ebebeb
}

.banner-item {
  height: 64px;
  cursor: pointer;
  flex-shrink: 0;
  justify-content: space-between;
  align-items: center;
  padding-right: 16px;
  display: flex
}

.banner-left {
  align-items: center;
  display: flex;
}

.banner-right {
  color: #fff;
  min-width: 70px;
  height: 28px;
  cursor: pointer;
  background-color: #fe2c55;
  border-radius: 2px;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  font-size: 12px;
  font-weight: 500;
  line-height: 14px;
  display: flex;
}

.banner-item-left-online {
  color: rgba(22, 24, 35, .34);
  width: 45px;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  line-height: 20px;
}

.banner-item-left-topic {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  flex-shrink: 0;
  padding: 3px;
  position: relative;
}

.banner-item-left-content {
  flex-direction: column;
  margin-left: 12px;
  display: flex;
}

.banner-item-left-content-top {
  color: #161823;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
  display: flex;
}

.banner-item-left-content-top-r {
  color: rgba(22, 24, 35, .5);
  margin-left: 4px;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
}

.banner-item-left-content-down {
  color: rgba(22, 24, 35, .5);
  align-items: center;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  display: flex;
}
</style>