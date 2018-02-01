import {WAMG_Class} from "../WAMG/Class";

export class FibonacciGenerator implements Iterator<number>{
	protected prev : number[] = [];
	constructor(){

	}
	public next(): IteratorResult<number>{
		switch (true) {
			case this.prev.length === 0:
				this.prev.push(1);
				return {
					done: false,
					value : 1
				};
			case this.prev.length === 1:
				this.prev.push(1);
				return {
					done: false,
					value : 1
				};
			default:
				let a = this.prev.reduce((acc, val) => {
					return acc + Number(val);
				}, 0);
				this.prev.shift();
				this.prev.push(a);
				return {
					done: false,
					value : a
				};
		}
	}
}
export class Problems extends WAMG_Class {

	public problem1() : number {
		let summ = 3+5;
		for (let i=6; i<1000; i++) {
			summ += (i%3 === 0 || i%5 === 0) ? i : 0;
		}
		return summ;
	}

	public problem2() : number {
		let fg = new FibonacciGenerator();
		let summ = 0;
		let num = 0;
		while (num < 4000000) {
			let res = fg.next();
			num = res.value;
			if (num%2 > 0) continue;
			summ += res.value;
		}
		return summ;
	}

}
