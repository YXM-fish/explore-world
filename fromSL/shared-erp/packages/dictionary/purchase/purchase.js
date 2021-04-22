/**
 * 采购模块新的入口
 */
export default {
    // 回传状态
    BackHaulStatusEnum: [
        {
            value: 'NO_BACK_HAUL',
            label: '未回传',
            code: 0
        },
        {
            value: 'SUCCESS_BACK_HAUL',
            label: '回传成功',
            code: 1
        },
        {
            value: 'FAIL_BACK_HAUL',
            label: '回传失败',
            code: 2
        }
    ],
    // 采购单上推送状态
    PushStatusEnum: [
        {
            value: 'NO_PUSH',
            label: '未推送',
            code: 0
        },
        {
            value: 'PUSHING',
            label: '推送中',
            code: 1
        },
        {
            value: 'SUCCESS_PUSH',
            label: '推送成功',
            code: 2
        },
        {
            value: 'FAIL_PUSH',
            label: '推送失败',
            code: 3
        }
    ],
    // 采购单上供应商来源
    SourceEnum: [
        {
            value: 'ERP',
            label: 'ERP系统',
            code: 0
        },
        {
            value: 'SRM',
            label: '供应商平台注册',
            code: 1
        }
    ]
}
