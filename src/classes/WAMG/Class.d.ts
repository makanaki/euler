import { WAMG_Interface_Loggable } from './Interface/Loggable';
export declare class WAMG_Class implements WAMG_Interface_Loggable {
    protected instanceId: number;
    constructor();
    fill(rec: any): any;
    log(mess: any): void;
    throw(mess: any): void;
    logTime(mess: string): void;
    logTimeEnd(mess: string): void;
    collect(): any;
    static instantiate(data: any, stub?: any): any;
    getInstanceClassName(): string;
}
