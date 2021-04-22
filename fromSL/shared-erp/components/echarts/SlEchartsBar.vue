<template>
  <div ref="barChart" class="echarts-bar" :style="{height}">
    <sl-chart :options="barOption" :autoresize="true"></sl-chart>
  </div>
</template>

<script>
// import { merge } from '@shared/util'
import { merge } from 'lodash'
import { BASE_OPTION } from './baseOption'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'

export default {
  name: 'SlEchartsBar',
  data () {
    return {
      defaultOption: {}, // 柱状图基础配置
      barOption: {}
    }
  },
  props: {
    options: null,
    height: {
      type: String,
      default: '200px'
    }
  },
  watch: {
    options: function (newValue) {
      this.barOption = merge({}, BASE_OPTION, this.defaultOption, this.options)
    }
  },
  mounted () {
    this.barOption = merge({}, BASE_OPTION, this.defaultOption, this.options)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
