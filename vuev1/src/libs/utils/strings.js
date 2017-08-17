'use strict';

let uid = Date.now();
export function nextUid() {
  return (uid++).toString(36);
}

export function format() {
  let args = [].slice.call(arguments),
      str = args.shift();
  return str.replace(/{(\d+)}/g, function(match, number) {
    return args[number] !== undefined
      ? args[number]
      : match;
  });
}

export function substitute(str, obj) {
  if (typeof str === 'string') {
    return str.replace((/\\?\{([^{}]+)\}/g), function(match, name){
      if (match.charAt(0) === '\\') {
        return match.slice(1);
      }
      return (obj[name] === null || obj[name] === undefined) ? '' : obj[name];
    });
  } else if (typeof str === 'function') {
    return str(obj);
  }
}

export function toArray(value, sep) {
  if (value === null || value === undefined) {
    value = [];
  }
  if (typeof value === 'string' && sep) {
    value = value.split(sep);
  } else if (!(value instanceof Array)) {
    value = [value.toString()];
  } else if (sep) {
    // if use sep, convert every value to string
    value = value.map((v)=>v.toString());
  }

  return value;
}

export function toStyleObject (str) {
  if (!str) { return undefined; }

  let style = {};
  let kv;
  str.split(';').forEach((s) => {
    s = s.trim();
    if (!s) { return; }

    kv = s.split(':');
    if (kv.length < 2) {
      console.warn('style is error');
      return;
    }
    let key = kv[0].replace(/-./g, (r) => {
      return r.replace('-','').toUpperCase();
    }).trim();
    style[key] = kv[1].trim();
  });

  return style;
}

export function toggleArray(value,array){
  let i = array.indexOf(value);

  if(i == -1){
    array.push(value);
  }else{
    array.splice(i,1);
  } 

  return array;
}

export function getArrayByIdKey(IdArray,Obj){
    if(IdArray && (IdArray.length > 0) && Obj && (Obj.length > 0) ){

      let _obj = [];
      for(let i = 0; i < IdArray.length; i++){
          let id = IdArray[i];

          for(let j = 0; j < Obj.length; j++){
            if(Obj[j].id && (Obj[j].id == id)){
              _obj.push(Obj[j]);
            }
          }

       }
       return _obj;
    }
    return undefined;
}