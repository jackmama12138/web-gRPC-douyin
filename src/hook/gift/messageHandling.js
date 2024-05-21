import protobuf from './../../proto/proto.js';
import pako from 'pako';

export function handleWebSocketMessage(event, simulateData, socketSendAck) {
	let barrage = protobuf.lookup("PushFrame");
	const barrageDecode = barrage.decode(new Uint8Array(event.data));
	const decompressed = pako.ungzip(barrageDecode.payload);
	const response = protobuf.lookup("Response");
	var message = response.decode(new Uint8Array(decompressed));
	var res = response.toObject(message, {});
	if (res.needAck) {
		socketSendAck(decompressed.logId, 'ack');
	}
	if (res.messagesList && res.messagesList.length > 0) {
		for (let i = 0; i < res.messagesList.length; i++) {
			dealMessage(res.messagesList[i], simulateData);
		}
	}
}

function dealMessage(Message, simulateData) {
	switch (Message.method) {
		case "WebcastChatMessage":
			handleChatMessage(Message, simulateData);
			break;
		case "WebcastGiftMessage":
			handleGiftMessage(Message, simulateData);
			break;
		case "WebcastLikeMessage":
			handleLikeMessage(Message, simulateData);
			break;
		case "WebcastMemberMessage":
			handleMemberMessage(Message, simulateData);
			break;
		case "WebcastRoomUserSeqMessage":
			handleRoomUserMessage(Message, simulateData);
			break;
		case "WebcastSocialMessage":
			handleSocialMessage(Message, simulateData);
			break;
		default:
			break;
	}
}

function handleChatMessage(Message, simulateData) {
	const chatMessage = protobuf.lookup("ChatMessage");
	let res;
	try {
		res = chatMessage.decode(new Uint8Array(Message.payload));
	} catch (e) {
		// console.error("Chat message decode error", e);
	}
	if (res) {
		const chatMsg = {
			type: "弹幕",
			content: res.content,
			// nickName: res.user.nickName,
			// gender: res.user.gender
		};
		simulateData(chatMsg);
	}
}

function handleGiftMessage(Message, simulateData) {
	const giftMessage = protobuf.lookup("GiftMessage");
	const giftD = giftMessage.decode(new Uint8Array(Message.payload));
	// console.log(giftD)
	if (giftD) {
		const giftMsg = {
			type: "礼物",
			giftName: giftD.gift.name,
			nickName: giftD.user.nickName,
			giftCount: giftD.totalCount || '1',
			giftValue: giftD.gift.diamondCount,
			giftImgurl:giftD.gift.image.uri,
			giftGroupId: giftD.groupId,
			giftGroupCount: giftD.groupCount
		};
		// console.log(giftMsg)
		simulateData(giftMsg);
	}
}

function handleLikeMessage(Message, simulateData) {
	const likeMessage = protobuf.lookup("LikeMessage");
	const like = likeMessage.decode(new Uint8Array(Message.payload));
	if (like) {
		const likeMsg = {
			// shortId: like.user.shortId,
			type: "点赞"
			// nickName: like.user.nickName,
			// gender: like.user.gender,
			// msgId: like.common.msgId,
			// count: like.count,
			// avatar: like.user.AvatarThumb.urlListList[0]
		};
		// simulateData(likeMsg);
	}
}

function handleMemberMessage(Message, simulateData) {
	const memberMessage = protobuf.lookup("MemberMessage");
	const member = memberMessage.decode(new Uint8Array(Message.payload));
	if (member) {
		const memberMsg = {
			// shortId: member.user.shortId,
			type: "入场",
			// nickName: member.user.nickName,
			// gender: member.user.gender,
			// msgId: member.common.msgId,
			// avatar: member.user.AvatarThumb.urlListList[0]
		};
		simulateData(memberMsg);
	}
}

function handleRoomUserMessage(Message, simulateData) {
	const roomUser = protobuf.lookup("RoomUserSeqMessage");
	const countUser = roomUser.decode(new Uint8Array(Message.payload));
	if (countUser) {
		const countMsg = {
			type: '人气',
			count: countUser.total,
			totalUser: countUser.totalUser,
			// msgId: countUser.common.msgId,
			// rankScore: countUser.totalPvForAnchor,
			// roomId: countUser.common.roomId
		};
		simulateData(countMsg);
	}
}

function handleSocialMessage(Message, simulateData) {
	const socialMessage = protobuf.lookup("SocialMessage");
	const social = socialMessage.decode(new Uint8Array(Message.payload));
	if (social) {
		const socialMsg = {
			// shortId: social.user.shortId,
			content: "关注",
			// nickName: social.user.nickName,
			// msgId: social.common.msgId,
			// roomId: social.common.roomId,
			// avatar: social.user.AvatarThumb.urlListList[0]
		};
		simulateData(socialMsg);
	}
}
