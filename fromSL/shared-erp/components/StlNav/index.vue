<template>
    <div class="stl-nav">
        <el-button v-for="(item,index) in items" :key="'button-'+index" size="mini" :type="item.active?'primary':null"
            @click="navClick(item,index)">
            {{item.label}}</el-button>
    </div>
</template>
<script>
export default {
    name: 'StlNav',
    props: {
        values: {
            type: Array,
            required: false,
            default: () => [] // {value:'',label:'',active:false,...}
        }
    },
    watch: {
        values: {
            handler(val) {
                this.items = JSON.parse(JSON.stringify(val))
            },
            immediate: true
        }
    },
    data() {
        return {
            items: []
        }
    },
    methods: {
        navClick(item, index) {
            this.items.forEach((ele, eleIndex) => {
                if (index !== eleIndex) {
                    ele.active = false
                } else {
                    ele.active = true
                }
            })
            this.$emit('update:values', this.items)
        }
    }
}
</script>
<style lang="scss" scoped>
.stl-nav {
    display: inline-block;
}
</style>
