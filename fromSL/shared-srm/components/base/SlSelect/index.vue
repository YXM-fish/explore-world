<template>
  <div class="stl-big-data-select" v-clickoutside="handleBlur">
    <div
      class="selected-tags"
      @click="toggleShow"
      :class="{'active': showDropdown, 'disabled': disabled}"
    >
      <span
        v-if="(!selectedItem || !selectedItem.length) && !keyName"
        class="placeholder"
      >{{placeholder}}</span>
      <span v-for="item in selectedItem" :key="item[value]" :class="{'multiple': multiple}">
        {{item[label]}}
        <i
          @click.stop="delItem(item[value])"
          v-if="!curDefaultValues.includes(item[value]) && multiple && !disabled"
        ></i>
      </span>
      <input
        v-if="filterable && !disabled"
        @input="handlerFilter"
        ref="selectInput"
        class="sl-select-input"
        v-model="keyName"
      />

      <div
        class="clear-panel"
        @mouseover="showClear = clearable && selectValues.length ? true : false"
        @mouseout="showClear = false"
      >
        <i class="el-icon-circle-close" v-show="showClear" @click="handleClear"></i>
        <i :class="[showDropdown ? 'arrow-up': '', 'el-icon-arrow-down']" v-show="!showClear"></i>
      </div>
    </div>

    <ul class="select-dropdown" v-if="showDropdown">
      <RecycleScroller
        :items="curOptions"
        :item-size="30"
        :key-field="value"
        v-slot="{ item, index }"
        :style="{maxHeight: `${maxHeight}px`}"
        v-if="curOptions.length && showVirtual"
      >
        <slot :item="item" :index="index">
          <SlOption :item="item"></SlOption>
        </slot>
      </RecycleScroller>
      <div class="no-data" v-else>{{emptyText}}</div>
    </ul>
  </div>
</template>

