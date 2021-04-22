// 平台类型
export const platformOps = {
    0: {
        label: '线下',
        value: 0
    },
    1: {
        label: '1688',
        value: 1
    },
    2: {
        label: '淘宝',
        value: 2
    },
    3: {
        label: '天猫',
        value: 3
    },
    4: {
        label: '拼多多',
        value: 4
    },
    5: {
        label: '京东',
        value: 5
    }
}
// 结算方式
export const clearingFormOps = {
    0: {
        label: '网商100%预付',
        value: 0
    },
    1: {
        label: '货到付款',
        value: 1
    },
    2: {
        label: '周结',
        value: 2
    },
    3: {
        label: '半月结',
        value: 3
    },
    4: {
        label: '月结',
        value: 4
    },
    5: {
        label: '预付转账',
        value: 5
    },
    6: {
        label: '阿里账期',
        value: 6
    },
    7: {
        label: '档口现付',
        value: 7
    }
}

export const yesOrNoOps = {
    true: {
        label: '是',
        value: true
    },
    false: {
        label: '否',
        value: false
    }
}

// 供应商性质
export const supplierPropertyOps = {
    0: {
        label: '生产型',
        value: 0
    },
    1: {
        label: '贸易型',
        value: 1
    },
    2: {
        label: '个体工商户',
        value: 2
    },
    3: {
        label: '淘宝个体',
        value: 3
    }
}

// 授信等级
export const creditGradeOps = {
    0: {
        label: '低',
        value: 0
    },
    1: {
        label: '中',
        value: 1
    },
    2: {
        label: '高',
        value: 2
    },
    3: {
        label: '黑名单',
        value: 3
    }
}

// 支付方式
export const paymentTypeOps = {
    0: {
        label: '支付宝',
        value: 0
    },
    1: {
        label: '银行转账',
        value: 1
    }
}

// 货源类型
export const goodsSources = {
    0: '预售',
    1: '定制',
    2: '现货',
    5: '线上现货',
    6: 'ODM现货',
    7: '档口现货',
    8: '预售-供应商',
    9: '供应商推品'
}

export const auditStatusOps = {
    '0': {
        label: '已审核',
        value: 0,
        color: '#67C23A'
    },
    '1': {
        label: '未审核',
        value: 1,
        color: '#E6A23C'
    },
    '2': {
        label: '已拒绝',
        value: 2,
        color: '#F56C6C'
    }
}

export const payeeCurrencyOps = {
    0: {
        label: '人民币',
        value: 0
    },
    1: {
        label: '港币',
        value: 1
    },
    2: {
        label: '美元',
        value: 2
    }
}

export const auditTypeOptions = [
    { label: '新增', value: 0 },
    { label: '必填信息修改', value: 1 },
    { label: '银行账户信息修改', value: 2 }
]

export const supplierOrderPlatformOps = {
    0: {
        label: '线下',
        value: 0
    },
    1: {
        label: '1688',
        value: 1
    }
}

export const payApplyAuditStatusOps = {
    'AUDIT': {
        label: '审核中',
        key: 'AUDIT',
        value: 0
    },
    'PASSED_AUDIT': {
        label: '审核通过',
        key: 'PASSED_AUDIT',
        value: 1
    },
    'REJECT_AUDIT': {
        label: '审核拒绝',
        key: 'REJECT_AUDIT',
        value: 1
    }
}
