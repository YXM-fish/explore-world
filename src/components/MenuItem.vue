<template>
    <div>
        <el-submenu :index="menu.path" v-if="menu.children && menu.children.length">
            <template slot="title">
                <i :class="menu.meta.icon"></i>
                <span>{{ menu.meta.title }}</span>
            </template>
            <template v-for="(child, index) in menu.children">
                <MenuItem :key="index" :menu="child"></MenuItem>
            </template>
        </el-submenu>
        <el-menu-item :index="menu.path" :route="menu" v-else>
            <i :class="menu.meta.icon"></i>
            <span>{{ menu.meta.title }}</span>
        </el-menu-item>
    </div>
</template>

<script>
export default {
    name: 'MenuItem',
    props: {
        menu: {
            type: Object,
            default: function() {
                return {}
            }
        }
    }
}
</script>

<style>
.el-menu-item i,
.el-submenu i {
    color: #ffffff;
}
.el-menu .el-menu-item.is-active {
    background-color: #01ca33 !important;
}
</style>
