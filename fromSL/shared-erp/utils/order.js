
// 订单状态
export const basicOrderStatus = [
    {
        label: '已下单',
        value: 'ORDERED'
    },
    {
        label: '已审核',
        value: 'APPROVED'
    },
    {
        label: '已预报',
        value: 'GETTED'
    },
    {
        label: '已配货',
        value: 'DISTRIBUTED'
    },
    {
        label: '拣货中',
        value: 'PICKING'
    },
    {
        label: '已打包',
        value: 'PACKAGE'
    },
    {
        label: '已发货',
        value: 'DELIVERED'
    }
]

export const statusLabelOps = basicOrderStatus.map(item => item.label)

// 回传状态
export const fulfillmentStatuOps = {
    NOT_NEED_FULFILLED: '不需要回传',
    TO_BE_FULFILLED: '未回传',
    FULFILLED: '回传成功',
    FULFILLED_FAIL: '回传失败'
}

// 订单状态
export const orderStatusOps = {
    PAID: '已支付',
    PARTIALLY_PAID: '部分支付',
    PENDING: '支付处理中',
    AUTHORIZED: '已授权',
    VOIDED: '已取消',
    REFUNDED: '已退款',
    PARTIALLY_REFUNDED: '部分退款'
}

// 物流状态 - 变更(7.17)
export const fulfillmentStatus = {
    NULL: '未配送',
    FULFILLED: '已配送',
    PARTIAL: '部分配送',
    DELIVERED: '已收货'
}

export const packageStatusOps = {
    DISTRIBUTED: '已配货',
    PICKING: '拣货中',
    PRINTED: '已打印',
    PENDING_WAREHOUSE: '待回库',
    REJECTED: '已退件'
}

export const usdCurrency = 'USD'

export const stopTypeOps = {
    LOCK: '搁置',
    LOCKING: '搁置中',
    RESETING: '重置中',
    GETTING: '获取单号中'
}


export const orderTypeOps = {
    NORMAL: 'NORMAL',
    COD: 'COD'
}

export const splitOrUnionOps = {
    NORMAL: '普通',
    UNION: '合并',
    SPLIT: '拆分'
}

export const interceptTagOps = [{
    label: '拦截未处理',
    value: 'UN_TREATED',
    type: 'warning',
    color: '#E6A23C'
},
{
    label: '已通知物流商',
    value: 'NOTIFIED_LOGISTICS_PROVIDER',
    type: 'search',
    color: '#8183b3'
},
{
    label: '拦截成功',
    value: 'INTERCEPT_SUCCESS',
    type: 'success',
    color: '#67C23A'
},
{
    label: '拦截失败',
    value: 'INTERCEPT_FAIL',
    type: 'danger',
    color: '#F56C6C'
}
]

export const codStatusOps = [{
    label: 'COD待审核',
    value: 'NOT_AUDIT',
    type: 'warning',
    color: '#E6A23C'
},
{
    label: 'COD审核通过',
    value: 'AUDITED',
    type: 'success',
    color: '#67C23A'
}
]

export const distributionShippingCondition = [
    'WAREHOUSE_RULE_FAIL', // 仓库分配失败
    'LOGISTICS_RULE_FAIL', // 物流分配失败
    'CALC_SHIPPING_FEE_FAIL', // 运费计算失败
    'CALC_ESTIMATE_PROFIT_FAIL', // 预估利润计算失败
    'FETCH_TRACKING_NUMBER_FAIL' // 获取跟踪单号失败
]

export let addressData = [
    {
        label: 'contact',
        value: 'contactName'
    },
    {
        label: 'tel', // 电话1
        value: 'phone'
    },
    {
        label: 'tel2', // 电话2
        value: 'phone2'
    },
    {
        label: 'country',
        value: 'country'
    },
    {
        label: 'province / state',
        value: 'province'
    },
    {
        label: 'postal code',
        value: 'zipCode'
    },
    {
        label: 'address 1',
        value: 'address1'
    },
    {
        label: 'address 2',
        value: 'address2'
    },
    {
        label: 'taxNo',
        value: 'taxNo'
    },
    {
        label: 'IDcard', // 身份证号
        value: 'idCard'
    }
]


/**
 *  @des 订单权限
 *  all-orders.edit.batch-operate                   			批量操作
    all-orders.edit.order-tag   								订单标签
    all-orders.edit.manual-order   								手工订单
    all-orders.edit.batch-replace-sku   						批量替换SKU
    all-orders.edit.export   									导出
    all-orders-detail.edit.shelve   							搁置
    all-orders-detail.edit.reset   								重置
    all-orders-detail.edit.intercept   							拦截
    all-orders-detail.edit.manual-audit                         手工审核
    all-orders-detail.edit.modify-product   					修改商品
    all-orders-detail.edit.manually-match-sku   				手动匹配SKU
    all-orders-detail.edit.manually-match-warehouse-logistics   手动匹配仓库物流
    all-orders-detail.edit.declare-edit   						修改报关信息
    all-orders-detail.edit.modify-recipient-info  				修改收件人信息
    all-orders-detail.edit.split-order   						拆分订单
    all-orders-detail.edit.priority-delivery   					优先发货
    all-orders-detail.edit.giveaway   							赠品
    all-orders-detail.edit.after-sale   						售后
    all-orders-detail.edit.add-notes   							添加备注
    all-orders-detail.edit.order-tag   							订单标签
    手工订单标识Code: MANUALORDER
    *
    */
