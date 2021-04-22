<template>
  <div class="sl-content-title" :class="{'column-icon':columnIcon}">
    <span class="content-title-text" :style="{fontSize,color,...textStyle}">{{text}}</span>
    <hr v-if="line" class="content-title-line" :style="lineStyle" />
  </div>
</template>

<script>
export default {
  name: 'SlContentTitle',
  props: {
    text: {
      type: String,
      default: ''
    },
    line: {
      type: Boolean,
      default: true
    },
    fontSize: {
      type: String,
      default: '1.25em'
    },
    color: {
      type: String,
      default: '#999'
    },
    lineStyle: {
      type: Object,
      default: () => ({
        borderColor: '#ddd',
        opacity: '0.2'
      })
    },
    textStyle: {
      type: Object,
      default: () => ({})
    },
    columnIcon: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    }
  },
  computed: {

  },
  methods: {
  },
  mounted: function () {

  }
}
</script>

<style scoped lang="scss">
@import '@assets/scss/_var.scss';
.sl-content-title {
  position: relative;
  margin-bottom: 1em;
  &.column-icon::before {
    content: '';
    position: absolute;
    left: -8px;
    top: -1px;
    width: 3px;
    height: 100%;
    background: #409eff;
  }
  .content-title-text {
    position: relative;
    display: inline-block;
    padding-right: 1em;
    color: $color-gray;
    background-color: $color-white;
    z-index: 2;
  }

  .content-title-line {
    position: absolute;
    top: 50%;
    width: 100%;
    margin: 0;
    transform: translateY(-50%);
  }
}
</style>
