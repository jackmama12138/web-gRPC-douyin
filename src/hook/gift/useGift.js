import { computed } from 'vue';
import { LinkWebSocket } from './webSocket';
import { gifts, simulateData, totalGiftValue,chatMessage,roomMessage,onlineCount,uvCount,totalChatCount,totalMemberCount,totalSocialCount,anchorGiftData } from './dataSimulation';

export function useGift(url) {
	const giftLists = computed(() => gifts.value);
	const chatMessageList = computed(() => chatMessage.value);
	const roomMessageList = computed(() => roomMessage.value);

	/**
	 * 主播礼物列表
	 * */
	const anchorGiftLists = computed(()  => Array.from(anchorGiftData.entries()));
	/**
	 * 礼物总数
	 * */
	const totalGifts = computed(() => totalGiftValue.value);
	/**
	 * 弹幕数
	 * */
	const totalChat = computed(() => totalChatCount.value);
	/**
	 * 入场数
	 * */
	const totalMember = computed(() => totalMemberCount.value);
	/**
	 * 关注数
	 * */
	const totalSocial = computed(() => totalSocialCount.value);
	/**
	 * 在线人数
	 * */
	const totalOnline = computed(() => onlineCount.value);
	/**
	 * 观众总数
	 * */
	const totalUv = computed(() => uvCount.value);




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
		disconnect,
		totalChat,
		totalMember,
		totalSocial,
		totalOnline,
		totalUv,
		anchorGiftLists
	};
}
