/**
 * Created by chenwenxiao on 2016/12/5.
 */
import { ajaxAuthor } from '../../../../libs/base/ajax'
export default{
    /**
     * Created by xiaodi on 2016/12/08.
     * 查询字典值
     * @param {object} data 传输的数据
     * @return {Promise} promise对象
     */
    searchDictionary(data) {
        return new Promise(function (resolve, reject) {
            ajaxAuthor({
                url: '/oms/dictionary/queryDictionaryByDevOps',
                method: 'post',
                json: true,
                data: data
            }).then(function (d) {
                if (d.resultCode === '00000000') {
                    resolve(d);
                } else {
                    reject(d);
                }
            }, function (d) {
                reject(d);
            });
        });
    }
}
