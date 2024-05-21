const axios = require('axios')
const {generate_a_bogus} = require('./a_bogus')


/**
 * @param {String} anchorId
 * @returns {Promise<{data: any}>}
 * @description 获取热门榜 res.ranks => 列表数组
 * */
exports.getHotLists = async function getHotLists(anchorId) {

	const baseURL = 'https://live.douyin.com/webcast/ranklist/popularity/';
	const params = {
		aid: '6383',
		app_name: 'douyin_web',
		live_id: '1',
		device_platform: 'web',
		language: 'zh-CN',
		enter_from: 'web_live',
		cookie_enabled: 'true',
		screen_width: '1680',
		screen_height: '1050',
		browser_language: 'zh-CN',
		browser_platform: 'MacIntel',
		browser_name: 'Chrome',
		browser_version: '124.0.0.0',
		browser_online: 'true',
		engine_name: 'Blink',
		engine_version: '124.0.0.0',
		os_name: 'Mac OS',
		os_version: '10.15.7',
		cpu_core_num: '8',
		device_memory: '8',
		platform: 'PC',
		downlink: '10',
		effective_type: '4g',
		round_trip_time: '50',
		channel: 'channel_pc_web', // webid: '7276853574540740137',
		user_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36', // fp: '',
		// did: '0',
		// referer: 'https://live.douyin.com/114080024944?cover_type=0&enter_from_merge=web_live&enter_method=web_card&game_name=&is_recommend=1&live_type=game&more_detail=&request_id=202405170528433B2E3F871863438069CD&room_id=7369580731619642121&stream_type=vertical&title_type=1&web_live_page=hot_live&web_live_tab=all',
		// target: '',
		anchor_id: anchorId, // room_id: '7369580731619642121',
		msToken: '-Rb2Lv1R9oB47Qch_KSEVx-zt0fuMVDEf2oMwRKMM03ia9bIhJq1Nw0IGYDhC8Ftnqp7fcgKxBJZegu6omHLfWSk6xLUAP3Xn3lbcPmVQZMw8TVo3srG', // a_bogus: 'O78MQDwkdE6sDf665fALfY3q6533YdRt0tLVMD2f8x3Vdy39HMYj9exEhkXvjcjjLG%2FlIe8jy4hbTNxhrQQb0qwf9usL%2F2CZmL40SMQQ524j53iruyR%2FrzWF-vGUtPBB-JrlrOX0owlHFbjplVAH4hPvPE9japykTiyxypaC3pHY'
	};
	/**
	 * 将参数转url格式的字符串
	 * */
	const URLParams = new URLSearchParams(params).toString()
	const a_bogus = generate_a_bogus(URLParams, params.user_agent);
	const URL = `${baseURL}?${URLParams}&a_bogus=${a_bogus}`;
	const headers = {
		'User-Agent': params.user_agent
	}

	try {
		const {data} = await axios.get(URL, {headers})
		return data.data
	} catch (e) {
		console.log(e)
	}
}

/**
 * @获取热门列表测试
 * */
// getHotLists('69605313209').then((res) => {
// 	console.log(res)
// })

/**
 * @description 获取分数榜 res.ranks => 列表数组
 * @return {Promise<{data: any}>}
 * */
