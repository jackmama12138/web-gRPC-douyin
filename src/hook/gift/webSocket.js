import protobuf from './../../proto/proto.js';
import pako from 'pako';
import { handleWebSocketMessage } from './messageHandling';

export class LinkWebSocket {
	constructor(simulateData) {
		this.simulateData = simulateData;
		this.closeHeart = null;
		this.openHeart = null;
		this.shouldReconnect = true;  // 新增：是否允许重连的标志
	}

	_connect = (url) => {
		this.url = url;
		this.websocket = new WebSocket(this.url);
		this.websocket.binaryType = 'arraybuffer';
		this.websocket.onmessage = this.webSocketMessage;
		this.websocket.onopen = this.webSocketOpen;
		this.websocket.onerror = this.webSocketError;
		this.websocket.onclose = this.webSocketClose;
	}

	_disconnect = () => {
		this.shouldReconnect = false;  // 新增：手动断开时设置标志为 false
		if (this.websocket) {
			this.websocket.close();
		}
	}

	webSocketOpen = () => {
		console.log("---------------WebSocket连接成功--------------");
		this.socketSendHeart();
		if (this.closeHeart) {
			clearTimeout(this.closeHeart);
		}
	}

	webSocketError = () => {
		console.error("WebSocket error");
	}

	webSocketMessage = (event) => {
		handleWebSocketMessage(event, this.simulateData, this.socketSendAck);
	}

	webSocketClose = (e) => {
		console.log("---------------WebSocket连接关闭--------------");
		if (this.shouldReconnect) {  // 修改：只有在允许重连时才执行重连逻辑
			console.log("---------------开始进行断网重连--------------");
			this.closeHeart = setTimeout(this._connect.bind(this, this.url), 5000);
		}
	}

	socketSendHeart = () => {
		let heart = {
			PayloadType: "hb"
		};
		this.dyClientSend("PushFrame", heart);
	}

	socketSendAck = (logId, internalExt) => {
		let ackPack = {
			LogId: logId,
			payload_type: internalExt
		};
		this.dyClientSend("PushFrame", ackPack);
	}

	dyClientSend = (lookupType, barrageData) => {
		let baseLookupType = protobuf.lookup(lookupType);
		let data = baseLookupType.create(barrageData);
		let sendData = baseLookupType.encode(data).finish();
		this.webSocketSend(sendData);
	}

	webSocketSend = (data) => {
		if (this.websocket.readyState === 1) {
			this.websocket.send(data);
		}
	}

	heartBeatSend = () => {
		const data = {
			payloadType: "hb"
		};
		this.socketSendHeart("PushFrame", data);
		this.openHeart = setTimeout(this.heartBeatSend.bind(this), 10000);
	}
}
