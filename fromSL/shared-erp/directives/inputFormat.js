const inputFormat = {}
inputFormat.install = Vue => {
    Vue.directive('slInputFormat', {
        bind(el, binding) {
            let params = binding.value
            const inputEle = el.getElementsByTagName('input')[0]
            if (inputEle) {
                inputEle.addEventListener('input', (event) => {
                    let val = event.target.value
                    const matchReg = new RegExp(params.matchReg) || /^[A-Za-z0-9_-]+$/
                    let replaceReg
                    let result

                    if (!matchReg.test(val)) {
                        replaceReg = new RegExp(params.replaceReg, 'g')
                        result = val.replace(replaceReg, '')
                        event.target.value = result ? result : ''
                        if (val !== result) {
                            inputEle.dispatchEvent(new Event('compositionend'))
                            inputEle.dispatchEvent(new Event('input'))
                        }
                    }
                })
            }
        }
    })
}

export default inputFormat
