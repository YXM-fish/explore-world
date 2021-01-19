<template>
    <div class="stl-big-data-select" v-clickoutside="handleBlur">
        <div class="selected-tags" @click="toggleShow" :class="{'active': showDropdown, 'disabled': disabled}">
            <span v-for="item in selectedItem" :key="item[value]" :class="{'multiple': multiple}">
                {{item[label]}}

                <i @click.stop="delItem(item[value])"
                    v-if="!curDefaultValues.includes(item[value]) && multiple && !disabled"></i>
            </span>
            <input v-if="filterable && !disabled" @input="handlerFilter" ref="selectInput">

            <div class="clear-panel" @mouseover="showClear = clearable && selectValues.length ? true : false"
                @mouseout="showClear = false">
                <i class="el-icon-circle-close" v-show="showClear" @click="handleClear"></i>
                <i :class="[showDropdown ? 'arrow-up': '', 'el-icon-arrow-down']" v-show="!showClear"></i>
            </div>
        </div>

        <ul class="select-dropdown" v-if="showDropdown">
            <!-- <RecycleScroller class="scroller" :items="curOptions" :item-size="30" :key-field="value" v-slot="{ item }"
                :style="{maxHeight: `${maxHeight}px`}" v-if="curOptions.length && showVirtual">
                <li class="select-dropdown-item"
                    :class="{'active': selectValues.includes(item[value]),
                    'disabled': item.disabled || curDefaultValues.includes(item[value]) || (disableSelected && selectValues.includes(item[value]))}"
                    @click="itemClick(item)">
                    <slot v-bind:item="item">
                        <span>{{item[label]}}</span>
                    </slot>
                </li>
            </RecycleScroller> -->
            <DynamicScroller
                :items="curOptions"
                :min-item-size="32"
                class="scroller"
                v-if="curOptions.length && showVirtual"
                :key-field="value"
            >
                <template v-slot="{ item, index, active }">
                    <DynamicScrollerItem
                        :item="item"
                        :active="active"
                        :size-dependencies="[
                            item[label],
                        ]"
                        :data-index="index"
                    >
                        <li class="select-dropdown-item"
                            :class="{'active': selectValues.includes(item[value]),
                            'disabled': item.disabled || curDefaultValues.includes(item[value]) || (disableSelected && selectValues.includes(item[value]))}"
                            @click="itemClick(item)"
                            >
                            <slot v-bind:item="item">
                                <span>{{item[label]}}</span>
                            </slot>
                        </li>
                    </DynamicScrollerItem>
                </template>
            </DynamicScroller>
            <div class="no-data" v-else>{{emptyText}}
            </div>
        </ul>
    </div>
</template>

<script>
import { RecycleScroller, DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import Clickoutside from './clickoutside'
export default {
    name: 'SlSelect',
    components: {
        RecycleScroller,
        DynamicScroller,
        DynamicScrollerItem
    },
    data() {
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
        }
    },
    methods: {
        // 展开/收回drowdown
        toggleShow() {
            if (this.disabled) return
            this.showDropdown = !this.showDropdown
            if (!this.$refs['selectInput']) return
            this.showDropdown
                ? this.$refs['selectInput'].focus()
                : this.$refs['selectInput'].blur()
        },
        // 失焦
        handleBlur() {
            this.showDropdown = false
        },
        // 点击某一项
        itemClick(item) {
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
        delItem(val) {
            let index = this.selectedItem.findIndex(
                (item) => item[this.value] === val
            )
            if (index > -1) this.selectedItem.splice(index, 1)
            this.emitValue()
        },
        // 搜索
        handlerFilter(e) {
            this.showVirtual = false
            this.keyName = e.target.value
            this.$nextTick(() => {
                this.showVirtual = true
            })
        },
        // 清空
        handleClear() {
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
        emitValue() {
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
        initData() {
            if (this.isObj) {
                this.selectedItem = JSON.parse(JSON.stringify(this.modelVal))
                return
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
        getCurrentItem() {
            return [...this.selectedItem]
        }
    },
    computed: {
        // 当前下拉选项（搜索后）
        curOptions() {
            if (!this.keyName) return this.options
            return this.options.filter((item) => {
                return item[this.label].indexOf(this.keyName) > -1
            })
        },
        // 面板高度
        panelHeight() {
            let height = this.curOptions.length * 34
            return height > this.height ? this.height : height
        },
        // 当前选中值
        selectValues() {
            return this.selectedItem.map((item) => item[this.value])
        },
        curDefaultValues() {
            if (!this.isObj) {
                return this.defaultValues
            }
            return this.defaultValues.map((item) => item[this.value])
        }
    },
    watch: {
        modelVal: {
            handler(val) {
                if (
                    val &&
                    JSON.stringify(val) !== JSON.stringify(this.selectValues)
                ) {
                    this.initData()
                }
            },
            immediate: true
        }
    }
}
</script>

<style lang="scss" scoped>
.stl-big-data-select {
    width: 100%;
    position: relative;
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
            display: inline-block;
            padding: 1px 5px;
            margin: 0 10px 3px 0px;
            border: 1px solid transparent;
            i {
                display: inline-block;
                width: 11px;
                height: 11px;
                background-color: #c0c4cc;
                border-radius: 13px;
                transform: translateY(2px);

                &::before {
                    display: block;
                    content: '\00D7';
                    transform: translate(1px, -4px);
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

        input {
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

        &-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            padding: 10px 20px;
            color: #606266;
            min-height: 34px;
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

.scroller {
    max-height: 200px;
}
</style>
