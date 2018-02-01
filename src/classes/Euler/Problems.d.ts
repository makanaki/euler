import { WAMG_Class } from "../WAMG/Class";
export declare class FibonacciGenerator implements Iterator<number> {
    protected prev: number[];
    constructor();
    next(): IteratorResult<number>;
}
export declare class Problems extends WAMG_Class {
    problem1(): number;
    problem2(): number;
}
