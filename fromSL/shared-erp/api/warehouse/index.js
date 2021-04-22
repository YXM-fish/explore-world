import axiosInstance from 'utils/fetch'
import resource from 'utils/axios-resources'
const path = '/wms'
const warehouse = resource(path, axiosInstance, {
    getInventory: (params) => axiosInstance.get(`/wms/inventory/findAll`, { params }) // 根据条件查询库存
})
export default warehouse
