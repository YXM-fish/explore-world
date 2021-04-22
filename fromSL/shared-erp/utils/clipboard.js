import Vue from 'vue'
import Clipboard from 'clipboard'

function clipboardSuccess() {
  Vue.prototype.$message({
    message: 'Copy successfully',
    type: 'success',
    duration: 1500
  })
}

function clipboardError() {
  Vue.prototype.$message({
    message: 'Copy failed',
    type: 'error'
  })
}

export default function handleClipboard(text, event) {
  const clipboard = new Clipboard(event.target, {
    text: () => text
  })
  clipboard.on('success', () => {
    clipboardSuccess()
    clipboard.off('error')
    clipboard.off('success')
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    clipboardError()
    clipboard.off('error')
    clipboard.off('success')
    clipboard.destroy()
  })
  clipboard.onClick(event)
}

export function createClip(stop, content) {
    let node = document.createElement('button')
    node.setAttribute('data-clipboard-text', content)
    node.setAttribute('id', 'slCustomeClip')
    node.innerText = 'clip'
    node.style.display = 'none'
    document.body.appendChild(node)
    let clipboard = new Clipboard('#slCustomeClip')
    clipboard.on('success', function(e) {
        Vue.prototype.$message({
            type: 'success',
            message: '复制成功',
            duration: 1000
        })
        clipboard.destroy()
    })
    node.click()
    document.body.removeChild(node)
    stop()
}
