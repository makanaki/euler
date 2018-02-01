"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//noinspection TypeScriptCheckImport
const path = require("path");
class WAMG_Assets {
    static getFullPath(filename) {
        return path.join(__dirname, '../../assets/' + filename);
    }
}
exports.WAMG_Assets = WAMG_Assets;
//# sourceMappingURL=Assets.js.map