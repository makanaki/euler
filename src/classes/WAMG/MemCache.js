"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WAMG_MemCache {
    static isSet(key) {
        if (this.verbose)
            console.log('WAMG_Memcache:isSet:' + key);
        if (!WAMG_MemCache.store.hasOwnProperty(key))
            return false;
        if (WAMG_MemCache.store[key].expire <= Date.now()) {
            WAMG_MemCache.garbageCollector();
            return false;
        }
        return true;
    }
    static garbageCollector() {
        if (Date.now() - WAMG_MemCache.cgRun > 5000) {
            WAMG_MemCache.cgRun = Date.now();
            let keys = Object.keys(WAMG_MemCache.store);
            let date = Date.now();
            for (var i = 0; i < keys.length; i++) {
                if (WAMG_MemCache.store[keys[i]].expire <= date) {
                    delete WAMG_MemCache.store[keys[i]];
                }
            }
        }
    }
    static set(key, data, ttl = WAMG_MemCache.defaultStoreTime) {
        if (this.verbose)
            console.log('WAMG_Memcache:set:' + key);
        WAMG_MemCache.store[key] = {
            value: data,
            expire: Date.now() + ttl
        };
    }
    static get(key) {
        if (this.verbose)
            console.log('WAMG_Memcache:get:' + key);
        if (!WAMG_MemCache.store.hasOwnProperty(key))
            throw new Error('WAMG_MemCache: key [' + key + '] is not set');
        if (WAMG_MemCache.store[key].expire <= Date.now()) {
            delete WAMG_MemCache.store[key];
            throw new Error('WAMG_MemCache: key [' + key + '] is not set');
        }
        return WAMG_MemCache.store[key].value;
    }
    static unset(key) {
        if (this.verbose)
            console.log('WAMG_Memcache:unset:' + key);
        if (!WAMG_MemCache.store.hasOwnProperty(key))
            return;
        delete WAMG_MemCache.store[key];
    }
    static unsetAll() {
        WAMG_MemCache.store = {};
    }
    static keys() {
        return Object.keys(this.store);
    }
}
WAMG_MemCache.defaultStoreTime = 1000 * 60 * 20;
WAMG_MemCache.store = {};
WAMG_MemCache.cgRun = 0;
WAMG_MemCache.verbose = false;
exports.WAMG_MemCache = WAMG_MemCache;
//# sourceMappingURL=MemCache.js.map