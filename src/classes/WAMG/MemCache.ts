export class WAMG_MemCache {
	protected static defaultStoreTime = 1000*60*20;
	protected static store : any = {};
	protected static cgRun : number = 0;
	public static verbose = false;

	public static isSet(key : string) {
		if (this.verbose) console.log('WAMG_Memcache:isSet:'+key);
		if (!WAMG_MemCache.store.hasOwnProperty(key)) return false;
		if (WAMG_MemCache.store[key].expire <= Date.now()) {
			WAMG_MemCache.garbageCollector();
			return false;
		}
		return true;
	}

	protected static garbageCollector() {
		if (Date.now()-WAMG_MemCache.cgRun > 5000) {
			WAMG_MemCache.cgRun = Date.now();
			let keys = Object.keys(WAMG_MemCache.store);
			let date = Date.now();
			for (var i=0; i<keys.length; i++) {
				if (WAMG_MemCache.store[keys[i]].expire <= date) {
					delete WAMG_MemCache.store[ keys[ i ] ];
				}
			}
		}
	}

	public static set(key, data, ttl = WAMG_MemCache.defaultStoreTime) {
		if (this.verbose) console.log('WAMG_Memcache:set:'+key);
		WAMG_MemCache.store[key] = {
			value : data,
			expire : Date.now() + ttl
		};
	}

	public static get(key) {
		if (this.verbose) console.log('WAMG_Memcache:get:'+key);
		if (!WAMG_MemCache.store.hasOwnProperty(key)) throw new Error('WAMG_MemCache: key ['+key+'] is not set');
		if (WAMG_MemCache.store[key].expire <= Date.now()) {
			delete WAMG_MemCache.store[key];
			throw new Error('WAMG_MemCache: key ['+key+'] is not set');
		}
		return WAMG_MemCache.store[key].value;
	}

	public static unset(key) {
		if (this.verbose) console.log('WAMG_Memcache:unset:'+key);
		if (!WAMG_MemCache.store.hasOwnProperty(key)) return;
		delete WAMG_MemCache.store[key];
	}

	public static unsetAll() {
		WAMG_MemCache.store = {};
	}

	public static keys() {
		return Object.keys(this.store);
	}

}

