export declare class WAMG_Index {
    protected store: {};
    constructor();
    setList(name: string, list: Array<any>, itemKey: string): void;
    set(name: string, itemKeyValue: string, value: any): void;
    getList(name: string): any;
    get(name: string, itemKeyValue: string): any;
}
