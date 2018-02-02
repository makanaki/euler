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
class PrimeNumber extends Class_1.WAMG_Class {
    static nextPrime(n) {
        let idx = PrimeNumber.primes.indexOf(n) + 1;
        if (!PrimeNumber.primes[idx])
            throw new Error('Need more primes!!!');
        return PrimeNumber.primes[idx];
    }
    static isPrime(n) {
        let a = new Set(PrimeNumber.primes);
        if (n > 29)
            throw new Error('Need more primes!!!');
        return a.has(n);
    }
}
PrimeNumber.primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29,
    31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103,
    107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179,
    181, 191, 193, 197, 199];
exports.PrimeNumber = PrimeNumber;
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
            summ += res.value;
        }
        return summ;
    }
    checkSequense(num) {
        if (num === 1)
            return [1];
        for (let i = 2; i <= num; i++) {
            if (num % i === 0) {
                try {
                    let res = this.checkSequense(num / i);
                    let a = [i];
                    a.push(...res);
                    return a;
                }
                catch (e) {
                }
            }
        }
        this.throw('sequence not found');
    }
    problem3() {
        const num = 600851475143;
        let a = this.checkSequense(num);
        return Math.max(...a);
    }
    isPalindrom(num) {
        return String(num) === String(num).split("").reverse().join("");
    }
    problem4() {
        let s = [];
        for (let i = 999; i >= 111; i--) {
            for (let c = 999; c >= 111; c--) {
                if (this.isPalindrom(i * c)) {
                    s.push(i * c);
                }
            }
        }
        return Math.max(...s);
    }
    isEvenDiv20(n) {
        for (let i = 2; i <= 20; i++) {
            if (n % i != 0)
                return false;
        }
        return true;
    }
    problem5() {
        let a = 2521;
        while (true) {
            if (this.isEvenDiv20(a))
                return a;
            a++;
        }
    }
}
exports.Problems = Problems;
//# sourceMappingURL=Problems.js.map