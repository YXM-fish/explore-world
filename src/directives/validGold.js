export default {
    bind(el, binding) {
        const validate = {
            init: function(param) {
                this.setInteger(param)
            },
            setInteger: function(param) {
                const input$ = el.getElementsByTagName('input')[0]
                const funChange = () => {
                    input$.value = numChange(input$.value)
                    param.obj[param.key] = input$.value
                }
                const funBlur = () => {
                    input$.value = numBlur(input$.value, param.includeZero)
                    param.obj[param.key] = input$.value
                }
                validate.addEvent(input$, ['input'], funChange)
                validate.addEvent(input$, ['change'], funBlur)
            },
            addEvent(el, eventName, eventFn) {
                eventName.forEach(name => {
                    el.addEventListener(eventName, eventFn)
                })
            }
        }
        validate.init(binding.value)
    }
}

function numChange(v) {
    let newValue = v.toString()
    newValue = v
        .replace(/[^\d.]/g, '')
        .replace(/\.{2,}/g, '.')
        .replace('.', '$#$')
        .replace(/\./g, '')
        .replace('$#$', '.')
        .replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
    if (
        newValue.length > 1 &&
        newValue.indexOf('.') !== 1 &&
        newValue.indexOf('0') === 0
    ) {
        newValue = newValue.toString().substring(1)
    }
    return newValue
}
function numBlur(v, includeZero) {
    let nv = v.replace(/\.$/, '')
    if (!includeZero) {
        return nv
    } else {
        if (nv.indexOf('.') === -1) {
            return nv + '.00'
        } else {
            return nv.split('.')[1].length === 1 ? nv + '0' : nv
        }
    }
}
