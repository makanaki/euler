"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WAMG_Class {
    constructor() {
        this.instanceId = Math.round(Math.random() * (9999 - 1111) + 1111);
    }
    fill(rec) {
        for (let field in rec) {
            if (!rec.hasOwnProperty(field))
                continue;
            this[field] = rec[field];
        }
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
    collect() {
        let res = {};
        for (let item in this) {
            if (!this.hasOwnProperty(item))
                continue;
            res[item] = this[item];
        }
        return res;
    }
    static instantiate(data, stub) {
        console.trace();
        throw new Error("WAMG_Class : abstract method [instantiate] not implemented");
    }
    getInstanceClassName() {
        return this.constructor.name;
    }
}
exports.WAMG_Class = WAMG_Class;
//# sourceMappingURL=Class.js.map