import axiosInstance from 'utils/fetch'
import resource from 'utils/axios-resources'

const path = '/oms/order/virtual-order'
const virtualOrder = resource(path, axiosInstance, {
    lockOrder: (params) => axiosInstance.put('/oms/order/virtual-order/lock', params), // 虚拟订单锁定
    unlockOrder: (params) => axiosInstance.put('/oms/order/virtual-order/unlock', params), // 虚拟订单解锁
    voidOrder: (params) => axiosInstance.put('/oms/order/virtual-order/void', params), // 虚拟订单作废
    activateOrder: (params) => axiosInstance.put('/oms/order/virtual-order/activate', params), // 虚拟订单激活
    unionOrder: (params) => axiosInstance.put('/oms/order/virtual-order/union', params), // 虚拟订单合并
    logsList: (params) => axiosInstance.get('/oms/virtual-order/log/operation-list', { params }), // 获取日志列表
    addNote: (params) => axiosInstance.post('/oms/virtual-order/note/batch-save', params), // 多个虚拟订单批量添加备注信息
    addSingleNote: (params) => axiosInstance.post('/oms/virtual-order/note', params), // 单个虚拟订单添加备注信息
    getNoteList: (virtualOrderId) => axiosInstance.get(`/oms/virtual-order/note/list/${virtualOrderId}`), // 根据虚拟订单号查询备注列表
    setLogistics: (id, params) => axiosInstance.put(`/oms/order/virtual-order/${id}/shipping-channel`, params), // 设置物流渠道方式
    priorityDelivery: (id, params) => axiosInstance.put(`/oms/order/virtual-order/${id}/is-Priority-in-delivery`, params), // 设置虚拟订单是否优先发货
    batchPriorityDelivery: (params) => axiosInstance.put('/oms/order/virtual-order/batch-update-Priority-in-delivery', params), // 批量设置虚拟订单是否优先发货
    manualApprove: (params) => axiosInstance.put('/oms/order/virtual-order/manual-approve', params), // 虚拟订单手工审核
    generateManual: (params) => axiosInstance.post('/oms/order/virtual-order/generateManual', params, { showLoad: true }), // 手工创建虚拟订单
    exportOrder: (params) => axiosInstance.get(`/oms/order/virtual-order/export-virtual-order?id=${params}`), // 导出虚拟订单'
    skuList: (params, obj) => axiosInstance.get('/oms/order/virtual-order/load-sku-match-item', { params, ...obj }), // 手动sku匹配页面
    saveMatchSku: (params) => axiosInstance.put('/oms/order/virtual-order/manual-batch-sku-match', params), // 手动sku匹配保存
    shipOrder: (params) => axiosInstance.put('/oms/order/virtual-order/deliver', params), // 发货
    signOrder: (params) => axiosInstance.put('/oms/order/virtual-order/sign', params), // 签收
    printOrder: (params) => axiosInstance.put('/oms/order/virtual-order/print', params), // 打印虚拟订单
    againPrintOrder: (params) => axiosInstance.put('/oms/order/virtual-order/print-again', params), // 重新打印虚拟订单
    setBatchShipping: (params) => axiosInstance.put('/oms/order/virtual-order/batch-save-shipping-channel', params), // 设置物流渠道方式
    changeShippingChannel: (params) => axiosInstance.put('/oms/order/virtual-order/change-shipping-channel', params), // 设置物流渠道方式
    uncheckRule: () => axiosInstance.get('/oms/order/virtual-order/list-uncheck-rule'), // 未通过的审核规则信息以及虚拟订单总数
    splitList: (id) => axiosInstance.get(`/oms/order/virtual-order/${id}/split-item-list`), // 虚拟订单拆分页面显示
    saveSplit: (params) => axiosInstance.put('/oms/order/virtual-order/split', params), // 虚拟订单拆分
    saveItemSplit: (params) => axiosInstance.put('/oms/order/virtual-order/split-by-item', params), // 虚拟订单拆分-平台订单级
    savePlatformOrderSplit: (params) => axiosInstance.put('/oms/order/virtual-order/split-by-order', params), // 虚拟订单拆分-平台订单级
    exportCombineOrder: (params) => axiosInstance.get('/oms/order/virtual-order/export-combine-virtual-order?unionGroupId=' + params), // 导出合并虚拟订单
    getTrackingNumber: (params) => axiosInstance.put(`/oms/order/virtual-order/get-tracking-number`, params), // 手动分配运单号
    resetOrder: (params) => axiosInstance.put(`/oms/order/virtual-order/reset`, params), // 虚拟订单重置
    reapplyRule: (params) => axiosInstance.post(`/oms/order/virtual-order/logistic-rule`, params), // 重新应用物流规则
    ignore: (params) => axiosInstance.put(`/oms/order/virtual-order/ignore`, params), // 虚拟订单-预估利润忽略

    getCombineSkuList: (params, obj) => axiosInstance.get(`/oms/order/sku-cache/page-combine-sku`, { params, ...obj }), // 组合sku查询
    getSkuList: (params, obj) => axiosInstance.get(`/oms/order/sku-cache/page-sku`, { params, ...obj }), // 仓库Sku查询
    modifyProduct: (params) => axiosInstance.put(`/oms/order/virtual-order/modify-product`, params),

    getGiftList: (id, obj) => axiosInstance.get(`/oms/order/virtual-order/${id}/gifts`, obj), // 获取赠品
    saveGift: (params) => axiosInstance.post(`/oms/order/virtual-order/save-gift`, params), // 添加修改赠品
    updateSku: (params) => axiosInstance.put(`/oms/order/virtual-order/update-sku`, params), // 更新sku
    riskOrderList: (params) => axiosInstance.get(`/oms/order/virtual-order/blacklist-matched-fail-list`, { params }), // 高风险订单列表
    orderMarkFinish: (params) => axiosInstance.put(`/oms/order/virtual-order/blacklist-mark-completed`, params), // 高风险订单标记完成
    cancelMarkFinish: (url, params) => axiosInstance.put(url, params), // 标记完成
    pendingStatistics: (params) => axiosInstance.get(`/oms/order/virtual-order/pending-statistics`, { params }), // 待处理统计
    getOrderResetData: (params) => axiosInstance.get(`/oms/order/rule/page`, { params }),
    getShelveOrReset: (params) => axiosInstance.get(`/oms/order/virtual-order/shelve-type-list`, { params }), // 重置/搁置 类型列表
    getPlatformInfo: (orderId) => axiosInstance.get(`/oms/virtual-order/note/list/order/${orderId}`), // ERP订单详情 平台信息tab页
    interceptOrder: (params, obj) => axiosInstance.put(`/oms/order/virtual-order/intercept`, params, obj), // 订单拦截
    cancelInterceptOrder: (params, obj) => axiosInstance.put(`/oms/order/virtual-order/intercept-cancel`, params, obj), // 取消订单拦截
    interceptOperate: (params, obj) => axiosInstance.put(`/oms/order/virtual-order/intercept-operate`, params, obj), // 订单拦截操作-拦截成功、拦截失败、通知物流商
    getTrackingNumberByNeed: (params, obj) => axiosInstance.put(`/oms/order/virtual-order/get-tracking-number/need-get-trackno`, params, obj), // 手动获取运单号--待获取物流跟踪号
    getTrackingNumberByFail: (params, obj) => axiosInstance.put(`/oms/order/virtual-order/get-tracking-number/fetch-track-fail`, params, obj), // 手动获取运单号--待获取物流跟踪号
    getTrackingNumberByExpired: (params, obj) => axiosInstance.put(`/oms/order/virtual-order/get-tracking-number/trackno-expired`, params, obj), // 手动获取运单号--待获取物流跟踪号

    codAuditApprove: (params) => axiosInstance.put(`/oms/order/virtual-order/cod-audit-approve`, params) // COD订单审核
})
export default virtualOrder
