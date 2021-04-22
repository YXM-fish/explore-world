<template>
    <div class="stl-progress" :class="{'rect-bar':noRadius}">
        <el-progress :type="type" :percentage="percentage" :stroke-width="width" :color="color" :format="format"
            :text-inside="textInside" :stroke-linecap="strokeLinecap">
        </el-progress>
    </div>
</template>

<script>
export default {
    name: 'StlProgress',
    props: {
        type: {
            type: String,
            default: 'line'
        },
        width: {
            type: Number,
            default: 30
        },
        color: {
            type: [String, Function, Array],
            default: '#409eff'
        },
        percentage: {
            type: Number,
            default: 0
        },
        textInside: {
            type: Boolean,
            default: true
        },
        strokeLinecap: {
            type: String,
            default: 'square'
        },
        noRadius: {
            type: Boolean,
            default: true
        },
        format: {
            type: Function,
            default: function (percentage) {
                return `${percentage}%`
            }
        }
    },
    data() {
        return {}
    },
    computed: {},
    methods: {}
}
</script>

<style lang="scss" scoped>
.stl-progress.rect-bar /deep/ {
    .el-progress-bar__outer {
        border-radius: 0;
    }

    .el-progress-bar__inner {
        border-radius: 0;
    }
}
</style>
