import { WAMG_Class } from "../WAMG/Class";
export declare class FibonacciGenerator implements Iterator<number> {
    protected prev: number[];
    constructor();
    next(): IteratorResult<number>;
}
export declare class PrimeNumber extends WAMG_Class {
    protected static primes: number[];
    static nextPrime(n: number): number;
    static isPrime(n: number): boolean;
}
export declare class Problems extends WAMG_Class {
    problem1(): number;
    problem2(): number;
    protected checkSequense(num: number): number[];
    problem3(): number;
    protected isPalindrom(num: number): boolean;
    problem4(): number;
    protected isEvenDiv20(n: number): boolean;
    problem5(): number;
}
