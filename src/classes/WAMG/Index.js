"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WAMG_Index {
    constructor() {
        this.store = {};
    }
    setList(name, list, itemKey) {
        if (list.length < 1)
            return;
        if (!list[0].hasOwnProperty(itemKey))
            throw new Error('WAMG_Index : List items do not have key [' + itemKey + ']');
        this.store[name] = {};
        list.forEach((item, idx) => {
            this.store[name][item[itemKey]] = idx;
        });
    }
    set(name, itemKeyValue, value) {
        if (!this.store.hasOwnProperty(name))
            this.store[name] = {};
        this.store[name][itemKeyValue] = value;
    }
    getList(name) {
        if (!this.store.hasOwnProperty(name))
            throw new Error('WAMG_Index : Undefined index name [' + name + ']');
        return this.store[name];
    }
    get(name, itemKeyValue) {
        if (!this.store.hasOwnProperty(name))
            throw new Error('WAMG_Index : Undefined index name [' + name + ']');
        if (!this.store[name].hasOwnProperty(itemKeyValue))
            throw new Error('WAMG_Index : Undefined index item in Index [' + name + ']. Values : [' + itemKeyValue + ']');
        return this.store[name][itemKeyValue];
    }
}
exports.WAMG_Index = WAMG_Index;
//# sourceMappingURL=Index.js.map