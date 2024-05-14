<script setup>
import { useGift } from "../hook/gift/useGift.js";

const url = '';

const { giftList, totalGifts } = useGift(url);
</script>

<template>
    <div>
        <div class="gift-total">Total Gift Value: {{ totalGifts }}</div>
        <a-list :bordered="false" :split="false">
            <a-list-item v-for="(item, index) in giftList" :key="item.giftName + index">
                <a-list-item-meta
                    :title="item.nickName"
                    :description="`${item.giftName} x ${item.giftCount.toString()}, Value: ${item.giftValue.toString()}`"
                >
                    <template #avatar>
                        <a-avatar shape="circle">
                            <img
                                alt="avatar"
                                :src="'http://p6-webcast.douyinpic.com/img/' + item.giftImgurl + '~tplv-obj.image'"
                            />
                        </a-avatar>
                    </template>
                </a-list-item-meta>
                <span>{{item.giftValue.toString()}}</span>
            </a-list-item>
        </a-list>
    </div>
</template>

<style scoped>
.gift-total{
    display: flex;
    flex-direction: row-reverse;
}
</style>
