"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Problems_1 = require("../classes/Euler/Problems");
class Index {
    static problems() {
        let probs = new Problems_1.Problems();
        return function (req, res, next) {
            let num = Number(req.params.num ? req.params.num : 1);
            if (probs['problem' + num]) {
                return Promise.resolve().then(() => {
                    return res.json({ result: probs['problem' + num]() });
                }).catch(next);
            }
            else {
                return Promise.resolve().then(() => {
                    return res.json({ result: 'ERROR' });
                }).catch(next);
            }
        };
    }
}
exports.Index = Index;
//# sourceMappingURL=Index.js.map