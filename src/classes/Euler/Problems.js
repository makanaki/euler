"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Class_1 = require("../WAMG/Class");
class Problems extends Class_1.WAMG_Class {
    problem1() {
        let summ = 3 + 5;
        for (let i = 6; i < 1000; i++) {
            summ += (i % 3 === 0 || i % 5 === 0) ? i : 0;
        }
        return summ;
    }
}
exports.Problems = Problems;
//# sourceMappingURL=Problems.js.map