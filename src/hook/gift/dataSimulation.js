import { ref } from 'vue';

/**
 * 礼物数据
 * */
export const gifts = ref([]);

/**
 * 弹幕信息
 * */
export const chatMessage = ref([]);

/**
 * 房间信息
 * */
export const roomMessage = ref([]);

/**
 * 礼物总数
 * */
export const totalGiftValue = ref(0);

/**
 * 处理房间信息并推到数组中管理
 * */
function handleRoomMessage(newData) {
	roomMessage.value.unshift(newData);
}

/**
 * 根据消息类型，将消息推送到对应的数组中
 * */
const messageTypeHandlers = {
	'人气': handleRoomMessage,
	'礼物': handleGiftMessage,
	'弹幕': handleChatMessage
};

/**
 * 将礼物数据推送到数组中
 * */
function handleGiftMessage(newData) {
	gifts.value.unshift(newData);
	if (gifts.value.length > 100) {
		gifts.value.pop();
	}
	totalGiftValue.value += newData.giftValue * newData.giftCount;
}

/**
 * 将弹幕数据推送到数组中
 * */
function handleChatMessage(newData) {
	chatMessage.value.unshift(newData);
	if (chatMessage.value.length > 100) {
		chatMessage.value.pop();
	}
}

/**
 * 处理回调的数据
 * */
export function simulateData(newData) {

	const handler = messageTypeHandlers[newData.type];
	if (handler) {
		handler(newData);
	}


}
