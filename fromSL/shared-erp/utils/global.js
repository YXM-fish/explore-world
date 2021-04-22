let common = {
    lockStatus: [{
        label: '未锁定',
        value: '0'
    },
    {
        label: '已锁定',
        value: '1'
    }
    ]
}
/* 注：不要更改枚举的索引位置 */
let options = {
    // 售价策略
    pricing: [{
        label: '销售价格',
        value: 'SELL_PRICE_BASED'
    },
    {
        label: '预估采购',
        value: 'PURCHASE_PRICE_BASED'
    }
    ],
    // 语种
    languages: [{
        label: '英语',
        value: 'en'
    },
    {
        label: '德语',
        value: 'de'
    },
    {
        label: '日语',
        value: 'ja'
    },
    {
        label: '意大利语',
        value: 'it'
    },
    {
        label: '西班牙语',
        value: 'es'
    },
    {
        label: '法语',
        value: 'fr'
    },
    {
        label: '葡萄牙语',
        value: 'pt'
    },
    {
        label: '阿拉伯语',
        value: 'ar'
    }
    ],
    // 小数位数
    decimalPoints: [{
        label: '0',
        value: 0
    },
    {
        label: '1',
        value: 1
    },
    {
        label: '2',
        value: 2
    }
    ],
    // 售后类型
    afterSaleTypeEnums: [{
        label: '退款',
        value: 'REFUND'
    },
    {
        label: '补发',
        value: 'REISSUE'
    }
        // { label: "退件", value: "PACKAGE_REJECT" }
    ],

    // 退款类型
    refundTypeOps: {
        AMOUNT: '按金额',
        QUANTITY: '按数量',
        FREIGHT: '仅运费'
    },

    // 售后来源
    reasonSourceEnums: [{
        label: '邮件',
        value: 'EMAIL'
    },
    {
        label: 'PayPal纠纷',
        value: 'PAYPAL_DISPUTE'
    },
    {
        label: '其他付款平台纠纷',
        value: 'OTHER_DISPUTE'
    },
    {
        label: '公司内部',
        value: 'COMPANY'
    }
        // { label: "系统", value: "SYSTEM" }
    ],
    // 订单合并状态
    orderSplitUnionEnums: [{
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
    // 订单状态
    orderStatusEnums: [{
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
    },
    // { label: "已提货", value: "PICKUP" },
    {
        label: '已搁置',
        value: 'SHELVE'
    },
    // { label: '已签收',value: 'SIGNED' },
    {
        label: '已取消',
        value: 'STOP'
    },
    {
        label: '已退件',
        value: 'REJECTED'
    }
    ],
    orderStatusEntrepotEnums: [{
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
    }
    ],
    stockSearchTypeEnums: [{
        label: 'SKU',
        value: '1'
    },
    {
        label: '货架',
        value: '0'
    },
    {
        label: '产品中文名',
        value: '2'
    },
    {
        label: 'SPU',
        value: '3'
    }
    ],
    inventoryTypeEnums: [{
        label: '盘亏',
        value: 'LOSS'
    },
    {
        label: '盘盈',
        value: 'PROFIT'
    }
    ],
    // 出入库枚举
    stockOutInEnums: [{
        label: '出库',
        value: 'OUTBOUND'
    },
    {
        label: '入库',
        value: 'INBOUND'
    }
    ],
    // 库存操作类型枚举
    stockOptTypeEnums: [{
        label: '采购入库',
        value: 'IN_INVENTORY'
    },
    {
        label: '销售出库',
        value: 'DELIVERY'
    },
    {
        label: '退件入库',
        value: 'PACKAGE_REFUND'
    },
    {
        label: '盘盈入库',
        value: 'INVENTORY_PROFIT'
    },
    {
        label: '盘亏出库',
        value: 'INVENTORY_SHORTAGES'
    },
    {
        label: '赠品入库',
        value: 'GIFT_IN_INVENTORY'
    },
    {
        label: '库存迁移',
        value: 'INVENTORY_TRANSFER'
    },
    {
        label: '样品入库',
        value: 'SAMPLE_IN'
    },
    {
        label: '样品出库',
        value: 'SAMPLE_OUT'
    },
    {
        label: '销售退货入库',
        value: 'SALES_RETURN_IN'
    },
    {
        label: '入库单盘盈入库',
        value: 'IN_SURPLUS_INVENTORY'
    }
    ],
    // 包裹状态枚举
    packageStatusEnums: [{
        label: '已配货',
        value: 'DISTRIBUTED'
    },
    {
        label: '拣货中',
        value: 'PICKING'
    },
    {
        label: '已打包',
        value: 'PRINTED'
    },
    {
        label: '待还库',
        value: 'PENDING_WAREHOUSE'
    },
    {
        label: '已发货',
        value: 'DELIVERED'
    },
    {
        label: '已回收',
        value: 'RECALLED'
    },
    {
        label: '待配货',
        value: 'WAITING_FOR_DISTRIBUTION'
    },
    {
        label: '强制抹平',
        value: 'FORCE_RETURN_INVENTORY'
    }
    ],
    // 拣货任务状态枚举
    pickTaskStatusEnums: [{
        label: '待指派',
        value: 'WAIT_ASSIGN'
    },
    {
        label: '已指派',
        value: 'ASSIGN'
    },
    {
        label: '拣货中',
        value: 'PICKING'
    },
    {
        label: '已完成',
        value: 'COMPLETED'
    }
    ],
    // 包裹拣货类型枚举
    packagePickTypeEnums: [{
        label: '单品单个',
        value: 'ONE2ONE',
        enumValue: 0
    },
    {
        label: '单品多个',
        value: 'ONE2MANY',
        enumValue: 1
    },
    {
        label: '多品多个',
        value: 'MANY2MANY',
        enumValue: 2
    }
        // { label: '特大', value: 'BIG' },
        // { label: '特殊', value: 'SPECIAL' },
        // { label: '固定搭配', value: 'FIXED' }
    ],
    // 商品货源类型枚举
    productSourceTypeEnums: [{
        label: '预售',
        value: 'PRESALE'
    },
    {
        label: '定制',
        value: 'CUSTOMIZED'
    },
    {
        label: '现货',
        value: 'GOODS_IN_STOCK'
    },
    {
        label: '现货-预售',
        value: 'BIGOODS_IN_STOCK_PRESALEG'
    },
    {
        label: '现货-定制',
        value: 'GOODS_IN_STOCK_CUSTOMIZED'
    },
    {
        label: '线上现货',
        value: 'GOODS_IN_STOCK_OFFLINE'
    },
    {
        label: 'ODM现货',
        value: 'GOODS_IN_STOCK_ODM'
    },
    {
        label: '档口现货',
        value: 'GOODS_IN_STOCK_STALL'
    }
    ],
    // 采购平台
    purchasePlatform: [{
        label: '线下',
        value: 'OFFLINE',
        enumValue: 0
    },
    {
        label: '1688',
        value: 'ALI_1688',
        enumValue: 1
    },
    {
        label: '淘宝',
        value: 'TAOBAO',
        enumValue: 2
    },
    {
        label: '天猫',
        value: 'TMALL',
        enumValue: 3
    },
    {
        label: '拼多多',
        value: 'PINDUODUO',
        enumValue: 4
    },
    {
        label: '京东',
        value: 'JD',
        enumValue: 5
    }
    ],
    // 采购方式
    purchaseMode: [{
        label: '线下',
        value: 'OFFLINE',
        enumValue: 0
    },
    {
        label: '1688',
        value: 'ALI_1688',
        enumValue: 1
    },
    {
        label: '淘宝',
        value: 'TAOBAO',
        enumValue: 2
    },
    {
        label: '天猫',
        value: 'TMALL',
        enumValue: 3
    },
    {
        label: '拼多多',
        value: 'PINDUODUO',
        enumValue: 4
    },
    {
        label: '京东',
        value: 'JD',
        enumValue: 5
    }
    ],
    // 采购结算方式
    purchaseClearingMode: [{
        label: '网商100%预付',
        value: 'NET',
        enumValue: 0
    },
    {
        label: '货到付款',
        value: 'COD',
        enumValue: 1
    },
    {
        label: '周结',
        value: 'WEEK',
        enumValue: 2
    },
    {
        label: '半月结',
        value: 'HALF_MONTH',
        enumValue: 3
    },
    {
        label: '月结',
        value: 'MONTH',
        enumValue: 4
    },
    {
        label: '预付转账',
        value: 'PREPAID',
        enumValue: 5
    },
    {
        label: '阿里账期',
        value: 'ALI',
        enumValue: 6
    },
    {
        label: '档口现付',
        value: 'PAY_AS_YOU_GO',
        enumValue: 7
    }
    ],
    // 授信等级
    creditGrade: [{
        label: '低',
        value: 'LOW',
        enumValue: 0
    },
    {
        label: '中',
        value: 'MIDDLE',
        enumValue: 1
    },
    {
        label: '高',
        value: 'HIGH',
        enumValue: 2
    },
    {
        label: '黑名单',
        value: 'BLACK',
        enumValue: 3
    }
    ],
    // 供应商设置节点
    supplierSettingMode: [{
        label: '预售开发授信等级',
        value: 'PRESALE_CREDIT_GRADE',
        enumValue: 0
    }],
    // 采购单价审核状态
    priceAuditStatus: [{
        label: '待审核',
        value: 'PENDING_AUDIT',
        enumValue: 0
    },
    {
        label: '已通过',
        value: 'AUDIT_PASSED',
        enumValue: 1
    },
    {
        label: '已拒绝',
        value: 'AUDIT_REJECTED',
        enumValue: 2
    }
    ],
    // 供应商性质
    supplierNature: [{
        label: '生产型',
        value: 'PRODUCTION',
        enumValue: 0
    },
    {
        label: '贸易型',
        value: 'TRADED',
        enumValue: 1
    },
    {
        label: '个体工商户',
        value: 'INDIVIDUAL_BUSINESS',
        enumValue: 2
    },
    {
        label: '淘宝个体',
        value: 'TAOBAO_INDIVIDUAL',
        enumValue: 3
    }
    ],
    // 翻译状态
    translateStatus: [{
        label: '不需要翻译',
        value: 'NO'
    },
    {
        label: '翻译中',
        value: 'IN_TRANSLATE'
    },
    {
        label: '待翻译',
        value: 'WAIT'
    },
    {
        label: '翻译失败',
        value: 'FAIL'
    },
    {
        label: '翻译成功',
        value: 'SUCCESS'
    }
    ],
    // 下单平台
    purchasePlatform2: [{
        label: '线下供应商',
        value: 'OFFLINE',
        enumValue: 0
    },
    {
        label: '1688供应商',
        value: 'ALI_1688',
        enumValue: 1
    }
    ],
    // 供应商罚款状态
    supplierFineStatus: [{
        label: '审核中',
        value: 'AUDITING',
        enumValue: 0
    },
    {
        label: '已通过',
        value: 'AUDIT_PASSED',
        enumValue: 1
    },
    {
        label: '已拒绝',
        value: 'AUDIT_REJECTED',
        enumValue: 2
    }
    ],
    // 线下付款状态
    paymentStatus: [{
        label: '待付款',
        value: 'PENDING_PAYMENT',
        enumValue: 0
    },
    {
        label: '付款中',
        value: 'PAYING',
        enumValue: 3
    },
    {
        label: '已付款',
        value: 'PAID',
        enumValue: 1
    },
    {
        label: '付款失败',
        value: 'PAYMENT_FAIL',
        enumValue: 4
    },
    {
        label: '已拒绝',
        value: 'REJECTED',
        enumValue: 2
    }
    ],
    productGradeList: [{
        label: '高',
        value: 'HIGH'
    },
    {
        label: '中',
        value: 'MIDDLE'
    },
    {
        label: '低',
        value: 'LOW'
    }
    ],
    // sku购销状态
    purchaseSalesStatus: [{
        label: '停售',
        value: '1'
    },
    {
        label: '停售清仓',
        value: '2'
    },
    {
        label: '正常销售',
        value: '3'
    },
    {
        label: '新品测试',
        value: '4'
    },
    {
        label: '缺货',
        value: '5'
    }
    ],
    // SPU发布状态
    spuPublishStatus: [{
        label: '已停售',
        value: 10,
        key: 'OFFLINE'
    }, {
        label: '可发布',
        value: 20,
        key: 'PUBLISH'
    }],
    // 产品上下架状态
    upDownStatusOptions: [{
        label: '新建',
        value: '0',
        key: 'NEW'
    },
    {
        label: '上架中',
        value: '1',
        key: 'WAIT_UP'
    },
    {
        label: '已上架',
        value: '2',
        key: 'UP_ED'
    },
    {
        label: '上架失败',
        value: '3',
        key: 'UP_FAIL'
    },
    {
        label: '下架中',
        value: '4',
        key: 'WAIT_DOWN'
    },
    {
        label: '已下架',
        value: '5',
        key: 'DOWN_ED'
    },
    {
        label: '下架失败',
        value: '6',
        key: 'DOWN_FAIL'
    },
    {
        label: '删除中',
        value: '7',
        key: 'WAIT_DEL'
    },
    // {label: "已删除", value: "8", key: "DEL_ED"},
    {
        label: '删除失败',
        value: '9',
        key: 'DEL_FAIL'
    }
    ],
    hasSetOfflineDateOps: [{
        label: '有',
        value: true
    },
    {
        label: '无',
        value: false
    }
    ],
    // 产品状态
    productStatus: [{
        label: '新建',
        value: '0'
    },
    {
        label: '上架中',
        value: '1'
    },
    {
        label: '已上架',
        value: '2'
    },
    {
        label: '上架失败',
        value: '3'
    },
    {
        label: '下架中',
        value: '4'
    },
    {
        label: '已下架',
        value: '5'
    },
    {
        label: '下架失败',
        value: '6'
    }
    ],
    purchaseUnPackStatus: [{
        label: '未开始',
        value: 'NOT_START',
        enumValue: 0
    },
    {
        label: '已开始',
        value: 'STARTED',
        enumValue: 1
    }
    ],
    purchaseOrderedPlatform: [{
        label: '线下',
        value: 'OFFLINE',
        enumValue: 0
    },
    {
        label: '1688',
        value: 'ALI_1688',
        enumValue: 1
    }
    ],
    supplierPlatformStatus: [{
        label: '等待买家付款',
        value: 'waitbuyerpay',
        enumValue: 1
    },
    {
        label: '等待卖家发货',
        value: 'waitsellersend',
        enumValue: 2
    },
    {
        label: '等待买家收货',
        value: 'waitbuyerreceive',
        enumValue: 3
    },
    {
        label: '已收货',
        value: 'confirm_goods',
        enumValue: 4
    },
    {
        label: '交易成功',
        value: 'success',
        enumValue: 5
    },
    {
        label: '交易取消',
        value: 'cancel',
        enumValue: 6
    },
    {
        label: '交易终止',
        value: 'terminated',
        enumValue: 7
    }
    ],
    inStockLessGoodsDealMode: [{
        label: '损耗',
        value: 'WASTAGE',
        enumValue: 0
    },
    {
        label: '供应商退款',
        value: 'REFUND',
        enumValue: 1
    },
    {
        label: '供应商补货',
        value: 'REISSUE',
        enumValue: 2
    }
    ],
    unpackingStatusOptions: [{
        label: '未拆包',
        value: 'NO_UNPACK',
        enumValue: 1
    },
    {
        label: '部份拆包',
        value: 'PART_UNPACK',
        enumValue: 2
    },
    {
        label: '己拆包',
        value: 'COMPLETE_UNPACK',
        enumValue: 3
    }
    ],
    // 库存日志-操作
    inventoryLogOperateEnums: [{
        label: 'PDA采购入库',
        value: '操作PDA_PURCHASE_IN_INVENTORY',
        enumValue: 0
    },
    {
        label: '核重发货出库',
        value: 'VERIFY_DELIVERY_IN_INVENTORY',
        enumValue: 1
    },
    {
        label: 'PDA盘亏',
        value: 'PDA_MAKE_LOSS',
        enumValue: 2
    },
    {
        label: 'PDA盘盈',
        value: 'PDA_MAKE_WIN',
        enumValue: 3
    },
    {
        label: '单品/批量盘亏',
        value: 'SINGLE_OR_BATCH_MAKE_LOSS',
        enumValue: 4
    },
    {
        label: '单品/批量盘盈',
        value: 'SINGLE_OR_BATCH_MAKE_WIN',
        enumValue: 5
    },
    {
        label: '配货',
        value: 'DISTRIBUTION',
        enumValue: 6
    },
    {
        label: '核重发货、无效包裹',
        value: 'VERIFY_DELIVERY_INVALID_PACKAGE',
        enumValue: 7
    },
    {
        label: 'PDA库位转移',
        value: 'PDA_TRANSFER_INVENTORY',
        enumValue: 8
    },
    {
        label: '锁定',
        value: 'LOCK',
        enumValue: 9
    },
    {
        label: '解锁',
        value: 'UNLOCK',
        enumValue: 10
    },
    {
        label: '退件入库-申请还库',
        value: 'REFUND_IN_INVENTORY_APPLY_RETURN_INVENTORY',
        enumValue: 11
    },
    {
        label: 'PDA待还库',
        value: 'PDA_WAIT_RETURNED',
        enumValue: 12
    },
    {
        label: '仓库取消发货',
        value: 'PDA_RETURNED',
        enumValue: 13
    },
    {
        label: '重置订单',
        value: 'VIRTUAL_ORDER_RESET',
        enumValue: 14
    },
    {
        label: '搁置订单',
        value: 'VIRTUAL_ORDER_SHELVE',
        enumValue: 15
    },
    {
        label: '拣货失败',
        value: 'PICKING_FAILURE',
        enumValue: 16
    }
    ],
    // 库存日志-分类
    inventoryLogTypeEnums: [{
        label: '初始化库存',
        value: 'INIT_INVENTORY',
        enumValue: 0
    },
    {
        label: '采购入库',
        value: 'IN_INVENTORY',
        enumValue: 1
    },
    {
        label: '销售出库',
        value: 'DELIVERY',
        enumValue: 2
    },
    {
        label: '包裹生成',
        value: 'PACKAGE_GENERATE',
        enumValue: 3
    },
    {
        label: '待还库包裹回收',
        value: 'PACKAGE_RECOVERY',
        enumValue: 4
    },
    {
        label: '库存转入',
        value: 'SHIFT_IN',
        enumValue: 5
    },
    {
        label: '库存转出',
        value: 'SHIFT_OUT',
        enumValue: 6
    },
    {
        label: '包裹还库',
        value: 'RETURN_INVENTORY',
        enumValue: 7
    },
    {
        label: '退件入库',
        value: 'PACKAGE_REFUND',
        enumValue: 8
    },
    {
        label: '盘盈入库',
        value: 'INVENTORY_PROFIT',
        enumValue: 9
    },
    {
        label: '盘亏出库',
        value: 'INVENTORY_SHORTAGES',
        enumValue: 10
    },
    {
        label: '待还库',
        value: 'WAIT_RETURNED',
        enumValue: 11
    },
    {
        label: '拣货失败',
        value: 'PICKING_FAILED',
        enumValue: 12
    },
    {
        label: '订单重置',
        value: 'VIRTUAL_ORDER_RESET',
        enumValue: 13
    },
    {
        label: '订单搁置',
        value: 'VIRTUAL_ORDER_SHELVE',
        enumValue: 14
    },
    {
        label: '仓库取消发货',
        value: 'CANCEL_DELIVER',
        enumValue: 15
    },
    {
        label: '赠品入库',
        value: 'GIFT_IN_INVENTORY',
        enumValue: 16
    },
    {
        label: '配货成功',
        value: 'DISTRIBUTE_SUCCESS',
        enumValue: 17
    },
    {
        label: '无效包裹回收',
        value: 'INVALID_PACKAGE_RECYCLE',
        enumValue: 18
    },
    {
        label: '库位转移',
        value: 'TRANSFER_INVENTORY',
        enumValue: 19
    },
    {
        label: '锁定',
        value: 'LOCK',
        enumValue: 20
    },
    {
        label: '解锁',
        value: 'UNLOCK',
        enumValue: 21
    },
    {
        label: '申请还库成功',
        value: 'APPLY_RETURN_INVENTORY_SUCCESS',
        enumValue: 22
    },
    {
        label: '还库成功',
        value: 'RETURN_INVENTORY_SUCCESS',
        enumValue: 23
    }
    ],
    // 库存日志-修改内容
    inventoryLogUpdatedContentEnums: [{
        label: '可用数量',
        value: 'AVAILABLE_QUANTITY',
        enumValue: 0
    },
    {
        label: '货架位',
        value: 'LOCATION_CODE',
        enumValue: 1
    },
    {
        label: '预留数量',
        value: 'RESERVED_QUANTITY',
        enumValue: 2
    },
    {
        label: '待还库数量',
        value: 'WAIT_RETURN_QUANTITY',
        enumValue: 3
    },
    {
        label: '锁定状态',
        value: 'LOCK_STATUS',
        enumValue: 4
    }
    ],
    // 版型模板状态
    layoutTemplateStatus: [{
        label: '草稿',
        value: '0'
    },
    {
        label: '待审核',
        value: '1'
    },
    {
        label: '审核拒绝',
        value: '2'
    },
    {
        label: '审核通过',
        value: '3'
    }
    ],
    layoutTemplateType: [{
        label: '通用模板',
        value: 0
    },
    {
        label: '定制模板',
        value: 1
    }
    ],
    fabricType: [{
        label: '面料',
        value: 0,
        name: 'FABRIC'
    },
    {
        label: '辅料',
        value: 1,
        name: 'ACCESSORIES'
    },
    {
        label: '鞋底',
        value: 2,
        name: 'SOLE'
    }
    ],
    companyBody: [{
        label: 'GLOBAL',
        value: 1,
        val: 'GLOBAL',
        type: 'old'
    },
    {
        label: 'TECHNOLOGY',
        value: 2,
        val: 'TECHNOLOGY',
        type: 'old'
    },
    {
        label: 'Global Holding',
        value: 3,
        val: 'GLOBAL_HOLDING'
    },
    {
        label: 'Pioneer ECOM',
        value: 4,
        val: 'PIONEER_ECOM'
    },
    {
        label: 'Global Online',
        value: 5,
        val: 'GLOBAL_ONLINE'
    }
    ],
    siteType: [{
        label: '品牌站',
        value: 'BRAND_STATION'
        // value: 1
    },
    {
        label: '大站',
        value: 'LONG_TERM_STATION'
        // value: 2
    },
    {
        label: '站群',
        value: 'STATION_GROUP'
        // value: 3
    },
    {
        label: '亚马逊',
        value: 'AMAZON'
        // value: 4
    },
    {
        label: 'APP',
        value: 'APP'
        // value: 5

    }
    ],
    similarityList: [
        {
            label: 'S',
            value: 'S'
        },
        {
            label: 'A',
            value: 'A'
        },
        {
            label: 'B',
            value: 'B'
        },
        {
            label: 'C',
            value: 'C'
        },
        {
            label: 'D',
            value: 'D'
        }
    ],
    sizeConfigStatus: [{
        label: '禁用',
        value: false
    }, {
        label: '启用',
        value: true
    }],
    offlineType: [{ // 停售类型
        label: '停售',
        value: 1
    }, {
        label: '停售清仓',
        value: 2
    }],
    offlineReason: [{ // 停售原因
        label: '侵权',
        value: 1
    }, {
        label: '测试失败',
        value: 2
    }, {
        label: '重复spu',
        value: 3
    }, {
        label: '换产品池',
        value: 4
    }, {
        label: '无货源',
        value: 5
    }, {
        label: '信息录入错误',
        value: 6
    }, {
        label: '僵尸spu',
        value: 7
    }, {
        label: '亚马逊品下架',
        value: 8
    }],
    logisticsStatusList: [
        { label: '已预报', value: 101, isShow: false },
        { label: '出库交接', value: 103, isShow: true },
        { label: '物流已收货', value: 200, isShow: true },
        { label: '离开始发国', value: 202, isShow: true },
        { label: '到达目的国', value: 203, isShow: true },
        { label: '末端提取', value: 204, isShow: true },
        { label: '运输途中', value: 205, isShow: true },
        { label: '妥投', value: 206, isShow: true },
        { label: '退货', value: 207, isShow: false }
    ],
    logisticSourceList: [
        { label: '成都ERP', value: 1 },
        { label: '深圳ERP', value: 2 }
    ],
    // 采购单状态
    purchaseOrderStatus: [
        {
            label: '已下单',
            value: 'ORDERED',
            enum: 0
        },
        {
            label: '待审核',
            value: 'NOT_AUDITED',
            enum: 1
        },
        {
            label: '审核拒绝',
            value: 'AUDIT_REFUSED',
            enum: 2
        },
        {
            label: '已确认',
            value: 'CONFIRMED',
            enum: 3
        },
        {
            label: '待收货',
            value: 'WAITING_FOR_RECEIVING',
            enum: 4
        },
        {
            label: '已收货',
            value: 'RECEIPTED',
            enum: 5
        },
        {
            label: '已完成',
            value: 'COMPLETED',
            enum: 6
        },
        {
            label: '已核销',
            value: 'CONSUMED',
            enum: 7
        },
        {
            label: '已取消',
            value: 'CANCELED',
            enum: 8
        }
    ]

}
/* 枚举相关键 */

let keys = {
    optionKeys: {
        LABEL: 'label',
        VALUE: 'value',
        ENUM_VALUE: 'enumValue'
    },
    // 订单状态枚举键
    orderStatus: {
        ORDERED: 'ORDERED',
        APPROVED: 'APPROVED',
        GETTED: 'GETTED',
        DISTRIBUTED: 'DISTRIBUTED',
        PICKING: 'PICKING',
        PACKAGE: 'PACKAGE',
        DELIVERED: 'DELIVERED',
        PICKUP: 'PICKUP',
        SHELVE: 'SHELVE',
        STOP: 'STOP',
        REJECTED: 'REJECTED'
    },
    // 订单异常状态枚举键
    orderExceptionStatus: {
        // SKU匹配失败
        SKU_MATCHED_FAIL: 'SKU_MATCHED_FAIL',
        // 需人工审核
        ORDER_RULE_FAIL: 'ORDER_RULE_FAIL',
        // 物流分配失败
        LOGISTICS_RULE_FAIL: 'LOGISTICS_RULE_FAIL',
        // 运费计算失败
        CALC_SHIPPING_FEE_FAIL: 'CALC_SHIPPING_FEE_FAIL',
        // 预估利润过低
        ESTIMATE_PROFIT: 'ESTIMATE_PROFIT',
        // 获取跟踪单号失败
        FETCH_TRACKING_NUMBER_FAIL: 'FETCH_TRACKING_NUMBER_FAIL',
        // 已发货异常
        PACKAGE_DELIVERED: 'PACKAGE_DELIVERED',
        // 仓库取消发货
        WAREHOURSE_CANCEL_DELIVERY: 'WAREHOURSE_CANCEL_DELIVERY',
        // 包裹退件
        PACKAGE_REJECT: 'PACKAGE_REJECT',
        // 仓库分配失败
        WAREHOUSE_RULE_FAIL: 'WAREHOUSE_RULE_FAIL',
        // 黑名单匹配
        ORDER_BLACKLIST_MATCHED: 'ORDER_BLACKLIST_MATCHED',
        // 重置进行中
        ORDER_RESET: 'ORDER_RESET',
        // 搁置进行中
        ORDER_SHELVE: 'ORDER_SHELVE '
    },
    // 订单平台枚举键
    orderPlatform: {
        SHOPIFY: 'SHOPIFY',
        COD: 'COD',
        COCOGENIE: 'COCOGENIE',
        MANUAL: 'MANUAL'
    },
    // 订单合并状态枚举键
    orderSplitOrUnion: {
        UNION: 'UNION',
        SPLIT: 'SPLIT'
    },
    // 订单中间状态枚举键
    orderStopType: {
        LOCK: 'LOCK',
        VOID: 'VOID',
        LOCKING: 'LOCKING',
        VOIDING: 'VOIDING',
        RESETING: 'RESETING',
        GETTING: 'GETTING'
    },
    // 库存操作类型枚举键
    stockOptType: {
        IN_INVENTORY: 'IN_INVENTORY',
        DELIVERY: 'DELIVERY',
        PACKAGE_REFUND: 'PACKAGE_REFUND',
        INVENTORY_PROFIT: 'INVENTORY_PROFIT',
        INVENTORY_SHORTAGES: 'INVENTORY_SHORTAGES',
        GIFT_IN_INVENTORY: 'GIFT_IN_INVENTORY',
        INVENTORY_TRANSFER: 'INVENTORY_TRANSFER',
        SAMPLE_IN: 'SAMPLE_IN',
        SAMPLE_OUT: 'SAMPLE_OUT',
        ALLOT_IN: 'ALLOT_IN',
        ALLOT_OUT: 'ALLOT_OUT'
    },
    // 出入库枚举键
    stockOutInEnums: {
        OUTBOUND: 'OUTBOUND',
        INBOUND: 'INBOUND'
    },
    // 包裹状态枚举键
    packageStatus: {
        DISTRIBUTED: 'DISTRIBUTED',
        PICKING: 'PICKING',
        PRINTED: 'PRINTED',
        PENDING_WAREHOUSE: 'PENDING_WAREHOUSE',
        DELIVERED: 'DELIVERED',
        RECALLED: 'RECALLED',
        WAITING_FOR_DISTRIBUTION: 'WAITING_FOR_DISTRIBUTION',
        FORCE_RETURN_INVENTORY: 'FORCE_RETURN_INVENTORY'
    },
    // 包裹拣货类型枚举键
    packagePickType: {
        ONE2ONE: 'ONE2ONE',
        ONE2MANY: 'ONE2MANY',
        MANY2MANY: 'MANY2MANY',
        BIG: 'BIG',
        SPECIAL: 'SPECIAL',
        FIXED: 'FIXED'
    },
    // 采购平台
    purchasePlatform: {
        ALI_1688: 'ALI_1688',
        OFFLINE: 'OFFLINE',
        JD: 'JD',
        TAOBAO: 'TAOBAO',
        TMALL: 'TMALL',
        PINDUODUO: 'PINDUODUO'
    },
    // 采购方式
    purchaseMode: {
        ALI_1688: 'ALI_1688',
        OFFLINE: 'OFFLINE',
        JD: 'JD',
        TAOBAO: 'TAOBAO',
        TMALL: 'TMALL',
        PINDUODUO: 'PINDUODUO'
    },
    // 采购结算方式
    purchaseClearingMode: {
        NET: 'NET',
        COD: 'COD',
        WEEK: 'WEEK',
        HALF_MONTH: 'HALF_MONTH',
        valMONTHue: 'MONTH',
        PREPAID: 'PREPAID',
        ALI: 'ALI',
        PAY_AS_YOU_GO: 'PAY_AS_YOU_GO'
    },
    // 授信等级
    creditGrade: {
        LOW: 'LOW',
        MIDDLE: 'MIDDLE',
        HIGH: 'HIGH',
        BLACK: 'BLACK'
    },
    // 供应商设置节点
    supplierSettingMode: {
        PRESALE_CREDIT_GRADE: 'PRESALE_CREDIT_GRADE'
    },
    purchaseUnPackStatus: {
        NOT_START: 'NOT_START',
        STARTED: 'STARTED'
    },
    offlineType: { // 停售类型
        STOP_SALE: '停售',
        STOP_CLEAR_SALE: '停售清仓'
    },
    offlineReason: { // 停售原因
        INFRINGEMENT: '侵权',
        TEST_FAILED: '测试失败',
        REPEAT_SPU: '重复spu',
        CHANGE_PRODUCT_POOL: '换产品池',
        NO_SUPPLY: '无货源',
        INFORMATION_INPUT_ERROR: '信息录入错误',
        INACTIVE_SPU: '僵尸spu',
        AMAZON_PRODUCTS_REMOVED: '亚马逊品下架'
    }
}

let numKeys = {
    platform: options.purchasePlatform.reduce(function (acc, currentValue) {
        acc[currentValue.enumValue] = currentValue.label
        return acc
    }, {}),
    purchaseType: options.purchaseMode.reduce(function (acc, currentValue) {
        acc[currentValue.enumValue] = currentValue.label
        return acc
    }, {}),
    // 结算方式
    purchaseClearingMode: options.purchaseClearingMode.reduce(function (acc, currentValue) {
        acc[currentValue.enumValue] = currentValue.label
        return acc
    }, {}),
    purchaseUnPackStatus: options.purchaseUnPackStatus.reduce(function (acc, currentValue) {
        acc[currentValue.enumValue] = currentValue.label
        return acc
    }, {})
}

let defaultValues = {
    minPrice: 0,
    maxPrice: 99999,
    minQuantity: 0,
    maxQuantity: 9999
}

let sortOptOfIntercept = [{
    label: '拦截时间',
    value: 'interceptTime',
    checked: true
},
{
    label: '通知物流商时间',
    value: 'interceptNotifyLogisticsTime',
    checked: false
},
{
    label: '拦截处理时间',
    value: 'interceptHandleTime',
    checked: false
},
{
    label: '下单时间',
    value: 'platformCreatedAt',
    checked: false
},
{
    label: '发货时间',
    value: 'deliveredAt',
    checked: false
},
{
    label: '获取跟踪号时间',
    value: 'fetchTrackingNumberAt',
    checked: false
}
]

export function GetItemByValue(options, value) {
    const item = options.find(m => m[keys.optionKeys.VALUE] === value)
    return item ? item : null
}
export function GetItemByEnumValue(options, value) {
    const item = options.find(m => m[keys.optionKeys.ENUM_VALUE] === value)
    return item ? item : null
}

export default {
    common,
    options,
    keys,
    numKeys,
    defaultValues,
    order: {
        sortOptOfIntercept
    }
}
