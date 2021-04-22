// 不适合放在global的
// sku状态
const SKU_STATUS_ARR = ['删除', '停售', '停售清仓', '正常销售', '新品测试', '缺货']

// 库存
// const STOCK_ARR = ['库存无货（=0）', '库存有货（>0）']
const STOCK_ARR = [{
    label: 'PID全部有货（>0）',
    value: 1
}, {
    label: 'PID部分无货（>0）',
    value: 0
}, {
    label: 'PID全部无货（=0）',
    value: -1
}]

export {
    SKU_STATUS_ARR,
    STOCK_ARR
}
