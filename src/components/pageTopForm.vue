<template>
    <div class="form-wraper" :class="{'unexpand': formHeight.substr(0,formHeight.length - 2) > 180  && !collapse}">
        <div ref="form">
            <slot></slot>
        </div>

        <div class="collapse" v-if="formHeight.substr(0,formHeight.length - 2) > 180" @click="collapseChange">
            <i :class="`el-icon-arrow-${!collapse ? 'down' : 'up'}`"></i>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            formInline: {
                user: '',
                region: '',
                checkList: [],
                radio: ''
            },
            formHeight: '',
            collapse: false
        }
    },
    mounted() {
        this.getFormHeight()
    },
    methods: {
        onSubmit() {
            console.log('submit!')
        },
        getFormHeight() {
            const el = this.$refs.form
            this.formHeight = window.getComputedStyle(el).height
        },
        collapseChange() {
            this.collapse = !this.collapse
        }
    }
}
</script>

<style lang="scss" scoped>
.form-wraper {
    position: relative;
    // border: 1px solid rgb(224, 224, 224);
    border-radius: 5px;
    padding: 20px 5px 25px;
    height: auto;
    overflow: hidden;
    transition: all 3s linear;
    &:hover {
        .collapse {
            color: #313131;
            border-color: #303030;
        }
    }
    &.unexpand {
        max-height: 180px;
        transition: all 3s linear;
    }

    .el-form-item__content {
        .el-input,
        .el-select {
            width: 100%;
        }
    }

    .collapse {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 30px;
        height: 30px;
        line-height: 30px;
        background-color: white;
        border: 1px solid rgb(224, 224, 224);
        border-radius: 50%;
        text-align: center;
        &:hover {
            cursor: pointer;
        }
    }
}
</style>
