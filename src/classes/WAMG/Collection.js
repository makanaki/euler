"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collections_1 = require("../../modules/collections");
class WAMG_Collection extends collections_1.Collection {
    constructor(data = null) {
        super();
        this.instanceId = Math.round(Math.random() * (9999 - 1111) + 1111);
        if (!data)
            return;
        this.fill(data);
    }
    log(mess) {
        console.log('[' + this.getInstanceClassName() + '] : ' + mess);
    }
    throw(mess) {
        mess = mess ? String(mess) : '';
        mess = mess === '' ? 'HALT!!!' : mess;
        throw new Error('[' + this.getInstanceClassName() + '] : ' + mess);
    }
    logTime(mess) {
        console.time('[' + this.getInstanceClassName() + '] : ' + mess + ' [IID:' + String(this.instanceId) + ']');
    }
    logTimeEnd(mess) {
        console.timeEnd('[' + this.getInstanceClassName() + '] : ' + mess + ' [IID:' + String(this.instanceId) + ']');
    }
    fill(rec) {
        console.trace();
        throw new Error('WAMG_Collection<M> : abstract method [fill] not implemented');
    }
    sort(compareFunc) {
        let a = this.values();
        a.sort(compareFunc);
        this.clear();
        for (let i = 0; i < a.length; i++) {
            this.addValue(a[i]);
        }
    }
    getItemIndex(item) {
        let res = -1;
        this.forEach((currItm, index) => {
            if (currItm === item) {
                res = index;
            }
        });
        if (res === -1)
            throw new Error('WAMG_Collection: Item not found in collection');
        return res;
    }
    collect() {
        const cnt = this.size();
        let res = [];
        for (let i = 0; i < cnt; i++) {
            let item = this.getValue(i);
            if (item.collect) {
                res.push(item.collect());
            }
            else {
                res.push(item);
            }
        }
        return res;
    }
    getInstanceClassName() {
        // let funcNameRegex = /function (.{1,})\(/;
        // let results = (funcNameRegex).exec(this['constructor'].toString());
        // return (results && results.length > 1) ? results[1] : '';
        return this.constructor.name;
    }
}
exports.WAMG_Collection = WAMG_Collection;
//# sourceMappingURL=Collection.js.map