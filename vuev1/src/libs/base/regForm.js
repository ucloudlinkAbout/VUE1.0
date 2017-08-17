'use strict';

import { toggleArray } from '../../libs/utils/strings';

export default{
    regForm(that) {
        // console.log('----------')
        // console.log('name:'+(that.name || (that.opt && that.opt.name)))
        // console.log('value:'+that.value)
        // console.log('ischeck:'+that.ischeck)
        // console.log('----------')
        let form = this.getForm(that);
        if (form === undefined) {
            return;
        }
        if (that.ischeckBox) {
            let value = [];
            if (form.$data.formData[that.name || that.opt.name] !== undefined) {
                value = toggleArray(that.value, form.$data.formData[that.name || that.opt.name].value)
            }
            form.$data.formData[that.name || that.opt.name] = {
                value: value,
                ischeck: that.ischeck
            }
        } else {
            form.$data.formData[that.name || that.opt.name] = {
                value: that.value,
                ischeck: that.ischeck
            }
        }

        form.$data.formData = Object.assign({}, form.$data.formData);
    },
    //查找上级form
    getForm(__vm) {
        if (__vm.$data.__type === 'form') {
            return __vm;
        } else {
            if (__vm.$parent !== undefined) {
                return this.getForm(__vm.$parent);
            } else {
                return undefined;
            }
        }
    }
}
