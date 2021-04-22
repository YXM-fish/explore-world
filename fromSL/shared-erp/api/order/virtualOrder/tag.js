import axiosInstance from 'utils/fetch';
import resource from 'utils/axios-resources';

const path = '/oms/order/virtual-order';
const tagManage = resource(path, axiosInstance, {
    getTagList: (params) => axiosInstance.get('/oms/virtual-order/tag', {params}), //tag分页列表
    forbid: (id) => axiosInstance.put(`/oms/virtual-order/tag/${id}/disable`),//禁用tag
    enabled:(id) => axiosInstance.put(`/oms/virtual-order/tag/${id}/enable`),//启用tag
    update:(id,params) => axiosInstance.put(`/oms/virtual-order/tag/${id}`,params),//修改tag
    create:(params) => axiosInstance.post(`/oms/virtual-order/tag`,params),//创建tag
    getAllTag:(params)=>axiosInstance.get('/oms/virtual-order/tag/all-tag',{params}),//tag列表
    amountEnabled:(params) => axiosInstance.put(`/oms/virtual-order/tag/batch/enable`,params),//批量启用tag
    amountForbid:(params) => axiosInstance.put(`/oms/virtual-order/tag/batch-disable`,params),//批量禁用tag
    getHasTag:(orderId) => axiosInstance.get(`/oms/virtual-order/tag/${orderId}`),//根据订单ID查询订单标签-----订单页面
    amountEnabledByOrder:(tagId,orderIds) => axiosInstance.put(`/oms/virtual-order/tag/batch-add-tag/${tagId}`,orderIds ),//一个标签批量添加给多个订单 --- 订单列表页面
    amountForbidByOrder:(tagId,orderIds) => axiosInstance.put(`/oms/virtual-order/tag/batch-delete-tag/${tagId}`,orderIds),//一个标签批量删除给多个订单 --- 订单列表页面
    deleteOne:(orderId,params) => axiosInstance.delete(`/oms/virtual-order/tag/delete/${orderId}`,{params}),//删除单个标签到订单----订单详情页面
    addOne:(orderId,tagId) => axiosInstance.put(`/oms/virtual-order/tag/save/${orderId}?tagId=${tagId}`),//保存单个标签到订单----订单详情页面
});

export default tagManage