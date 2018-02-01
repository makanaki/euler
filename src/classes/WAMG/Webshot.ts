//noinspection TypeScriptCheckImport
import * as request from 'request';
import * as crypto from 'crypto';

export class WAMG_Webshot {

	public static url = ' http://webshot3';

	public static getImgBody(
		url : string,
		canvasWidth : number = null,
		canvasHeight : number = null,
		resizeWidth : number = null,
		resizeHeight : number = null,
		delay : number = null,
		type : string = 'jpeg'
	) : Promise<Buffer> {

		var imgUrl = WAMG_Webshot.url + '/snapshot?u=' + encodeURIComponent(url) + '&type=' + type;
		if (canvasWidth != null) imgUrl += '&w=' + canvasWidth;
		if (canvasHeight != null) imgUrl += '&h=' + canvasHeight;
		if (resizeWidth != null) imgUrl += '&rw=' + resizeWidth;
		if (resizeHeight != null) imgUrl += '&rh=' + resizeHeight;
		if (delay !== null) imgUrl += '&d=' + delay;

		console.log('WAMG_Webshot: request URL :[' + imgUrl + ']');

		return new Promise((resolve, reject) => {
			request({
				encoding: null,
				url: imgUrl
			}, function (error, response, body) {
				if (!error && response.statusCode == 200) {
					resolve(body);
				} else {
					if (error === null) {
						try {
							var x = JSON.parse(body).error;
						} catch(e) {
							var x = body;
						}
						reject(new Error(x));
					} else {
						reject(error);
					}
				}
			});
		}).then((data : any) => {
			return data;
		});
	}
}

export class WAMG_Webshot1 {

	public static url = 'http://webshot1/webshot';

	/**
	 * @param url - URL to any web page
	 * @param canvasWidth - width of source shot
	 * @param canvasHeight - height of source shot
	 * @param canvasOffsetX - X offset of shot from left in pixels
	 * @param canvasOffsetY - Y offset of shot from top in pixels
	 * @param resizeWidth - width of result image
	 * @param resizeHeight - height of result image
	 * @param delay - onLoad-like delay for webshot server
	 *
	 * @return String - image content
	 */
	public static getImgBody(url : string, canvasWidth : number, canvasHeight : number, canvasOffsetX : number, canvasOffsetY : number, resizeWidth : number, resizeHeight : number, delay : number = null) : Promise<Buffer> {

		var imgKey = crypto.createHash('md5').update('86c2b13a1c193576206630355d251bff + ' + url).digest("hex");

		var imgUrl = WAMG_Webshot1.url + '/image?url=' + encodeURIComponent(url);
		imgUrl += '&sw=' + canvasWidth;
		imgUrl += '&sh=' + canvasHeight;
		imgUrl += '&sx=' + canvasOffsetX;
		imgUrl += '&sy=' + canvasOffsetY;
		imgUrl += '&tw=' + resizeWidth;
		imgUrl += '&th=' + resizeHeight;
		imgUrl += '&key=' + imgKey;
		imgUrl += '&stamp=' + Date.now()/1000;
		if (delay !== null) imgUrl += '&delay=' + delay;

		return new Promise((resolve, reject) => {
			request({
				encoding: null,
				url: imgUrl
			}, function (error, response, body) {
				if (!error && response.statusCode == 200) {
					resolve(body);
				} else {
					if (error === null) {
						try {
							var x = JSON.parse(body).error;
						} catch(e) {
							var x = body;
						}
						reject(new Error(x));
					} else {
						reject(error);
					}
				}
			});
		}).then((data : any) => {
			return data;
		});

	}

}