<script>
import { RecycleScroller } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import Clickoutside from './clickoutside'
export default {
  name: 'SlSelect',
  components: {
    RecycleScroller
  },
  provide () {
    return {
      select: this
    }
  },
  data () {
    return {
      showDropdown: false,
      selectedItem: [],
      keyName: '',
      showVirtual: true,
      showClear: false
    }
  },
  directives: { Clickoutside },
  model: {
    prop: 'modelVal',
    event: 'valChange'
  },
  props: {
    label: {
      type: String,
      default: 'label'
    },
    value: {
      type: String,
      default: 'value'
    },
    options: {
      type: Array,
      default: () => []
    },
    // 面板最大高度
    maxHeight: {
      type: [Number, String],
      default: 300
    },
    // 是否多选
    multiple: {
      type: Boolean,
      default: false
    },
    // 是否开启筛选
    filterable: {
      type: Boolean,
      default: false
    },
    modelVal: {
      type: [String, Array, Number],
      required: true
    },
    // 默认值-默认值不可删除
    defaultValues: {
      type: Array,
      default: () => []
    },
    // 是否禁用已选中项目
    disableSelected: {
      type: Boolean,
      default: false
    },
    // 是否开启一键清空
    clearable: {
      type: Boolean,
      default: false
    },
    // 空数据字段
    emptyText: {
      type: String,
      default: '无匹配数据'
    },
    // 绑定的值为对象
    isObj: {
      type: Boolean,
      default: false
    },
    // 是否禁用下拉
    disabled: {
      type: Boolean,
      default: false
    },
    filterFn: {
      type: Function,
      default: null
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    showRight: {
      type: Boolean,
      default: false
    },
    rightItem: {
      type: String,
      default: 'channelType'
    }
  },
  methods: {
    // 展开/收回drowdown
    toggleShow () {
      if (this.disabled) return
      this.showDropdown = !this.showDropdown
      if (!this.$refs['selectInput']) return
      this.showDropdown
        ? this.$refs['selectInput'].focus()
        : this.$refs['selectInput'].blur()
    },
    // 失焦
    handleBlur () {
      this.showDropdown = false
      this.keyName = ''
    },
    // 点击某一项
    itemClick (item) {
      if (
        item.disabled ||
        this.curDefaultValues.includes(item[this.value]) ||
        (this.disableSelected &&
          this.selectValues.includes(item[this.value]))
      ) {
        return
      }

      if (!this.multiple) {
        this.selectedItem = [item]
        this.showDropdown = false
      } else {
        let index = this.selectedItem
          .map((item) => item[this.value])
          .indexOf(item[this.value])
        if (index > -1) {
          this.selectedItem.splice(index, 1)
        } else {
          this.selectedItem.push(item)
        }
      }

      this.emitValue()
    },
    // 删除某一项
    delItem (val) {
      let index = this.selectedItem.findIndex(
        (item) => item[this.value] === val
      )
      if (index > -1) this.selectedItem.splice(index, 1)
      this.emitValue()
      this.$emit('removeTag', val)
    },
    // 搜索
    handlerFilter (e) {
      this.showVirtual = false
      this.keyName = e.target.value
      this.$nextTick(() => {
        this.showVirtual = true
      })
    },
    // 清空
    handleClear () {
      if (this.curDefaultValues) {
        this.selectedItem = this.selectedItem.filter((item) => {
          return this.curDefaultValues.includes(item[this.value])
        })
      } else {
        this.selectedItem = []
      }
      this.emitValue()
    },
    // 上报数据
    emitValue () {
      let data = this.isObj ? this.selectedItem : this.selectValues
      let val = this.multiple ? data : data[0]
      if (!val) val = this.multiple ? [] : ''
      this.$emit('valChange', val)
      this.$emit('change')
      this.$nextTick(() => {
        this.$refs['virtualList'] &&
          this.$refs['virtualList'].$forceUpdate()
      })
    },
    // 初始化数据
    initData () {
      if (this.isObj) {
        this.selectedItem = JSON.parse(JSON.stringify(this.modelVal))
        return null
      } else {
        let val =
          typeof this.modelVal === 'object'
            ? this.modelVal
            : [this.modelVal]
        this.selectedItem = val.map((item) => {
          return this.options.find(
            (zItem) => zItem[this.value] === item
          )
        })
      }
    },
    // 获取当前选中项目
    getCurrentItem () {
      return [...this.selectedItem]
    }
  },
  computed: {
    // 当前下拉选项（搜索后）
    curOptions () {
      if (!this.keyName) return this.options
      let keyWords = this.keyName
      let findDataKey = this.label
      if (typeof this.filterFn === 'function') {
        return this.filterFn(this.options, keyWords, findDataKey)
      }
      return this.options
        .filter((item) => {
          return item[findDataKey].indexOf(keyWords) > -1
        })
        .sort((a, b) => {
          return a[findDataKey].length - b[findDataKey].length
        })
        .sort((a, b) => {
          return (
            a[findDataKey].indexOf(keyWords) -
            b[findDataKey].indexOf(keyWords)
          )
        })
        .sort((a, b) => {
          if (a.disabled && !b.disabled) {
            return 1
          }

          if (!a.disabled && b.disabled) {
            return -1
          }

          return 0
        })
    },
    // 当前选中值
    selectValues () {
      return this.selectedItem.map((item) => item[this.value])
    },
    curDefaultValues () {
      if (!this.isObj) {
        return this.defaultValues
      }
      return this.defaultValues.map((item) => item[this.value])
    }
  },
  watch: {
    modelVal: {
      handler (val) {
        if (!val) {
          this.selectedItem = []
        }

        if (
          val &&
          JSON.stringify(val) !== JSON.stringify(this.selectValues)
        ) {
          this.initData()
        }
      },
      immediate: true
    },
    selectedItem () {
      this.keyName = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.stl-big-data-select {
  width: 100%;
  position: relative;
  .placeholder {
    color: #bfc7d9;
    font-size: 14px;
    position: absolute;
  }
  .selected-tags {
    width: 100%;
    min-height: 28px;
    display: flex;
    border: 1px solid #c3c5c9;
    padding: 3px 20px 0 5px;
    font-size: 12px;
    flex-wrap: wrap;
    border-radius: 3px;
    transition: all 0.3s ease;
    position: relative;
    box-sizing: border-box;

    &.active {
      border-color: #409eff;
    }

    &.disabled {
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      color: #c0c4cc;
      cursor: not-allowed;
    }

    span {
      display: flex;
      align-items: center;
      height: 20px;
      padding: 1px 5px;
      margin: 0 10px 3px 0px;
      border: 1px solid transparent;
      i {
        margin-left: 5px;
        width: 11px;
        height: 11px;
        background-color: #c0c4cc;
        border-radius: 11px;

        &::before {
          width: 100%;
          height: 100%;
          line-height: 1;
          text-align: center;
          display: block;
          content: '\00D7';
          font-style: normal;
        }

        &:hover {
          color: #fff;
        }
      }

      &.multiple {
        color: #909399;
        background-color: #f4f4f5;
        border-color: #e9e9eb;
        border-radius: 4px;
        cursor: pointer;
      }
      &:last-of-type {
        margin-right: 3px;
      }
    }

    .sl-select-input {
      border-color: transparent;
      flex-grow: 1;
      width: 10px;
      height: 21px;
      line-height: 21px;
      outline: none;
    }

    .clear-panel {
      position: absolute;
      height: 100%;
      width: 25px;
      right: 0;
      // background: red;
      transform: translateY(-3px);
    }
  }
  .select-dropdown {
    position: absolute;
    border: solid 1px #e4e7ed;
    overflow: hidden;
    margin-top: 5px;
    padding: 5px 0;
    border-radius: 3px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    z-index: 9999;
    top: 100%;
    right: 0;
    left: 0;
    background: #fff;
  }

  .no-data {
    font-size: 14px;
    padding: 0 10px;
    color: #606266;
    text-align: center;
  }
}

.el-icon-arrow-down,
.el-icon-circle-close {
  display: block;
  width: 12px;
  height: 12px;
  font-size: 14px;
  margin-top: -6px;
  transition: transform 0.3s;
  position: absolute;
  top: 50%;
  right: 8px;
  transform: rotateZ(0deg);
}

.arrow-up {
  transform: rotateZ(-180deg);
}
</style>
