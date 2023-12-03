// 事务无法原子操作,只能到各个数据库?
export default class IndexedDB {
  static dbName;
  static version;
  static tables;
  static _db = null;
  static get db() {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      if (!this._db) {
        this._db = (await this.createDB(this.dbName, this.version, this.tables)).data;
      }
      resolve(this._db);
    });
  }

  static async initialize(dbName, version, tables) {
    this.dbName = dbName;
    this.version = version;
    this.tables = tables;
  }

  /**
   * 打开/创建数据库
   * @param {object} dbName 数据库的名字
   * @param {string} version 数据库的版本
   * @param {Array} tables 索引数组
   * @return {object} 该函数会返回一个数据库实例
   */
  static createDB = function (dbName, version, tables) {
    return new Promise((resolve, reject) => {
      //  兼容浏览器
      const indexedDB =
        window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
      let db = null;
      const req = indexedDB.open(dbName, version);
      // 操作成功
      req.onsuccess = function () {
        db = event.target.result; // 数据库对象
        resolve({ code: 0, success: true, data: db, msg: '数据库打开成功!' });
      };
      // 操作失败
      req.onerror = function (event) {
        resolve({ code: -1, success: false, data: null, msg: '数据库打开失败!' });
      };
      // 创建表和索引
      req.onupgradeneeded = function (event) {
        // 数据库创建或升级的时候会触发
        db = event.target.result; // 数据库对象
        tables.map(({ name, keyPath, indexs }) => {
          let objectStore;
          if (!db.objectStoreNames.contains(name)) {
            objectStore = db.createObjectStore(name, {
              keyPath: keyPath || 'id',
              autoIncrement: true
            }); // 创建表
            indexs.forEach((indexName) => {
              objectStore.createIndex(indexName, indexName, { unique: false }); // 创建索引
            });
          }
        });
      };
    });
  };

  /**
   * 新增数据
   * @param {string} tabelName 仓库名称
   * @param {string} data 数据
   **/
  static add = function (tabelName, data) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      const db = await this.db;
      const store = db.transaction([tabelName], 'readwrite').objectStore(tabelName); // 仓库对象
      const req = store.add(data);
      // 操作成功
      req.onsuccess = function (event) {
        console.log('数据写入成功');
        resolve({ code: 0, success: true, data: null, msg: '数据写入成功!' });
      };
      // 操作失败
      req.onerror = function (event) {
        console.log('数据写入失败');
        reject({ code: -1, success: false, data: null, msg: '数据写入失败!' });
      };
    });
  };

  /**
   * 更新数据
   * @param {string} tabelName 仓库名称
   * @param {object} data 数据
   */
  static update = function (tabelName, data) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      const db = await this.db;
      const transaction = db.transaction([tabelName], 'readwrite');
      transaction.oncomplete = function (event) {
        console.log('transaction success');
      };
      transaction.onerror = function (event) {
        console.log('transaction error: ' + transaction.error);
      };

      const store = transaction.objectStore(tabelName);
      // 查询
      const getReq = await store.get(data['id']);
      getReq.onsuccess = function (event) {
        let orginData = getReq.result;
        for (const [k, v] of Object.entries(data)) {
          orginData[k] = v;
        }

        // 更新
        const putReq = store.put(orginData);
        putReq.onsuccess = function (event) {
          resolve({ code: 0, success: true, data: null, msg: '数据更新成功!' });
        };
        putReq.onerror = function (event) {
          reject({ code: -1, success: false, data: null, msg: '数据更新失败!' });
        };
      };

      getReq.onerror = function () {
        reject({ code: -1, success: false, data: null, msg: '读取失败!' });
      };
    });
  };

  /**
   * 删除数据
   * @param {string} tabelName 仓库名称
   * @param {string} id
   * @param {object} data 数据
   */
  static deleteById = function (tabelName, id) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      const db = await this.db;
      const store = db.transaction([tabelName], 'readwrite').objectStore(tabelName);
      const req = store.delete(id);
      // 操作成功
      req.onsuccess = function (event) {
        resolve({ code: 0, success: true, data: null, msg: '删除成功' });
      };
      // 操作失败
      req.onerror = function (event) {
        reject({ code: -1, success: false, data: null, msg: '删除失败' });
      };
    });
  };

  /**
   * 获取列表数据
   * @param {string} tabelName 仓库名称
   * @param {number} page
   * @param {number} pageSize 数据
   * @param {object} data 数据
   */
  static getList = function (tabelName, page = 1, pageSize = 10) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      const data = [];
      const db = await this.db;
      const store = await db.transaction([tabelName], 'readonly').objectStore(tabelName);
      const requeset = store.openCursor();
      let index = null;
      requeset.onsuccess = function (event) {
        const res = event.target.result;
        if (res) {
          if (index === pageSize - 1) {
            data.push(res.value);
            store.count().onsuccess = function (countEvents) {
              resolve({
                code: 0,
                success: true,
                data: { total: countEvents.target.result, list: data },
                msg: '获取成功'
              });
            };
            return;
          }
          if (index === null && page !== 1) {
            console.log('读取跳过：', (page - 1) * pageSize);
            index = 0;
            res.advance((page - 1) * pageSize);
          } else {
            index++;
            data.push(res.value);
            res.continue();
          }
        } else {
          store.count().onsuccess = function (countEvents) {
            resolve({
              code: 0,
              success: true,
              data: { total: countEvents.target.result, list: data },
              msg: '获取成功'
            });
          };
        }
      };
      requeset.onerror = function () {
        reject({ code: -1, success: false, data: null, msg: '读取失败' });
      };
    });
  };

  /**
   * 获取列表数据
   * @param {string} tabelName 仓库名称
   * @param {number} id
   */
  static getItemById = function (tabelName, id) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      const db = await this.db;
      const store = await db.transaction([tabelName], 'readonly').objectStore(tabelName);
      const requeset = store.get(id);
      requeset.onsuccess = function (event) {
        resolve({ code: 0, success: true, data: requeset.result, msg: '获取成功!' });
      };
      requeset.onerror = function () {
        reject({ code: -1, success: false, data: null, msg: '读取失败' });
      };
    });
  };
}
