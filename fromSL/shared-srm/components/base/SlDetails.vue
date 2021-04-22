<template>
  <div class="detailControl">
    <div :class="[isRight=== true ? 'detailCenteRight' : 'detailCenter']">
      <template v-if="Array.isArray(saveText)">
        <el-button
          v-for="(btn,index) in saveText"
          :key="index"
          type="primary"
          @click="doSave(index)"
          :loading="loading"
        >{{btn[index]}}</el-button>
      </template>
      <el-button v-else type="primary" @click="doSave" :loading="loading">{{saveText}}</el-button>
      <el-button :class="[cancelText===true ? 'noneShow':'']" @click="cancel">{{cancelText}}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SlDetails',
  props: {
    mode: { type: String, required: false, default: '' },
    cancel: { type: Function, required: false },
    modify: { type: Function, required: false },
    load: { type: Function, required: false },
    create: { type: Function, required: false, default: undefined },
    references: { type: Object, required: false, default: undefined },
    form: { type: String, required: false, default: undefined },
    cancelText: { type: String, required: false, default: undefined },
    saveText: { type: [String, Array], required: false, default: undefined },
    isRight: { type: Boolean, required: false, default: false }
  },
  data () {
    return {
      loading: false,
      someBtnParams: undefined
    }
  },
  mounted () {
    this.refresh()
  },
  methods: {
    refresh () {
      setTimeout(_ => {
        if (this.mode !== 'create') {
          this.load()
        }
      }, 0)
    },
    doSave (someBtnParams) {
      if (this.references && this.form) {
        const len = Object.keys(this.references)
        len.length > 1 ? this.validateSomeForms(someBtnParams) : this.validateForm()
      }
    },
    validateForm () {
      // 组件内校验表单
      this.references[this.form].validate(valid => {
        if (valid) {
          this.loading = true
          this.ds()
        } else {
          this.loading = false
          return false
        }
      })
    },
    validateSomeForms (someBtnParams) {
      // 校验多个表单
      const result = {}
      for (const ref in this.references) {
        const currentRef = this.references[ref]
        // 判断渲染时使用的是component渲染各组件分别渲染
        const isComponent = currentRef[0] ? Object.keys(currentRef[0].$refs).length > 0 : Object.keys(currentRef.$refs).length > 0
        if (isComponent) {
          const validComponent = currentRef[0] ? currentRef[0] : currentRef
          if (validComponent.$refs[this.form]) {
            validComponent.$refs[this.form].validate(valid => {
              result[ref] = valid
            })
          }
        }
      }
      const validResults = Object.values(result)
      if (validResults.every(item => item === true)) {
        // 所有表单校验通过
        this.loading = true
        this.ds()
        // 多个保存按钮调用不同接口标识
        this.someBtnParams = someBtnParams
      } else {
        // 校验失败滚动到错误位置
        const firstValidIndex = validResults.findIndex(errorValid => !errorValid)
        const errValidRef = Object.keys(result)[firstValidIndex]
        let current = this.references[errValidRef][0] ? this.references[errValidRef][0].$refs.form : this.references[errValidRef].$refs.form
        // 滚动到指定节点
        current.$el.scrollIntoView({
          block: 'start',
          behavior: 'smooth'
        })
        this.loading = false
        return false
      }
    },
    ds () {
      if (this.mode === 'create') {
        this.loading = false
        this.create()
      } else {
        this.modify()
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
.detailControl {
  overflow: hidden;
  margin-top: 2rem;
  .detailCenter {
    text-align: center;
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
  }
  .detailCenteRight {
    float: right;
    margin: 1rem;
  }
  .noneShow {
    display: none;
  }
}
</style>
