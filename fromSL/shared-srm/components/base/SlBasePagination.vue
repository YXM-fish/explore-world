<template>
  <div class="pagenation">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="page.pageIndex"
      :page-size.sync="page.pageSize"
      :page-sizes="pageSizes"
      layout="total, sizes, prev, pager, next, jumper"
      background
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'SlBasePagination',
  props: {
    total: {
      type: Number
    },
    pageIndex: {
      type: Number
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 50]
    }
  },
  data () {
    return {
      page: {
        pageIndex: 1,
        pageSize: 10
      }
    }
  },
  watch: {
    pageIndex: {
      handler (val, oldVal) {
        if (val !== oldVal) {
          this.page.pageIndex = val
        }
      },
      immediate: true
    },
    pageSize: {
      handler (val, oldVal) {
        if (val !== oldVal) {
          this.page.pageSize = val
        }
      },
      immediate: true
    }
  },
  mounted () {

  },
  methods: {
    // 每页查看条数变化
    handleSizeChange (val) {
      this.page.pageSize = val
      this.$emit('pageChange', this.page)
    },
    // 当前页码变化
    handleCurrentChange (val) {
      this.$emit('pageChange', this.page)
    }
  }
}
</script>

<style scoped lang="scss">
.pagenation {
  margin-bottom: 2rem;
  margin-top: 2rem;
  text-align: center;
}
</style>
