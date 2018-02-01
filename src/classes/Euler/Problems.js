"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Class_1 = require("../WAMG/Class");
class FibonacciGenerator {
    constructor() {
        this.prev = [];
    }
    next() {
        switch (true) {
            case this.prev.length === 0:
                this.prev.push(1);
                return {
                    done: false,
                    value: 1
                };
            case this.prev.length === 1:
                this.prev.push(1);
                return {
                    done: false,
                    value: 1
                };
            default:
                let a = this.prev.reduce((acc, val) => {
                    return acc + Number(val);
                }, 0);
                this.prev.shift();
                this.prev.push(a);
                return {
                    done: false,
                    value: a
                };
        }
    }
}
exports.FibonacciGenerator = FibonacciGenerator;
class Problems extends Class_1.WAMG_Class {
    problem1() {
        let summ = 3 + 5;
        for (let i = 6; i < 1000; i++) {
            summ += (i % 3 === 0 || i % 5 === 0) ? i : 0;
        }
        return summ;
    }
    problem2() {
        let fg = new FibonacciGenerator();
        let summ = 0;
        let num = 0;
        while (num < 4000000) {
            let res = fg.next();
            num = res.value;
            if (num % 2 > 0)
                continue;
            console.log(num);
            summ += res.value;
        }
        return summ;
    }
}
exports.Problems = Problems;
//# sourceMappingURL=Problems.js.map