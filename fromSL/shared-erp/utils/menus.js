import CommonApi from '@/api/common'

export default class Menu {
    constructor() {

    }

    getAllMenus() {
        CommonApi.getAllMenus().then(res => {
            if (res.success) {

            }
        })
    }
}
const menus = [{
    name: '产品管理',
    code: 'productManager',
    items: [{
        name: '创建产品',
        code: 'createProduct',
        operations: 'product.owner.update.brand',
        resource_type: 'category.product.create,brand.product.create'
    },
    {
        name: '时颖供应商产品',
        code: 'providerAudit'
    },
    {
        name: '品牌管理',
        code: 'brandMgt'
    },
    {
        name: '停售日期管理',
        code: 'discontinuedDateMgt'
    },
    {
        name: '普通产品列表',
        code: 'productList',
        operations: 'product.owner.*,product.*,product-list.*',
        resource_type: 'category.product.list'
    },
    {
        name: '品牌产品列表',
        code: 'productBrandList',
        operations: 'product.owner.*,product.*,product-list.*',
        resource_type: 'brand.product.product-list'
    },
    {
        name: '选品列表',
        code: 'choseList'
    },
    {
        name: '审核列表',
        code: 'reviewList',
        operations: 'product.co.*'
    },
    {
        name: '开发列表',
        code: 'developerList',
        operations: 'product.co.*'
    },
    {
        name: '组合SKU',
        code: 'combinationSkuList'
    },
    {
        name: 'SKU别名',
        code: 'SKUAias'
    },
    {
        name: '分类管理',
        code: 'categoryMgr'
    },
    {
        name: '多语言管理',
        code: 'language'
    },
    {
        name: '变参属性',
        code: 'productAttributes'
    },
    {
        name: '标签管理',
        code: 'tagEditor'
    },
    {
        name: '面料库',
        code: 'fabricLibrary'
    },
    {
        name: '预售开发',
        code: 'developTask',
        operations: 'develop-task.edit.*,develop-task-list.edit.*',
        resource_type: 'category.product.develop-task'
    },
    {
        name: '统计',
        code: 'statistics',
        items: [{
            name: '预售开发统计',
            code: 'presellStatistics',
            items: [{
                name: '已操作进度',
                code: 'presellSaleFinished'
            },
            {
                name: '未完成状态',
                code: 'presellSaleUnFinished'
            }
            ]
        },
        {
            name: '选品',
            code: 'choose'
        },
        {
            name: '审核',
            code: 'audit'
        },
        {
            name: '供应商开发',
            code: 'supplyDevelop'
        }
        ]
    },
    {
        name: '销售统计',
        code: 'salesStatistics',
        resource_type: 'category.product.sales-statistics,choose-product.product.sales-statistics,woo-commerce-channel.product.sales-statistics,shopify-channel.product.sales-statistics,brand.product.sales-statistics'
    }
    ]
},
{
    name: '店铺商品',
    code: 'platformProductMgr',
    items: [{
        name: 'Shopify',
        code: 'shopify',
        items: [{
            name: '商品列表',
            code: 'shopifyList',
            resource_type: 'shopify-channel.platform.list'
        },
        {
            name: 'Collection',
            code: 'MaintainCollection'
        }
        ]
    },
    {
        name: 'WooCommerce',
        code: 'WooCommerceList'
    }
    ]
},
{
    name: '订单管理',
    code: 'orderManager',
    items: [{
        name: '全部订单',
        code: 'orderList',
        resource_type: 'shopify-channel.order.list,woo-commerce-channel.order.list'
    },
    {
        name: '待处理',
        code: 'pendingOrder',
        resource_type: 'shopify-channel.order.pending,woo-commerce-channel.order.pending'
    },
    {
        name: '售后管理',
        code: 'saleServiceList'
    },
    {
        name: '重置/搁置管理',
        code: 'orderResetManage'
    },
    {
        name: '原始订单',
        code: 'platformOrderList'
    },
    {
        name: '买家黑名单',
        code: 'blackList'
    },
    {
        name: '基础设置',
        code: 'setting',
        items: [{
            name: '订单规则',
            code: 'ruleSetting'
        },
        {
            name: '订单标签',
            code: 'orderTagManage'
        },
        {
            name: '售后原因',
            code: 'serviceReason'
        }
        ]
    },
    {
        name: '数据日志',
        code: 'dataLog',
        items: [{
            name: '获取跟踪号任务',
            code: 'gettingTrackno'
        },
        {
            name: '回传列表',
            code: 'backList'
        }
        ]
    }
    ]
},
{
    name: '仓库管理',
    code: 'warehouse',
    items: [{
        name: '仓库列表',
        code: 'warehouseMaintain'
    },
    {
        name: '搁置管理',
        code: 'resetManage'
    },
    {
        name: 'PDA',
        code: 'PDA'
    },
    {
        name: '待配货',
        code: 'distribution'
    },
    {
        name: '拣货任务',
        code: 'pickingTask'
    },
    {
        name: '单品包装',
        code: 'singleProductPackaging'
    },
    {
        name: '二次分拣',
        code: 'secondarySorting'
    },
    {
        name: '核重发货',
        code: 'verifyDelivery'
    },
    {
        name: '处理任务',
        code: 'warehouseTask',
        items: [{
            name: '拣货失败',
            code: 'PickingFailure'
        },
        {
            name: '待还库包裹',
            code: 'giveBack'
        },
        {
            name: '取消打印包裹',
            code: 'unpack'
        }
        ]
    },
    {
        name: '库存数量',
        code: 'inventoryNum'
    },
    {
        name: '库存流水',
        code: 'stockRecords'
    },
    {
        name: '库存快照',
        code: 'InventorySnapshot'
    },
    {
        name: '包裹查询',
        code: 'parcelQuery'
    },
    {
        name: '包裹列表',
        code: 'packageList'
    },
    {
        name: '未发货包裹列表',
        code: 'unshippedPkgList'
    },
    {
        name: '快速换单',
        code: 'switchOrder'
    },
    {
        name: '拆包',
        code: 'unpacking'
    },
    {
        name: '拆包入库列表',
        code: 'unpackingList'
    },
    {
        name: '收货记录',
        code: 'warehouseRecords'
    },
    {
        name: '退件入库',
        code: 'returnPackage'
    }
    ]
},
{
    name: '采购管理',
    code: 'purchase',
    items: [{
        name: '供应商管理',
        code: 'vendorMgr'
    },
    {
        name: '拜访记录',
        code: 'visitRecord'
    },
    {
        name: '供应商关系',
        code: 'supplierRelation'
    },
    {
        name: '1688授权',
        code: 'authorization'
    },
    {
        name: '采购建议',
        code: 'purchasing'
    },
    {
        name: '采购计划',
        code: 'purchasePlan'
    },
    {
        name: '采购订单',
        code: 'purchaseOrder'
    }
    ]
},
{
    name: '物流管理',
    code: 'logistics',
    items: [{
        name: '物流商列表',
        code: 'logisticsProvidersList'
    },
    {
        name: '物流渠道列表',
        code: 'logisticsChannelList'
    },
    {
        name: '运费计算',
        code: 'calculateShipping'
    },
    {
        name: '最高报关价列表',
        code: 'setMaxCustomsDeclarationPrice'
    }
    ]
},
{
    name: '财务',
    code: 'finance',
    items: [{
        name: '财务对账',
        code: 'financeVerification'
    },
    {
        name: '待付款订单',
        code: 'advancePayment'
    }
    ]
},
{
    name: '基础信息',
    code: 'basisData',
    items: [{
        name: '店铺维护',
        code: 'storeMaintenance',
        operations: 'store.update.*',
        resource_type: 'shopify-channel.basic.maintenance,woo-commerce-channel.basic.maintenance'
    },
    {
        name: '国家列表',
        code: 'countyManagement'
    },
    {
        name: '国家分类',
        code: 'countryClassification'
    },
    {
        name: '货币列表',
        code: 'currencyMaintenance'
    },
    {
        name: '汇率列表',
        code: 'exchangeRate'
    },
    {
        name: '物流服务',
        code: 'logisticsService'
    },
    {
        name: '物流方式',
        code: 'shippingMethods'
    },
    {
        name: '公告列表',
        code: 'noticeList'
    },
    {
        name: '测试菜单',
        code: 'noticeList'
    }
    ]
},
{
    name: 'BI数据看板',
    code: 'biDashboard',
    items: [
        {
            name: '参谋部实时数据看板',
            code: 'bossDashboard'
        },
        {
            name: '参谋部实时商品看板',
            code: 'bossSpuDashboard'
        },
        {
            name: '参谋部SPU TOP',
            code: 'bossSpuTop'
        },
        {
            name: '小组看板',
            code: 'groupDashboard'
        }
    ]
},
{
    name: '权限管理',
    code: 'adminSys',
    items: [{
        name: '用户管理',
        code: 'userManager'
    },
    {
        name: '菜单管理',
        code: 'menuManager'
    },
    {
        name: '角色管理',
        code: 'roleManager'
    }
    ]
}
]

