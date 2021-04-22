/**
 * 供应商
 */
export const SUPPLIER = {
    // 供应商性质
    supplierNature: [
        {
            value: 'PRODUCTION',
            label: '生产型',
            code: 0
        },
        {
            value: 'TRADED',
            label: '贸易型',
            code: 1
        },
        {
            value: 'INDIVIDUAL_BUSINESS',
            label: '个体工商户',
            code: 2
        },
        {
            value: 'TAOBAO_INDIVIDUAL',
            label: '淘宝个体',
            code: 3
        }
    ],
    // 生产类型
    supplierProductionType: [
        {
            value: 'ODM',
            label: 'ODM',
            code: 0
        },
        {
            value: 'OEM',
            label: 'OEM',
            code: 1
        },
        {
            value: 'CMT_FACTORY',
            label: 'CMT工厂',
            code: 2
        },
        {
            value: 'BOARD_ROOM',
            label: '版房供应商',
            code: 3
        },
        {
            value: 'SECONDARY_PROCESS',
            label: '二次工艺供应商',
            code: 4
        }
    ]
}
