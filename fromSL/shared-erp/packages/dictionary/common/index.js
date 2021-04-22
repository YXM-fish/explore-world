let accept = '.xlsx,.xls'
let fileType = 'excel'
export default {
    importOps: {
        manual: {
            accept,
            fileType,
            title: '手工订单导入'
        },
        otherPlatform: {
            accept: '.csv',
            fileType: '.csv',
            title: '其他平台订单导入'
        },
        amazon: {
            accept,
            fileType,
            title: '亚马逊订单导入'
        },
        quantity: {
            accept,
            fileType,
            title: '售后订单按数量导入'
        },
        amount: {
            accept,
            fileType,
            title: '售后订单按SKU金额导入'
        },
        orderAmount: {
            accept,
            fileType,
            title: '售后订单按订单金额导入'
        },
        notes: {
            accept,
            fileType,
            title: '导入备注'
        },
        whiteList: {
            accept,
            fileType,
            title: '导入白名单'
        }
    }
}
