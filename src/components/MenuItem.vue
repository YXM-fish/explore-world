<template>
    <div>
        <el-submenu :index="menu.path" v-if="menu.children && menu.children.length">
            <template slot="title">
                <i :class="menu.meta.icon"></i>
                <span slot="title">{{ menu.meta.title }}</span>
            </template>
            <template v-for="(child, index) in menu.children">
                <MenuItem :key="index" :menu="child"></MenuItem>
            </template>
        </el-submenu>
        <el-menu-item :index="menu.path" :route="menu" v-else>
            <i :class="menu.meta.icon"></i>
            <span slot="title">{{ menu.meta.title }}</span>
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

<style lang="scss" scoped>
/deep/ .el-menu.el-menu--inline {
    background: none;
}
.el-menu-item i,
.el-submenu i {
    color: #ffffff;
}
.el-menu-item.is-active {
    background-color: #5597ab;
}
.el-menu-item:hover {
    background-color: #7aa4b1;
}
/deep/ .el-submenu__title:hover {
    background-color: #7aa4b1;
}
</style>
