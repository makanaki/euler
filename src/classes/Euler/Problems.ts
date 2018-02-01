import {WAMG_Class} from "../WAMG/Class";

export class Problems extends WAMG_Class {

	public problem1() : number {
		let summ = 3+5;
		for (let i=6; i<1000; i++) {
			summ += (i%3 === 0 || i%5 === 0) ? i : 0;
		}
		return summ;
	}

}
