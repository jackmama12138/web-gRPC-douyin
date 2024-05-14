import { computed, ref } from 'vue';
import { LinkWebSocket } from './webSocket';
import { gifts, simulateData } from './dataSimulation';

export function useGift(url) {
	const visibleGifts = computed(() => gifts.value.slice(-100));

	const socket = new LinkWebSocket(simulateData);
	socket._connect(url);

	return {
		giftList: visibleGifts
	}
}
