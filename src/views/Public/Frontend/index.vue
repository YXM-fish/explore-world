<template>
    <watermark>
        <!-- <div>
            <el-input v-model.trim="val" @input="handleInput"></el-input>
        </div>
        <section class="total-statistics">
            <div class="total-statistics-item" @mousemove.stop="showTooltip($event)" @mouseout.capture="closeTooltip" @contextmenu="clip($event,item)" v-for="(item,index) in [1,2,3,4,5,6,7,8,9,10]" :key="index">
                <p>12</p>
                <p ref="spu">spu数量</p>
            </div>
        </section>
        <el-select v-model="value1" ref="select" @focus="resetScrollTop" v-select-scroll="{'handleScroll': handleSelectScroll}" filterable multiple placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select> -->
        虚拟滚动：数据量{{list.length}}
        <!-- <div>
            <el-select v-model="value2" :filter-method="filterMethod" clearable filterable multiple placeholder="请选择">
                <RecycleScroller
                    class="scroller"
                    :items="list"
                    :item-size="32"
                    key-field="id"
                    v-slot="{ item }"
                >
                    <el-option
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </RecycleScroller>
            </el-select>
            {{value2}}
        </div> -->
        <div>
            <el-select ref="select" v-model="value2" :filter-method="filterMethod" clearable filterable multiple placeholder="请选择">
                <DynamicScroller
                    :items="list"
                    :min-item-size="32"
                    class="scroller"
                >
                    <template v-slot="{ item, index, active }">
                        <DynamicScrollerItem
                            :item="item"
                            :active="active"
                            :size-dependencies="[
                                item.name,
                            ]"
                            :data-index="index"
                        >
                            <el-option
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                                style="height:auto;"
                            >
                                <div>
                                    <div>ID：{{item.id}}</div>
                                    <div style="white-space:normal;">Label：{{item.name}}</div>
                                </div>
                            </el-option>
                        </DynamicScrollerItem>
                    </template>
                </DynamicScroller>
            </el-select>
        </div>
        <div>
            <svg
                style="height:200px;"
                id="mysvg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 300 900"
                preserveAspectRatio="xMidYMid meet"
            >
                <polygon fill="#67C23A" stroke="#67C23A" stroke-width="1"
                    points="150,0 300,300 170,200 170,900 130,900 130,200 0,300 150,0"
                    transform="translate(300, 900) rotate(180)"/>
            </svg>
            <svg
                style="height:200px;"
                id="mysvg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 300 900"
                preserveAspectRatio="xMidYMid meet"
            >
                <polygon fill="#F56C6C" stroke="#F56C6C" stroke-width="1" points="150,900 300,600 170,700 170,0 130,0 130,700 0,600 150,900" />
            </svg>
            <i class="el-icon-top"></i>
            <svg width="200" height="200" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <defs>
                    <linearGradient id="Gradient">
                    <stop offset="0" stop-color="white" stop-opacity="0" />
                    <stop offset="1" stop-color="white" stop-opacity="1" />
                    </linearGradient>
                    <mask id="Mask">
                    <rect x="0" y="0" width="200" height="200" fill="url(#Gradient)"  />
                    </mask>
                </defs>

                <rect x="0" y="0" width="200" height="200" fill="green" />
                <rect x="0" y="0" width="200" height="200" fill="red" mask="url(#Mask)" />
            </svg>
            <svg width="200" height="200" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <rect x="0" y="0" width="200" height="200" fill="white" />
                <circle cx="100" cy="100" r="50" stroke="yellow" stroke-width="10" stroke-opacity=".5" fill="red" />
            </svg>
        </div>
    </watermark>
</template>

