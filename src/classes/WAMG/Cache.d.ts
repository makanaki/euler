export declare class WAMG_Cache {
    protected static ttl: number;
    protected static port: number;
    protected static host: string;
    protected static prefix: string;
    protected static client: any;
    protected key: string;
    protected fullKey: boolean;
    static init(host: any, port: any): void;
    protected static connect(): void;
    protected static error(err: any): void;
    static quit(): void;
    constructor(key: string, fullKey?: boolean);
    protected getFullKey(): string;
    set(value: any, ttl?: number): Promise<any>;
    get(): Promise<any>;
    mget(keys: string[]): Promise<any[]>;
    keys(pattern?: string): Promise<any>;
    isSet(): Promise<any>;
    del(): Promise<any>;
}
