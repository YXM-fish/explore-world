/**
 * 产品
 */
export const PRODUCT = {
    /**
     * 所有的货源类型。
     * 目前在使用的地方：
     * - 商品列表(shopify & harborSIngle & shoplazza)
     */
    allSourceType: [
        {
            value: 'PRESALE',
            label: '预售',
            code: 0
        },
        {
            value: 'GOODS_IN_STOCK_OFFLINE',
            label: '线上现货',
            code: 1
        },
        {
            value: 'SUPPLIER_PUSH',
            label: '供应商推品',
            code: 2
        },
        {
            value: 'SELF_DEVELOPMENT',
            label: '自主开发',
            code: 3
        }
    ],
    /**
     * 货源状态配置
     * */
    sourceTypeStatus: [
        {
            value: 'NO_EDITION_CLOTHES_NO_INVENTORY',
            label: '无版无货',
            colorNumber: 'rgba(245,108,108,1)',
            borderColorNumber: 'rgba(253,226,226,1)',
            backgroundColorNumber: 'rgba(254,240,240,1)',
            code: 0
        },
        {
            value: 'HAVE_EDITION_CLOTHES_NO_INVENTORY',
            label: '有版无货',
            colorNumber: 'rgba(230,162,60,1)',
            borderColorNumber: 'rgba(250,236,216,1)',
            backgroundColorNumber: 'rgba(253,246,236,1)',
            code: 1
        },
        {
            value: 'HAVE_EDITION_CLOTHES_HAVE_INVENTORY',
            label: '有版有货',
            colorNumber: 'rgba(103,194,58,1)',
            borderColorNumber: 'rgba(225,243,216,1)',
            backgroundColorNumber: 'rgba(240,249,235,1)',
            code: 2
        }
    ],
    /**
     * 货源发布状态
     */
    publishStatus: [
        {
            code: 20,
            value: 'PUBLISH',
            label: '可发布'
        },
        {
            code: 5,
            value: 'DEVELOPMENT_PENDING',
            label: '待开发'
        },
        {
            code: 10,
            value: 'OFFLINE',
            label: '已停售'
        }

    ],
    /**
     * 产品复杂度配置
     */
    publishComplex: [
        {
            value: 'ORDINARY_SECTION',
            label: '基本款',
            code: 0,
            colorNumber: 'rgba(233, 30, 99, 0.64)'
        },
        {
            value: 'COMPLEX_SECTION',
            label: '复杂款',
            code: 1,
            colorNumber: 'rgb(0, 177, 124, 0.64)'
        }
    ],
    /**
     * 定制化的货源类型配置，目前在使用的地方：
     * - 开发列表
     * - 审核列表
     *  */
    auditAndDevSourceTypeOps: [
        {
            value: 'PRESALE',
            label: '预售'
        },
        {
            value: 'SELF_DEVELOPMENT',
            label: '自主开发'
        }
    ],
    /**
     * 预售状态
     */
    preSaleStatus: [
        {
            label: '全部',
            code: -1
        },
        {
            label: '测试中',
            code: 0
        },
        {
            label: '供应商开发中',
            code: 1
        },
        {
            label: '跟进中',
            code: 2
        },
        {
            label: '已完成',
            code: 3
        },
        {
            label: '已下单',
            code: 5
        },
        {
            label: '已作废',
            code: 4
        }
    ],
    /**
     * 侵权标签
     */
    infringeReasonOpts: [
        {
            code: 3,
            label: '欧美高风险',
            value: 'OCCIDENT_HIGH_RISK'
        },
        {
            code: 2,
            label: '欧美中风险',
            value: 'OCCIDENT_MEDIUM_RISK'
        },
        {
            code: 1,
            label: '欧美低风险',
            value: 'OCCIDENT_LOW_RISK'
        },
        {
            code: 0,
            label: '欧美无风险',
            value: 'OCCIDENT_NO_RISK'
        },
        {
            code: 7,
            label: '中东高风险',
            value: 'MIDDLE_EAST_HIGH_RISK'
        },
        {
            code: 6,
            label: '中东中风险',
            value: 'MIDDLE_EAST_MEDIUM_RISK'
        },
        {
            code: 5,
            label: '中东低风险',
            value: 'MIDDLE_EAST_LOW_RISK'
        },
        {
            code: 4,
            label: '中东无风险',
            value: 'MIDDLE_EAST_NO_RISK'
        }
    ],
    /**
     * 批量停售处理状态
     */
    stopSalesStatus: [
        {
            value: 'PROCESSING',
            label: '待导入',
            code: 1
        },
        {
            value: 'SUCCESS',
            label: '导入成功',
            code: 2
        },
        {
            value: 'FAILURE',
            label: '导入失败',
            code: 3
        }
    ],
    /**
     * 停售类型
     */
    offlineReasonOps: [
        {
            value: 'INFRINGEMENT',
            label: '侵权',
            code: 1
        },
        {
            value: 'TEST_FAILED',
            label: '测试失败',
            code: 2
        },
        {
            value: 'REPEAT_SPU',
            label: '重复spu',
            code: 3
        },
        {
            value: 'CHANGE_PRODUCT_POOL',
            label: '换产品池',
            code: 4
        },
        {
            value: 'NO_SUPPLY',
            label: '无货源',
            code: 5
        },
        {
            value: 'INFORMATION_INPUT_ERROR',
            label: '信息录入错误',
            code: 6
        },
        {
            value: 'INACTIVE_SPU',
            label: '僵尸spu',
            code: 7
        },
        {
            value: 'AMAZON_PRODUCTS_REMOVED',
            label: '亚马逊品下架',
            code: 8
        }
    ]
}
