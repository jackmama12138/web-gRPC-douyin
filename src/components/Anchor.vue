<template>
        <TreeChart :data="chartData" />
</template>

<script setup>
import { reactive } from 'vue';
import TreeChart from './TreeChart.vue';

const chartData = reactive({
        totalValue: 208,
        giftTypes: {
                '小心心': 137,
                '人气票': 2,
                '你最好看': 21,
                '玫瑰': 25,
                '抖音': 2,
        }
});

setInterval(() => {
        chartData.totalValue += 1;
        chartData.giftTypes[Math.random()*10] = 'sas'
}, 2000);

</script>

<style>
/*#app {*/
/*    font-family: Avenir, Helvetica, Arial, sans-serif;*/
/*    -webkit-font-smoothing: antialiased;*/
/*    -moz-osx-font-smoothing: grayscale;*/
/*    text-align: center;*/
/*    color: #2c3e50;*/
/*    margin-top: 60px;*/
/*}*/
</style>
