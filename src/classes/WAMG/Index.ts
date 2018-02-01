export class WAMG_Index {

	protected store = {};

	constructor() {

	}

	public setList(name : string, list : Array<any>, itemKey : string) {
		if (list.length < 1) return;

		if (!list[0].hasOwnProperty(itemKey)) throw new Error('WAMG_Index : List items do not have key [' + itemKey + ']');
		this.store[name] = {};
		list.forEach((item, idx) => {
			this.store[name][item[itemKey]] = idx;
		});
	}

	public set(name : string, itemKeyValue : string, value : any) {
		if (!this.store.hasOwnProperty(name)) this.store[name] = {};
		this.store[name][itemKeyValue] = value;
	}

	public getList(name : string):any {
		if (!this.store.hasOwnProperty(name)) throw new Error('WAMG_Index : Undefined index name [' + name + ']');
		return this.store[name];

	}

	public get(name : string, itemKeyValue : string):any {
		if (!this.store.hasOwnProperty(name)) throw new Error('WAMG_Index : Undefined index name [' + name + ']');
		if (!this.store[name].hasOwnProperty(itemKeyValue)) throw new Error('WAMG_Index : Undefined index item in Index [' + name + ']. Values : [' + itemKeyValue + ']');
		return this.store[name][itemKeyValue];
	}

}
