<template>
    <Treeselect v-model="node" :normalizer="customizeNormalizer || normalizer" :default-expand-level="0"
        :options="treeData" noOptionsText="无数据" noResultsText="无匹配数据" placeholder="请选择品类" v-bind="$attrs"
        v-on="$listeners">
        <template #option-label="{ node, shouldShowCount, count, labelClassName }">
            <slot name="option-label" :node="node" :shouldShowCount="shouldShowCount" :count="count"
                :labelClassName="labelClassName">
                <label :class="labelClassName">
                    {{node.label}}
                </label>
            </slot>
        </template>
        <template #value-label="{ node, shouldShowCount, count, labelClassName }">
            <slot name="value-label" :node="node" :shouldShowCount="shouldShowCount" :count="count"
                :labelClassName="labelClassName">
                <label :class="labelClassName">
                    {{node.label}}
                </label>
            </slot>
        </template>
    </Treeselect>
</template>

<script>
/**
 * * TreeSelect的基础组件，不掺杂任何业务，之后方便进行替换成其它组件
 */
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.min.css'
export default {
    name: 'SlTreeSelect',
    inheritAttrs: true,
    components: {
        Treeselect
    },
    model: {
        prop: 'primary',
        event: 'change'
    },
    props: {
        // 外部双向绑定的值
        primary: {
            type: [Number, String],
            default: undefined
        },
        // 树渲染的数据
        treeData: {
            type: Array,
            default: () => []
        },
        // 自定义的对照
        customizeNormalizer: {
            type: Function,
            default: null
        }
    },
    methods: {
        // 树数据的格式转换
        normalizer(node) {
            return {
                id: node.id,
                label: node.name,
                children: node.children
            }
        }
    },
    computed: {
        node: {
            set(primary) {
                this.$emit('change', primary)
            },
            get() {
                return this.primary
            }
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
