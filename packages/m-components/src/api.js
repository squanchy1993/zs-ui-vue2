import IndexedDB from './db/indexedDB';

// 人员列表
export async function createUser(param) {
  return await IndexedDB.add('users', param);
}

export async function getUserList({ pageIndex, pageSize }) {
  return await IndexedDB.getList('users', pageIndex, pageSize);
}

export async function deleteUser(id) {
  return await IndexedDB.deleteById('users', id);
}

export async function updateUser(data) {
  return await IndexedDB.update('users', data);
}

export async function getUser(id) {
  return await IndexedDB.getItemById('users', id);
}

// 配置项
export async function createConfig(param) {
  return await IndexedDB.add('configs', param);
}

export async function getConfigList({ pageIndex, pageSize }) {
  return await IndexedDB.getList('configs', pageIndex, pageSize);
}

export async function deleteConfig(id) {
  return await IndexedDB.deleteById('configs', id);
}

export async function updateConfig(data) {
  return await IndexedDB.update('configs', data);
}

export async function getConfig(id) {
  return await IndexedDB.getItemById('configs', id);
}
