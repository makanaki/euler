import { WAMG_Interface_Loggable } from './Interface/Loggable';

export class WAMG_Class implements WAMG_Interface_Loggable {

	protected instanceId : number;

	constructor() {
		this.instanceId = Math.round(Math.random() * (9999 - 1111) + 1111);
	}

	public fill( rec : any ) : any {
		for ( let field in rec ) {
			if (!rec.hasOwnProperty(field)) continue;
			this[ field ] = rec[ field ];
		}
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

	public collect() : any {
		let res : any = {};
		for ( let item in this ) {
			if (!this.hasOwnProperty(item)) continue;
			res[ item ] = this[ item ];
		}
		return res;
	}

	public static instantiate( data : any, stub? : any ) : any {
		console.trace();
		throw new Error("WAMG_Class : abstract method [instantiate] not implemented");
	}

	public getInstanceClassName() : string {
		return this.constructor.name;
	}
}

