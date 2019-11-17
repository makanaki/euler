"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
                    value: 1,
                };
            case this.prev.length === 1:
                this.prev.push(1);
                return {
                    done: false,
                    value: 1,
                };
            default:
                let a = this.prev.reduce((acc, val) => {
                    return acc + Number(val);
                }, 0);
                this.prev.shift();
                this.prev.push(a);
                return {
                    done: false,
                    value: a,
                };
        }
    }
}
exports.FibonacciGenerator = FibonacciGenerator;
exports.problems = {
    problem1() {
        let summ = 3 + 5;
        for (let i = 6; i < 1000; i++) {
            summ += i % 3 === 0 || i % 5 === 0 ? i : 0;
        }
        return summ;
    },
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
    },
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
                catch (e) { }
            }
        }
        this.throw('sequence not found');
    },
    problem3() {
        const num = 600851475143;
        let a = this.checkSequense(num);
        return Math.max(...a);
    },
    isPalindrom(num) {
        return (String(num) ===
            String(num)
                .split('')
                .reverse()
                .join(''));
    },
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
    },
    isEvenDiv20(n) {
        for (let i = 2; i <= 20; i++) {
            if (n % i != 0)
                return false;
        }
        return true;
    },
    problem5() {
        let a = 2521;
        while (true) {
            if (this.isEvenDiv20(a))
                return a;
            a++;
        }
    },
    problem6() {
        let summ = 0;
        let summOfSquares = 0;
        for (let i = 1; i <= 100; i++) {
            summ += i;
            summOfSquares += i * i;
        }
        const summSquared = summ * summ;
        return summSquared - summOfSquares;
    },
    isPrime(num) {
        for (let i = 2, s = Math.sqrt(num); i <= s; i++)
            if (num % i === 0)
                return false;
        return num > 1;
    },
    problem7() {
        const primes = [];
        const limit = 10001;
        // const limit = 100
        let i = 1;
        while (primes.length < limit) {
            if (this.isPrime(i)) {
                primes.push(i);
            }
            i++;
        }
        return primes.pop();
    },
    problem8() {
        const str = '731671765313306249192251196744265747423553' +
            '491949349698352031277450632623957831801698' +
            '480186947885184385861560789112949495459501' +
            '737958331952853208805511125406987471585238' +
            '630507156932909632952274430435576689664895' +
            '044524452316173185640309871112172238311362' +
            '229893423380308135336276614282806444486645' +
            '238749303589072962904915604407723907138105' +
            '158593079608667017242712188399879790879227' +
            '492190169972088809377665727333001053367881' +
            '220235421809751254540594752243525849077116' +
            '705560136048395864467063244157221553975369' +
            '781797784617406495514929086256932197846862' +
            '248283972241375657056057490261407972968652' +
            '414535100474821663704844031998900088952434' +
            '506585412275886668811642717147992444292823' +
            '086346567481391912316282458617866458359124' +
            '566529476545682848912883142607690042242190' +
            '226710556263211111093705442175069416589604' +
            '080719840385096245544436298123098787992724' +
            '428490918884580156166097919133875499200524' +
            '063689912560717606058861164671094050775410' +
            '022569831552000559357297257163626956188267' +
            '0428252483600823257530420752963450';
        let i = 0;
        let max = 0;
        let value = 0;
        const step = 13;
        while (true) {
            let val = str.substr(i, step);
            let mul = val.split('').reduce((res, one) => {
                return res * Number(one);
            }, 1);
            if (mul > max) {
                max = mul;
                value = Number(val);
            }
            if (val.length < step)
                break;
            i++;
        }
        return max;
    },
    problem9() {
        for (let a = 1; a < 999; a++) {
            for (let b = a + 1; b < 999; b++) {
                for (let c = b + 1; c < 999; c++) {
                    if (a + b + c === 1000) {
                        if (a * a + b * b === c * c) {
                            // console.log(a, b, c)
                            return a * b * c;
                        }
                    }
                }
            }
        }
        return 0;
    },
    problem10() {
        let summ = 0;
        const cnt = 2000000;
        for (let i = 1; i < cnt; i++) {
            if (this.isPrime(i)) {
                summ += i;
            }
        }
        return summ;
    },
    problem11() {
        // prettier-ignore
        const matrix = [
            ["08", "02", "22", "97", "38", "15", "00", "40", "00", "75", "04", "05", "07", "78", "52", "12", "50", "77", "91", "08",],
            ["49", "49", "99", "40", "17", "81", "18", "57", "60", "87", "17", "40", "98", "43", "69", "48", "04", "56", "62", "00",],
            ["81", "49", "31", "73", "55", "79", "14", "29", "93", "71", "40", "67", "53", "88", "30", "03", "49", "13", "36", "65",],
            ["52", "70", "95", "23", "04", "60", "11", "42", "69", "24", "68", "56", "01", "32", "56", "71", "37", "02", "36", "91",],
            ["22", "31", "16", "71", "51", "67", "63", "89", "41", "92", "36", "54", "22", "40", "40", "28", "66", "33", "13", "80",],
            ["24", "47", "32", "60", "99", "03", "45", "02", "44", "75", "33", "53", "78", "36", "84", "20", "35", "17", "12", "50",],
            ["32", "98", "81", "28", "64", "23", "67", "10", "26", "38", "40", "67", "59", "54", "70", "66", "18", "38", "64", "70",],
            ["67", "26", "20", "68", "02", "62", "12", "20", "95", "63", "94", "39", "63", "08", "40", "91", "66", "49", "94", "21",],
            ["24", "55", "58", "05", "66", "73", "99", "26", "97", "17", "78", "78", "96", "83", "14", "88", "34", "89", "63", "72",],
            ["21", "36", "23", "09", "75", "00", "76", "44", "20", "45", "35", "14", "00", "61", "33", "97", "34", "31", "33", "95",],
            ["78", "17", "53", "28", "22", "75", "31", "67", "15", "94", "03", "80", "04", "62", "16", "14", "09", "53", "56", "92",],
            ["16", "39", "05", "42", "96", "35", "31", "47", "55", "58", "88", "24", "00", "17", "54", "24", "36", "29", "85", "57",],
            ["86", "56", "00", "48", "35", "71", "89", "07", "05", "44", "44", "37", "44", "60", "21", "58", "51", "54", "17", "58",],
            ["19", "80", "81", "68", "05", "94", "47", "69", "28", "73", "92", "13", "86", "52", "17", "77", "04", "89", "55", "40",],
            ["04", "52", "08", "83", "97", "35", "99", "16", "07", "97", "57", "32", "16", "26", "26", "79", "33", "27", "98", "66",],
            ["88", "36", "68", "87", "57", "62", "20", "72", "03", "46", "33", "67", "46", "55", "12", "32", "63", "93", "53", "69",],
            ["04", "42", "16", "73", "38", "25", "39", "11", "24", "94", "72", "18", "08", "46", "29", "32", "40", "62", "76", "36",],
            ["20", "69", "36", "41", "72", "30", "23", "88", "34", "62", "99", "69", "82", "67", "59", "85", "74", "04", "36", "16",],
            ["20", "73", "35", "29", "78", "31", "90", "01", "74", "31", "49", "71", "48", "86", "81", "16", "23", "57", "05", "54",],
            ["01", "70", "54", "71", "83", "51", "54", "69", "16", "92", "33", "48", "61", "43", "52", "01", "89", "19", "67", "48",],
        ];
        let TDir;
        (function (TDir) {
            TDir["left"] = "left";
            TDir["right"] = "right";
            TDir["down"] = "down";
            TDir["up"] = "up";
            TDir["downLeft"] = "downLeft";
            TDir["downRight"] = "downRight";
            TDir["upLeft"] = "upLeft";
            TDir["upRight"] = "upRight";
        })(TDir || (TDir = {}));
        const getLine = (dir, x, y) => {
            let cx = x;
            let cy = y;
            let line = [matrix[x][y]];
            for (let cnt = 1; cnt <= 3; cnt++) {
                switch (dir) {
                    case TDir.down:
                        cy++;
                        break;
                    case TDir.downLeft:
                        cy++;
                        cx--;
                        break;
                    case TDir.downRight:
                        cy++;
                        cx++;
                        break;
                    case TDir.left:
                        cx--;
                        break;
                    case TDir.right:
                        cx++;
                        break;
                    case TDir.up:
                        cy--;
                        break;
                    case TDir.upLeft:
                        cy--;
                        cx--;
                        break;
                    case TDir.upRight:
                        cy--;
                        cx++;
                        break;
                }
                if (matrix[cx] === undefined)
                    return [];
                if (matrix[cx][cy] === undefined)
                    return [];
                line.push(matrix[cx][cy]);
            }
            return line;
        };
        const getLines = (x, y) => {
            const lines = [
                getLine(TDir.down, x, y),
                getLine(TDir.up, x, y),
                getLine(TDir.left, x, y),
                getLine(TDir.right, x, y),
                getLine(TDir.downRight, x, y),
                getLine(TDir.downLeft, x, y),
                getLine(TDir.upRight, x, y),
                getLine(TDir.upLeft, x, y),
            ];
            return lines.map(line => {
                return line.reduce((mul, one) => {
                    return mul * Number(one);
                }, 1);
            });
        };
        let max = 0;
        for (let x = 0; x < 20; x++) {
            for (let y = 0; y < 20; y++) {
                const lines = getLines(x, y);
                if (Math.max(...lines) > max) {
                    max = Math.max(...lines);
                }
            }
        }
        return max;
    },
};
//# sourceMappingURL=Problems.js.map