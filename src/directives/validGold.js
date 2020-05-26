export default {
    inserted: function(el, binding) {
        let input = el.querySelector('input')
        input.addEventListener('input', (e) => {
            e.target.value = numChange(e.target.value)
        })
        input.addEventListener('change', (e) => {
            e.target.value = numBlur(e.target.value)
        })
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
function numBlur(v) {
    return Number(v.replace(/\.$/, ''))
}
