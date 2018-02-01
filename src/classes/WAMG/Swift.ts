import { WAMG_Class } from './Class';
import * as SwiftClient from 'openstack-swift-client';
import {Readable, Writable} from 'stream';

export class WAMG_Swift extends WAMG_Class {

	protected client = null;
	protected defaultMeta = {
		'author' : 'vadim.marushevsky',
		'module' : 'WAMG_Swift'
	};

	constructor( protected url, protected user, protected pass ) {
		super();
		this.client = new SwiftClient(url, user, pass);
	}

	public createContainer(name : string, meta : object = {}) : Promise<any> {
		this.logTime('Container [' + name + '] created');
		return this.client.create(name, false, Object.assign(this.defaultMeta, meta)).then(() => {
			this.logTimeEnd('Container [' + name + '] created');
		}).catch((err : any) => {
			this.log('createContainer: ' + err.message);
			throw err;
		});
	}

	public deleteContainer(name : string) : Promise<any> {
		this.logTime('Container [' + name + '] deleted');
		return this.client.delete(name).then(() => {
			this.logTimeEnd('Container [' + name + '] deleted');
		}).catch((err : any) => {
			this.log('deleteContainer: ' + err.message);
			throw err;
		});
	}

	public listContainers() : Promise<any> {
		return this.client.list().catch((err : any) => {
			this.log('listContainers: ' + err.message);
			throw err;
		});
	}

	public getContainerMeta(name : string) : Promise<any> {
		return this.client.meta(name).catch((err : any) => {
			this.log('getContainerMeta: ' + err.message);
			throw err;
		});
	}

	public updateContainerMeta(name : string, meta : object = {}) : Promise<any> {
		return this.client.update(name, meta).catch((err : any) => {
			this.log('updateContainerMeta: ' + err.message);
			throw err;
		});
	}

	public info() : Promise<any> {
		return this.client.info().catch((err : any) => {
			this.log('info: ' + err.message);
			throw err;
		});
	}

	public createObject(containerName: string, objectName : string, data : any, meta : object = {}) : Promise<any> {
		this.logTime('Container [' + containerName + '], Object [' + objectName + '] Created');
		let container = this.client.container(containerName);
		let s = new Readable();
		s.push(String(data));
		s.push(null);
		return container.create(objectName, s, Object.assign(this.defaultMeta, meta)).then(() => {
			this.logTimeEnd('Container [' + containerName + '], Object [' + objectName + '] Created');
			return true;
		}).catch((err : any) => {
			this.log('createObject: ' + err.message);
			throw err;
		});
	}

	public getObject(containerName: string, objectName : string) : Promise<any> {
		this.logTime('Container [' + containerName + '], Object [' + objectName + '] Loaded');
		let container = this.client.container(containerName);
		let str = '';
		let s = new Writable({
			write: (chunk, encoding, cb) => {
				str += String(chunk);
				cb();
			}
		});
		return container.get(objectName, s).then(() => {
			this.logTimeEnd('Container [' + containerName + '], Object [' + objectName + '] Loaded');
			/** OMG =( **/
			if (str === '<html><h1>Not Found</h1><p>The resource could not be found.</p></html>') {
				this.throw('Object not found');
			}
			return str;
		}).catch((err : any) => {
			this.log('getObject: ' + err.message);
			throw err;
		});
	}

	public getObjectMeta(containerName: string, objectName : string) : Promise<any> {
		let container = this.client.container(containerName);
		return container.meta(objectName).catch((err : any) => {
			let message = (err.message === '404 - ""' && err.statusCode === 404)
				? 'Object not found'
				: err.message;
            this.log('getObjectMeta: ' + message);
			this.throw(message);
		});
	}

	public listContainer(containerName: string) : Promise<any> {
		let container = this.client.container(containerName);
		return container.list(containerName).catch((err : any) => {
			this.log('listContainer: ' + err.message);
			throw err;
		});
	}
}
