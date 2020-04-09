'use strict';
var MongoClient = require('mongodb').MongoClient;
const Service = require('egg').Service;

class FuncService extends Service {

  async getData(id) {
    const client = new MongoClient('mongodb://120.26.42.184:27017', { useNewUrlParser: true });
    let result;
    await client.connect();
    const db = client.db('collie');
    const man = db.collection('func');
    const query = { 'content': { '$ne': null } };
    if (id) {
      query['id'] = id;
    }
    result = await man.find(query, { '_id': 0 });
    return Promise.resolve(result.toArray());
  }

  async saveData(id, content) {
    const client = new MongoClient('mongodb://120.26.42.184:27017', { useNewUrlParser: true });
    let result;
    await client.connect();
    const db = client.db('collie');
    const man = db.collection('func');
    const data = await this.getData(id);
    if (data.length <= 0) {
      console.log('insert');
      result = await man.insertOne({ 'id': id, content: content });
    } else {
      result = await man.updateOne({ 'id': id }, { '$set': { content: content } });
    }
    return Promise.resolve(result.result);
  }

  async getFunc(id) {
    let funcStr = await this.getData(id);
    if (funcStr.length > 0) {
      return funcStr[0].content;
    }
    return Promise.resolve(funcStr);
  }

  async getAllFunc() {
    let funcs = await this.getData();
    return Promise.resolve(funcs);
  }

  async saveFunc(id, content) {
    const msg = await this.saveData(id, content);
    return msg;
  }
}

module.exports = FuncService;
