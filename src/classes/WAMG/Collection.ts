import { Collection } from "../../modules/collections";
import { WAMG_Interface_Loggable } from '../WAMG/Interface/Loggable';

export class WAMG_Collection<M> extends Collection<M> implements WAMG_Interface_Loggable {

	protected instanceId : number;

	constructor( data = null ) {
		super();
		this.instanceId = Math.round(Math.random() * (9999 - 1111) + 1111);
		if (!data) return;
		this.fill(data);
	}

	public log( mess : any ) : void {
		console.log('[' + this.getInstanceClassName() + '] : ' + mess);
	}

	public throw( mess : any ) : void {
		mess = mess ? String(mess) : '';
		mess = mess === '' ? 'HALT!!!' : mess;
		throw new Error('[' + this.getInstanceClassName() + '] : ' + mess);
	}

	public logTime( mess : string ) : void {
		console.time('[' + this.getInstanceClassName() + '] : ' + mess + ' [IID:' + String(this.instanceId) + ']');
	}

	public logTimeEnd( mess : string ) : void {
		console.timeEnd('[' + this.getInstanceClassName() + '] : ' + mess + ' [IID:' + String(this.instanceId) + ']');
	}

	public fill( rec : any[] ) : any {
		console.trace();
		throw new Error('WAMG_Collection<M> : abstract method [fill] not implemented');
	}

	public sort( compareFunc : ( V1 : any, V2 : any ) => any ) {
		let a : Array<M> = this.values();
		a.sort(compareFunc);
		this.clear();
		for ( let i = 0 ; i < a.length ; i++ ) {
			this.addValue(a[ i ]);
		}
	}

	public getItemIndex( item : M ) {
		let res = -1;
		this.forEach(( currItm : M, index : number ) => {
			if (currItm === item) {
				res = index;
			}
		});

		if (res === -1) throw new Error('WAMG_Collection: Item not found in collection');

		return res;
	}

	public collect() : any {
		const cnt = this.size();
		let res = [];
		for ( let i = 0 ; i < cnt ; i++ ) {
			let item : any = this.getValue(i);
			if (item.collect) {
				res.push(item.collect());
			} else {
				res.push(item);
			}
		}
		return res;
	}

	public getInstanceClassName() : string {
		// let funcNameRegex = /function (.{1,})\(/;
		// let results = (funcNameRegex).exec(this['constructor'].toString());
		// return (results && results.length > 1) ? results[1] : '';
		return this.constructor.name;
	}

}
