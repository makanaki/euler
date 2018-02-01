"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Class_1 = require("./Class");
const SwiftClient = require("openstack-swift-client");
const stream_1 = require("stream");
class WAMG_Swift extends Class_1.WAMG_Class {
    constructor(url, user, pass) {
        super();
        this.url = url;
        this.user = user;
        this.pass = pass;
        this.client = null;
        this.defaultMeta = {
            'author': 'vadim.marushevsky',
            'module': 'WAMG_Swift'
        };
        this.client = new SwiftClient(url, user, pass);
    }
    createContainer(name, meta = {}) {
        this.logTime('Container [' + name + '] created');
        return this.client.create(name, false, Object.assign(this.defaultMeta, meta)).then(() => {
            this.logTimeEnd('Container [' + name + '] created');
        }).catch((err) => {
            this.log('createContainer: ' + err.message);
            throw err;
        });
    }
    deleteContainer(name) {
        this.logTime('Container [' + name + '] deleted');
        return this.client.delete(name).then(() => {
            this.logTimeEnd('Container [' + name + '] deleted');
        }).catch((err) => {
            this.log('deleteContainer: ' + err.message);
            throw err;
        });
    }
    listContainers() {
        return this.client.list().catch((err) => {
            this.log('listContainers: ' + err.message);
            throw err;
        });
    }
    getContainerMeta(name) {
        return this.client.meta(name).catch((err) => {
            this.log('getContainerMeta: ' + err.message);
            throw err;
        });
    }
    updateContainerMeta(name, meta = {}) {
        return this.client.update(name, meta).catch((err) => {
            this.log('updateContainerMeta: ' + err.message);
            throw err;
        });
    }
    info() {
        return this.client.info().catch((err) => {
            this.log('info: ' + err.message);
            throw err;
        });
    }
    createObject(containerName, objectName, data, meta = {}) {
        this.logTime('Container [' + containerName + '], Object [' + objectName + '] Created');
        let container = this.client.container(containerName);
        let s = new stream_1.Readable();
        s.push(String(data));
        s.push(null);
        return container.create(objectName, s, Object.assign(this.defaultMeta, meta)).then(() => {
            this.logTimeEnd('Container [' + containerName + '], Object [' + objectName + '] Created');
            return true;
        }).catch((err) => {
            this.log('createObject: ' + err.message);
            throw err;
        });
    }
    getObject(containerName, objectName) {
        this.logTime('Container [' + containerName + '], Object [' + objectName + '] Loaded');
        let container = this.client.container(containerName);
        let str = '';
        let s = new stream_1.Writable({
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
        }).catch((err) => {
            this.log('getObject: ' + err.message);
            throw err;
        });
    }
    getObjectMeta(containerName, objectName) {
        let container = this.client.container(containerName);
        return container.meta(objectName).catch((err) => {
            let message = (err.message === '404 - ""' && err.statusCode === 404)
                ? 'Object not found'
                : err.message;
            this.log('getObjectMeta: ' + message);
            this.throw(message);
        });
    }
    listContainer(containerName) {
        let container = this.client.container(containerName);
        return container.list(containerName).catch((err) => {
            this.log('listContainer: ' + err.message);
            throw err;
        });
    }
}
exports.WAMG_Swift = WAMG_Swift;
//# sourceMappingURL=Swift.js.map