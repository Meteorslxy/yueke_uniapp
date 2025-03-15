/**
 * Notes: 微信缓存二次封装，有设置时效性的封装
 * Ver : CCMiniCloud Framework 3.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2020-11-14 07:48:00
 */
const helper = require('./helper.js');
const TIME_SUFFIX = '_deadtime';

/**
 * 设置
 * k 键key
 * v 值value
 * t 秒
 */
function set(k, v, t = 2592000) {
    if (!k) {
        return null;
    }
    uni.setStorageSync(k, v);
    let seconds = parseInt(t);
    if (seconds > 0) {
        let newtime = Date.parse(new Date());
        newtime = newtime / 1000 + seconds;
        uni.setStorageSync(k + TIME_SUFFIX, newtime + '');
    } else {
        uni.removeStorageSync(k + TIME_SUFFIX);
    }
}

/**
 * 获取
 * k 键key
 * def 默认值
 */
function get(k, def = null) {
    if (!k) {
        return null;
    }
    let deadtime = uni.getStorageSync(k + TIME_SUFFIX);
    if (!deadtime) {
        return def;
    }
    deadtime = parseInt(deadtime);
    if (!deadtime) {
        return def;
    }
    if (deadtime) {
        if (parseInt(deadtime) < Date.parse(new Date()) / 1000) {
            uni.removeStorageSync(k);
            uni.removeStorageSync(k + TIME_SUFFIX);
            return def;
        }
    }
    let res = uni.getStorageSync(k);
    if (helper.isDefined(res)) {
        return res;
    } else {
        return def;
    }
}

/**
 * 删除
 */
function remove(k) {
    if (!k) {
        return null;
    }
    uni.removeStorageSync(k);
    uni.removeStorageSync(k + TIME_SUFFIX);
}

/**
 * 清除所有key
 */
function clear() {
    uni.clearStorageSync();
}
module.exports = {
    set,
    get,
    remove,
    clear
};
