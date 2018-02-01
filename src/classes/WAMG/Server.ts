import { CSP_User } from './../CSP/User';
import { CSP_User_Settings } from './../CSP/User/Settings';
import { CSP_ACU } from './../CSP/ACU';
import { CSP_Ontology } from './../CSP/Ontology';
import { CSP_Service } from './../CSP/Service';
import { CSP_AdHoc_Entities } from './../CSP/AdHoc/Entities';
import { WAMG_Cache } from './../WAMG/Cache';
import { WAMG_Assets } from './../WAMG/Assets';
import { CSP_Account } from './../CSP/Account';
import * as utils from './../../modules/utils';
import { CSP_HXObject_GeneralSettings } from './../CSP/HXObject/GeneralSettings';
//noinspection TypeScriptCheckImport
import * as enver from '@revjet/enver';
import { WAMG_Class } from "./../WAMG/Class";
import { WAMG_Swift } from './../WAMG/Swift';
//noinspection TypeScriptUnresolvedFunction
const postman = require('@revjet/postman');
const hbs = require('handlebars');

export class WAMG_Server extends WAMG_Class {

	public static modeAdvertiser = 'advertiser';
	public static modePublisher = 'publisher';
	public static modeDefault = 'default';
	public static promStorage = [];

	public request : any = null;
	public response : any = null;
	public id : number = null;

	protected promises : any = {};
	protected ontology : CSP_Ontology = null;
	protected service : CSP_Service = null;
	protected entities : CSP_AdHoc_Entities = null;
	protected user : CSP_User = null;
	protected ACU : CSP_ACU = null;
	protected swift : WAMG_Swift = null;
	protected mailReportConfig : any = null;

	constructor( request : any, response : any ) {
		super();
		this.id = Math.floor(Math.random() * 1000);
		this.request = request;
		this.response = response;
		let redis = request.config.get('cache:redis');
		redis = !redis ? { host : 'redis1', port : 6379 } : redis;
		WAMG_Cache.init(redis.host, redis.port);
	}

	public getConfig() : any {
		return this.request.config;
	}

	public getI2() : any {
		return this.request.i2;
	}

	public getSwift() : WAMG_Swift {
		if (!this.swift) {
			this.swift =  new WAMG_Swift(
				this.getConfig().get('swift:url'),
				this.getConfig().get('swift:user'),
				this.getConfig().get('swift:pass'),
			);
		}
		return this.swift;
	}

    /**
     * @param {string} messageId - server.json:messages
     * @param data
     */
	public renderMessage(messageId : string, data : any) {
		try {
            return hbs.compile(this.getConfig().get('messages:'+messageId))(data);
		} catch(e) {
			console.log(e);
		}
        return "";
	}

	public invalidateUserCache() : Promise<any> {
		return this.request.invalidateUser();
	}

	public getOntology() : CSP_Ontology {
		if (!this.ontology) {
			this.ontology = new CSP_Ontology(this.request);
		}
		return this.ontology;
	}

	public getService() : CSP_Service {
		if (!this.service) {
			this.service = new CSP_Service(this.request);
		}
		return this.service;
	}

	public getEntities() : CSP_AdHoc_Entities {
		if (!this.entities) {
			this.entities = new CSP_AdHoc_Entities(this);
		}
		return this.entities;
	}

	public loadUIMenu() : Promise<any> {
		this.log('Loading menu');
		return Promise.resolve({});
		//		var ijet = this.getService();
		//		ijet.setClassTag('csp_menu');
		//		ijet.query.addCondition('tag','mainmenu');
		//		return ijet.run().then((data) => {
		//			return data.records[0].properties.projects.values[0];
		//		});
	}

	public getUserCurrent() : Promise<CSP_User> {
		let pId = 'getUserCurrent' + ':' + this.request.user.entity.id + ':' + this.request.user.acuEntity.id;
		if (this.promises[ pId ]) return this.promises[ pId ];

		let promise : Promise<CSP_User> = CSP_User.instantiate(this, this.request.user.entity).then(( user : CSP_User ) => {
			this.promises[ pId ] = null;
			return user;
		});
		promise.catch(( err ) => {
			this.promises[ pId ] = null;
			throw err;
		});

		this.promises[ pId ] = promise;
		return promise;
	}

