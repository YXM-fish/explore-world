<template>
  <div class="category">
    <el-select
      v-model="cateInfo"
      placeholder="请选择"
      clearable
      class="category-select"
      @change="change"
    >
      <el-option
        v-for="(category,index) in categoryArr"
        :key="'category_'+index"
        :label="category.label"
        :value="category.value"
      />
    </el-select>
  </div>
</template>

<script>
import CommonApi from '@api/api.js'
export default {
  name: 'SlCategory',
  model: {
    prop: 'cate',
    event: 'changeCategory'
  },
  props: {
    cate: { type: Number, required: false, default: undefined }
  },
  data () {
    return {
      categoryArr: [],
      cateInfo: undefined
    }
  },
  watch: {
    'cate' (newValue) { // 回显
      this.cateInfo = newValue
    }
  },
  mounted () {
    this.getCategory()
  },
  methods: {
    getCategory () {
      CommonApi.category().then(res => {
        this.categoryArr = res.data
      })
    },
    change () {
      this.$emit('changeCategory', this.cateInfo)
    }
  }
}
</script>

<style scoped lang="scss">
.category {
  &-select {
    width: 100%;
  }
}
</style>
