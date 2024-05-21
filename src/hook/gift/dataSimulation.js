import {reactive, ref} from 'vue';

/**
 * 礼物数据
 */
export const gifts = ref([]);

/**
 * 弹幕信息
 */
export const chatMessage = ref([]);

/**
 * 房间信息
 */
export const roomMessage = ref([]);

/**
 * 礼物总数
 */
export const totalGiftValue = ref(0);
/**
 * 进入总数
 * */
export const totalMemberCount = ref(0);
/**
 * 关注总数
 * */
export const totalSocialCount = ref(0);
/**
 * 弹幕总数
 * */
export const totalChatCount = ref(0);
/**
 * 在线人数
 * */
export const onlineCount = ref(0);
/**
 * uv数
 * */
export const uvCount = ref(0);

/**
 * 用户礼物分组状态
 */
const userGiftGroups = {};

/**
 * 主播礼物数据
 */
export const anchorGiftData = reactive(new Map);

/**
 * 处理房间信息并推到数组中管理
 */
function handleRoomMessage(newData) {
	onlineCount.value = newData.count;
	uvCount.value = newData.totalUser;
}

/**
 * 根据消息类型，将消息推送到对应的数组中
 */
const messageTypeHandlers = {
	'人气': handleRoomMessage,
	'礼物': handleGiftMessage,
	'弹幕': handleChatMessage,
	'关注': handleSocialMessage,
	'入场': handleMemberMessage
};

/**
 * 入场信息
 */
function handleMemberMessage(newData){
	 totalMemberCount.value++;
}

function handleSocialMessage(newData){
	 totalSocialCount.value++;
}

/**
 * 将礼物数据推送到数组中
 */
function handleGiftMessage(newData) {
	const { nickName, giftName, giftValue, giftCount, giftGroupId,giftGroupCount, giftImgurl } = newData;
	// const giftCountInt = parseInt(giftCount);
	// const giftValueInt = parseInt(giftValue);

	// 更新用户礼物分组状态
	// if (!userGiftGroups[giftGroupId]) {
	// 	userGiftGroups[giftGroupId] = {
	// 		nickName,
	// 		giftValue: giftValueInt,
	// 		giftCount: giftCountInt,
	// 		giftName,
	// 		giftImgurl: newData.giftImgurl
	// 	};

		// 更新总礼物价值
		totalGiftValue.value += giftValue * giftGroupCount;
	/**
	 * ['小心心',1]
	 * */
		if (anchorGiftData.has(giftName)){
			anchorGiftData.set(giftName,anchorGiftData.get(giftName) + giftGroupCount * giftValue)
		}else {
			anchorGiftData.set(giftName,giftGroupCount * giftValue)
		}
	/**
	 * {'小心心':1}
	 * */
		// if (anchorGiftData[giftName]){
		// 	anchorGiftData[giftName] = {
		// 		giftCount: anchorGiftData[giftName].giftCount + giftGroupCount,
		// 		giftValue: giftValue,
		// 		giftImgurl: giftImgurl
		// 	}
		// }else {
		// 	anchorGiftData[giftName] = {
		// 		giftCount: giftGroupCount,
		// 		giftValue: giftValue,
		// 		giftImgurl: giftImgurl
		// 	}
		// }
	/**
	 * {'小心心':1}
	 * */
		// if (anchorGiftData.has(giftName)){
		// 	anchorGiftData.set(giftName, {
		// 		giftCount: anchorGiftData.get(giftName).giftCount + giftGroupCount,
		// 		giftValue: giftValue,
		// 		giftImgurl: giftImgurl
		// 	})
		// }else {
		// 	anchorGiftData.set(giftName, {
		// 		giftCount: giftGroupCount,
		// 		giftValue: giftValue * giftGroupCount,
		// 		giftImgurl: giftImgurl
		// 	})
		// }


}

/**
 * 弹幕总数
 */
function handleChatMessage(newData) {
	return totalChatCount.value++;
}

/**
 * 处理回调的数据
 */
export function simulateData(newData) {
	const handler = messageTypeHandlers[newData.type];
	if (handler) {
		handler(newData);
	}
}
