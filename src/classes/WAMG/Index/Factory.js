"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Index_1 = require("./../Index");
class WAMG_Index_Factory {
    static get(indexName) {
        if (!this.store[indexName])
            this.store[indexName] = new Index_1.WAMG_Index();
        return this.store[indexName];
    }
    static drop(indexName) {
        if (!this.store[indexName])
            return;
        this.store[indexName].destroy();
        delete this.store[indexName];
    }
}
WAMG_Index_Factory.store = {};
exports.WAMG_Index_Factory = WAMG_Index_Factory;
//# sourceMappingURL=Factory.js.map