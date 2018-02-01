import { CSP_User } from './../CSP/User';
import { CSP_User_Settings } from './../CSP/User/Settings';
import { CSP_ACU } from './../CSP/ACU';
import { CSP_Ontology } from './../CSP/Ontology';
import { CSP_Service } from './../CSP/Service';
import { CSP_AdHoc_Entities } from './../CSP/AdHoc/Entities';
import { CSP_HXObject_GeneralSettings } from './../CSP/HXObject/GeneralSettings';
import { WAMG_Class } from "./../WAMG/Class";
import { WAMG_Swift } from './../WAMG/Swift';
export declare class WAMG_Server extends WAMG_Class {
    static modeAdvertiser: string;
    static modePublisher: string;
    static modeDefault: string;
    static promStorage: any[];
    request: any;
    response: any;
    id: number;
    protected promises: any;
    protected ontology: CSP_Ontology;
    protected service: CSP_Service;
    protected entities: CSP_AdHoc_Entities;
    protected user: CSP_User;
    protected ACU: CSP_ACU;
    protected swift: WAMG_Swift;
    protected mailReportConfig: any;
    constructor(request: any, response: any);
    getConfig(): any;
    getI2(): any;
    getSwift(): WAMG_Swift;
    /**
     * @param {string} messageId - server.json:messages
     * @param data
     */
    renderMessage(messageId: string, data: any): any;
    invalidateUserCache(): Promise<any>;
    getOntology(): CSP_Ontology;
    getService(): CSP_Service;
    getEntities(): CSP_AdHoc_Entities;
    loadUIMenu(): Promise<any>;
    getUserCurrent(): Promise<CSP_User>;
    userIsContact(): boolean;
    isTockenAuthorisation(): boolean;
    getUserCurrentSettings(): Promise<CSP_User_Settings>;
    getGeneralSettings(): Promise<CSP_HXObject_GeneralSettings>;
    getEnvShadow(): string;
    getApp(): string;
    getEnv(): string;
    getBaseURL(): string;
    getCurrentAccountId(): Promise<number>;
    isProd(): boolean;
    getDefaultSource(): string;
    getAdPreviewUrl(): "ads.staging.showserver.us" | "ads.revjet.com" | "ads.lfstmedia.com";
    getReportingPublicUrl(): "apistaging.revjet.com/reporting/v1" | "api.revjet.com/reporting/v1" | "stat2users1";
    getACUEntity(): any;
    isEmulatedACUId(): boolean;
    getACU(): CSP_ACU;
    getMode(): any;
    protected getMailReportConfig(): Promise<any>;
    mailReport(type: string, subject: string, data: any): Promise<any>;
    static getSimulatedServer(): WAMG_Server;
    static getSimulatedRequest(): {
        config: any;
        i2: any;
        user: {
            entity: {};
            acuEntity: {};
        };
        loadUser: (server: WAMG_Server, userTag: any) => Promise<void>;
        loadUserById: (server: WAMG_Server, userId: any) => Promise<void>;
        get: (param: any) => string;
    };
}
