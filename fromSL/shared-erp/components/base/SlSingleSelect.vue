<template>
  <div class="sl-single-select">
    <el-select
      v-model="value"
      :placeholder="label"
      clearable
      @change="selectChange"
      style="width:100%"
    >
      <el-option
        v-for="(selectItem,index) in selfOptions"
        :key="'option_'+index"
        :label="selectItem.label"
        :value="selectItem.value"
      ></el-option>
    </el-select>
  </div>
</template>
<script>
import { get } from '@shared/http'

export default {
  name: 'SlSingleSelect',
  model: {
    prop: 'modelVal',
    event: 'valChange'
  },
  props: {
    modelVal: {
      type: [String, Number, Boolean],
      required: true,
      default: null
    },
    remoteUrl: {
      type: String,
      default: null
    },
    reqParams: {
      type: Object,
      default: () => ({})
    },
    options: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: '请选择'
    }
  },
  data () {
    return {
      value: null,
      selfOptions: []
    }
  },
  watch: {
    remoteUrl: {
      handler: function (val, oldVal) {
        if (val) {
          get(val, this.reqParams ? this.reqParams : {}).then(res => {
            this.selfOptions = res.data || []
          })
        }
      },
      immediate: true
    },
    modelVal: {
      handler: function (newVal) {
        this.value = newVal
      },
      immediate: true
    },
    options: {
      handler: function (val, oldVal) {
        if (Array.isArray(val)) {
          this.selfOptions = val
        }
      },
      immediate: true
    }
  },
  methods: {
    selectChange () {
      this.$emit('valChange', this.value)
    },
    reset () {
      this.value = null
      this.selfOptions = []
    }
  },
  mounted () {

  }
}
</script>
<style lang="scss">
</style>
