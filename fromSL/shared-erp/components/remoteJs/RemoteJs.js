export default {
  name: 'RemoteJs',
  functional: true,
  render (createElement, context) {
    let { props } = context
    return createElement('script', { attrs: { type: 'text/javascript', src: props.src } })
  },
  props: {
    src: { type: String, required: true }
  }
}
