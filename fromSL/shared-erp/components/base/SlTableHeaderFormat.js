export default {
  name: 'SlTableHeaderFormat',
  functional: true,
  props: {
    render: Function,
    column: {
      type: Object,
      default: null
    }
  },
  render: (h, ctx) => {
    return ctx.props.render(h, ctx.props.column)
  }
}
