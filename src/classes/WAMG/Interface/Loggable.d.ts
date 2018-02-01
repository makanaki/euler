export interface WAMG_Interface_Loggable {
    log(mess: string): void;
    throw(mess: any): void;
    logTime(mess: string): void;
    logTimeEnd(mess: string): void;
}
