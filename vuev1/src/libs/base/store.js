/**
 * Created by chenwenxiao on 2016/9/30.
 * 对localStorage和sessionStorage进行了简单的封装
 */

'use strict';
class storage {
    //  存储对象
    localSave(key, value) {
        if (typeof value === 'object' && value.length === undefined) {
            localStorage[key] = JSON.stringify(value);
        } else {
            localStorage[key] = value;
        }
    }

    //  获取对象
    localGet(key) {
        return localStorage[key];
    }

    //  获取本地存储的长度
    localSize() {
        return localStorage.length;
    }

    //  根据键删除本地存储
    localDelete(key) {
        delete localStorage[key];
    }

    //  清空本地存储
    localClear() {
        localStorage.clear();
    }

    //  存储session对象
    sessionSave(key, value) {
        sessionStorage[key] = value;
    }

    //  获取session对象
    sessionGet(key) {
        return sessionStorage[key];
    }

    //  获取session存储的长度
    sessionSize() {
        return sessionStorage.length;
    }

    //  根据键删除session存储
    sessionDelete(key) {
        delete sessionStorage[key];
    }

    //  清空session存储
    sessionClear() {
        sessionStorage.clear();
    }
}
export default storage;
