import protobuf from './../../proto/proto.js';
import pako from 'pako';
import { handleWebSocketMessage } from './messageHandling';

export class LinkWebSocket {
	constructor(simulateData) {
		this.simulateData = simulateData;
		this.closeHeart = null;
		this.openHeart = null;
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
		console.log("---------------开始进行断网重连--------------");
		this.closeHeart = setTimeout(this._connect.bind(this, this.url), 5000);
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
