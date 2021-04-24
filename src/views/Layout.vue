<template>
    <el-container>
        <el-header class="header-nav"></el-header>
        <el-container>
            <el-aside class="side-bar" style="width: auto;">
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
                <RouteContainer></RouteContainer>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import { menus } from '@/routes'
import MenuItem from '_c_/MenuItem.vue'
import RouteContainer from '@/RouteContainer.vue'

export default {
    data() {
        return {
            menus,
            defaultActive: 'personal'
        }
    },
    components: {
        MenuItem,
        RouteContainer
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
.el-container {
    flex: 1;
    display: flex;
    overflow-y: auto;
}
.el-main {
    background-color: #f5f6f8;
    padding: 30px 26px;
}
.header-nav {
    background-color: #3486a3;
}
.side-bar {
    background-color: #075d7d;
}
.el-menu {
    background: none;
}
</style>
