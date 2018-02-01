import * as stream from "stream";
import {WAMG_Server} from "./../Server";
import {WAMG_Stream} from "./../Stream";
import {WAMG_Interface_Loggable} from './../Interface/Loggable';

export class WAMG_Stream_Transform extends stream.Transform implements WAMG_Interface_Loggable {

	public server : WAMG_Server;

	constructor(server : WAMG_Server) {
		super();
		this.server = server;
	}

	public log(mess : string) : void {
		console.log('[' + (<any>this.constructor).name + '] : ' + mess);
	}

	public throw(mess : any) : void {
		mess = mess ? String(mess) : '';
		throw new Error('[' + (<any>this.constructor).name + '] : ' + mess);
	}

	public logTime(mess : string) : void {
		console.time('[' + (<any>this.constructor).name + '] : ' + mess);
	}

	public logTimeEnd(mess : string) : void {
		console.timeEnd('[' + (<any>this.constructor).name + '] : ' + mess);
	}


}
