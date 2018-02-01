export declare class WAMG_MemCache {
    protected static defaultStoreTime: number;
    protected static store: any;
    protected static cgRun: number;
    static verbose: boolean;
    static isSet(key: string): boolean;
    protected static garbageCollector(): void;
    static set(key: any, data: any, ttl?: number): void;
    static get(key: any): any;
    static unset(key: any): void;
    static unsetAll(): void;
    static keys(): string[];
}
