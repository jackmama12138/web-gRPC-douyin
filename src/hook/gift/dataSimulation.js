import { ref } from 'vue';

export const gifts = ref([]);

export function simulateData(newData) {
	// 保持gifts只包含最新的100个礼物
	if (gifts.value.length >= 100) {
		gifts.value.shift();
	}
	gifts.value.push(newData);
}
