<template>
  <div class="sl-panel">
    <slot name="title">
      <div class="sl-panel-title">
        <i
          class="el-icon-arrow-down"
          :class="{'rotate-180':panelStatus === 'close'}"
          @click="toggle"
        ></i>
        <span>{{title}}</span>
      </div>
    </slot>
    <div v-if="$slots.default" class="sl-panel-content" :class="{'close':panelStatus === 'close'}">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SlPanel',
  props: {
    status: {
      type: String,
      default: 'open'
    },
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      panelStatus: ''
    }
  },
  watch: {
    status: {
      handler: function (val, oldVal) {
        if (oldVal !== val) {
          this.panelStatus = val
        }
      },
      immediate: true
    }
  },
  mounted () {

  },
  methods: {
    toggle () {
      this.panelStatus = this.panelStatus === 'open' ? 'close' : 'open'
      this.$emit('update:status', this.panelStatus)
    }
  }
}
</script>
<style lang="scss">
$theme-main: #f2f3f5;

.sl-panel {
  margin-bottom: 2rem;
  border: 1px solid $theme-main;
}

.sl-panel-title {
  padding: 0 1em;
  line-height: 4rem;
  background-color: $theme-main;
  i {
    margin-right: 1rem;
    &.rotate-180 {
      transform: rotate(0.5turn);
    }
    cursor: pointer;
    transition: all 0.15s linear;
  }
}

.sl-panel-content {
  padding: 1em;
  height: auto;
  overflow: hidden;
  transition: all 0.15s linear;
  &.close {
    padding: 0;
    height: 0;
  }
}
</style>