const menuNameTree = {
    'productManager': {
        'createProduct': {
            'name': '创建产品'
        },
        'providerAudit': {
            'name': '时颖供应商产品'
        },
        'brandMgt': {
            'name': '品牌管理'
        },
        'discontinuedDateMgt': {
            'name': '停售日期管理'
        },
        'productList': {
            'name': '普通产品列表'
        },
        'productBrandList': {
            'name': '品牌产品列表'
        },
        'choseList': {
            'name': '选品列表'
        },
        'reviewList': {
            'name': '审核列表'
        },
        'developerList': {
            'name': '开发列表'
        },
        'combinationSkuList': {
            'name': '组合SKU'
        },
        'SKUAias': {
            'name': 'SKU别名'
        },
        'categoryMgr': {
            'name': '分类管理'
        },
        'language': {
            'name': '多语言管理'
        },
        'productAttributes': {
            'name': '变参属性'
        },
        'tagEditor': {
            'name': '标签管理'
        },
        'fabricLibrary': {
            'name': '面料库'
        },
        'developTask': {
            'name': '预售开发'
        },
        'statistics': {
            'presellStatistics': {
                'presellSaleFinished': {
                    'name': '已操作进度'
                },
                'presellSaleUnFinished': {
                    'name': '未完成状态'
                },
                'name': '预售开发统计'
            },
            'choose': {
                'name': '选品'
            },
            'audit': {
                'name': '审核'
            },
            'supplyDevelop': {
                'name': '供应商开发'
            },
            'name': '统计'
        },
        'salesStatistics': {
            'name': '销售统计'
        },
        'name': '产品管理'
    },
    'platformProductMgr': {
        'shopify': {
            'shopifyList': {
                'name': '商品列表'
            },
            'MaintainCollection': {
                'name': 'Collection'
            },
            'name': 'Shopify'
        },
        'WooCommerceList': {
            'name': 'WooCommerce'
        },
        'name': '店铺商品'
    },
    'orderManager': {
        'orderList': {
            'name': '全部订单'
        },
        'pendingOrder': {
            'name': '待处理'
        },
        'saleServiceList': {
            'name': '售后管理'
        },
        'orderResetManage': {
            'name': '重置/搁置管理'
        },
        'platformOrderList': {
            'name': '原始订单'
        },
        'blackList': {
            'name': '买家黑名单'
        },
        'dataLog': {
            'gettingTrackno': {
                'name': '获取跟踪号任务'
            },
            'backList': {
                'name': '回传列表'
            },
            'name': '数据日志'
        },
        'setting': {
            'ruleSetting': {
                'name': '订单规则'
            },
            'orderTagManage': {
                'name': '订单标签'
            },
            'serviceReason': {
                'name': '售后原因'
            },
            'name': '基础设置'
        },
        'name': '订单管理'
    },
    'warehouse': {
        'warehouseMaintain': {
            'name': '仓库列表'
        },
        'resetManage': {
            'name': '搁置管理'
        },
        'PDA': {
            'name': 'PDA'
        },
        'distribution': {
            'name': '待配货'
        },
        'pickingTask': {
            'name': '拣货任务'
        },
        'singleProductPackaging': {
            'name': '单品包装'
        },
        'secondarySorting': {
            'name': '二次分拣'
        },
        'verifyDelivery': {
            'name': '核重发货'
        },
        'warehouseTask': {
            'PickingFailure': {
                'name': '拣货失败'
            },
            'giveBack': {
                'name': '待还库包裹'
            },
            'unpack': {
                'name': '取消打印包裹'
            },
            'name': '处理任务'
        },
        'inventoryNum': {
            'name': '库存数量'
        },
        'stockRecords': {
            'name': '库存流水'
        },
        'InventorySnapshot': {
            'name': '库存快照'
        },
        'parcelQuery': {
            'name': '包裹查询'
        },
        'packageList': {
            'name': '包裹列表'
        },
        'unshippedPkgList': {
            'name': '未发货包裹列表'
        },
        'switchOrder': {
            'name': '快速换单'
        },
        'unpacking': {
            'name': '拆包'
        },
        'unpackingList': {
            'name': '拆包入库列表'
        },
        'warehouseRecords': {
            'name': '收货记录'
        },
        'returnPackage': {
            'name': '退件入库'
        },
        'name': '仓库管理'
    },
    'purchase': {
        'vendorMgr': {
            'name': '供应商管理'
        },
        'visitRecord': {
            'name': '拜访记录'
        },
        'supplierRelation': {
            'name': '供应商关系'
        },
        'authorization': {
            'name': '1688授权'
        },
        'purchasing': {
            'name': '采购建议'
        },
        'purchasePlan': {
            'name': '采购计划'
        },
        'purchaseOrder': {
            'name': '采购订单'
        },
        'name': '采购管理'
    },
    'logistics': {
        'logisticsProvidersList': {
            'name': '物流商列表'
        },
        'logisticsChannelList': {
            'name': '物流渠道列表'
        },
        'calculateShipping': {
            'name': '运费计算'
        },
        'setMaxCustomsDeclarationPrice': {
            'name': '最高报关价列表'
        },
        'name': '物流管理'
    },
    'finance': {
        'financeVerification': {
            'name': '财务对账'
        },
        'advancePayment': {
            'name': '待付款订单'
        },
        'name': '财务'
    },
    'basisData': {
        'storeMaintenance': {
            'name': '店铺维护'
        },
        'countyManagement': {
            'name': '国家列表'
        },
        'countryClassification': {
            'name': '国家分类'
        },
        'currencyMaintenance': {
            'name': '货币列表'
        },
        'exchangeRate': {
            'name': '汇率列表'
        },
        'logisticsService': {
            'name': '物流服务'
        },
        'shippingMethods': {
            'name': '物流方式'
        },
        'noticeList': {
            'name': '公告列表'
        },
        'name': '基础信息'
    },
    'adminSys': {
        'userManager': {
            'name': '用户管理'
        },
        'menuManager': {
            'name': '菜单管理'
        },
        'roleManager': {
            'name': '角色管理'
        },
        'name': '权限管理'
    }
}
// 递归菜单树：获取code->name键值
let loopMenuNames = (items) => {
    let menuNames = {}
    items.forEach(m => {
        menuNames[m.code] = {}
        if (m.items && m.items.length > 0) {
            menuNames[m.code] = loopMenuNames(m.items)
        }
        menuNames[m.code]['name'] = m.name
    })
    return menuNames
}

export function GetMenuNames() {
    return loopMenuNames(menus)
}
