<template>
  <el-table
    v-loading="loading"
    :data="tableData"
    class="tableData"
    @selection-change="handleSelectionChange"
    :border="border"
    :row-key="rowKey"
    :height="height"
    size="mini"
    ref="multipleTable"
  >
    <el-table-column
      v-if="selection"
      type="selection"
      width="55"
      fixed
      :selectable="checkSelectable"
    />
    <template v-for="item in columns">
      <el-table-column
        v-if="item.isImg"
        align="center"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :key="item.label"
        :fixed="item.fixed"
      >
        <template slot-scope="scope">
          <SlImage size="10rem" :src="scope.row[item.prop]" />
        </template>
      </el-table-column>
      <el-table-column
        v-else
        align="center"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :show-overflow-tooltip="tooltip"
        :key="item.label"
        :fixed="item.fixed"
      >
        <template slot="header">
          <SlTableHeaderFormat v-if="item.headerRender" :column="item" :render="item.headerRender"></SlTableHeaderFormat>
        </template>
        <template slot-scope="scope">
          <el-row class="tableData-col" type="flex" align="middle">
            <el-col
              v-if="item.isInImg"
              :span="null"
              :style="{maxWidth:item.data && item.data.imgSize || '10rem',marginRight:'0.5rem'}"
            >
              <!--如果item.prop为空,表示数据直接取row中的字段,否则取item.prop的下级字段-->
              <SlImage
                :size="item.data && item.data.imgSize || '10rem'"
                :src="item.prop?scope.row[item.prop]?scope.row[item.prop][item.isInImg]:'':scope.row[item.isInImg]"
              />
            </el-col>
            <el-col :span="item.isInImg?null:24">
              <template v-if="item.pre">
                <div
                  class="tableData-col-con"
                  v-for="(value, key) in item.pre"
                  :key="key"
                  :class="{'pre' : !item.isInImg && item.pre }"
                >
                  <!--如果item.prop为空,表示数据直接取row中的字段,否则取item.prop的下级字段-->
                  <template v-if="!item.prop">
                    <p v-if="scope.row[key]">
                      <span>{{ value }}:</span>
                      <span>{{ scope.row[key] }}</span>
                    </p>
                  </template>
                  <template v-else>
                    <p v-if="scope.row[item.prop] && scope.row[item.prop][key]">
                      <span>{{ value }}:</span>
                      <span>{{ scope.row[item.prop][key] }}</span>
                    </p>
                  </template>
                </div>
              </template>
              <SlTableColFormat
                v-else-if="item.render"
                :row="scope.row"
                :column="item"
                :index="scope.$index"
                :render="item.render"
              ></SlTableColFormat>
              <div v-else class="tableData-col-text">{{scope.row[item.prop] }}</div>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </template>
    <el-table-column width="180px" align="center" label="操作" v-if="operate" fixed="right">
      <template slot-scope="scope">
        <slot name="operation" :row="scope.row"></slot>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import SlTableHeaderFormat from './SlTableHeaderFormat'
import SlTableColFormat from './SlTableColFormat'
export default {
  name: 'SlTable',
  components: {
    SlTableHeaderFormat,
    SlTableColFormat
  },
  model: {
    event: 'changeSelection'
  },
  props: {
    tableData: {
      type: Array,
      required: false,
      default: () => {
        return []
      }
    },
    columns: {
      type: Array,
      required: false,
      default: () => {
        return []
      }
    },
    rowKey: { type: String, required: false, default: 'id' },
    border: { type: Boolean, required: false, default: true },
    selection: { type: Boolean, required: false, default: true },
    operate: { type: Boolean, required: false, default: true },
    tooltip: { type: Boolean, required: false, default: true },
    disabledKeys: { type: Array, required: false, default: () => { return [] } }, // 禁址选中的行标识数据
    loading: { type: Boolean, required: false, default: false },
    height: { type: [String, Number], required: false, default: undefined }
  },
  methods: {
    handleSelectionChange (val) {
      this.$emit('changeSelection', val)
    },
    checkSelectable (row) {
      return this.disabledKeys.indexOf(row[this.rowKey]) === -1
    }
  }
}
</script>
<style lang="scss">
.tableData {
  &-col {
    &-con {
      text-align: left;
      &.pre {
        text-align: center;
      }
    }
  }
  /deep/ .cell {
    text-align: center;
    .sl-popper {
      vertical-align: middle;
    }
  }
}
</style>
