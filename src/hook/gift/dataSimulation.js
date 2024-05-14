import { ref } from 'vue';

export const gifts = ref([]);
export const totalGiftValue = ref(0);

export function simulateData(newData) {
	// Add new data to the beginning of the array
	gifts.value.unshift(newData);
	// Remove excess entries to keep the array length at 100
	if (gifts.value.length > 100) {
		gifts.value.pop();
	}
	// Update the total gift value
	totalGiftValue.value += newData.giftValue * newData.giftCount;
}
