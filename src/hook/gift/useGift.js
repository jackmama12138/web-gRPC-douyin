import { computed } from 'vue';
import { LinkWebSocket } from './webSocket';
import { gifts, simulateData, totalGiftValue,chatMessage,roomMessage } from './dataSimulation';

export function useGift(url) {
	const giftLists = computed(() => gifts.value);
	const totalGifts = computed(() => totalGiftValue.value);
	const chatMessageList = computed(() => chatMessage.value);
	const roomMessageList = computed(() => roomMessage.value);

	const socket = new LinkWebSocket(simulateData);
	socket._connect(url);

	const disconnect = () => {
		socket._disconnect();
	};

	return {
		giftLists,
		totalGifts,
		chatMessageList,
		roomMessageList,
		disconnect
	};
}
