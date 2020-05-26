<template>
    <div class="layout">
        <el-menu
            class="layout-side"
            background-color="#00b17c"
            text-color="#ffffff"
            active-text-color="#fffb00"
            :default-active="defaultActive"
            :router="true"
            :unique-opned="true"
            @select="handleSelect"
            @open="handleOpen"
            @close="handleClose"
        >
            <template v-for="(menu, index) in menus">
                <MenuItem :key="index" :menu="menu"></MenuItem>
            </template>
        </el-menu>
        <div class="layout-main">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import { menus } from '@/routes'
import MenuItem from '_c_/MenuItem.vue'

export default {
    data() {
        return {
            menus,
            defaultActive: 'personal'
        }
    },
    components: {
        MenuItem
    },
    created() {
        this.defaultActive = this.$route.name
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath)
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath)
        },
        handleSelect(key, keyPath) {
            console.log(key, keyPath)
        }
    }
}
</script>

<style lang="scss" scoped>
.layout {
    height: 100%;
    display: flex;
    flex-direction: row;
    .layout-side {
        width: 200px;
        flex: 0 1 200px;
        overflow-y: auto;
        overflow-x: hidden;
    }
    .layout-main {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        background-color: rgb(250, 250, 250);
    }
}
</style>
