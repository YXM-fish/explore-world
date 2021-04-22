const focus = {}
focus.install = Vue => {
    Vue.directive('focus', {
        inserted: function(el, { value }, { context }) {
            if (value) {
                el.children.length === 1 ? el.children[0].focus() : el.focus()
            }
        }
    })
}
export default focus
