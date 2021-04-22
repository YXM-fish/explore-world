<template>
  <li
    class="select-dropdown-item"
    :class="{'active': selectValues.includes(item[value]),
                    'disabled': computedDisabled}"
    @click="itemClick(item)"
  >
    <span>{{item[label]}}</span>
    <span v-if="showRight" style="float:right;margin-right:20px">{{item[rightItem]}}</span>
  </li>
</template>

<script>
export default {
  name: 'SlOption',
  inject: ['select'],
  props: {
    item: {
      type: Object,
      require: true
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  computed: {
    selectValues () {
      return this.select.selectValues
    },
    curDefaultValues () {
      return this.select.curDefaultValues
    },
    disableSelected () {
      return this.select.disableSelected
    },
    label () {
      return this.select.label
    },
    value () {
      return this.select.value
    },
    rightItem () {
      return this.select.rightItem
    },
    showRight () {
      return this.select.showRight
    },
    computedDisabled () {
      let {
        item,
        curDefaultValues,
        disableSelected,
        selectValues,
        value
      } = this
      let disabledFromData = item.disabled
      let isDefaultSelected = curDefaultValues.includes(item[value])
      let isDisabledSelected =
        disableSelected && selectValues.includes(item[value])
      let propDisabled = this.disabled

      return (
        disabledFromData ||
        isDefaultSelected ||
        isDisabledSelected ||
        propDisabled
      )
    }
  },
  methods: {
    itemClick (item) {
      if (this.computedDisabled) return
      this.select.itemClick(item)
    }
  }
}
</script>

<style lang="scss" scoped>
.select-dropdown {
  &-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    padding: 10px 20px;
    color: #606266;
    height: 34px;
    box-sizing: border-box;
    cursor: pointer;

    span {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &:hover {
      background-color: #f5f7fa;
    }

    &.disabled {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      color: #409eff;

      &:after {
        position: absolute;
        right: 5px;
        font-family: element-icons;
        content: '\E6DA';
        font-size: 12px;
        font-weight: 700;
      }
    }
  }
}
</style>
