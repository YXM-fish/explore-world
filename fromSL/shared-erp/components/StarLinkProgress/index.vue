<template>
    <div class="position-progress" v-show="visible && !complete">
        <el-progress type="circle" :percentage="percentage" :color="colors"></el-progress>
    </div>
</template>

<script>
import { Loading } from "element-ui";
export default {
    name: "SlProgress",
    props: {
        percentage: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            visible: false,
            loading$: null,
            colors: [
                { color: "#f56c6c", percentage: 20 },
                { color: "#e6a23c", percentage: 40 },
                { color: "#5cb87a", percentage: 60 },
                { color: "#1989fa", percentage: 80 },
                { color: "#6f7ad3", percentage: 100 }
            ]
        };
    },
    computed: {
        complete() {
            if (this.percentage !== 100) {
                return false;
            }
            this.close();
            return true;
        }
    },
    methods: {
        show() {
            this.loading$ = Loading.service({
                lock: false,
                text: "",
                spinner: "el-icon-null"
            });
            this.visible = true;
        },
        close() {
            this.loading$ && this.loading$.close();
            this.visible = false;
            this.$emit("closeProgress");
        }
    }
};
</script>

<style lang="scss" scoped>
.position-progress {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
}
</style>