import { WAMG_Index } from './../Index';
export declare class WAMG_Index_Factory {
    protected static store: {};
    static get(indexName: any): WAMG_Index;
    static drop(indexName: any): void;
}
