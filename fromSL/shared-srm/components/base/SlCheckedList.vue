<template>
  <div class="sl-checked-list">
    <span
      v-if="label"
      class="checked-list__label"
      :class="{right:align==='right',left:align==='left',bold:labelBold}"
    >{{label}}</span>
    <ul class="checked-list__value">
      <li
        class="checked-item"
        v-for="(item,index) in options"
        :key="'item-'+index"
        :class="{['active__'+activeType]:isActive(item.value),underline:underline}"
        :style="{marginRight:gutter}"
        @click="itemClick(item)"
      >
        <slot :item="item">
          <span>{{item.label}}</span>
        </slot>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SlCheckedList',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    label: {
      type: String,
      required: false,
      default: undefined
    },
    value: {
      type: [Array, String, Number],
      required: false,
      default: undefined
    },
    options: {
      type: Array,
      required: false,
      default: () => { return [] }// [{ label:'',value:'',extra:{} }]
    },
    multiple: {
      type: Boolean,
      required: false,
      default: false
    },
    align: {
      type: String,
      required: false,
      default: 'right'// left
    },
    gutter: {
      type: String,
      required: false,
      default: '2rem'
    },
    activeType: {
      type: String,
      required: false,
      default: 'text'// button
    },
    labelBold: {
      type: Boolean,
      required: false,
      default: false
    },
    underline: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {

    }
  },
  computed: {
    isActive () {
      return (val) => {
        if (this.multiple) {
          return this.value.includes(val)
        }
        return val === this.value
      }
    }
  },
  mounted () {

  },
  methods: {
    itemClick (item) {
      let newValue
      if (this.multiple) {
        newValue = this.multipleMode(item)
      } else {
        newValue = this.singleModeClickHandle(item)
      }
      this.$emit('change', newValue)
    },
    multipleModeClickHandle (item) {
      let index = this.value.find(val => val === item.value)
      let temp = JSON.parse(JSON.stringify(this.value))

      if (index === -1) {
        temp.push(item.value)
      } else {
        temp.splice(index, 1)
      }
      return temp
    },
    singleModeClickHandle (item) {
      let newVal
      if (this.value !== item.value) {
        newVal = item.value
      }
      return newVal
    }
  }
}
</script>

<style lang="scss" scoped>
.sl-checked-list {
  padding: 0.5em 0;
  .checked-list__label {
    display: inline-block;
    min-width: 100px;
    padding: 0 12px 0 0;
    line-height: 32px;
    box-sizing: border-box;
    &.right {
      text-align: right;
    }
    &.bold {
      font-weight: 600;
    }
  }

  .checked-list__value {
    display: inline-block;
    .checked-item {
      display: inline-block;
      padding: 0 0.5em;
      line-height: 32px;
      cursor: pointer;
      &.active__button {
        color: #fff;
        background-color: #409eff;
      }
      &.active__text {
        color: #409eff;
      }
      &.underline {
        text-decoration: underline;
      }
      &:last-child {
        margin-right: 0 !important;
      }
    }
  }
}
</style>
