//noinspection TypeScriptCheckImport
import * as redis from 'node-redis';

export class WAMG_Cache {

	protected static ttl : number = 20*60;
	protected static port : number = 6379;
//	protected static host : string = 'redis1';
	protected static host : string = 'localhost';

	protected static prefix : string = 'csp-reporting';
	protected static client : any = null;
	protected key : string = '';
	protected fullKey : boolean = false;

	public static init(host, port) {
		WAMG_Cache.port = port;
		WAMG_Cache.host = host;
	}

	protected static connect() {
		if (!WAMG_Cache.client) {
			WAMG_Cache.client = redis.createClient({
				port : WAMG_Cache.port,
				host : WAMG_Cache.host,
			});
			WAMG_Cache.client.on('error', WAMG_Cache.error);
		}
	}

	protected static error(err) {
		console.log('WAMG_Cache ERROR: ---------------------------');
		console.log(err);
		console.log(err.stack);
		console.log('WAMG_Cache ERROR: ---------------------------');
	}

	public static quit() {
		if (WAMG_Cache.client) {
			WAMG_Cache.client.quit();
//			WAMG_Cache.client.end(true);
		}
	}

	constructor(key : string, fullKey : boolean = false) {
		this.key = key;
		this.fullKey = fullKey;
		WAMG_Cache.connect();
	}

	protected getFullKey() : string {
		if (this.key.indexOf(WAMG_Cache.prefix) == -1 && !this.fullKey) {
			return WAMG_Cache.prefix + ':' + this.key;
		} else {
			return this.key;
		}
	}

	public set(value : any, ttl : number = WAMG_Cache.ttl) : Promise<any> {
		var clt = WAMG_Cache.client;
		return new Promise((resolve, reject) => {
			clt.set(this.getFullKey(), value, (error, result) =>{
				if (error) {
					reject(error);
				} else {
					clt.expire(this.getFullKey(), ttl);
					console.log('[WAMG_Cache] : ' + this.getFullKey() + ' : Set');
					resolve(null);
				}
			});
		});
	}

	public get() : Promise<any> {
		var clt = WAMG_Cache.client;
		return new Promise((resolve, reject) => {
			clt.get(this.getFullKey(), (error, result : Buffer) =>{
				if (error) {
					reject(error);
				} else {
					console.log('[WAMG_Cache] : ' + this.getFullKey() + ' : Get');
					if (result === null) throw new Error('WAMG_Cache: [' + this.key + '] is not found');
					resolve(result.toString());
				}
			});
		});
	}

	public mget(keys : string[]) : Promise<any[]> {
		var clt = WAMG_Cache.client;
		return new Promise((resolve, reject) => {
			clt.mget(keys, (error, result : Buffer) =>{
				if (error) {
					reject(error);
				} else {
					var res = [];
					for (var i=0; i<result.length; i++) {
						res.push(result[i].toString());
					}
					resolve(res);
				}
			});
		});
	}

	public keys(pattern : string = '*') : Promise<any> {
		var clt = WAMG_Cache.client;
		return new Promise((resolve, reject) => {
			clt.keys(pattern, (error, result) =>{
				if (error) {
					reject(error);
				} else {
					var res = [];
					for (var i=0; i<result.length; i++) {
						res.push(result[i].toString());
					}
					resolve(res);
				}
			});
		});
	}

	public isSet() : Promise<any> {
		var clt = WAMG_Cache.client;
		return new Promise((resolve, reject) => {
			clt.exists(this.getFullKey(), (error, result) =>{
				if (error) {
					reject(error);
				} else {
					if (result === 1) {
						resolve(true);
					} else {
						resolve(false);
					}
				}
			});
		});
	}

	public del() : Promise<any> {
		var clt = WAMG_Cache.client;
		return new Promise((resolve, reject) => {
			clt.del(this.getFullKey(), (error, result) =>{
				if (error) {
					reject(error);
				} else {
					console.log('[WAMG_Cache] : ' + this.getFullKey() + ' : Del');
					resolve(result);
				}
			});
		});
	}

}
