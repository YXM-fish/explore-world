export default {
    buyerTypeOps: [
        {
            label: '白名单',
            value: 'WHITE_LIST'
        },
        // {
        //     label: '黑名单',
        //     value: 'BLACK_LIST'
        // },
        {
            label: '普通买家',
            value: 'NORMAL'
        }
    ],
    // 订单合并状态
    orderSplitUnionOps: [
        {
            label: '普通',
            value: 'NORMAL'
        },
        {
            label: '拆分',
            value: 'SPLIT'
        },
        {
            label: '合并',
            value: 'UNION'
        }
    ],
    interceptTagOps: [
        {
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
    ],
    orderTypeOps: {
        NORMAL: 'NORMAL',
        COD: 'COD'
    },
    stopTypeOps: {
        LOCK: '搁置',
        LOCKING: '搁置中',
        RESETING: '重置中',
        GETTING: '获取单号中'
    }
}
