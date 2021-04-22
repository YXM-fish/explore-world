<template>
    <div class="stl-form-item__container" :style="selfstyle">
        <label class="stl-form-item__label"
            :class="{'stl-form-item--label-left':labelPosition === 'left'}">{{label}}</label>
        <div class="stl-form-item__content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SlFormItemContainer',
    props: {
        label: {
            type: String,
            default: ''
        },
        labelPosition: {
            type: String,
            default: 'left'
        },
        selfstyle: {
            type: Object,
            default: null
        }
    },
    data() {
        return {}
    }
}
</script>

<style lang="scss" scoped>
.stl-form-item__container {
    display: inline-block;
    position: relative;
    padding: 10px 0;
    color: #343638;
}

.stl-form-item__content {
    display: inline-block;
    vertical-align: middle;
    box-sizing: border-box;
    line-height: 28px;
}

.stl-form-item__label {
    display: inline-block;
    padding: 0 12px 0 0;
    vertical-align: middle;
    box-sizing: border-box;
    line-height: 28px;
}

.stl-form-item--label-left {
    text-align: left;
}
</style>