exports.getScoresLists = async function getScoresLists() {
	const config = {
		method: 'get',
		url: 'https://webcast.amemv.com/webcast/ranklist/hot/?is_vcd=1&request_tag_from=h5&iid=4176368935690585&device_id=4040036107697033&ac=wifi&channel=tengxun_1128_1025&aid=1128&app_name=aweme&version_code=200600&version_name=20.6.0&device_platform=android&os=android&ssmix=a&device_type=GM1900&device_brand=OnePlus&language=zh&os_api=28&os_version=9&openudid=ba63e8241d176a04&manifest_version_code=200601&resolution=1080*1920&dpi=480&update_version_code=20609900&_rticket=1715898854319&package=com.ss.android.ugc.aweme&mcc_mnc=46000&cpu_support64=true&host_abi=armeabi-v7a&is_guest_mode=0&app_type=normal&minor_status=0&appTheme=light&need_personal_recommend=1&is_android_pad=0&ts=1715898853&cdid=aa0836de-a62b-4fce-bd19-d3d365bb936a&uuid=010306025944827',
		headers: {
			'x-tt-dt': ' AAATZR6BOIZTE4NF756TSM52SOBCKHQFJ65ZXE7CMJI4UQE3BA43PJFPCZHB5HKIWDBMUP6GV6B27LSYFNFYG2YFVQU27OWCOH6OUAHWVF626QMHZENTTHTZBYEI4AXV2A3Z722F2IIOVO5DOKVN3HA',
			'activity_now_client': ' 1715898854944',
			'sdk-version': ' 2',
			'passport-sdk-version': ' 20363',
			'x-vc-bdturing-sdk-version': ' 2.2.1.cn',
			'User-Agent': ' com.ss.android.ugc.aweme/200601 (Linux; U; Android 9; zh_CN; GM1900; Build/PQ3A.190605.04081832;tt-ok/3.10.0.2)',
			'X-Ladon': ' 6I0FFvx8+Hc6jJe8WyZ867qzMyLWkLFr6aq+0ei2RbFbpfND',
			'X-Khronos': ' 1715898854',
			'X-Argus': ' xwN6fLps5ukyOe4SXaKeF6u4kOVGTBBF2Q14CnLyhGEpi4sw0P2fIDqA+6RHxyghXdM9Hr4MjOqZZp/v582/ERqFHvbUaerpMZwSaOlecUJkkPKRN6bvnKk7Z/5ehq0bQPAqpxvpvlhEHw4TlEEfvfkgm9AsDRbVFXkNN/m4sxvzSKYfD36jty6QXxZOPD5EDdwZlcy20pPgdnWQuEy68yxNP2zDHMeEcoaGgx5gUF87P+hD4wwJLJb/P2KqPCbvvx+K2VqDYrAIZs5UcXctkyDU',
			'X-Gorgon': ' 0404e0374005f4f84c9c189b409aa7b4fa066fd378545281e8c2',
			'Connection': ' Keep-Alive',
			'Cookie': ' store-region=cn-cq; store-region-src=did; install_id=4176368935690585; ttreq=1$a39adb5b4ce85303b60e6e74b0051eae96c75259; odin_tt=f2d881991a7d6d28ece34e021f4d36cbcc26c3922808b857e3c69ddeab66d417da00dcc7358c8a60744dff853ace9e1fc937caedb6a1b9f1d9eaa84dd68dd2b8; passport_csrf_token=d7252975025dd7974770290ca1ec7b3c; passport_csrf_token_default=d7252975025dd7974770290ca1ec7b3c',
			'Accept': '*/*', // 'Host': 'webcast.amemv.com'
		}
	};


	try {
		const {data} = await axios(config)
		return data.data
	} catch (e) {
		console.log(e)
	}

}

/**
 * @description 获取分数榜测试
 * */
// getScoresLists().then(res=>{
// 	console.log(res)
// })

/**
 * @description 用户id转roomid res.roomId => room_id
 * @param {String} web_rid
 * @return {Promise<{data: any}>}
 * */
exports.getRoomId = async function getDouyinUrl(web_rid) {
	const liveUrl = `https://live.douyin.com/${web_rid}`;
	const headers = {
		'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
		'Upgrade-Insecure-Requests': '1'
	};
	const initialResponse = await axios.get(liveUrl, { headers });
	const setCookieOne = initialResponse.headers['set-cookie'][0];
	const acNonceMatch = setCookieOne.match(/__ac_nonce=(.*?);/i);
	const acNonce = acNonceMatch ? acNonceMatch[1] : null;
	if (!acNonce) return null;

	const session = axios.create({ headers: { Cookie: `__ac_nonce=${acNonce}` } });
	const twoResponse = await session.get(liveUrl, { headers });

	const setCookieOneTwo = twoResponse.headers['set-cookie'][0];
	const ttwidMatch = setCookieOneTwo.match(/ttwid=.*?;/i);
	const ttwid = ttwidMatch ? ttwidMatch[0] : null;
	if (!ttwid) return null;

	const url = `https://live.douyin.com/webcast/room/web/enter/?aid=6383&app_name=douyin_web&live_id=1&device_platform=web&language=zh-CN&enter_from=web_live&cookie_enabled=true&screen_width=1728&screen_height=1117&browser_language=zh-CN&browser_platform=MacIntel&browser_name=Chrome&browser_version=116.0.0.0&web_rid=${web_rid}`;
	const finalHeaders = {
		'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
		'Cookie': ttwid,
		'Accept': '*/*',
		'Host': 'live.douyin.com',
		'Connection': 'keep-alive'
	};

	const res = await axios.get(url, { headers: finalHeaders });
	const data = res.data;
	const status = data.data?.data[0]?.status || 4;

	if (status !== 2) return {status: '下播了', roomId: '0'};



	try {
		// return data.data?.enter_room_id || '0'
		return {
			status: '直播中',
			roomId: data.data?.enter_room_id || '0'
		}

	}catch (e){

	}
}
