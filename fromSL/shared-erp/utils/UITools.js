/**
 * 消息提示
 * @param {*} context this上下文
 * @param {*} type 消息类型 可选值：info、success、warning、error
 * @param {*} msg 消息内容
 */
export function messageTip(context, type, msg) {
    setTimeout(() => {
        context.$message({
            message: msg,
            type: type,
            duration: 4500
        })
    }, 0)
}

/**
 * 消息通知
 * @param {*} context this上下文
 * @param {*} type 消息类型 可选值：info、success、warning、error
 * @param {*} msg 消息内容
 */
export function notifyTip(context, type, msg) {
    context.$notify({
        title: '通知',
        message: msg,
        type: type,
        duration: 4500
    })
}

/**
 * 消息弹出框
 * @param {*} context this上下文
 * @param {*} type 消息类型 可选值：info、success、warning、error
 * @param {*} msg 消息内容
 */
export function alertDialog(context, type, msg, callback, config) {
    context.$alert(
        `<div style="font-size:32px;padding:20px 20px 20px 20px;line-height:1.2">${msg}</div>`,
        Object.assign({
            type: type,
            customClass: 'alertDialog',
            dangerouslyUseHTMLString: true,
            confirmButtonText: '关闭',
            showClose: false,
            closeOnClickModal: false,
            closeOnPressEscape: false,
            lockScroll: false,
            closeOnHashChange: false,
            callback: (action, instance) => {
                action === 'confirm' && callback && setTimeout(() => {
                    callback && callback(action, instance)
                }, 200)
            }
        }, config || {})
    )
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            $('.alertDialog').find('.el-button').trigger('blur')
            resolve()
        }, 0)
    })
}

/**
 * 消息弹出框指定时间关闭（无按钮）
 * @param {*} context this上下文
 * @param {*} type 消息类型 可选值：info、success、warning、error
 * @param {*} msg 消息内容
 */
export function alertDialogAutoClose(context, type, msg, duration = 2000, config) {
    context.$alert(
        `<div style="font-size:32px;padding:10px 20px 20px 20px;line-height:1.2">${msg}</div>`,
        Object.assign({
            customClass: 'autoCloseAlertDialog',
            type: type,
            dangerouslyUseHTMLString: true,
            showConfirmButton: false,
            showClose: false,
            closeOnClickModal: false,
            closeOnPressEscape: false,
            closeOnHashChange: false
        }, config || {})
    )

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            $('.autoCloseAlertDialog').find('.el-button').trigger('click')
            resolve()
        }, duration)
    })
}
