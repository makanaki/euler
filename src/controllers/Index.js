"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Problems_1 = require("../classes/Euler/Problems");
class Index {
    static problems() {
        let probs = new Problems_1.Problems();
        return function (req, res, next) {
            let num = Number(req.params.num ? req.params.num : 1);
            switch (num) {
                case 1: return Promise.resolve().then(() => {
                    return res.json({ result: probs.problem1() });
                }).catch(next);
                case 2: return Promise.resolve().then(() => {
                    return res.json({ result: probs.problem2() });
                }).catch(next);
                default: return Promise.resolve().then(() => {
                    return res.json({ result: 'ERROR' });
                }).catch(next);
            }
        };
    }
}
exports.Index = Index;
//# sourceMappingURL=Index.js.map