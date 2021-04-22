/**
 * 属性
 */
export const ATTRIBUTE = {
    // 属性类型
    attributeType: [
        {
            value: 'BASIC',
            label: '基本属性',
            code: 1
        },
        {
            value: 'PRIMARY',
            label: '关键属性',
            code: 2
        },
        {
            value: 'SALES',
            label: '销售属性',
            code: 3
        },
        {
            value: 'OTHERS',
            label: '其它属性',
            code: 4
        }
    ],
    // 购销状态
    skuPurchaseAndSaleStatus: [
        {
            label: '停售',
            code: 1
        },
        {
            label: '停售清仓',
            code: 2
        },
        {
            label: '正常销售',
            code: 3
        }
    ]
}
