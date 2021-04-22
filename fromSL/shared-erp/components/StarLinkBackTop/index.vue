<template>
    <div>
        <div class="backToTop" v-if="isFloatOpt && showBackTop" @click="backToTop" title="回到顶部">
            <i class="el-icon-arrow-up" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'SlBackTop',
    props: {
        isFloatOpt: {
            type: Boolean,
            required: false,
            default: true
        },
    },
    data() {
        return {
            showBackTop: false,
        }
    },
    created() {
        window.addEventListener('scroll', this.handleScroll);
    },
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        backToTop() {
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
        },
        handleScroll() {
            let scrollHeight = document.body.scrollTop || document.documentElement.scrollTop;
            if (scrollHeight > 300) {
                this.showBackTop = true;
            } else {
                this.showBackTop = false;
            }
        },
    }
}
</script>

<style scoped>
.backToTop {
    width: 40px;
    height: 40px;
    position: fixed;
    bottom: 15px;
    right: 15px;
    border-radius: 20px;
    background-color: #ef883c;
    font-weight: 800;
    text-align: center;
    vertical-align: middle;
    padding: 4px;
    font-size: 24px;
    color: white;
    cursor: pointer;
}
</style>