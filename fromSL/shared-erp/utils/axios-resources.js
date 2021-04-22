/**
 * create vue-resource's resource like object
 *
 * Default Actions
 *   get: {method: 'GET'}
 *   save: {method: 'POST'}
 *   query: {method: 'GET'}
 *   update: {method: 'PUT'}
 *   delete: {method: 'DELETE'}
 *
 * @param path the resource path
 * @param http axios instance
 * @param actions custom actions
 * @returns the resource object
 *
 * example
 * post.list()
 * post.get(1)
   post.delete(1)
   post.update(1, obj)
   post.paging({
    name: 'blablabla',
    pageno: 1,
    ....
   })
 */
import axiosInstance from 'utils/fetch'
export default function resource(path, http, actions) {
    var obj = {
        all: () => axiosInstance.get(path),
        get: (id, obj) => axiosInstance.get(path + '/' + id, obj),
        save: obj => axiosInstance.post(path, obj),
        query: params => axiosInstance.get(path, { params }),
        update: (id, obj) => axiosInstance.put(path + '/' + id, obj),
        delete: id => axiosInstance.delete(path + '/' + id)
    }
    return Object.assign(obj, actions)
}
