import {WAMG_Index} from './../Index';
export class WAMG_Index_Factory {

	protected static store = {};

	public static get(indexName):WAMG_Index {
		if (!this.store[indexName]) this.store[indexName] = new WAMG_Index();
		return this.store[indexName];
	}

	public static drop(indexName) {
		if (!this.store[indexName]) return;
		this.store[indexName].destroy();
		delete this.store[indexName];
	}

}
