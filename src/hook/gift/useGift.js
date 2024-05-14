import { computed } from 'vue';
import { LinkWebSocket } from './webSocket';
import { gifts, simulateData, totalGiftValue } from './dataSimulation';

export function useGift(url) {
	const visibleGifts = computed(() => gifts.value);
	const totalGifts = computed(() => totalGiftValue.value);

	const socket = new LinkWebSocket(simulateData);
	socket._connect(url);

	return {
		giftList: visibleGifts,
		totalGifts
	};
}