<script>
import {
    OfflinePaymentService,
    OfflinePaymentUrls
} from '@/api/purchase/offlinePay'
// import watermark from './myWatermark.js'
import watermark from '_c_/watermark.vue'
import ClipboardJS from 'clipboard'
import { RecycleScroller, DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

export default {
    data() {
        return {
            val: '',
            timer: null,
            options: [],
            value1: [],
            value2: [5999, 6999, 3999],
            len: 15,
            index: 15,
            start: 0,
            resetStatus: {
                scrollTop: 0,
                distance: 0
            },
            list: [],
            olist: [],
            initList: []
        }
    },
    components: {
        watermark,
        RecycleScroller,
        DynamicScroller,
        DynamicScrollerItem
    },
    directives: {
        selectScroll: {
            bind(el, binding) {
                const SCROLL_DOM = el.querySelector('.el-select-dropdown__wrap')
                const SCROLL_HANDLER = binding.value.handleScroll
                const PADDING = 100
                let preTime
                SCROLL_DOM.addEventListener('scroll', function() {
                    let currentTime = +new Date()
                    let wrapHeight = +window.getComputedStyle(this).height.slice(0, -2)
                    let ul = SCROLL_DOM.querySelector('.el-scrollbar__view.el-select-dropdown__list')
                    let li = SCROLL_DOM.querySelector('.el-scrollbar__view.el-select-dropdown__list .el-select-dropdown__item')
                    let ulTop = ul.getBoundingClientRect().top
                    let wrapTop = SCROLL_DOM.getBoundingClientRect().top
                    let liHeight = +window.getComputedStyle(li).height.slice(0, -2)
                    let scrollTop = Math.ceil(this.scrollTop)
                    let scrollHeight = this.scrollHeight
                    // if (!preTime || currentTime - preTime > 10) {
                    //     preTime = currentTime
                        SCROLL_HANDLER(SCROLL_DOM, ul, ulTop, wrapTop, scrollTop, scrollHeight, liHeight, PADDING)
                    // }
                })
            }
        }
    },
    mounted() {
        // watermark.set(this.$refs.wrap, '水印', {})
        // this.clip()
        let len = this.len
        for (let i = 0; i < len; i++) {
            this.options.push({
                label: `选项${i}`,
                value: i
            })
        }
        let arr = ['好么', '真的一切都好', '己所不欲，勿施于人。', 'anything is possibble, trust yourself!']
        let list = []
        setTimeout(() => {
            for (let i = 0; i < 10000; i++) {
                list.push({
                    name: `选项${i}：${arr[i % 4]}`,
                    id: i
                })
            }
            this.initList = []
            this.value2.map(v => {
                let index = list.findIndex(val => v === val.id)
                if (index > -1) {
                    this.initList.push(list[index])
                }
            })
            this.list = this.initList.slice()
            // this.$forceUpdate()
            // setTimeout(() => {
            this.$nextTick(() => {
                // console.log(this.$refs.select.$refs.reference)
                // this.$refs.select.$refs.reference.$forceUpdate()
                this.list = list.slice()
                this.olist = list.slice()
            })
            // }, 10000)
        }, 2000)
    },
    methods: {
        handleSelectScroll(wrap, dom, ulTop, wrapTop, scrollTop, scrollHeight, liHeight, padding) {
            // console.log(ulTop, wrapTop)
            let max = 1000
            let diff = wrapTop - ulTop - padding
            if (diff > 0) {
                let diffLength = Math.floor(diff / liHeight)
                let count = 0
                while (count < diffLength && this.index < max) {
                    this.options.shift()
                    this.options.push({
                        label: `选项${this.index}`,
                        value: this.index
                    })
                    this.start++
                    this.index++
                    count++
                    if (count === diffLength) {
                        dom.style.transform = `translateY(${diff - diffLength * liHeight}px)`
                        wrap.scrollTop = wrapTop - ulTop
                        this.resetStatus = {
                            scrollTop: wrapTop - ulTop,
                            distance: diff - diffLength * liHeight
                        }
                    }
                }
            } else {
                let diffLength = Math.abs(Math.floor(diff / liHeight))
                let count = 0
                while (count < diffLength && this.index - this.len - 1 >= 0) {
                    this.options.unshift({
                        label: `选项${this.index - this.len >= 0 ? this.index - this.len - 1 : 0}`,
                        value: this.index - this.len >= 0 ? this.index - this.len - 1 : 0
                    })
                    this.options.pop()
                    this.start--
                    this.index--
                    count++
                    if (count === diffLength) {
                        dom.style.transform = `translateY(${diff}px)`
                        wrap.scrollTop = wrapTop - ulTop <= 0 ? 100 : wrapTop - ulTop
                        this.resetStatus = {
                            scrollTop: wrapTop - ulTop <= 0 ? 100 : wrapTop - ulTop,
                            distance: diff
                        }
                    }
                }
            }
        },
        resetScrollTop(e) {
            let dom = this.$refs['select'].$refs['scrollbar'].$refs['resize']
            // dom.style.transform = `translateY(${this.start > 0 ? -100 : 0}px)`
            let wrap = this.$refs['select'].$refs['scrollbar'].$refs['wrap']
            setTimeout(() => {
                console.log(this.start)
                wrap.scrollTop = this.resetStatus.scrollTop
                dom.style.transform = `translateY(${this.resetStatus.distance}px)`
            }, 100)
        },
        filterMethod(query) {
            this.list = this.olist.filter(item => {
                return item.name.indexOf(query) > -1
            })
        },
        handleInput(v) {
            if (this.timer) clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                this.requestFun()
            }, 1000)
        },
        requestFun() {
            console.log(this.val)
            OfflinePaymentService.getOfflinePaymentList(
                { index: 1 },
                cancelToken
            )
                .then(res => {
                    if (res.success) {
                        this.getPageInfo(res.data)
                        this.columns = res.data.list
                    }
                })
                .finally(res => {
                    this.loading = false
                })
        },
        clip(e, item) {
            let _this = this
            let text = 'class' + item
            let node = document.createElement('button')
            node.setAttribute('data-clipboard-text', text)
            node.setAttribute('id', 'clip')
            node.innerText = 'clip'
            node.style.display = 'none'
            document.body.appendChild(node)
            let clipboard = new ClipboardJS('#clip')
            clipboard.on('success', function(e) {
                _this.$message({
                    type: 'success',
                    message: '复制成功',
                    duration: 500
                })
                clipboard.destroy()
            })
            node.click()
            document.body.removeChild(node)
            e.preventDefault()
        },
        showTooltip(e) {
            this.createTootip(e.clientX, e.clientY, '右键复制')
        },
        createTootip(x, y, text) {
            let oldTooltip = document.getElementById('echartsCustomeTooltip')
            if (!oldTooltip) {
                let tooltip = document.createElement('div')
                tooltip.innerText = text
                tooltip.setAttribute('id', 'echartsCustomeTooltip')
                tooltip.style.background = 'rgba(0, 0, 0, 0.55)'
                tooltip.style.borderRadius = '5px'
                tooltip.style.color = '#fff'
                tooltip.style.fontSize = '12px'
                tooltip.style.padding = '2px 5px'
                tooltip.style.position = 'fixed'
                tooltip.style.zIndex = 9999
                tooltip.style.top = y + 'px'
                tooltip.style.left = x + 'px'
                document.body.appendChild(tooltip)
            } else {
                oldTooltip.style.top = y + 'px'
                oldTooltip.style.left = x + 'px'
            }
        },
        closeTooltip() {
            console.log('xxxx')
            let oldTooltip = document.getElementById('echartsCustomeTooltip')
            if (oldTooltip) {
                document.body.removeChild(oldTooltip)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.total-statistics {
    display: flex;
    flex-wrap: wrap;
    .total-statistics-item {
        flex: 0 1 150px;
        width: 150px;
        margin: 0 10px 10px 0;
        background: #e6e6e6;
        text-align: center;
        padding: 20px 30px;
        border-radius: 5px;
    }
}
.scroller {
  height: 200px;
  margin-right: 10px;
  &::-webkit-scrollbar-track-piece {
    background: transparent;
  }
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 20px;
  }
  &:hover {
    &::-webkit-scrollbar-thumb {
        background: #c9c8c8;
        border-radius: 20px;
    }
  }
  /deep/ .vue-recycle-scroller__item-view {
    will-change: auto;
}
}

.user {
  height: 26px;
  line-height: 26px;
  padding: 0 12px;
  display: flex;
  align-items: center;
}
// /deep/ .vue-recycle-scroller__item-view {
//     will-change: auto;
// }
</style>
