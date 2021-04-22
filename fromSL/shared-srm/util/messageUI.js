import { Message, Notification } from 'element-ui'

/**
* 确认弹窗
* @param {Object} context this上下文
* @param {String} msg 消息内容
* @param {String} title 标题
* @param {String} 类型 info、success、warning、error
*/
export function confirmBox (context, msg, title = '提示', type = 'warning') {
  return context.$confirm(msg, title, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    dangerouslyUseHTMLString: true,
    type
  })
}

export function successNotify (context, msg, useHtml = false, duration = 4500) {
  let notify = context ? context['$notify'] : Notification
  notify({
    title: '成功',
    message: msg,
    type: 'success',
    dangerouslyUseHTMLString: useHtml,
    duration
  })
}

export function errorNotify (context, msg, useHtml = false, duration = 4500, title = '系统提示') {
  let notify = context ? context['$notify'] : Notification
  notify({
    title: title,
    message: msg,
    type: 'error',
    dangerouslyUseHTMLString: useHtml,
    duration
  })
}

export function errorMessageTip (msg, context) {
  let message = context ? context['$message'] : Message
  message({
    showClose: true,
    message: msg,
    type: 'error',
    duration: 4500
  })
  return Promise.resolve(true)
}
