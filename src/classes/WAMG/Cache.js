"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//noinspection TypeScriptCheckImport
const redis = require("node-redis");
class WAMG_Cache {
    constructor(key, fullKey = false) {
        this.key = '';
        this.fullKey = false;
        this.key = key;
        this.fullKey = fullKey;
        WAMG_Cache.connect();
    }
    static init(host, port) {
        WAMG_Cache.port = port;
        WAMG_Cache.host = host;
    }
    static connect() {
        if (!WAMG_Cache.client) {
            WAMG_Cache.client = redis.createClient({
                port: WAMG_Cache.port,
                host: WAMG_Cache.host,
            });
            WAMG_Cache.client.on('error', WAMG_Cache.error);
        }
    }
    static error(err) {
        console.log('WAMG_Cache ERROR: ---------------------------');
        console.log(err);
        console.log(err.stack);
        console.log('WAMG_Cache ERROR: ---------------------------');
    }
    static quit() {
        if (WAMG_Cache.client) {
            WAMG_Cache.client.quit();
            //			WAMG_Cache.client.end(true);
        }
    }
    getFullKey() {
        if (this.key.indexOf(WAMG_Cache.prefix) == -1 && !this.fullKey) {
            return WAMG_Cache.prefix + ':' + this.key;
        }
        else {
            return this.key;
        }
    }
    set(value, ttl = WAMG_Cache.ttl) {
        var clt = WAMG_Cache.client;
        return new Promise((resolve, reject) => {
            clt.set(this.getFullKey(), value, (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    clt.expire(this.getFullKey(), ttl);
                    console.log('[WAMG_Cache] : ' + this.getFullKey() + ' : Set');
                    resolve(null);
                }
            });
        });
    }
    get() {
        var clt = WAMG_Cache.client;
        return new Promise((resolve, reject) => {
            clt.get(this.getFullKey(), (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    console.log('[WAMG_Cache] : ' + this.getFullKey() + ' : Get');
                    if (result === null)
                        throw new Error('WAMG_Cache: [' + this.key + '] is not found');
                    resolve(result.toString());
                }
            });
        });
    }
    mget(keys) {
        var clt = WAMG_Cache.client;
        return new Promise((resolve, reject) => {
            clt.mget(keys, (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    var res = [];
                    for (var i = 0; i < result.length; i++) {
                        res.push(result[i].toString());
                    }
                    resolve(res);
                }
            });
        });
    }
    keys(pattern = '*') {
        var clt = WAMG_Cache.client;
        return new Promise((resolve, reject) => {
            clt.keys(pattern, (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    var res = [];
                    for (var i = 0; i < result.length; i++) {
                        res.push(result[i].toString());
                    }
                    resolve(res);
                }
            });
        });
    }
    isSet() {
        var clt = WAMG_Cache.client;
        return new Promise((resolve, reject) => {
            clt.exists(this.getFullKey(), (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    if (result === 1) {
                        resolve(true);
                    }
                    else {
                        resolve(false);
                    }
                }
            });
        });
    }
    del() {
        var clt = WAMG_Cache.client;
        return new Promise((resolve, reject) => {
            clt.del(this.getFullKey(), (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    console.log('[WAMG_Cache] : ' + this.getFullKey() + ' : Del');
                    resolve(result);
                }
            });
        });
    }
}
WAMG_Cache.ttl = 20 * 60;
WAMG_Cache.port = 6379;
//	protected static host : string = 'redis1';
WAMG_Cache.host = 'localhost';
WAMG_Cache.prefix = 'csp-reporting';
WAMG_Cache.client = null;
exports.WAMG_Cache = WAMG_Cache;
//# sourceMappingURL=Cache.js.map