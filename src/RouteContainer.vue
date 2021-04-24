<template>
    <div class="route-container">
        <router-view></router-view>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.route-container {
    flex: 1;
    display: flex;
    overflow-y: auto;
    overflow-x: auto;
    background-color: #fff;
    div:first-child:not(.route-container) {
        flex: 1;
        padding: 24px;
    }
}
</style>
