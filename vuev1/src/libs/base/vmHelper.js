'use strict';
export default {
    getParentVm(__vm, name) {
        if (__vm && __vm.$data) return undefined;
        
        if (__vm.$data.__type === name) {
            return __vm;
        } else {
            if (__vm.$parent !== undefined) {
                return this.getParentVm(__vm.$parent, name);
            } else {
                return undefined;
            }
        }
    },
    getChildVmByName(_vm, name) {
        const childList = _vm.$children;
        if (childList === undefined) return undefined;
        let __vm = undefined;
        childList.forEach((vm) => {
            if (vm.name == name) {
                __vm = vm;
            }
        });
        
        return __vm;
    },
    emitChild(_vm, methods) {
        const childList = _vm.$children;
        if (childList === undefined) return undefined;
        childList.forEach((vm) => {
            if (typeof vm[methods] === 'function') {
                vm[methods]();
            } else {
                if (vm.$children !== undefined) {
                    this.emitChild(vm, methods);
                }
            }
        });
    },
    upData(data) {
        data = Object.assign({}, data);
    }
}
