import IndexedDB from './indexedDB';
export default function setupIndexedDb(Vue) {
  IndexedDB.initialize('local_test', '1', [
    { name: 'configs', keyPath: 'id', indexs: ['id'] },
    { name: 'users', keyPath: 'id', indexs: ['id'] }
  ]);

  Vue.prototype.$indexedDB = IndexedDB;
}
