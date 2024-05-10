import {ref} from 'vue'
import protobuf from '../proto/proto.js'
import pako from "pako";

export function useGift(url) {
	class LinkWebSocket {
		constructor(url) {
			this.url = url;
			this.closeHeart = null;
			this.openHeart = null;
			this.websocket = new WebSocket(url);
			this.websocket.binaryType = 'arraybuffer';
			this.websocket.onmessage = (event) => this.webSocketMessage(event);
			this.websocket.onopen = () => this.webSocketOpen();
			this.websocket.onerror = (error) => this.webSocketError(error);
			this.websocket.onclose = (event) => this.webSocketClose(event);
		}


		 socketSendHeart() {
			let heart = {
				PayloadType: "hb"
			}
			this.dyClientSend("PushFrame", heart)
		}

		webSocketOpen() {
			console.log("---------------WebSocket连接成功--------------")
			console.log(this)
			this.socketSendHeart();
			if (this.closeHeart) {
				clearTimeout(this.closeHeart);
			}
		}

		webSocketError() {

		}

		webSocketMessage(event) {
			let barrage = protobuf.lookup("PushFrame");
			const barrageDecode = barrage.decode(new Uint8Array(event.data))
			const decompressed = pako.ungzip(barrageDecode.payload)
			const response = protobuf.lookup("Response");
			var message = response.decode(new Uint8Array(decompressed));
			var res = response.toObject(message, {});
			if (res.needAck) {
				this.socketSendAck(decompressed.logId, 'ack');
			}
			if (res.messagesList && res.messagesList.length > 0) {
				for (let i = 0; i < res.messagesList.length; i++) {
					this.dealMessage(res.messagesList[i]);
				}
			}
		}



		socketSendAck(logId, internalExt) {
			let ackPack = {
				LogId: logId,
				payload_type: internalExt
			}
			this.dyClientSend("PushFrame", ackPack)
		}

		dyClientSend(lookupType, barrageData) {
			let baseLookupType = protobuf.lookup(lookupType);
			let data = baseLookupType.create(barrageData);
			let sendData = baseLookupType.encode(data).finish();
			this.webSocketSend(sendData);
		}

		//处理消息
		dealMessage(Message) {
			switch (Message.method) {
				case "WebcastChatMessage":
					//处理评论消息
					const chatMessage = protobuf.lookup("ChatMessage");
					let res
					try {
						res = chatMessage.decode(new Uint8Array(Message.payload));
					} catch (e) {
						// console.log("发送异常")
					}
					if (res) {
						const chatMsg = {
							shortId: res.user.shortId,
							content: res.content,
							nickName: res.user.nickName,
							gender: res.user.gender,
							msgId: res.common.msgId,
							avatar: res.user.AvatarThumb.urlListList[0],
						};
						// console.log(chatMsg)
						// this.$refs.comment.esnq(chatMsg)

					}
					break
				case "WebcastGiftMessage":
					const giftMessage = protobuf.lookup("GiftMessage");
					// console.log(giftMessage)
					const giftD = giftMessage.decode(new Uint8Array(Message.payload));
					if (giftD) {
						const giftMsg = {
							shortId: giftD.user.shortId,
							content: giftD.gift.name,
							nickName: giftD.user.nickName,
							gender: giftD.user.gender,
							msgId: giftD.common.msgId,
							giftCount: giftD.totalCount,
							avatar: giftD.user.AvatarThumb.urlListList[0],
							describe: giftD.gift.describe,
							imgUrl: giftD.gift.image.uri,
						};
						console.log(giftMsg)
						// this.$refs.gift.enq(giftMsg)
					}
					break
				case "WebcastLikeMessage":
					const likeMessage = protobuf.lookup("LikeMessage");
					const like = likeMessage.decode(new Uint8Array(Message.payload));
					if (like) {
						const likeMsg = {
							shortId: like.user.shortId,
							content: "点赞",
							nickName: like.user.nickName,
							gender: like.user.gender,
							msgId: like.common.msgId,
							count: like.count,
							avatar: like.user.AvatarThumb.urlListList[0],
						};
						// this.$refs.nice.enq(likeMsg)
					}
					break
				case "WebcastMemberMessage":
					const memberMessage = protobuf.lookup("MemberMessage");
					const member = memberMessage.decode(new Uint8Array(Message.payload));
					if (member) {
						const memberMsg = {
							shortId: member.user.shortId,
							content: "入场",
							nickName: member.user.nickName,
							gender: member.user.gender,
							msgId: member.common.msgId,
							avatar: member.user.AvatarThumb.urlListList[0],
						};
						// this.$refs.entrance.enq(memberMsg)
					}
					break
				//新光
				case "WebcastRoomUserSeqMessage": //必须订阅
					const roomUser = protobuf.lookup("RoomUserSeqMessage");
					const countUser = roomUser.decode(new Uint8Array(Message.payload));
					if (countUser) {
						const countMsg = {
							count: countUser.total,
							totalUser: countUser.totalUser,
							msgId: countUser.common.msgId,
							rankScore: countUser.totalPvForAnchor,
							roomId: countUser.common.roomId,
						}
						// this.$refs.roomInfo.enq(countMsg)
					}
					break
				case "WebcastSocialMessage":
					const socialMessage = protobuf.lookup("SocialMessage");
					const social = socialMessage.decode(new Uint8Array(Message.payload));
					if (social) {
						const socialMsg = {
							shortId: social.user.shortId,
							content: "关注",
							nickName: social.user.nickName,
							msgId: social.common.msgId,
							roomId: social.common.roomId,
							avatar: social.user.AvatarThumb.urlListList[0],
						}
						// this.$refs.focus.enq(socialMsg)
					}
					break
				default:
					break
			}
		}

		webSocketSend(Data) {
			if (this.websocket.readyState === 1) {
				this.websocket.send(Data);
			}
		}

		webSocketClose(e) {
			console.log(e)
			console.log("---------------开始进行断网重连--------------")
			this.coloseHeart = setTimeout(this.initWebSocket, 5000);
		}

		heartBeatSend() {
			const data = {
				payloadType: "hb",
			}
			this.socketSendHeart("PushFrame", data);
			this.openHeart = setTimeout(this.heartBeatSend, 10000);
		}
	}

	// const n = new LinkWebSocket('wss://webcast5-ws-web-hl.douyin.com/webcast/im/push/v2/?app_name=douyin_web&version_code=180800&webcast_sdk_version=1.0.12&update_version_code=1.0.12&compress=gzip&device_platform=web&cookie_enabled=true&screen_width=1680&screen_height=1050&browser_language=zh-CN&browser_platform=MacIntel&browser_name=Mozilla&browser_version=5.0%20(Macintosh;%20Intel%20Mac%20OS%20X%2010_15_7)%20AppleWebKit/537.36%20(KHTML,%20like%20Gecko)%20Chrome/124.0.0.0%20Safari/537.36&browser_online=true&tz_name=Asia/Shanghai&cursor=t-1715366859986_r-1_d-1_u-1_h-7367444369715319842&internal_ext=internal_src:dim|wss_push_room_id:7367407955978881846|wss_push_did:7276853574540740137|first_req_ms:1715366859914|fetch_time:1715366859986|seq:1|wss_info:0-1715366859986-0-0|wrds_v:7367444560047245665&host=https://live.douyin.com&aid=6383&live_id=1&did_rule=3&endpoint=live_pc&support_wrds=1&user_unique_id=7276853574540740137&im_path=/webcast/im/fetch/&identity=audience&need_persist_msg_count=15&insert_task_id=&live_reason=&room_id=7367407955978881846&heartbeatDuration=0&signature=6p26I+2jrtvUEjzA')
	return {
		LinkWebSocket
	}

}

