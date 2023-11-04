/*
 * @Date: 2023-08-15 09:36:47
 * @LastEditors: zhusisheng zhusisheng@shenhaoinfo.com
 * @LastEditTime: 2023-08-29 16:54:41
 * @FilePath: \robot_outdoor_e_vue3\src\utils\logic\commonLogic.ts
 */

import { transform, isEqual, isObject, debounce } from 'lodash-es';

export const disabledDateStart = (time, endTime) => {
  if (endTime) {
    return time > new Date(endTime);
  }
};

export const disabledDateEnd = (time, startTime) => {
  if (startTime) {
    return time < new Date(startTime);
  }
};

export const difference = (object, base) => {
  function changes(object, base) {
    return transform(object, function (result, value, key) {
      if (!isEqual(value, base[key])) {
        result[key] = isObject(value) && isObject(base[key]) ? changes(value, base[key]) : value;
      }
    });
  }
  return changes(object, base);
};

export const loopFunc = (func) => {
  let status = true;
  const refresh = async () => {
    try {
      await func();
    } finally {
      if (status) {
        setTimeout(() => {
          refresh();
        }, 6000);
      }
    }
  };

  const start = () => {
    status = true;
    refresh();
  };

  const stop = () => (status = false);

  return {
    start,
    stop
  };
};

// 监听
export const sizeListener = (fun) => {
  // 监听变化
  const observer = new ResizeObserver((entries, observer) => {
    entries.forEach((entry) => {
      resize(entry);
    });
  });
  const resize = debounce(fun, 200);

  let dom = null;
  const observe = (id) => {
    dom = document.getElementById(id);
    observer.observe(dom);
  };

  const unobserve = () => observer.unobserve(dom);

  return {
    observe,
    unobserve
  };
};

export const debounceCb = (
  event,
  time,
  { leading = false, executeEvent = function () {}, cancelEvent = function () {} }
) => {
  let timer = null;
  let pReject = null;
  let pResolve = null;
  const evalFunc = async (args) => {
    try {
      executeEvent();
      const res = isPromise(event) ? await event.apply(this, args) : event.apply(this, args);
      pResolve && pResolve(res);
    } catch (error) {
      pReject && pReject(error);
    }
  };

  return function (...args) {
    if (timer) {
      clearTimeout(timer);
      cancelEvent();
      pReject && pReject(new Error('event was canceled'));
    }
    return new Promise((resolve, reject) => {
      pReject = reject;
      pResolve = resolve;

      if (leading && !timer) {
        evalFunc(args);
      } else {
        timer = setTimeout(async () => {
          evalFunc(args);
        }, time);
      }
    });
  };
};

export const isPromise = (p) => {
  return p && Object.prototype.toString.call(p) === '[object Promise]';
};

// 深度合并
export function deepMerge(src, target) {
  let key;
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }
  return src;
}

const hexList = [];
for (let i = 0; i <= 15; i++) {
  hexList[i] = i.toString(16);
}
export function buildUUID() {
  let uuid = '';
  for (let i = 1; i <= 36; i++) {
    if (i === 9 || i === 14 || i === 19 || i === 24) {
      uuid += '-';
    } else if (i === 15) {
      uuid += 4;
    } else if (i === 20) {
      uuid += hexList[(Math.random() * 4) | 8];
    } else {
      uuid += hexList[(Math.random() * 16) | 0];
    }
  }
  return uuid.replace(/-/g, '');
}

export function buildShortUUID(prefix = '') {
  let unique = 0;
  const time = Date.now();
  const random = Math.floor(Math.random() * 1000000000);
  unique++;
  return prefix + '_' + random + unique + String(time);
}

export const asyncPromise = (fun) => {
  let loginCB = {
    succeed: [],
    fail: []
  };
  let isLoading = false;
  return async function () {
    return new Promise(async (resolve, reject) => {
      loginCB.succeed.push(resolve);
      loginCB.fail.push(reject);

      if (!isLoading) {
        isLoading = true;
        try {
          const res = await fun();
          loginCB.succeed.map((fun) => fun(res));
        } catch (error) {
          loginCB.fail.map((fun) => fun(error));
        } finally {
          loginCB.succeed = [];
          loginCB.fail = [];
          isLoading = false;
        }
      }
    });
  };
};

export const stringify = (obj) => {
  try {
    return JSON.stringify(obj, (k, v) => {
      if (typeof v === 'function') {
        return `FUNCTION_FLAG ${v}`;
      } else {
        return v;
      }
    });
  } catch (error) {
    console.log(error);
    return '出错了';
  }
};

export const parse = (jsonStr) => {
  try {
    return JSON.parse(jsonStr, (key, value) => {
      if (value && typeof value === 'string') {
        return value.indexOf('FUNCTION_FLAG') > -1
          ? new Function(`return ${value.replace('FUNCTION_FLAG', '')}`)()
          : value;
      }
      return value;
    });
  } catch (error) {
    console.log(error);
    return '出错了';
  }
};
