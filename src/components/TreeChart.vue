<template>
    <div ref="chartRef" class="TreeChar"></div>
<!--    <div>{{ prop.data }}</div>-->
</template>

<script setup>
import {ref, onMounted, nextTick, watch} from 'vue';
import * as echarts from 'echarts';

const prop = defineProps(['data']);
let chartRef = ref(null);
let myChart = null;

const init = () => {
    if (chartRef.value) {
        myChart = echarts.init(chartRef.value);
        renderChart(); // Initial rendering
    }

}

watch(prop, () => {
    nextTick(() => {
        renderChart();
    })
})


const renderChart = () => {
    if (myChart && prop.data) {
        prop.data.sort((a, b) => b[1] - a[1]);
        const option = {
            title: {
                text: '礼物价值统计(前十)'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: prop.data.map(res => res[0]),
                axisLabel: {
                    rotate: 45, // Rotate labels for better fit
                    interval: 0 // Show all labels
                },
                max:10
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                name: 'Count',
                type: 'bar',
                data: prop.data.map(res => res[1]),
                itemStyle: {
                    color: '#5470c6'
                }
            }]
        };
        myChart.setOption(option);
    }
}

onMounted(() => {
    init();
});

</script>

<style>
.TreeChar {
    height: 40vh;
    width: 100%;
}
</style>
