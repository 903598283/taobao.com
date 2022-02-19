'use strict';

const cookie = {
  get(key) {
    if (document.cookie) {
      let cookies = document.cookie.split('; ');
      for (let i in cookies) {
        let [k, v] = cookies[i].split('=');
        if (k === key) {
          return v;
        }
      }
      return ''; // 循环结束没有返回数据 则返回空字符串
    }
  },
  set(key, value, expires, path = '/') {
    if (Number.isInteger(expires)) {
      let d = new Date();
      d.setDate(d.getDate() + expires);
      document.cookie = `${key}=${value};expires=${d};path=${path}`;
    } else {
      document.cookie = `${key}=${value};path=${path}`;
    }

    return this; // 支持链式调用
  },
  remove(key, path = '/') {
    this.set(key, '', -1, path);
    return this;
  }
};