<template>
    <el-container>
        <el-header class="header-nav"></el-header>
        <el-container>
            <el-aside class="side-bar">
                <el-menu
                    text-color="#ffffff"
                    active-text-color="#ffffff"
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
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
    <!-- <div class="layout">
        <div class="layout-nav"></div>
        <div class="layout-body">
            <div class="layout-sidebar">
                <el-menu
                    class="layout-side"
                    text-color="#ffffff"
                    active-text-color="#ffffff"
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
            </div>
            <div class="layout-main">
                <router-view></router-view>
            </div>
        </div>
    </div> -->
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
.header-nav {
    background-color: #3486a3;
}
.side-bar {
    width: 250px;
    background-color: #075d7d;
}
.el-menu {
    background: none;
}
</style>
