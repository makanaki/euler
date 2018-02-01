"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./../CSP/User");
const Settings_1 = require("./../CSP/User/Settings");
const ACU_1 = require("./../CSP/ACU");
const Ontology_1 = require("./../CSP/Ontology");
const Service_1 = require("./../CSP/Service");
const Entities_1 = require("./../CSP/AdHoc/Entities");
const Cache_1 = require("./../WAMG/Cache");
const Assets_1 = require("./../WAMG/Assets");
const utils = require("./../../modules/utils");
const GeneralSettings_1 = require("./../CSP/HXObject/GeneralSettings");
//noinspection TypeScriptCheckImport
const enver = require("@revjet/enver");
const Class_1 = require("./../WAMG/Class");
const Swift_1 = require("./../WAMG/Swift");
//noinspection TypeScriptUnresolvedFunction
const postman = require('@revjet/postman');
const hbs = require('handlebars');
class WAMG_Server extends Class_1.WAMG_Class {
    constructor(request, response) {
        super();
        this.request = null;
        this.response = null;
        this.id = null;
        this.promises = {};
        this.ontology = null;
        this.service = null;
        this.entities = null;
        this.user = null;
        this.ACU = null;
        this.swift = null;
        this.mailReportConfig = null;
        this.id = Math.floor(Math.random() * 1000);
        this.request = request;
        this.response = response;
        let redis = request.config.get('cache:redis');
        redis = !redis ? { host: 'redis1', port: 6379 } : redis;
        Cache_1.WAMG_Cache.init(redis.host, redis.port);
    }
    getConfig() {
        return this.request.config;
    }
    getI2() {
        return this.request.i2;
    }
    getSwift() {
        if (!this.swift) {
            this.swift = new Swift_1.WAMG_Swift(this.getConfig().get('swift:url'), this.getConfig().get('swift:user'), this.getConfig().get('swift:pass'));
        }
        return this.swift;
    }
    /**
     * @param {string} messageId - server.json:messages
     * @param data
     */
    renderMessage(messageId, data) {
        try {
            return hbs.compile(this.getConfig().get('messages:' + messageId))(data);
        }
        catch (e) {
            console.log(e);
        }
        return "";
    }
    invalidateUserCache() {
        return this.request.invalidateUser();
    }
    getOntology() {
        if (!this.ontology) {
            this.ontology = new Ontology_1.CSP_Ontology(this.request);
        }
        return this.ontology;
    }
    getService() {
        if (!this.service) {
            this.service = new Service_1.CSP_Service(this.request);
        }
        return this.service;
    }
    getEntities() {
        if (!this.entities) {
            this.entities = new Entities_1.CSP_AdHoc_Entities(this);
        }
        return this.entities;
    }
    loadUIMenu() {
        this.log('Loading menu');
        return Promise.resolve({});
        //		var ijet = this.getService();
        //		ijet.setClassTag('csp_menu');
        //		ijet.query.addCondition('tag','mainmenu');
        //		return ijet.run().then((data) => {
        //			return data.records[0].properties.projects.values[0];
        //		});
    }
    getUserCurrent() {
        let pId = 'getUserCurrent' + ':' + this.request.user.entity.id + ':' + this.request.user.acuEntity.id;
        if (this.promises[pId])
            return this.promises[pId];
        let promise = User_1.CSP_User.instantiate(this, this.request.user.entity).then((user) => {
            this.promises[pId] = null;
            return user;
        });
        promise.catch((err) => {
            this.promises[pId] = null;
            throw err;
        });
        this.promises[pId] = promise;
        return promise;
    }
    userIsContact() {
        return this.request.user.entity.classTag === 'contact';
    }
    isTockenAuthorisation() {
        return Boolean(this.request.user.authToken);
    }
    getUserCurrentSettings() {
        let pId = 'getUserCurrentSettings' + ':' + this.request.user.entity.id + ':' + this.request.user.acuEntity.id;
        if (WAMG_Server.promStorage[pId])
            return WAMG_Server.promStorage[pId];
        let promise;
        switch (true) {
            case typeof this.request.user.entity.relations.userSettings !== 'undefined':
                promise = Settings_1.CSP_User_Settings.instantiate(this, this.request.user.entity.relations.userSettings.targetEntity).then((us) => {
                    WAMG_Server.promStorage[pId] = null;
                    return us;
                });
                break;
            case this.userIsContact():
            case this.isTockenAuthorisation():
                promise = Settings_1.CSP_User_Settings.instantiate(this);
                break;
            default:
                promise = this.getUserCurrent().then((user) => {
                    return user.getSettings();
                }).then((us) => {
                    WAMG_Server.promStorage[pId] = null;
                    return us;
                }).catch((err) => {
                    console.log(err);
                    return this.getUserCurrent().then((user) => {
                        WAMG_Server.promStorage[pId] = null;
                        return user.createNewSettigns();
                    });
                });
                break;
        }
        promise.catch((err) => {
            WAMG_Server.promStorage[pId] = null;
            throw err;
        });
        WAMG_Server.promStorage[pId] = promise;
        return promise;
    }
    getGeneralSettings() {
        let pId = 'getGeneralSettings';
        if (this.promises[pId])
            return this.promises[pId];
        let promise = this.getUserCurrent().then((user) => {
            return user.getAccount();
        }).then((acc) => {
            return acc.getGeneralSettings();
        }).then((us) => {
            this.promises[pId] = null;
            return us;
        }).catch(() => {
            this.promises[pId] = null;
            console.log('No General Settings for user [' + this.request.user.entity.tag + ']');
            return GeneralSettings_1.CSP_HXObject_GeneralSettings.instantiate(this, {});
        });
        this.promises[pId] = promise;
        return promise;
    }
    getEnvShadow() {
        return String(enver.getConfig().SERVER_ENV_SHADOW).toLocaleLowerCase();
    }
    getApp() {
        return String(enver.getConfig().SERVER_ENV_APP).toLocaleLowerCase();
    }
    getEnv() {
        return String(enver.getConfig().SERVER_ENV).toLocaleLowerCase();
    }
    getBaseURL() {
        // return enver.getBaseUrl().replace('https','http').replace('http','https');
        return this.isProd() ? 'http://dm.lsjet.com' : 'http://neo.lsmstaging.dmajet.net';
    }
    getCurrentAccountId() {
        return this.getACU().getAccountId(this.getACUEntity().acuId);
    }
    isProd() {
        return this.getEnv() === 'prod';
    }
    getDefaultSource() {
        return (this.getApp() === 'csp') ? 'csp' : 'ars';
    }
    getAdPreviewUrl() {
        if (this.getApp() === 'csp') {
            if (this.request.config.get('SERVER_ENV').toLocaleLowerCase() !== 'prod') {
                return 'ads.staging.showserver.us';
            }
            else {
                return 'ads.revjet.com';
            }
        }
        else {
            return 'ads.lfstmedia.com';
        }
    }
    getReportingPublicUrl() {
        if (this.getApp() === 'csp') {
            if (this.request.config.get('SERVER_ENV').toLocaleLowerCase() !== 'prod') {
                return 'apistaging.revjet.com/reporting/v1';
            }
            else {
                return 'api.revjet.com/reporting/v1';
            }
        }
        else {
            return 'stat2users1'; //no such url in lsm
        }
    }
    getACUEntity() {
        return this.request.user.acuEntity;
    }
    isEmulatedACUId() {
        return !!this.request.user.customAcuId;
    }
    getACU() {
        if (this.ACU === null) {
            this.ACU = new ACU_1.CSP_ACU(this);
        }
        return this.ACU;
    }
    getMode() {
        switch (this.getApp()) {
            case 'afp':
                return WAMG_Server.modeAdvertiser;
            case 'csp':
            case 'dmjet':
            default:
                return WAMG_Server.modeDefault;
        }
    }
    getMailReportConfig() {
        if (!this.mailReportConfig) {
            return utils.getFileContents(Assets_1.WAMG_Assets.getFullPath('reportConfig.json')).then((data) => {
                this.mailReportConfig = JSON.parse(data);
                return this.mailReportConfig;
            });
        }
        else {
            return Promise.resolve(this.mailReportConfig);
        }
    }
    mailReport(type, subject, data) {
        this.logTime('Mail Report [' + type + '] Report Sent');
        return this.getMailReportConfig().then((config) => {
            let setup = utils.objGet(config, type);
            if (!setup)
                throw new Error('WAMG_Server: mailReport type not found [' + type + ']');
            const tmp = JSON.stringify(data);
            let a = new postman({
                debug: false,
                i2: this.getI2()
            });
            let p25conf = {
                template: 'sst_tags',
                to: setup.to,
                from: setup.from,
                headers: {
                    'Content-Type': 'text/html; charset="iso-8859-1"',
                    'Content-Transfer-Encoding': '7bit',
                },
                data: {
                    message: tmp,
                    subject: this.getEnv() + ' : ' + subject,
                }
            };
            return a.send(p25conf).then((a) => {
                this.logTimeEnd('Mail Report [' + type + '] Report Sent');
                return a;
            });
        }).catch((err) => {
            this.logTimeEnd('Mail Report [' + type + '] Report Sent');
            console.log(err, err.stack);
            return {};
        });
    }
    static getSimulatedServer() {
        let req = WAMG_Server.getSimulatedRequest();
        return new WAMG_Server(req, {});
    }
    static getSimulatedRequest() {
        let config = require('nconf')
            .argv()
            .env()
            .file({ file: Assets_1.WAMG_Assets.getFullPath('SchedulerServerConfig.json') });
        let i2Api = require('@revjet/i2');
        return {
            config: config,
            i2: i2Api.defaults({
                apiRoot: config.get('i2-api:url'),
                username: config.get('i2-api:auth:username'),
                password: config.get('i2-api:auth:password'),
            }),
            user: {
                entity: {},
                acuEntity: {},
            },
            loadUser: function (server, userTag) {
                let query = 'classes/assignee/entities/?query=tag:' + userTag + '&fields=id,tag,name,' +
                    'relations[profile(id,tag,name,relations[roles(id,tag,properties,dictionaryProperty)]),' +
                    'info,userSettings,security_role]';
                let ijet = server.getService();
                let user;
                return ijet.runRawQuery(query).then((data) => {
                    user = data.records[0];
                    return ijet.runRawQuery('/acu/' + data.records[0].acuId);
                }).then((data) => {
                    server.request.user.entity = user;
                    server.request.user.acuEntity = data.entity;
                });
            },
            loadUserById: function (server, userId) {
                let query = 'classes/assignee/entities/?query=id:' + userId + '&fields=id,tag,name,' +
                    'relations[profile(id,tag,name,relations[roles(id,tag,properties,dictionaryProperty)]),' +
                    'info,userSettings,security_role]';
                let ijet = server.getService();
                let user;
                return ijet.runRawQuery(query).then((data) => {
                    user = data.records[0];
                    console.log(user);
                    ;
                    return ijet.runRawQuery('/acu/' + user.acuId);
                }).then((data) => {
                    server.request.user.entity = user;
                    server.request.user.acuEntity = data.entity;
                });
            },
            get: function (param) {
                switch (param) {
                    case 'host':
                        return 'portal.revjet.com';
                    case 'basicAuthHeader':
                        return 'Basic ' + new Buffer(config.get('i2-api:auth:username')
                            + ':' + config.get('i2-api:auth:password')).toString('base64');
                    default:
                        throw new Error('REQUEST GETTER SIMULATION FATAL param=' + param);
                }
            }
        };
    }
}
WAMG_Server.modeAdvertiser = 'advertiser';
WAMG_Server.modePublisher = 'publisher';
WAMG_Server.modeDefault = 'default';
WAMG_Server.promStorage = [];
exports.WAMG_Server = WAMG_Server;
//# sourceMappingURL=Server.js.map