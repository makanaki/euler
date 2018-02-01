import { Collection } from "../../modules/collections";
import { WAMG_Interface_Loggable } from '../WAMG/Interface/Loggable';
export declare class WAMG_Collection<M> extends Collection<M> implements WAMG_Interface_Loggable {
    protected instanceId: number;
    constructor(data?: any);
    log(mess: any): void;
    throw(mess: any): void;
    logTime(mess: string): void;
    logTimeEnd(mess: string): void;
    fill(rec: any[]): any;
    sort(compareFunc: (V1: any, V2: any) => any): void;
    getItemIndex(item: M): number;
    collect(): any;
    getInstanceClassName(): string;
}
