<template>
    <div class="stl-with-title-container">
        <h1 class="stl-with-title-container__title" :style="titleStyle">
            {{title}}
            <span v-if="requiredMark" style="color:#f00">*</span>
        </h1>
        <div class="stl-with-title-container__content" :style="contentStyle">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SlWithTitleContainer',
    props: {
        title: {
            type: String,
            default: ''
        },
        requiredMark: {
            type: Boolean,
            default: false
        },
        titleStyle: {
            type: Object,
            default: () => ({})
        },
        contentStyle: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {}
    },
    methods: {},
    mounted() {},
    beforeDestroy() {}
}
</script>

<style lang="scss" scoped>
.stl-with-title-container {
    border: 1px solid #ebeef5;
    margin-bottom: 20px;

    .stl-with-title-container__title {
        margin: 0;
        padding: 1em;
        font-size: 14px;
        font-weight: normal;
        color: #181818;
    }

    .stl-with-title-container__content {
        padding: 0 1em 1em;
    }
}
</style>