	public userIsContact() : boolean {
		return this.request.user.entity.classTag === 'contact';
	}

	public isTockenAuthorisation() : boolean {
		return Boolean(this.request.user.authToken);
	}

	public getUserCurrentSettings() : Promise<CSP_User_Settings> {
		let pId = 'getUserCurrentSettings' + ':' + this.request.user.entity.id + ':' + this.request.user.acuEntity.id;
		if (WAMG_Server.promStorage[ pId ]) return WAMG_Server.promStorage[ pId ];

		let promise : Promise<CSP_User_Settings>;
		switch (true) {
			case typeof this.request.user.entity.relations.userSettings !== 'undefined':
				promise = CSP_User_Settings.instantiate(this, this.request.user.entity.relations.userSettings.targetEntity).then(( us : CSP_User_Settings ) => {
					WAMG_Server.promStorage[ pId ] = null;
					return us;
				});
				break;
			case this.userIsContact():
			case this.isTockenAuthorisation():
				promise = CSP_User_Settings.instantiate(this);
				break;
			default:
				promise = this.getUserCurrent().then(( user : CSP_User ) => {
					return user.getSettings();
				}).then(( us : CSP_User_Settings ) => {
					WAMG_Server.promStorage[ pId ] = null;
					return us;
				}).catch(( err ) => {
					console.log(err);
					return this.getUserCurrent().then(( user : CSP_User ) => {
						WAMG_Server.promStorage[ pId ] = null;
						return user.createNewSettigns();
					});
				});
				break;
		}

		promise.catch(( err ) => {
			WAMG_Server.promStorage[ pId ] = null;
			throw err;
		});

		WAMG_Server.promStorage[ pId ] = promise;
		return promise;
	}

	public getGeneralSettings() : Promise<CSP_HXObject_GeneralSettings> {
		let pId = 'getGeneralSettings';
		if (this.promises[ pId ]) return this.promises[ pId ];

		let promise : Promise<CSP_HXObject_GeneralSettings> = this.getUserCurrent().then(( user : CSP_User ) => {
			return user.getAccount();
		}).then(( acc : CSP_Account ) => {
			return acc.getGeneralSettings();
		}).then(( us : CSP_HXObject_GeneralSettings ) => {
			this.promises[ pId ] = null;
			return us;
		}).catch(() => {
			this.promises[ pId ] = null;
			console.log('No General Settings for user [' + this.request.user.entity.tag + ']');
			return CSP_HXObject_GeneralSettings.instantiate(this, {});
		});

		this.promises[ pId ] = promise;
		return promise;
	}

	public getEnvShadow() : string {
		return String(enver.getConfig().SERVER_ENV_SHADOW).toLocaleLowerCase();
	}

	public getApp() : string {
		return String(enver.getConfig().SERVER_ENV_APP).toLocaleLowerCase();
	}

	public getEnv() : string {
		return String(enver.getConfig().SERVER_ENV).toLocaleLowerCase();
	}

	public getBaseURL() : string {
		// return enver.getBaseUrl().replace('https','http').replace('http','https');
		return this.isProd() ? 'http://dm.lsjet.com' : 'http://neo.lsmstaging.dmajet.net';
	}

	public getCurrentAccountId() : Promise<number> {
		return this.getACU().getAccountId(this.getACUEntity().acuId);
	}

	public isProd() : boolean {
		return this.getEnv() === 'prod';
	}

	public getDefaultSource() : string {
		return (this.getApp() === 'csp') ? 'csp' : 'ars';
	}

	public getAdPreviewUrl() {
		if (this.getApp() === 'csp') {
			if (this.request.config.get('SERVER_ENV').toLocaleLowerCase() !== 'prod') {
				return 'ads.staging.showserver.us';
			} else {
				return 'ads.revjet.com';
			}
		} else {
			return 'ads.lfstmedia.com';
		}
	}

	public getReportingPublicUrl() {
		if (this.getApp() === 'csp') {
			if (this.request.config.get('SERVER_ENV').toLocaleLowerCase() !== 'prod') {
				return 'apistaging.revjet.com/reporting/v1';
			} else {
				return 'api.revjet.com/reporting/v1';
			}
		} else {
			return 'stat2users1';//no such url in lsm
		}
	}

