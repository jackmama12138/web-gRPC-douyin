<template>
    <div>
        <div class="NavTitle">灰豚数据</div>
        <div class="HeadNav">
            <a-radio-group
                    v-model:value="selected"
                    class="Navfillet"
                    default-value="hot"
                    size="large"
                    type="button"
                    @change="handleSelection"
            >
                <a-radio :class="getClass('hot')" class="Navfillet" value="hot">热度</a-radio>
                <a-radio :class="getClass('income')" class="Navfillet" value="income">收入</a-radio>
                <a-radio :class="getClass('flow')" class="Navfillet" value="flow">流量</a-radio>
                <a-radio :class="getClass('chat')" class="Navfillet" value="chat">弹幕</a-radio>
            </a-radio-group>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue';

const selected = ref('hot');

const handleSelection = (value) => {
	selected.value = value;
};

const getClass = (value) => {
	return selected.value === value ? 'Navselect' : '';
};
</script>

<style scoped>
.HeadNav {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px;
}

.NavTitle {
    display: flex;
    justify-content: center;
    padding-top: 50px;
    width: 100%;
    font-weight: 900;
    font-size: large;
    padding-left: 30px;
}

.Navfillet {
    border-radius: 20px;
}

/*按钮选中变色字体加粗*/
.Navselect {
    font-weight: 800;
    color: #ee4970 !important;
}
</style>
