export class FibonacciGenerator implements Iterator<number> {
    prev: number[] = []

    constructor() {}

    next(): IteratorResult<number> {
        switch (true) {
            case this.prev.length === 0:
                this.prev.push(1)
                return {
                    done: false,
                    value: 1,
                }
            case this.prev.length === 1:
                this.prev.push(1)
                return {
                    done: false,
                    value: 1,
                }
            default:
                let a = this.prev.reduce((acc, val) => {
                    return acc + Number(val)
                }, 0)
                this.prev.shift()
                this.prev.push(a)
                return {
                    done: false,
                    value: a,
                }
        }
    }
}

export const problem1 = (): number => {
    let summ = 3 + 5
    for (let i = 6; i < 1000; i++) {
        summ += i % 3 === 0 || i % 5 === 0 ? i : 0
    }
    return summ
}

export const problem2 = (): number => {
    let fg = new FibonacciGenerator()
    let summ = 0
    let num = 0
    while (num < 4000000) {
        let res = fg.next()
        num = res.value
        if (num % 2 > 0) continue
        summ += res.value
    }
    return summ
}

const checkSequense = (num: number): number[] => {
    if (num === 1) return [1]
    for (let i = 2; i <= num; i++) {
        if (num % i === 0) {
            try {
                let res = this.checkSequense(num / i)
                let a = [i]
                a.push(...res)
                return a
            } catch (e) {}
        }
    }
    this.throw('sequence not found')
}

export const problem3 = (): number => {
    const num = 600851475143
    let a: number[] = this.checkSequense(num)
    return Math.max(...a)
}

const isPalindrom = (num: number): boolean => {
    return (
        String(num) ===
        String(num)
            .split('')
            .reverse()
            .join('')
    )
}

export const problem4 = (): number => {
    let s = []
    for (let i = 999; i >= 111; i--) {
        for (let c = 999; c >= 111; c--) {
            if (this.isPalindrom(i * c)) {
                s.push(i * c)
            }
        }
    }
    return Math.max(...s)
}

const isEvenDiv20 = (n: number): boolean => {
    for (let i = 2; i <= 20; i++) {
        if (n % i != 0) return false
    }
    return true
}

export const problem5 = (): number => {
    let a = 2521
    while (true) {
        if (this.isEvenDiv20(a)) return a
        a++
    }
}

export const problem6 = (): number => {
    let summ = 0
    let summOfSquares = 0
    for (let i = 1; i <= 100; i++) {
        summ += i
        summOfSquares += i * i
    }
    const summSquared = summ * summ
    return summSquared - summOfSquares
}

const isPrime = num => {
    for (let i = 2, s = Math.sqrt(num); i <= s; i++) if (num % i === 0) return false
    return num > 1
}

export const problem7 = (): number => {
    const primes = []
    const limit = 10001
    // const limit = 100
    let i = 1
    while (primes.length < limit) {
        if (this.isPrime(i)) {
            primes.push(i)
        }
        i++
    }
    return primes.pop()
}

export const problem8 = (): number => {
    const str =
        '731671765313306249192251196744265747423553' +
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
        '0428252483600823257530420752963450'

    let i = 0
    let max = 0
    let value = 0
    const step = 13
    while (true) {
        let val = str.substr(i, step)
        let mul = val.split('').reduce((res, one) => {
            return res * Number(one)
        }, 1)
        if (mul > max) {
            max = mul
            value = Number(val)
        }
        if (val.length < step) break
        i++
    }

    return max
}

export const problem9 = () => {
    for (let a = 1; a < 999; a++) {
        for (let b = a + 1; b < 999; b++) {
            for (let c = b + 1; c < 999; c++) {
                if (a + b + c === 1000) {
                    if (a * a + b * b === c * c) {
                        // console.log(a, b, c)
                        return a * b * c
                    }
                }
            }
        }
    }

    return 0
}
export const problem10 = () => {
    let summ = 0
    const cnt = 2000000
    for (let i = 1; i < cnt; i++) {
        if (this.isPrime(i)) {
            summ += i
        }
    }
    return summ
}
