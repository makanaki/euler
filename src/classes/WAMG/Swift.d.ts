import { WAMG_Class } from './Class';
export declare class WAMG_Swift extends WAMG_Class {
    protected url: any;
    protected user: any;
    protected pass: any;
    protected client: any;
    protected defaultMeta: {
        'author': string;
        'module': string;
    };
    constructor(url: any, user: any, pass: any);
    createContainer(name: string, meta?: object): Promise<any>;
    deleteContainer(name: string): Promise<any>;
    listContainers(): Promise<any>;
    getContainerMeta(name: string): Promise<any>;
    updateContainerMeta(name: string, meta?: object): Promise<any>;
    info(): Promise<any>;
    createObject(containerName: string, objectName: string, data: any, meta?: object): Promise<any>;
    getObject(containerName: string, objectName: string): Promise<any>;
    getObjectMeta(containerName: string, objectName: string): Promise<any>;
    listContainer(containerName: string): Promise<any>;
}