	public getACUEntity() {
		return this.request.user.acuEntity;
	}

	public isEmulatedACUId() {
		return !!this.request.user.customAcuId;
	}

	public getACU() : CSP_ACU {
		if (this.ACU === null) {
			this.ACU = new CSP_ACU(this);
		}
		return this.ACU;
	}

	public getMode() : any {
		switch (this.getApp()) {
			case 'afp':
				return WAMG_Server.modeAdvertiser;
			case 'csp':
			case 'dmjet':
			default:
				return WAMG_Server.modeDefault;
		}
	}

	protected getMailReportConfig() : Promise<any> {
		if (!this.mailReportConfig) {
			return utils.getFileContents(WAMG_Assets.getFullPath('reportConfig.json')).then(( data : any ) => {
				this.mailReportConfig = JSON.parse(data);
				return this.mailReportConfig;
			});
		} else {
			return Promise.resolve(this.mailReportConfig);
		}
	}

	public mailReport( type : string, subject : string, data : any ) : Promise<any> {
		this.logTime('Mail Report [' + type + '] Report Sent');
		return this.getMailReportConfig().then(( config : any ) => {
			let setup = utils.objGet(config, type);
			if (!setup) throw new Error('WAMG_Server: mailReport type not found [' + type + ']');
			const tmp = JSON.stringify(data);
			let a = new postman({
				debug : false,
				i2 :    this.getI2()
			});
			let p25conf = {
				template : 'sst_tags',
				to :       setup.to,
				from :     setup.from,
				headers :  {
					'Content-Type' :              'text/html; charset="iso-8859-1"',
					'Content-Transfer-Encoding' : '7bit',
				},
				data :     {
					message : tmp,
					subject : this.getEnv() + ' : ' + subject,
				}
			};
			return a.send(p25conf).then(( a : any ) => {
				this.logTimeEnd('Mail Report [' + type + '] Report Sent');
				return a;
			});
		}).catch(( err ) => {
			this.logTimeEnd('Mail Report [' + type + '] Report Sent');
			console.log(err, err.stack);
			return {};
		})
	}

	public static getSimulatedServer() : WAMG_Server {
		let req = WAMG_Server.getSimulatedRequest();
		return new WAMG_Server(req, {});
	}

	public static getSimulatedRequest() {
		let config = require('nconf')
			.argv()
			.env()
			.file({ file : WAMG_Assets.getFullPath('SchedulerServerConfig.json') });
		let i2Api = require('@revjet/i2');

		return {
			config :       config,
			i2 :           i2Api.defaults({
				apiRoot :  config.get('i2-api:url'),
				username : config.get('i2-api:auth:username'),
				password : config.get('i2-api:auth:password'),
			}),
			user :         {
				entity :    {},
				acuEntity : {},
			},
			loadUser :     function ( server : WAMG_Server, userTag ) : Promise<void> {
				let query = 'classes/assignee/entities/?query=tag:' + userTag + '&fields=id,tag,name,' +
					'relations[profile(id,tag,name,relations[roles(id,tag,properties,dictionaryProperty)]),' +
					'info,userSettings,security_role]';
				let ijet = server.getService();
				let user : any;
				return ijet.runRawQuery(query).then(( data : any ) => {
					user = data.records[ 0 ];
					return ijet.runRawQuery('/acu/' + data.records[ 0 ].acuId);
				}).then(( data : any ) => {
					server.request.user.entity = user;
					server.request.user.acuEntity = data.entity;
				});
			},
			loadUserById : function ( server : WAMG_Server, userId ) : Promise<void> {
				let query = 'classes/assignee/entities/?query=id:' + userId + '&fields=id,tag,name,' +
					'relations[profile(id,tag,name,relations[roles(id,tag,properties,dictionaryProperty)]),' +
					'info,userSettings,security_role]';
				let ijet = server.getService();
				let user : any;
				return ijet.runRawQuery(query).then(( data : any ) => {
					user = data.records[ 0 ];
					console.log(user);
					;
					return ijet.runRawQuery('/acu/' + user.acuId);
				}).then(( data : any ) => {
					server.request.user.entity = user;
					server.request.user.acuEntity = data.entity;
				});
			},
			get :          function ( param ) {
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
