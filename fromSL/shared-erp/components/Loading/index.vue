<template>
    <div>
        <div v-if="showLoad" class="sl-loading">
            <div class="sl-modal" tabindex="0"></div>
            <div
                class="loading-box"
                v-loading="showLoad"
                element-loading-text="Loading"
                element-loading-spinner="el-icon-loading"
            ></div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'SlLoading',
    props: {
        showLoad: {
            type: Boolean,
            default: false,
            currentLoading: null
        }
    },
    watch: {
        showLoad(newValue) {
            this.showLoad = newValue
        }
    }
}
</script>

<style lang="scss" scoped>
/*loading*/
.sl-loading {
    .sl-modal {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0.2;
        background: #fff;
        z-index: 2147483647;
    }
    .loading-box {
        position: fixed;
        top: 50%;
        width: 100%;
        margin-top: -21px;
        z-index: 2147483647;
        text-align: center;
        .el-icon-loading {
            font-size: 24px;
        }
    }
}
</style>
