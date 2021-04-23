<template>
    <div class="route-container">
        <router-view></router-view>
    </div>
</template>

<script>
export default {}
</script>

<style scoped>
.route-container {
    flex: 1;
    display: flex;
    overflow-y: auto;
    overflow-x: auto;
    background-color: #f5f6f8;
}
</style>
